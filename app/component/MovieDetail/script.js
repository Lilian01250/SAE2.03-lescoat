let templateFile = await fetch('./component/MovieDetail/template.html');
let template = await templateFile.text();

let MovieDetail = {};

MovieDetail.format = function (movie) {
  let html = template;
  html = html.replace('{{title}}', movie.name);
  html = html.replace('{{alt}}', movie.name);
  html = html.replace("{{img}}", movie.image);
  html = html.replace("{{duration}}", movie.length+" minutes");
  html = html.replace("{{views}}", "15 000");
  html = html.replace("{{director}}", movie.director);
  html = html.replace("{{year}}", movie.year);
  html = html.replace("{{category}}", movie.category);
  html = html.replace("{{min_age}}", movie.min_age);
  html = html.replace("{{description}}", movie.description);

  let trailer = movie.trailer;
  if (trailer.includes("watch?v=")) {
    trailer = trailer.replace("watch?v=", "embed/");
  }
  html = html.replace("{{trailer}}", trailer);

  return html;
};

export { MovieDetail };
