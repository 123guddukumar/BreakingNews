const API_KEY="7b5d8b31e37e4dafbd8655bc80b479a3";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load",() => fetchnews("India"));


function reload() {       //For Home Page......
    window.location.reload();
}

async function fetchnews(query){
    const res=await fetch(`${url}${query} &apikey=${API_KEY}`);
    const data=await res.json();
    // console.log(data);
    bindData(data.articles);
}

function bindData (articles) {
    const cardscontainer =document.getElementById("cards-container");
    const newsCardTemplate=document.getElementById("template-container")

    cardscontainer.innerHTML="";

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone=newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardscontainer.appendChild(cardClone);
    });
} 
function fillDataInCard(cardClone,article) {
    const newsImg=cardClone.querySelector("#news-img");
    const newsTitle=cardClone.querySelector("#news-title");
    const newsSource=cardClone.querySelector("#news-source");
    const newsDesc=cardClone.querySelector("#news-desc");

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;

    const date= new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/jakarta",
    });
    newsSource.innerHTML=`${article.source.name} .${date}`;


    // When Click the any news Then goto thise Page...Goto 

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url,"blank")
    });
}

//For Navigation Bar(ipl, fainance....)

let curSelectedNav=null;

function onNavItemClick(id){
    fetchnews(id);
    const navItem=document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav=navItem;
    curSelectedNav.classList.add("active");
}

const searchbutton=document.getElementById('search-button');
const searchText=document.getElementById('search-text')

searchbutton.addEventListener('click',()=>{
    const query=searchText.value;
    if(!query) return;
    fetchnews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=null;
});