from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("films/", views.get_films ,name="get_films"),
    path("films/<int:id>", views.get_film, name="get_film"),
    path("search", views.search, name="search"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("watchlist", views.watchlist, name="watchlist")
]

