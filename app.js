const card = document.querySelectorAll(".card");
let cardImage;
let cardDetails;

card.forEach(element => {
    cardImage = element.children.item(0);
    cardDetails = element.children.item(1);
    element.addEventListener("mouseover", effect);
    element.addEventListener("mouseout", effectOut);
});

function effect(element) {
    cardDetails.classList.add("card-details-hover");
    cardImage.classList.add("card-img-hover");
    console.log(cardDetails.classList);

}

function effectOut() {
    cardDetails.classList.remove("card-details-hover");
    cardImage.classList.remove("card-img-hover");
}
