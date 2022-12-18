
let params = new URLSearchParams(document.location.search);
let id = params.get("id");
console.log(id)


// fonction fetch pour obtenir les données de l'API
function getProducts()
{
    fetch("http://localhost:3000/api/products/" + id)
        .then(function(res) {
            if (res.ok) {
                return res.json()
            }
        })
        .then((res) => {
            return pageProduct(res);
        })
        .catch((error) => console.log(error))
}

function pageProduct(product)
{
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
function addToCart(product)
{
  const button = document.querySelector("#addToCart")
    button.addEventListener("click", (event) => {
        const color = document.querySelector("#colors").value
        const quantity = document.querySelector("#quantity").value
        if (color == '') {
            alert("Veuillez sélectionner une couleur")
            return
        } else if (quantity == 0) {
            alert("Veuillez sélectionner une quantité")
            return
        } else {
            //redirection vers le pannier
            if(confirm("Voulez-vous consulter votre panier ?")) {
                window.location.href = "cart.html";
            } else {
                // si cancel, on reste sur la page
                return
            }
        }
        const product = {
            id,
            color,
            quantity
        }
        localStorage.setItem(id, JSON.stringify(product))
    })
}



getProducts();
addToCart();