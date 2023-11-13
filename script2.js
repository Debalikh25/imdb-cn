
function checkFavourites() {

    const movies = JSON.parse(localStorage.getItem("movies"));
    if (movies == null) {
        $("#heading").html("No Movies Added To Favourites")
    } else if (movies.length == 0) {
        $("#heading").html("No Movies Added To Favourites")
    } else {
        $("#heading").html(`${movies.length} movie(s) added to favourites`)
    }

    return movies;

}

let movies = checkFavourites();


function renderMoviesToDom(movies) {

    let allMoviesInColumns = ``;

    for (let id of movies) {

        $.ajax({

            url: `http://www.omdbapi.com/?apikey=71c0ef57&i=${id}`,
            type: "GET",
            success: function (data) {

                const card = `
                <div class="col-md-4">
                <div class="card" style="width: 18rem;">
               <div class="card-body">
               <h5 class="card-title">${data.Title}</h5>
               <h6 class="card-subtitle mb-2 text-muted">Released : ${data.Year}</h6>
               <p class="card-text">${data.Plot}</p>
               <a href="movie.html?imdbID=${data.imdbID}" class="card-link">See More</a>
                <input type="hidden" id="id-movie" value='${data.imdbID}' />
               <br>
                <button onClick="removeFavourite(this)" class="btn btn-danger" data-imdbId="${data.imdbID}" class='btn btn-danger mt-2'>Remove from Favourites</buton>
               </div>
               </div>
               </div>
               `

                $("#row").append(card);

            },

            failure: function (err) {
                console.log(`Error Occured : ${err}`)
            }
        })

    }

    $("#row").html(allMoviesInColumns);

    return;

}

renderMoviesToDom(movies);

function removeFavourite(clickedButton) {
    const imdbId = clickedButton.getAttribute('data-imdbId');
    console.log(imdbId)
    let moviesAfterRemove = movies.filter(movie => movie != imdbId);

    localStorage.setItem("movies", JSON.stringify(moviesAfterRemove));
    window.alert('Movie Removed From Favourites')
    window.location.reload();

}








