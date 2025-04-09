let templateFile = await fetch('./component/AddMovie/template.html');
let template = await templateFile.text();

let AddMovie = {};


AddMovie.format = function(handler){
    let html= template;
    html = html.replace('{{handler}}', handler);
    return html;
}


export {AddMovie};

