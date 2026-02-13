from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('game/<str:word>', views.game, name="game")
]