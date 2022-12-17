function getProducts()
{
    fetch("http://127.0.0.1:3000/api/products")

        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (data) {
            console.table(data);
            product(data);
        })
        // Catch error
        .catch(function (err) {
            console.log(err);
        });
}
function product(data)
{
    let items = document.getElementById("items");
    for (let i in data)
    {

        let a = document.createElement("a");
        a.href = `./product.html?id=${data[i]._id}`;
        items.appendChild(a);


        let article = document.createElement("article");
        a.appendChild(article);


        let img = document.createElement("img");
        img.alt = data[i].altTxt;
        img.src = data[i].imageUrl;
        article.appendChild(img);


        let h3 = document.createElement("h3");
        h3.className = "name";
        h3.innerHTML = `${data[i].name}`;
        article.appendChild(h3);


        let p = document.createElement("p");
        p.className = "description";
        p.innerHTML = `${data[i].description}`;
        article.appendChild(p);
    }
}
getProducts()
