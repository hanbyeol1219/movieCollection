let movies;
let cardWrap;
let id;
let keyword;

function deleteCards() {
  while (cardWrap.firstChild) {
    cardWrap.removeChild(cardWrap.firstChild);
  }
}

function rederCards(cards) {
  cards.forEach((movie) => {
    const { poster_path, title, overview, vote_average, id } = movie;

    let temp_html = `<div class="card" id=${id}>
    <div class="cardContents">
      <div class="movieImageBox">
        <img
          src="https://image.tmdb.org/t/p/original/${poster_path}"
          alt="movieImage"
          class="movieImage"
        />
      </div>
      <h2 class="movieName">${title}</h2>
      <p class="moviePlot">${overview}</p>
      <p class="movieRatings">Rating : ${vote_average}</p>
    </div>
  </div>`;
    cardWrap.insertAdjacentHTML("beforeend", temp_html);
  });
  //클릭 alert
  let clickCards = document.querySelectorAll(".card");

  clickCards.forEach((checkCard) => {
    checkCard.addEventListener("click", function () {
      alert(`해당 영화의 id는 ${checkCard.id} 입니다.`);
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTA1MTFhZjBhYmU5ODdhY2RmN2ZkZDQ4NWEwZGQ4NSIsInN1YiI6IjY0NzVhNzkyZGQyNTg5MDEwMTdmNzdlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hp_KXbEje4p2REt2MhrKlUCJLkkFJw63Ko3vDPCt8zA",
    },
  };

  function showMovie() {
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        movies = response["results"];
        cardWrap = document.querySelector("#cardsWrap");

        deleteCards();

        rederCards(movies);
      })
      .catch((err) => console.error(err));
  }

  showMovie();
});

function searchMovie() {
  keyword = document.querySelector("#inputKeyword").value.toLowerCase();

  deleteCards();

  const filteredMovie = movies.filter((movie) => {
    let lowerTitle = movie.original_title.toLowerCase();
    return lowerTitle.includes(keyword);
  });

  rederCards(filteredMovie);
}
