from django.urls import path
from .views import sign_up, get_user
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path("sign-in", get_user, name="get_user"),
    path("sign-up", sign_up, name="sign_up"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
