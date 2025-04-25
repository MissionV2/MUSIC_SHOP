from .base import CRUDBase
from .ensemble import ensemble
from .musician import musician
from .composition import composition
from .performance import performance
from .record import record
from .analytics import analytics
from .label import label  # Добавьте эту строку

__all__ = [
    'CRUDBase',
    'ensemble',
    'musician',
    'composition',
    'performance',
    'record',
    'analytics',
    'label'  # И сюда
]