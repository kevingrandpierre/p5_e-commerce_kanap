// fonction pour récupérer les données de l'APi
async function getProductById(id) {
  const response = await fetch("http://localhost:3000/api/products/" + id);
  return await response.json();
}

// fonction pour récupérer les données contenues dans le localstorage
const produitLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
/*console.log(produitLocalStorage);*/
function browseLocalStorage() {
  produitLocalStorage.forEach(async (item) => {
    const product = await getProductById(item.id);
    basketProduct(product, item.color, item.quantity, product.price);
    priceTotal(product);
  });
}

function checkCart() {
  // contrôle que le panier soit vide
  if (produitLocalStorage.length === 0) {
    // todo Parcourir le localstorage pour cacher le formulaire
    const form = document.querySelector(".cart");
    form.style.display = "none";
    const title = document.querySelector("h1");
    title.innerText = "Votre panier est vide";
  }
}
// fonction pour créer les éléments du DOM
function basketProduct(product, color, quantity) {
  // récupération de la section parent
  const section = document.querySelector("#cart__items");
  checkCart();
  // création des éléments du DOM
  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = product;
  article.dataset.color = color;
  section.appendChild(article);

  const divContentImg = document.createElement("div");
  divContentImg.classList.add("cart__item__img");
  article.appendChild(divContentImg);

  const img = document.createElement("img");
  img.src = product.imageUrl;
  img.alt = product.altTxt;
  divContentImg.appendChild(img);

  const divContent = document.createElement("div");
  divContent.classList.add("cart__item__content");
  article.appendChild(divContent);

  const divContentDescription = document.createElement("div");
  divContentDescription.classList.add("cart__item__content__description");
  divContent.appendChild(divContentDescription);

  const h2 = document.createElement("h2");
  h2.textContent = product.name;
  divContentDescription.appendChild(h2);

  const colors = document.createElement("p");
  colors.textContent = color;
  divContentDescription.appendChild(colors);

  const prix = document.createElement("p");
  prix.textContent = product.price;
  divContentDescription.appendChild(prix);

  const divSettings = document.createElement("div");
  divSettings.classList.add("cart__item__content__settings");
  divContent.appendChild(divSettings);

  const divSettingsQuantity = document.createElement("div");
  divSettingsQuantity.classList.add("cart__item__content__settings__quantity");
  divSettings.appendChild(divSettingsQuantity);

  const pQuantity = document.createElement("p");
  pQuantity.textContent = "Qté : ";
  divSettingsQuantity.appendChild(pQuantity);

  const input = document.createElement("input");
  input.type = "number";
  input.classList.add("itemQuantity");
  input.name = "itemQuantity";
  input.min = "1";
  input.max = "100";
  input.value = quantity;
  input.addEventListener("input", () => modifyQuantity(product, input.value));
  divSettingsQuantity.appendChild(input);

  const divSettingsDelete = document.createElement("div");
  divSettingsDelete.classList.add("cart__item__content__settings__delete");
  divSettingsDelete.addEventListener("click", () =>
    removeProduct(product, produitLocalStorage)
  );

  divSettings.appendChild(divSettingsDelete);

  const remove = document.createElement("p");
  remove.classList.add("deleteItem");
  remove.type = "button";
  remove.textContent = "Supprimer";
  divSettingsDelete.appendChild(remove);
}

// fonction pour modifier la quantité d'un produit du panier
function modifyQuantity(product, newQuantity) {
  produitLocalStorage.forEach((item) => {
    if (item.id === product._id) {
      item.quantity = newQuantity;
    }
  });
  localStorage.setItem("cart", JSON.stringify(produitLocalStorage));
  totalItems();
  priceTotal(product);
}

// fonction pour calculer la quantité totale du panier
function totalItems() {
  const totalQuantity = document.querySelector("#totalQuantity");
  totalQuantity.innerText = produitLocalStorage.reduce((acc, item) => {
    return acc + parseInt(item.quantity);
  }, 0);
}

// fonction pour calculer le prix total du panier
function priceTotal(product) {
  const totalPrice = document.querySelector("#totalPrice");
  totalPrice.innerText = produitLocalStorage.reduce((acc, item) => {
    return acc + parseInt(item.quantity) * product.price;
  }, 0);
}

// fonction pour supprimer un produit du panier
function removeProduct(product, produitLocalStorage) {
  const itemToRemove = produitLocalStorage.find(
    (item) => item.id === product._id && item.color === product.colors
  );
  produitLocalStorage.splice(itemToRemove, 1);
  localStorage.setItem("cart", JSON.stringify(produitLocalStorage));
  window.location.reload();
}
// appel des fonctions
browseLocalStorage();
totalItems();
checkCart();
