// fonction pour afficher l'id de la commande
function getIdOfConfirmation() {
  const idOfOrder = localStorage.getItem("order");
  console.log(localStorage.getItem("order"));
  const idOfOrderParsed = JSON.parse(idOfOrder);
  console.log(idOfOrderParsed);
  const idOfOrderParsedId = idOfOrderParsed.orderId;
  console.log(idOfOrderParsedId);
  const idOfOrderParsedIdSpan = document.querySelector("#orderId");
  idOfOrderParsedIdSpan.textContent = idOfOrderParsedId;
  localStorage.clear();
}
getIdOfConfirmation();
