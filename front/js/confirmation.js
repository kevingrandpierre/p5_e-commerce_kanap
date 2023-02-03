// fonction pour afficher l'id de la commande
function getIdOfConfirmation() {
  const idOfOrder = localStorage.getItem("order");
  const idOfOrderParsed = JSON.parse(idOfOrder);
  const idOfOrderParsedId = idOfOrderParsed.orderId;
  const idOfOrderParsedIdSpan = document.querySelector("#orderId");
  idOfOrderParsedIdSpan.textContent = idOfOrderParsedId;
  localStorage.clear();
  setTimeout(function () {
    window.location.href = "index.html";
  }, 30000);
}
getIdOfConfirmation();
