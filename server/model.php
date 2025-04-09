<?php

/**
 * Définition des constantes de connexion à la base de données.
 *
 * HOST : Nom d'hôte du serveur de base de données, ici "localhost".
 * DBNAME : Nom de la base de données
 * DBLOGIN : Nom d'utilisateur pour se connecter à la base de données.
 * DBPWD : Mot de passe pour se connecter à la base de données.
 */
define("HOST", "localhost");
define("DBNAME", "lescoat2");
define("DBLOGIN", "lescoat2");
define("DBPWD", "lescoat2");

/**
 * Récupère le film dans la BDD.
 *
 * @return array 
 */

function getMovies(){
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    // Requête SQL pour récupérer le menu avec des paramètres
    $sql = "select * from Movie";
    // Prépare la requête SQL
    $stmt = $cnx->prepare($sql);
    // Exécute la requête SQL
    $stmt->execute();
    // Récupère les résultats de la requête sous forme d'objets
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res; // Retourne les résultats
}

function getMovieDetail($id){
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD); 
    $sql = "SELECT Movie.id, Movie.name, Movie.year, Movie.length, Movie.description, Movie.director, Movie.image, Movie.trailer, Movie.min_age, Category.id AS category_id ,Category.name AS category
    FROM Movie JOIN Category ON Movie.id_category = Category.id 
    WHERE Movie.id= :id;";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    $res = $stmt->fetch(PDO::FETCH_OBJ); 
    return $res;
}

function getCategories(){
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    $sql = "SELECT id, name AS category FROM Category";
    $stmt = $cnx->prepare($sql);
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res; 
}

function getMovieByCategory($category){
    if (empty($category)) {
        return false;
    }
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    $sql = "SELECT Movie.id, Movie.name, Movie.year, Movie.length, Movie.description, Movie.director, Movie.image, Movie.trailer, Movie.min_age, Category.id AS category_id ,Category.name AS category
            FROM Movie JOIN Category ON Movie.id_category = Category.id 
            WHERE Category.name = :category;";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':category', $category);
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res; 
}

function addMovie($name, $year, $length, $description, $director, $id_category, $image, $trailer, $min_age){
    if (empty($name) || empty($year) || empty($length) || empty($description) || empty($director) || empty($id_category) || empty($image) || empty($trailer) || empty($min_age)) {
        return false;
    }
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD); 
    $sql = "INSERT INTO Movie (name,year,length,description,director,id_category,image,trailer,min_age) 
            VALUES (:name,:year,:length,:description,:director,:id_category,:image,:trailer,:min_age)";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':year', $year);
    $stmt->bindParam(':length', $length);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':id_category', $id_category);
    $stmt->bindParam(':image', $image);
    $stmt->bindParam(':trailer', $trailer);
    $stmt->bindParam(':min_age', $min_age);
    $stmt->bindParam(':director', $director);
    $stmt->execute();
    $res = $stmt->rowCount(); 
    return $res;
}