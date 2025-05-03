from sqlalchemy.orm import Session
from sqlalchemy import desc, func
from models.record import Record  # исправленный импорт
from models import performance
from schemas import record as record_schemas

def get_record(db: Session, record_id: int):
    return db.query(Record).filter(Record.id == record_id).first()

def get_records(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Record).offset(skip).limit(limit).all()

def create_record(db: Session, record_in: record_schemas.RecordCreate):
    db_record = Record(
        **record_in.dict(exclude={"performance_ids", "composition_ids"})
    )
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    
    # Добавляем связи с performances
    if record_in.performance_ids:
        for perf_id in record_in.performance_ids:
            perf = db.query(performance.Performance).get(perf_id)
            if perf:
                db_record.performances.append(perf)
    # Добавляем связи с compositions
    if record_in.composition_ids:
        for comp_id in record_in.composition_ids:
            comp = db.query(Record.compositions.property.mapper.class_).get(comp_id)
            if comp:
                db_record.compositions.append(comp)
    db.commit()
    db.refresh(db_record)
    return db_record

def update_record(db: Session, record_id: int, record: record_schemas.RecordUpdate):
    db_record = get_record(db, record_id)
    if not db_record:
        return None
    update_data = record.dict(exclude_unset=True)
    for field in update_data:
        setattr(db_record, field, update_data[field])
    db.commit()
    db.refresh(db_record)
    return db_record

def delete_record(db: Session, record_id: int):
    db_record = get_record(db, record_id)
    if not db_record:
        return None
    db.delete(db_record)
    db.commit()
    return db_record

def update_record_sales(db: Session, record_id: int, current_year: int, previous_year: int):
    db_record = get_record(db, record_id)
    if not db_record:
        return None
    db_record.sales_current_year = current_year
    db_record.sales_previous_year = previous_year
    db_record.stock_quantity -= current_year
    db.commit()
    db.refresh(db_record)
    return db_record

def get_best_sellers_current_year(db: Session, limit: int = 10):
    return (
        db.query(Record.title)
        .filter(Record.sales_current_year > 0)
        .order_by(Record.sales_current_year.desc())
        .limit(limit)
        .all()
    )

def get_all_sorted_by_sales(db, limit: int = 100):
    return (
        db.query(Record)
        .order_by(
            (Record.sales_current_year + Record.sales_previous_year).desc()
        )
        .limit(limit)
        .all()
    )

class RecordCRUD:
    get_record = staticmethod(get_record)
    get_records = staticmethod(get_records)
    create_record = staticmethod(create_record)
    update_record = staticmethod(update_record)
    delete_record = staticmethod(delete_record)
    update_record_sales = staticmethod(update_record_sales)
    get_best_sellers_current_year = staticmethod(get_best_sellers_current_year)
record = RecordCRUD()