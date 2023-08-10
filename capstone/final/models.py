from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
class Film(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=64)
    year = models.CharField(max_length=12)
    runtime = models.CharField(max_length=12)
    rating = models.CharField(max_length=12)
    genre = models.CharField(max_length=64)
    image = models.URLField()
    description = models.CharField(max_length=500)
    director = models.CharField(max_length=64)
    stars = models.CharField(max_length=128)

    def json(self):
        return {
            "id" : self.id,
            "name" : self.name,
            "year" : self.year,
            "runtime" : self.runtime,
            "rating" : self.rating,
            "genre" : self.genre,
            "image" : self.image,
            "description" : self.description,
            "director" : self.director,
            "stars" : self.stars,
            "users" : [user.username for user in list(self.users.all())]
        }


class User(AbstractUser):
    watchlist = models.ManyToManyField(Film, blank=True, related_name="users")


