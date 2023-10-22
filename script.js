const accessKey = "xcXCTtzPA-3XwvWWM8XywxmX2yMzO_YmAA0fIQoW7Z0"

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const imageResults = document.querySelector(".results");
const showMore = document.getElementById("show-more-btn");

let inputData = ""
let page = 1;

async function searchImgaes(){
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`
    console.log(url)
    const response = await fetch(url);
    const data = await response.json();
    
    const dataResults = data.results;
    console.log(dataResults)
    if(page === 1 ){
        imageResults.innerHTML = ""
    }

    dataResults.map((result) => {
        const imagewrapper = document.createElement('div')
        imagewrapper.classList.add("resultImage")
        const image = document.createElement('img')
        image.src = result.urls.small 
        image.alt = result.alt_description

        const imageLink = document.createElement('a')
        imageLink.href = result.links.html 
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description

        imagewrapper.appendChild(image);
        imagewrapper.appendChild(imageLink)
        imageResults.appendChild(imagewrapper)
    });


    page++
    if(page > 1){
        showMore.style.display = "block"
    }
}

formEl.addEventListener("submit",(event) => {
    event.preventDefault();
    page = 1;
    searchImgaes();
})

showMore.addEventListener("click",(event) => {
    searchImgaes();
})