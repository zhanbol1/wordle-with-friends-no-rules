from django.urls import path
from . import views

urlpatterns = [
    path('home/', views.home, name="home"),
    path('home/<str:word>', views.game, name="game")
]