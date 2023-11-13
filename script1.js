$("#search-form").submit((e) => {

    e.preventDefault();
    $("#search-result").hide();
    let movieName = $("#movie-name").val();
    movieName = movieName.trim();

    if (movieName == '') {
        window.alert("Please type a movie name or an id")
        return;
    }

    $.ajax({
        url: `https://www.omdbapi.com/?apikey=71c0ef57&t=${movieName}`,
        type: 'GET',
        success: function (data) {
            if (data.Error) {
                window.alert(data.Error)
                $("#movie-name").val("");
                return;
            }

            renderMovieToDom(data);

            $("#movie-name").val("");

        },
        failure: function (error) {
            console.log(error)
        }
    })


})

function renderMovieToDom(data) {

    $("#result").html("<div></div>");

    const card = `
 <div class="card" style="width: 18rem;">
<div class="card-body">
<h5 class="card-title">${data.Title}</h5>
<h6 class="card-subtitle mb-2 text-muted">Released : ${data.Year}</h6>
<p class="card-text">${data.Plot}</p>
<a href="movie.html?imdbID=${data.imdbID}" class="card-link">See More</a>
 <input type="hidden" id="id-movie" value='${data.imdbID}' />
<br>
 <button onClick='addToFavourite()' class='btn btn-info mt-2'>Add to Favourites</buton>
</div>
</div>
 
 
 `

    $("#result").html(card);

}

$("#close-sign").click(() => {
    $("#search-result").hide();
})


function addToFavourite() {

    const id = $("#id-movie").val();

    if (localStorage.getItem('movies') == null) {

        const movies = [];
        movies.push(id);
        window.alert("movie added !!")
        localStorage.setItem("movies", JSON.stringify(movies))

        return;
    }

    const movies = JSON.parse(localStorage.getItem("movies"));

    for (let movie of movies) {
        if (movie == id) {
            window.alert('Movie already added to favourites')
            return;
        }
    }

    movies.push(id);
    window.alert("movie added !!")
    localStorage.setItem("movies", JSON.stringify(movies))
    return;

}

$("#movie-name").keyup((e) => {
    $("#search-result").show();
    let val = e.target.value;
    val = val.trim();
    if (val == '') {
        $("#search-result").hide();
    }

    $.ajax({
        url: `https://www.omdbapi.com/?apikey=71c0ef57&t=${val}`,
        type: 'GET',
        success: function (data) {
            if (data.Error) {
                $("#search-result").hide();
                return;
            }

            $("#search-result-movie").html(`<p class="search-style" onClick='onSearchResultClick(this)' data-imdbID=${data.imdbID}><strong>${data.Title}</strong - Year : ${data.Year}</p>`)


        },
        failure: function (error) {
            console.log(error)
        }
    })
})

function onSearchResultClick(currentClicked) {

    const imdbId = currentClicked.getAttribute("data-imdbid");
    window.location.replace(`movie.html?imdbID=${imdbId}`);
    //movie.html?imdbID=tt9418812
}

