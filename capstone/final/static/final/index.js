function Add(id, watchlist){
    fetch(`/films/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            watchlist: watchlist
        })
    })
    if (watchlist){
        document.querySelector('button').innerHTML = 'Add to Watchlist';
    }else{
        document.querySelector('button').innerHTML = 'Remove from Watchlist';
    }
}



function Film(id){
    document.querySelector('.movie-container').style.display = 'none';
    document.querySelector('.film-container').style.display = 'block';
    document.querySelector('.search-container').style.display = 'none';
    document.querySelector('.watchlist').style.display = 'none';
    document.querySelector('.film-container').innerHTML = '';
    fetch(`films/${id}`)
    .then(response => response.json())
    .then(function(film){
        const div_1 = document.createElement('div');
        const div_2 = document.createElement('div');
        div_1.setAttribute('class', 'div-1');
        div_2.setAttribute('class', 'div-2 header-div');
        const image = document.createElement('img');
        image.setAttribute('src', film.image);
        image.setAttribute('class', 'film-image');
        image.setAttribute('width', '100%');
        const h1 = document.createElement('h1');
        h1.innerHTML = film.name;
        const h2 = document.createElement('h2');
        h2.innerHTML = film.description;
        const h3 = document.createElement('h3');
        h3.innerHTML = film.rating;
        const h4 = document.createElement('h4');
        h4.innerHTML = film.genre;
        const h5 = document.createElement('h5');
        h5.innerHTML = film.director;
        const h5_2 = document.createElement('h5');
        h5_2.innerHTML = film.stars;
        const h6 = document.createElement('h6');
        h6.innerHTML = film.year;
        const watchlist = document.createElement('button');
        watchlist.setAttribute('onsubmit', 'return false;');
        
        watchlist.setAttribute('class', 'button');
        const user_id = document.querySelector('#user_id')
        if (film.users.includes(user_id.innerHTML)){
            watchlist.innerHTML = 'Remove from Watchlist';
            watchlist.setAttribute('onclick', `Add(${film.id}, true)`);
        }else{
            watchlist.innerHTML = 'Add to Watchlist';
            watchlist.setAttribute('onclick', `Add(${film.id}, false)`);
        }
        
        div_1.append(image);
        div_2.append(h1);
        div_2.append(h2);
        div_2.append(h3);
        div_2.append(h4);
        div_2.append(h5);
        div_2.append(h5_2);
        div_2.append(h6);
        div_1.append(watchlist);
        document.querySelector('.film-container').append(div_1);
        document.querySelector('.film-container').append(div_2);   
        
    });
}



function Div(film, parent){
    const div = document.createElement('div');
    div.setAttribute('class', 'movie-card');
    div.setAttribute('onclick', `Film(${film.id})`);
    div.style.backgroundImage = `url(${film.image})`;
    h3 = document.createElement('h3');
    h3.innerHTML = film.name;
    div_additional = document.createElement('div');
    div_additional.setAttribute('class', 'additional-info');
    p_year = document.createElement('p');
    p_year.innerHTML = `Year: ${film.year}`;
    p_director = document.createElement('p');
    p_director.innerHTML = `Director: ${film.director}`;
    p_genre = document.createElement('p');
    p_genre.innerHTML = `Genre: ${film.genre}`;
    p_rating = document.createElement('p');
    p_rating.innerHTML = `${film.rating}/10`;
    div_additional.append(h3);
    div_additional.append(p_year);
    div_additional.append(p_director);
    div_additional.append(p_genre);
    div_additional.append(p_rating);
    div.append(div_additional);
    document.querySelector(parent).append(div);
}
function Home(){
    document.querySelector('.movie-container').style.display = 'flex';
    document.querySelector('.film-container').style.display = 'none';
    document.querySelector('.search-container').style.display = 'none';
    document.querySelector('.watchlist').style.display = 'none';
    const navbar = document.querySelector('.navbar');
    navbar.querySelector('#home-button').setAttribute('class', 'active');
    navbar.querySelector('#search-button').setAttribute('class', '');
    navbar.querySelector('#watchlist-button').setAttribute('class', '');
}
function Search(){
    document.querySelector('.movie-container').style.display = 'none';
    document.querySelector('.film-container').style.display = 'none';
    document.querySelector('.search-container').style.display = 'flex';
    document.querySelector('.watchlist').style.display = 'none';
    const navbar = document.querySelector('.navbar');
    navbar.querySelector('#home-button').setAttribute('class', '');
    navbar.querySelector('#search-button').setAttribute('class', 'active');
    navbar.querySelector('#watchlist-button').setAttribute('class', '');
    document.querySelector('#search-form').style.display = 'flex';
    document.querySelector('.search-results').innerHTML = '';
}

function Watchlist(){
    document.querySelector('.movie-container').style.display = 'none';
    document.querySelector('.film-container').style.display = 'none';
    document.querySelector('.search-container').style.display = 'none';
    document.querySelector('.watchlist').style.display = 'flex';
    document.querySelector('.search-results').innerHTML = '';
    const navbar = document.querySelector('.navbar');
    navbar.querySelector('#home-button').setAttribute('class', '');
    navbar.querySelector('#search-button').setAttribute('class', '');
    navbar.querySelector('#watchlist-button').setAttribute('class', 'active');
    document.querySelector('#search-form').style.display = 'flex';
    document.querySelector('.watchlist').innerHTML = '';
    fetch(`/watchlist`, {
        method : 'POST',
        })
        .then(response => response.json())
        .then(function(films){
            console.log(films);
            films.forEach(film => {
                Div(film, '.watchlist');
            });
        });
}
function Searched(){
    document.querySelector('.search-results').innerHTML = '';
    const film = document.querySelector('#search-film').value
    fetch(`/search`, {
    method : 'POST',
    body: JSON.stringify({
        film : film
    })
    })
    .then(response => response.json())
    .then(function(films){
        console.log(films);
        document.querySelector('#search-form').style.display = 'none';
        films.forEach(film => {
            Div(film, '.search-results');
        });
    });
}
document.addEventListener('DOMContentLoaded', ()=>{
    console.log('tmam1');
    const counter = 34;
    let start = 1;
    let end = counter + start;
    fetch(`films?start=${start}&end=${end}`)
    .then(response => response.json())
    .then(function(films){
        console.log(films);
        films.forEach(film => {
            Div(film, '.movie-container');
        });
    });

    window.onscroll = function(){
        if (window.scrollY + window.innerHeight >= document.body.offsetHeight){
            start += counter;
            end = counter + start + 1;
            fetch(`films?start=${start}&end=${end}`)
            .then(response => response.json())
            .then(function(films){
                console.log(films);
                films.forEach(film => {
                    Div(film, '.movie-container');
                });
            });
        }
    };
    
});