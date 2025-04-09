let templateFile = await fetch('./component/CardMovie/template.html');
let template = await templateFile.text();

let CardMovie = {};

CardMovie.format = function (obj) {
  let html = template;
  html = html.replace("{{alt}}", obj.name);

  let id = obj.id;
  html = html.replace('<figure class="card', `<figure class="card font-sans flex-column" onclick="C.handlerDetail(${id})"`);

  if(obj.name.length > 20){
    html = html.replace("{{title}}", obj.name.substring(0, 20) + "...");
  }
  else{
    html = html.replace("{{title}}", obj.name);
  }


  let image = obj.image;   
  let url = "../server/images/" + image;

  let xhr = new XMLHttpRequest();
  xhr.open('HEAD', url, false);
  xhr.send();

  html = html.replace("{{img}}", (xhr.status >= 200 && xhr.status < 300) ? image : "no_image.jpg");
  return html;  
} 

CardMovie.formatMany = function(movies){
  let html = "";
  for(const obj of movies){
      html = html + CardMovie.format(obj)
  }
  return html;
}


export { CardMovie };
