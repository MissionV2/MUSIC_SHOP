from fastapi import APIRouter
from .ensembles import router as ensembles_router
from .musicians import router as musicians_router
from .compositions import router as compositions_router
from .performances import router as performances_router
from .records import router as records_router
from .labels import router as labels_router
from .analytics import router as analytics_router

router = APIRouter()
router.include_router(ensembles_router, prefix="/ensembles", tags=["ensembles"])
router.include_router(musicians_router, prefix="/musicians", tags=["musicians"])
router.include_router(compositions_router, prefix="/compositions", tags=["compositions"])
router.include_router(performances_router, prefix="/performances", tags=["performances"])
router.include_router(records_router, prefix="/records", tags=["records"])
router.include_router(labels_router, prefix="/labels", tags=["labels"])
router.include_router(analytics_router, prefix="/analytics", tags=["analytics"])