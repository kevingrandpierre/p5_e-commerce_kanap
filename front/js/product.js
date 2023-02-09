let params = new URLSearchParams(document.location.search);
let id = params.get("id");

// fonction fetch pour obtenir les données de l'API
function getProduct() {
  fetch("http://localhost:3000/api/products/" + id)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      return pageProduct(data);
    })
    .catch((error) => console.log(error));
}

// fonction pour créer les éléments du DOM
function pageProduct(data) {
  const itemImg = document.querySelector(".item__img");

  // créer une image
  const img = document.createElement("img");
  img.src = data.imageUrl;
  img.alt = data.altTxt;
  itemImg.appendChild(img);

  // afficher le titre
  const title = document.querySelector("#title");
  title.textContent = data.name;

  // afficher le prix
  const prix = data.price;
  const priceProduct = document.querySelector("#price");
  priceProduct.textContent = prix;

  // afficher la description
  const description = data.description;
  const p = document.querySelector("#description");
  p.textContent = description;

  // afficher les couleurs dans la liste déroulante
  const color = data.colors;
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
    } else if (quantity < 1 || quantity > 100) {
      alert("La quantité doit être comprise entre 1 et 100");
      return;
    }
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

    const cart = {
      id: id,
      color: color,
      quantity: Number(quantity),
    };
    if (currentCart.length === 0) {
      currentCart.push(cart);
      localStorage.setItem("cart", JSON.stringify(currentCart));
    } else {
      const findProduct = currentCart.find(
        (data) => data.id === id && data.color === color
      );
      if (findProduct) {
        findProduct.quantity += Number(quantity);
        localStorage.setItem("cart", JSON.stringify(currentCart));
      } else {
        currentCart.push(cart);
        localStorage.setItem("cart", JSON.stringify(currentCart));
      }
    }
    alert(
      "Produit ajouté au panier :" +
        " " +
        "quatité =" +
        " " +
        quantity +
        " " +
        ", " +
        "couleur =" +
        " " +
        color
    );
    window.location.href = "cart.html";
  });
}

getProduct();
addToCart();
