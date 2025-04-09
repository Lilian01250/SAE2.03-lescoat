
// URL où se trouve le répertoire "server" sur mmi.unilim.fr
let HOST_URL = "https://mmi.unilim.fr/~lescoat2/sae203";//"http://mmi.unilim.fr/~????"; // CHANGE THIS TO MATCH YOUR CONFIG

let DataMovie = {};

 /**
     * Fetches data from the server based on the specified day.
     *
     * @returns The response from the server.
     * 
     * DataMovie.request permet de récupérer des données depuis le serveur.
     * renvoie les données contenues dans la réponse du serveur (data).
     */


// DataMovie.request = async function(){
//     // fetch permet d'envoyer une requête HTTP à l'URL spécifiée. 
//     // L'URL est construite en concaténant HOST_URL à "/server/script.php?direction=" et la valeur de la variable dir. 
//     // L'URL finale dépend de la valeur de HOST_URL et de dir.
//     let answer = await fetch(HOST_URL + "/server/script.php?todo=read");
//     // answer est la réponse du serveur à la requête fetch.
//     // On utilise ensuite la méthode json() pour extraire de cette réponse les données au format JSON.
//     // Ces données (data) sont automatiquement converties en objet JavaScript.
//     let data = await answer.json();
//     // Enfin, on retourne ces données.
//     return data;
// }

DataMovie.request = async function () {
      let response = await fetch(HOST_URL + "/server/script.php?todo=readmovies");
      let data = await response.json();
      return data;
  };


  DataMovie.requestMovieDetail = async function(id) {
    let response = await fetch(HOST_URL + "/server/script.php?todo=readmoviedetail&id="+id);
    let data = await response.json();
    return data;
  };

  DataMovie.requestMovieByCategory = async function(category) {
    let response = await fetch(HOST_URL + "/server/script.php?todo=readmoviesbycategory&category="+category);
    let data = await response.json();
    return data;
  }

  DataMovie.requestCategory = async function() {
    let response = await fetch(HOST_URL + "/server/script.php?todo=readcategories");
    let data = await response.json();
    return data;
  }




/* C'EST QUOI async/await ?
    
   Il y a des instructions qui prennent du temps sans qu'on puisse prédire combien.
   fetch (et answer.json() ) en font partie.
   Il n'est en effet pas possible de savoir combien de temps le serveur prendra à nous répondre.
   Peut-être même qu'il est en panne et ne répondra pas du tout !
   Le mot clé await permet de dire à javascript qu'il faut ATTENDRE la réponse du serveur avant de 
   poursuivre l'exécution du code (sinon on va vouloir lire les données avant de les avoir reçues).
   Et pour pouvoir utiliser await, il faut ajouter le mot clé async à la fonction.

*/

export {DataMovie};