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
        console.log(response);
        let rows = response["results"];

        const cardWrap = document.querySelector("#cardsWrap");
        while (cardWrap.firstChild) {
          cardWrap.removeChild(cardWrap.firstChild);
        }

        rows.forEach((a) => {
          let poster_path = a["poster_path"];
          let title = a["title"];
          let overview = a["overview"];
          let vote_average = a["vote_average"];

          let temp_html = `<div class="card">
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
          // cardWrap.appendChild(temp_html);
          cardWrap.insertAdjacentHTML("beforeend", temp_html);
        });
      })
      .catch((err) => console.error(err));
  }

  showMovie();
});
