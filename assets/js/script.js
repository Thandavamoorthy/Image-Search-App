const bars = document.getElementById("menu-btn");
const toggleClass = document.querySelector(".toggler");
const toggleBtnIcon = document.querySelector('.toggle-btn i')

bars.addEventListener("click",()=>{
     toggleClass.classList.toggle("toggle");
     const isOpen = toggleClass.classList.contains('toggle');

     toggleBtnIcon.classList = isOpen ? 'fa-solid fa-xmark menu-btn' : 'fa-solid fa-bars menu-btn'
})

const accessKey = "KwjW2lnHfLQKj1hgomPTWPwsmJQ5Z_3yshYjnt25QWA";

const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");

let inputData = "";
let page = 1;


async function searchImages(){
    inputData = searchInputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();
    if(page === 1){
        searchResultsEl.innerHTML = "";
    }

    const results = data.results

    results.map((result)=>{
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.urls.full;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResultsEl.appendChild(imageWrapper);
    });
    
    page++;

    if(page > 1){
        showMoreButtonEl.style.display = "block";
    }
}

formEl.addEventListener("submit", (e)=>{
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreButtonEl.addEventListener("click", ()=>{
    searchImages();
})

