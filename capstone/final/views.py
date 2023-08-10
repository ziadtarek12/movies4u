from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from .models import *
import json
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
@login_required(login_url='/login')
def index(request):
    return render(request, "final/index.html")

def get_films(request):
    if request.method != "GET":
        return JsonResponse("Error")

    if "start" in request.GET:

        start = request.GET["start"]
    else:
        start = 1
    if "end" in request.GET:

        end = request.GET["end"]
    else:
        end = 10
    
    films = Film.objects.filter(id__range = (start, end))
    
    films = [film.json() for film in list(films)]

    return JsonResponse(films, safe=False)

@csrf_exempt
def get_film(request, id):
    if request.method == "PUT":
        body = request.body
        body = json.loads(body)
        film_watchlist = Film.objects.filter(id=body["id"]).first()
        if (body["watchlist"]):
            request.user.watchlist.remove(film_watchlist)
        
        else:
            request.user.watchlist.add(film_watchlist)
        
        return JsonResponse({"watchlist" : body["watchlist"]})

    elif request.method == "GET":
        id = int(id)
        if id > 9999:
            id = 1
        film = Film.objects.get(id=id).json()
        
        return JsonResponse(film, safe=False)

@csrf_exempt
def search(request):
    if request.method == "GET":
        return redirect(reverse("index"))
    
    else:
        film = request.body 
        if not film:
            return HttpResponse('please provide film')
        film = json.loads(film)
        
        film_info = Film.objects.filter(name__contains=film["film"]).all()
        film_info = [film.json() for film in list(film_info)]
        
        return JsonResponse(list(film_info), safe=False)

@csrf_exempt
def watchlist(request):
    if request.method == "GET":
        return redirect(reverse("index"))
    
    else:
        
        watchlist = User.objects.get(username=request.user.username).watchlist.all()
        film_info = [film.json() for film in list(watchlist)]
        
        return JsonResponse(list(film_info), safe=False)
    
def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "final/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "final/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "final/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "final/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "final/register.html")