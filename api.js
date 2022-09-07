const main = document.querySelector("main");

searchSubmit();

const paginationElements = document.querySelectorAll(".pag-element");
paginationElements.forEach(element=>{
    element.addEventListener("click",()=>{
        
    })
})


function createGallery(data) {

    const gallery = document.createElement("div");
    gallery.setAttribute("id", "gallery");
    main.appendChild(gallery);
    data.hits.forEach(element => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");

        const image = element.webformatURL;
        const likes = element.likes;
        const views = element.views;
        const downloads = element.downloads;
        const userName = element.user;
        const userImage = element.userImageURL;
        const tags = element.tags;

        card.innerHTML =
            `
    <div class="card-img" style="background-image:url(${image})"></div>
    <div class="card-details">
        <img src="${userImage}" alt="">
        <h4>By: ${userName}</h4>
        <div class="interaction">
            <ul>
                <li>
                    <p class="number">${likes}</p>
                    <p class="type">Likes</p>
                </li>
                <li>
                    <p class="number">${views}</p>
                    <p class="type">Views</p>
                </li>
                <li>
                    <p class="number">${downloads}</p>
                    <p class="type">Downloads</p>
                </li>
            </ul>

        </div>
    </div>
`;

        gallery.appendChild(card);

    })

}

function createPaginantion() {
    const pagination = document.createElement("div");
    pagination.setAttribute("id", "pagination");
    pagination.innerHTML =
        `
    <div id="pagination">
            <a href="" class="pag-element-words">Previous</a>
            <a href="" class="pag-element">1</a>
            <a href="" class="pag-element">2</a>
            <a href="" class="pag-element">3</a>
            <a href="" class="pag-element">4</a>
            <a href="" class="pag-element">5</a>
            <a href="" class="pag-element">6</a>
            <a href="" class="pag-element-words">Next</a>
        </div>
    `;

    main.appendChild(pagination);
}

function searchSubmit() {
    if (window.location.href.includes("search")) {
        let split1 = window.location.href.split("?")[1];
        let split2 = split1.split("&");
        search = split2[0].split("=")[1];
        categ = split2[1].split("=")[1];
        console.log(search, categorey);

        fetchApi(search, categ);
    }
    else
        fetchApi();
}
function hoverCard() {
    const card = document.querySelectorAll(".card");
    let cardImage;
    let cardDetails;
    card.forEach(element => {

        element.addEventListener("mouseover", function () {
            cardImage = element.children.item(0);
            cardDetails = element.children.item(1);
            effect(cardImage, cardDetails);
        });
        element.addEventListener("mouseout", function () {
            cardImage = element.children.item(0);
            cardDetails = element.children.item(1);
            effectOut(cardImage, cardDetails);

        });
    });

    function effect(cardImage, cardDetails) {
        cardDetails.classList.add("card-details-hover");
        cardImage.classList.add("card-img-hover");

    }

    function effectOut(cardImage, cardDetails) {
        cardDetails.classList.remove("card-details-hover");
        cardImage.classList.remove("card-img-hover");
    }
}

function fetchApi(search = "red", categorey = "science", page = 1) {
    fetch(`https://pixabay.com/api/?key=29705334-867bd7546cfa2f4ae7f65a682&page=${page}&per_page=9&q=${search}&category=${categorey}`)
        .then((response) => response.json())
        .then((data) => {
            createGallery(data);
            createPaginantion();
        }).then(hoverCard);
}