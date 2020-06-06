const catalogPreview = document.querySelector('.catalog-preview');
const catalogMenu = document.querySelector('.catalog-menu');
const otherPages = document.querySelector('.other-pages');
const ourCatalogText = document.querySelector('.intro-text');


let DATA = null;

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
        // console.log(currentCatalogItems);
        currentCatalogItems.forEach(item => { createCatalogPreview(item) });
    }
}


const init = () => {
    
    catalogMenu.addEventListener('click', catalogFilter);

    getData("./src/db/catalog.json")
        .then(function (data) {
            console.log(data);
            DATA = data;
            otherPages.innerText = `0 ${data.length}`

            data[0].forEach(item => {
                createCatalogPreview(item);
            });


        }
        );



}

init();

