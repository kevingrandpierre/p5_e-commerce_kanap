// fonction fetch pour récupérer les donnees de l'API
function getProducts() {
  fetch("http://127.0.0.1:3000/api/products")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {
      product(data);
    })
    // Catch error
    .catch(function (err) {
      console.log(err);
    });
}

//function pour créer le DOM en faisant une boucle qui parcourt tous les objets du JSON
function product(data) {
  let items = document.getElementById("items");
  for (let i in data) {
    // créer une balise a.href
    let a = document.createElement("a");
    a.href = `./product.html?id=${data[i]._id}`;
    items.appendChild(a);

    // balise article
    let article = document.createElement("article");
    a.appendChild(article);

    // afficher l'image du canapé
    let img = document.createElement("img");
    img.alt = data[i].altTxt;
    img.src = data[i].imageUrl;
    article.appendChild(img);

    // afficher le nom du canapé
    let h3 = document.createElement("h3");
    h3.className = "name";
    h3.innerHTML = `${data[i].name}`;
    article.appendChild(h3);

    // afficher la description du canapé
    let p = document.createElement("p");
    p.className = "description";
    p.innerHTML = `${data[i].description}`;
    article.appendChild(p);
  }
}

// appel de la fonction fetch
getProducts();
