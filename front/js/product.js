let params = new URLSearchParams(document.location.search);
let id = params.get("id");
console.log(id);

// fonction fetch pour obtenir les données de l'API
function getProducts() {
  fetch("http://localhost:3000/api/products/" + id)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then((res) => {
      return pageProduct(res);
    })
    .catch((error) => console.log(error));
}

// fonction pour créer les éléments du DOM
function pageProduct(product) {
  const itemImg = document.querySelector(".item__img");

  // créer une image
  const img = document.createElement("img");
  itemImg.appendChild(img);
  img.src = product.imageUrl;
  img.alt = product.altTxt;

  // afficher le titre
  const title = document.querySelector("#title");
  title.textContent = product.name;

  // afficher le prix
  const prix = product.price;
  const priceProduct = document.querySelector("#price");
  priceProduct.textContent = prix;

  // afficher la description
  const description = product.description;
  const p = document.querySelector("#description");
  p.textContent = description;

  // afficher les couleurs dans la liste déroulante
  const color = product.colors;
  const colorSelect = document.querySelector("#colors");
  color.forEach((color) => {
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    colorSelect.appendChild(option);
  });
}

// fonction d'écoute au click pour ajouter le produit au panier
function addToCart() {
  const button = document.querySelector("#addToCart");
  button.addEventListener("click", (event) => {
    const color = document.querySelector("#colors").value;
    const quantity = document.querySelector("#quantity").value;
    // boucle pour la sélection d'une couleur et d'une quantité reste sur la page product si l'une des conditions n'est pas remplie
    if (color === "") {
      alert("Veuillez sélectionner une couleur");
      return;
    } else if (quantity === 0) {
      alert("Veuillez sélectionner une quantité");
      return;
    }
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

    const cart = {
      id: id,
      color: color,
      quantity: Number(quantity),
    };
    // todo .find by index L.86
    if (currentCart.length === 0) {
      currentCart.push(cart);
      localStorage.setItem("cart", JSON.stringify(currentCart));
    } else {
      const findProduct = currentCart.find(
        (product) => product.id === id && product.color === color
      );
      if (findProduct) {
        findProduct.quantity += Number(quantity);
        localStorage.setItem("cart", JSON.stringify(currentCart));
      } else {
        currentCart.push(cart);
        localStorage.setItem("cart", JSON.stringify(currentCart));
      }
    }
    window.location.href = "cart.html";
  });
}

// todo format code

getProducts();
addToCart();
