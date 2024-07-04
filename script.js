const apiKey = "b3Ph6vCGTGy3hSC12RxMbaQf1ZHkPJVclYWCIfFlfJ0";

const search = document.getElementById("search-input");
const formMek = document.querySelector("form");
const inputMek = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");

const showMore = document.getElementById(".show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputMek.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`;
  
  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }
  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    image.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });

  page++
  if (page > 1) {
    showMore.style.display = "block";
  }
}

formMek.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMore.addEventListener("click", ()=>{
  searchImages();
});
