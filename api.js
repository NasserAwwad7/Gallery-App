const main = document.querySelector("main");
const gallery = document.getElementById("gallery");
let session = window.localStorage;
if (session.getItem("page") === null){
    session.setItem("page", "1");
}

searchSubmit();







function createGallery(data) {


    gallery.innerHTML="";
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
            <p class="pag-element-words">Previous</p>
            <p class="pag-element">1</p>
            <p class="pag-element">2</p>
            <p class="pag-element">3</p>
            <p class="pag-element">4</p>
            <p class="pag-element">5</p>
            <p class="pag-element">6</p>
            <p class="pag-element-words">Next</p>
        </div>
    `;

    main.appendChild(pagination);

    const paginationElements = document.querySelectorAll(".pag-element");
    console.log(paginationElements);
    paginationElements.forEach(element=>{
        element.addEventListener("click",()=>{
            const pageNumber = element.innerHTML;
            const pagination = document.getElementById("pagination");
            pagination.remove();
            session.setItem("page", pageNumber);
            gallery.innerHTML="<img src='assets/images/loading.gif' id='loading'></img>";
            searchSubmit(pageNumber);
    
        })
    });
}

function searchSubmit() {
    if (window.location.href.includes("search")) {
        let split1 = window.location.href.split("?")[1];
        let split2 = split1.split("&");
        search = split2[0].split("=")[1];
        categ = split2[1].split("=")[1];
        fetchApi(search, categ);
    }
    else{
        fetchApi();
    }

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

function fetchApi(search = "red", categorey = "science", page = session.getItem("page")) {
    gallery.innerHTML="<img src='assets/images/loading.gif' id='loading'></img>";
    fetch(`https://pixabay.com/api/?key=29705334-867bd7546cfa2f4ae7f65a682&page=${page}&per_page=9&q=${search}&category=${categorey}`)
        .then((response) => response.json())
        .then((data) => {
            createGallery(data);
            createPaginantion();
        }).then(hoverCard);
}


