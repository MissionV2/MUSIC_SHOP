from pydantic import BaseModel

class LabelBase(BaseModel):
    name: str
    address: str

class LabelCreate(LabelBase):
    pass

class Label(LabelBase):
    id: int

    class Config:
        orm_mode = True