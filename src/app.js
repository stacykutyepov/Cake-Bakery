const catalogPreview = document.querySelector('.catalog-preview');
const catalogMenu = document.querySelector('.catalog-menu');
const otherPages = document.querySelector('.other-pages');
const ourCatalogText = document.querySelector('.intro-text');
const arrowNext = document.querySelector('.arrow-next');
const arrowPrevious = document.querySelector('.arrow-previous');
const currentPage = document.querySelector('.current-page');


let DATA = null;
let pageNum = 0;

const createCatalogPreview = ({ imageUrl }) => {
    const catalog = document.createElement("div");
    catalog.className = "catalog-image";
    catalog.style.backgroundImage = `url(${imageUrl})`;
    catalogPreview.insertAdjacentElement("beforeend", catalog)
};

const getData = async function (url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error is ${url}, status ${response.status}!`);
    }
    return await response.json();
};

const updateCatalogPreview = () => {
    for (let i in catalogPreview.children) {
        if (catalogPreview.children[i].className == 'catalog-image') {
            catalogPreview.children[i].style.display = "none";

        }
    }
}


const catalogFilter = (event) => {
    if (event.target.closest('.menu-item')) {

        const currentCatalog = event.toElement.innerText.toLowerCase();
        const currentCatalogItems = DATA.flat().filter(item => item.category.toLowerCase() == currentCatalog);
        updateCatalogPreview();
        console.log(currentCatalogItems)
        otherPages.textContent = "01";
        currentCatalogItems.forEach(item => { createCatalogPreview(item) });
    }
};

const uploadCatalog = (data, num) => {
    updateCatalogPreview();
    data[num].forEach(item => {
        createCatalogPreview(item);
    });
    otherPages.innerText = `0 ${data.length}`;
    currentPage.innerText = `0${num +1}/`;


    
};


const nextPage = (data) => {
    if (pageNum < data.length - 1) {
        return pageNum += 1;
    }else{
        return pageNum = 0;
    }
};

const prevPage = (data) => {
    if (pageNum <= data.length - 1 && pageNum != 0) {
        return pageNum -= 1;
    }else{
        return pageNum = data.length - 1;
    }
};

const init = () => {

    catalogMenu.addEventListener('click', catalogFilter);

    getData("./src/db/catalog.json")
        .then(function (data) {
            DATA = data;


            uploadCatalog(data, 0);
            ourCatalogText.addEventListener('click', function () { uploadCatalog(data, 0) });
            arrowNext.addEventListener('click', function () { uploadCatalog(data, nextPage(data)) });
            arrowPrevious.addEventListener('click', function () { uploadCatalog(data, prevPage(data)) });


        }
        );



}

init();

