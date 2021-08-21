const d = document,
  $shows = d.getElementById("shows"),
  $template = d.getElementById("show-template").content,
  $a = $template.querySelector("a"),
  $img = $template.querySelector("img"),
  $fragment = d.createDocumentFragment();

d.addEventListener("keypress", async (e) => {
  if (e.target.matches("#search")) {
    if (e.key === "Enter") {
      try {
        $shows.innerHTML = `<img src="../ASSETS/spinning-circles.svg" alt="Cargando..." class="loader">`;

        let query = e.target.value.toLowerCase(),
          api = `https://api.tvmaze.com/search/shows?q=${query}`,
          res = await fetch(api),
          json = await res.json();

        if (!res.ok) throw { status: res.status, statuText: res.statusText };

        if (json.length === 0) {
          $shows.innerHTML = `<h2>No existen resultados para el criterio de busqueda: ${query}</h2>`;
        } else {
          json.forEach((el) => {
            $template.querySelector("h3").textContent = el.show.name;
            $template.querySelector("div").innerHTML = el.show.summary
              ? el.show.summary
              : "Sin descripción";

            $template.querySelector("img").src = el.show.image
              ? el.show.image.medium
              : "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";

            $template.querySelector("img").alt = el.show.name;
            $template.querySelector("a").href = el.show.url ? el.show.url : "#";
            $template.querySelector("a").target = el.show.url
              ? "_blank"
              : "_self";

            $a.appendChild($img);

            let $clone = d.importNode($template, true);
            $fragment.appendChild($clone);
          });
          $shows.innerHTML = "";
          $shows.appendChild($fragment);
        }
      } catch (err) {
        console.log(err);
        let message =
          err.statuText || "Ocurrio un error al consumir la API de TvMazer";
        $shows.innerHTML = `<p>Error ${err.status}: ${message}</p>`;
      }
    }
  }
});
