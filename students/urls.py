from django.urls import include, path, re_path
from rest_framework.routers import DefaultRouter

from .views import StudentViewSet, export_students_csv, spa_view

router = DefaultRouter()
router.register(r"students", StudentViewSet, basename="student")

urlpatterns = [
    path("api/", include(router.urls)),
    path("api/export/csv/", export_students_csv, name="export_csv"),
    path("", spa_view, name="spa_root"),
    re_path(r"^(?!api/|media/|admin/).*$", spa_view, name="spa_fallback"),
]
