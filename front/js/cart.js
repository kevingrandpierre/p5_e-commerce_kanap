// fonction pour récupérer les données de l'APi
async function getProductById(id) {
  const response = await fetch("http://localhost:3000/api/products/" + id);
  return await response.json();
}

// fonction pour récupérer les données contenues dans le localstorage
const productLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];

function browseLocalStorage() {
  productLocalStorage.forEach(async (item) => {
    const product = await getProductById(item.id);
    const totalPrice = product.price;
    for (const id in productLocalStorage) {
      if (productLocalStorage[id].id === product._id) {
        productLocalStorage[id].price = product.price;
      }
    }
    basketProduct(product, item.color, item.quantity);
    priceTotal(totalPrice);
  });
}
// fonction pour rafraichir la page
function updatePage() {
  const section = document.querySelector("#cart__items");
  section.innerHTML = "";
  browseLocalStorage();
  totalItems();
  priceTotal();
}
function checkCart() {
  // contrôle que le panier soit vide
  if (productLocalStorage.length === 0) {
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
  product.colors = color;
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
  input.addEventListener("change", () => modifyQuantity(product, input.value));
  divSettingsQuantity.appendChild(input);

  const divSettingsDelete = document.createElement("div");
  divSettingsDelete.classList.add("cart__item__content__settings__delete");
  divSettings.appendChild(divSettingsDelete);

  const remove = document.createElement("p");
  remove.classList.add("deleteItem");
  remove.type = "button";
  remove.textContent = "Supprimer";
  remove.addEventListener("click", () =>
    removeProduct(product, productLocalStorage)
  );
  divSettingsDelete.appendChild(remove);
}

// fonction pour vérifier que la quantité est bien comprise entre 1 et 100
function modifyQuantity(product, quantity) {
  if (quantity < 1) {
    alert("La quantité doit être supérieure à 0");
    quantity = 1;
  } else if (quantity > 100) {
    alert("La quantité doit être inférieure à 100");
    quantity = 100;
  }
  for (const id in productLocalStorage) {
    if (productLocalStorage[id].id === product._id) {
      productLocalStorage[id].quantity = quantity;
    }
  }
  localStorage.setItem("cart", JSON.stringify(productLocalStorage));
  updatePage();
}

// fonction pour calculer la quantité totale du panier
function totalItems() {
  const totalQuantity = document.querySelector("#totalQuantity");
  totalQuantity.innerText = productLocalStorage.reduce((acc, item) => {
    return acc + parseInt(item.quantity);
  }, 0);
}

// fonction pour calculer le prix total du panier
function priceTotal() {
  const totalPrice = document.querySelector("#totalPrice");
  totalPrice.innerText = productLocalStorage.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
}

// fonction pour supprimer un produit du panier
function removeProduct(product, productLocalStorage) {
  const itemToRemove = productLocalStorage.find(
    (item) => item.id === product._id && item.color === product.colors
  );
  productLocalStorage.splice(productLocalStorage.indexOf(itemToRemove), 1);
  localStorage.setItem("cart", JSON.stringify(productLocalStorage));
  checkCart();
  updatePage();
}

// appel des fonctions
browseLocalStorage();
totalItems();
checkCart();
/*******************************************************************************************************************************************************************************************
 * * * * * * * * * * * * * * * * * * * * *                                                                          * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * * * *                                       FORMULAIRE                           * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * *                                                                          * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *******************************************************************************************************************************************************************************************/

// fonction pour récupérer les données du formulaire
function getFormData() {
  return {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };
}

// fonction pour récupérer les produits du panier
function getProducts() {
  return productLocalStorage.map((item) => item.id);
}

// fonction pour envoyer les données du formulaire et les produits du panier au serveur
function sendOrder() {
  const contact = getFormData();
  const products = getProducts();
  const data = { contact, products };
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("order", JSON.stringify(data));
      window.location.href = "confirmation.html";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// regex pour vérifier le formulaire
function checkForm() {
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const regexName = /^[a-zA-ZÀ-ÿ]+([-'\s][a-zA-ZÀ-ÿ]+)*$/;
    const regexAddress = /^[a-zA-Z0-9À-ÿ\s]+$/;
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
    const firstName = document.querySelector("#firstName");
    if (regexName.test(firstName.value) === false) {
      alert("Veuillez entrer un prénom valide");
      return;
    }
    const lastName = document.querySelector("#lastName");
    if (regexName.test(lastName.value) === false) {
      alert("Veuillez entrer un nom valide");
      return;
    }
    const address = document.querySelector("#address");
    if (regexAddress.test(address.value) === false) {
      alert("Veuillez entrer une adresse valide");
      return;
    }
    const city = document.querySelector("#city");
    if (regexName.test(city.value) === false) {
      alert("Veuillez entrer une ville valide");
      return;
    }
    const email = document.querySelector("#email");
    if (regexEmail.test(email.value) === false) {
      alert("Veuillez entrer une adresse mail valide");
      return;
    }
    sendOrder();
  });
}

// appel de la fonction
checkForm();
