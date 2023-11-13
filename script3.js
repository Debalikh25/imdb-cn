function renderMovie() {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('imdbID');

  fetchMovie(myParam)

}

renderMovie();


function fetchMovie(id) {

  $.ajax({
    url: `http://www.omdbapi.com/?apikey=71c0ef57&i=${id}`,
    method: 'GET',
    success: function (movie) {
      renderMovieToDom(movie);
    },

    failure: function (err) {

    }
  })
}

function renderMovieToDom(movie) {
  const htmlMovieString = `
 
 <div class="row">
    
 <div class="col-md-4">
     <img src='${movie.Poster}' width='200px' height='200px' />
 </div>

 <div class="col-md-4">

    <div class='movie-details mt-4'>
        <p> <strong>Title : </strong>${movie.Title} </p>
        <p> <strong>Genre : </strong>${movie.Genre} </p>
        <p> <strong>Director : </strong>${movie.Director} </p>
        <p> <strong>Language : </strong>${movie.Language} </p>
        <p> <strong>Released: </strong>${movie.Released} </p>
     </div>

 </div>

 <div class="col-md-4">

 <div class='movie-details mt-4'>
     <p> <strong>Runtime : </strong>${movie.Runtime} </p>
     <p> <strong>Type : </strong>${movie.Type} </p>
     <p> <strong>Country : </strong>${movie.Country} </p>
     <p> <strong>Language : </strong>${movie.Language} </p>
     <p> <strong>Released: </strong>${movie.Released} </p>
  </div>

</div>

</div>

<div class="row mt-4">
  <div class="col-md-12">
       <p><strong>Plot : </strong>${movie.Plot} </p>
  </div>
</div>

<div class='row'>
<div class="col-md-6">
<p> <strong>Imdb Id : </strong>${movie.imdbID} </p>
<p> <strong>Imdb Rating : </strong>${movie.imdbRating} </p>
<p> <strong>imdb Votes : </strong>${movie.imdbVotes} </p>
<p> <strong>Box Office : </strong>${movie.BoxOffice} </p>
</div>

<div class="col-md-6">
<button data-imdbId='${movie.imdbID}' onClick="addToFavourite(this)" type="button" class="btn btn-info btn-lg">Add to Favourites</button>
</div>

 </div>
 
 
 `

  $(".movie").html(htmlMovieString)


}

function addToFavourite(currentElement) {
  const id = currentElement.getAttribute('data-imdbId');

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


