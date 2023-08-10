# Distinctiveness and Complexity:
The first reason why I think this project is distnict is that I wanted to do something more related to me and my personality. I decided to make a movie library where you can view many movies and know information about them.<br>
The second reason is that unlike other projects that I worked on in this course I didn't know where to start and what to do. How should the user interact with my website and how would it look, The first thing I wanted my website to do is to have as many movies as possible,
and that's why I wrote a script that scrapes the information of films 
from Imdb and I managed to get the information of 10000 films, this is also what makes this project different from the other projects in the course is that I had to get the information related to my project myself.<br>
The third reason is me deciding the user experience, how the user would react with the information of the films I got, I decided to make a home page that has all the films and it reveals more as the user scrolls, then I gave the option for the user to view each film individually by simply clicking on it and he can also added the feature to add it to his watchlist, I also added the feature for the user to search for specific films, the planning of how to make these interactions of the user was distinct from other projcets where I just did the requirements however here I had to be careful of how to do it as it will affect the while project.<br>

# What is contained in each file I created?

## films.ipnyb
First I created a films.ipynb that has all the logic related to getting the information of the films.<br>
First we define a main function that takes a parameter (start) it takes this parameter and requests a hundred film starting from that parameter start
first we request the url then we parse the html content with beautiful soup library
We then search the content of the page for all divs that has a class of lister-item mode-advanced we only know that it has the data from looking through the page
We then iterate over each div in these data
Inside each div we will be searching for name, year of release, the run time, the rating, the genre, director, description of the film, the stars and the poster
We then transform this to json data and return them 
After that in our main code we will be iterating from 1 to 10001 and pass that as the main functuion as the start variable
after that we write all that json in a file called films.json.<br>
We could be enough with this however the quality of the poster images are really bad we will be continuing with some more logic to get high quality posters.
To get the hd posters we will have to go to each film page specifically and parse that image.
First to visit each page dynamcilly we need the specific id for each film that imdb puts on them this can be done easily as it can be found with the data that we parsed before so we will implement the same logic only looking in other place.
The code below will get us the 10000 ids and store it in a csv file so we can use it in the next logic.First we write the scrape_link function that takes a url as parameter and requests the page we parse finding the image link and return it.
We then write the bigger logic we open the links csv file and then open the films csv file to replace the poster links we read the films and then iterate over them one by one.<br>

## views.py
This file contains all the backend logic of the project as all the views of the projects is defined in it.<br>
First view is responsible for displaying the index.html page which is the only page in the project aside from the login page and the register page. This view just renders the page all the logic relaetd to how to display the films and manage other functionlities will be done through other views.<br>

Second view is get_films, this view only accepts GET requests and it takes with the request a start and an end and gives all the movies with ids in that range and returns it as a json response. The functionality of this view will be useful with the javascipt we write for our application.<br>

Third view is get_film, this view has two functionalities first is asscoiated with PUT request, this request will help us add films to user's watchlist the requst is passed a film id with. Second is associated with GET requst, this request will help us get the information of a single film again it will come in handy when used with javascript, the id of the film is sent with the request and the film'information is returned as json.<br>

Fourth view is search, this view handles only POST requests, it will be associated with the search functionality. it takes a name of a movie with the requst and it returns the closet results as json response.<br>

Fifth view is watchlist, this view is responsible for viewing the user's watchlist, it handels POST requsts and returns the films in the user's watchlist as json response.<br>

Sixth, seventh and eighth view are responsible for login, logout and register.<br>

## models.py
Contains the models associated with the app. there are two models, first is the user model that inherits from django's Abstractuser meaning it has username field, password field and email field. I also added a watchlist field that has a many to many relationship with the model Film. The second model is the Film model that represents the info of the films. each film has an id, name, year, time, rating, genre, image, description, director and stars that played in it, the model also has a json method to help convert this info to json.

## urls.py
This file contains all the paths of the app, first path is the default path which shows the app, second path "/films" is for the get_films view, third path "films/id" is for the get_film view, fourth path "search" is for the search view, fifth path "login" for login, sixth path "logout" for logout, seventh path "register" for register, and the last path "watchlist" for watchlist.<br>

## layout.html
This file contains the layout of the app it has the links to the javascript and css of the app, it also has the place for the block body.<br>

## index.html
It extends the layout and inside the block body it has a div for navbar, a div for the single film information, a div for all the films to be displayed, a div for the watchlist to be displayed, a div for the search.<br>

## index.js
It has many functions to deal with the interface of the app.

First the Add function that accepts two parameters the id of the film to be dealt with and another parameter that determines whether to add or remove it from the watchlist.

Second the Film function that takes a parameter id the function first hides all other divs and leaves a div to display the film's information first it sends a request and it gets the information of the film as json, it then creates divs and assigns to this divs the classes from styles.css for each one to display it probely. 

Third the film function that makes the cards of the films.

Fourth the Home function thet displays the home.

Fifth the Search function that displays the search.

Sixth the Watchlist function that displays the watchlist of the user.

Seventh the Searched function to display the results of the search.

# To run the application
just type python manage.py runserver

