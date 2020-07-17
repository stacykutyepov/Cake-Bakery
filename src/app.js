const catalogPreview = document.querySelector('.catalog-preview');
const catalogMenu = document.querySelector('.catalog-menu');
const otherPages = document.querySelector('.other-pages');
const ourCatalogText = document.querySelector('.intro-text');
const arrowNext = document.querySelector('.arrow-next');
const arrowPrevious = document.querySelector('.arrow-previous');
const currentPage = document.querySelector('.current-page');
const sendApplication = document.querySelector('.send');
const applicationForm = document.querySelector('.application-form');
const applicationText = document.querySelector('.application-text');
const emailInput = document.getElementById('user-email')
const wrongEmail = document.querySelector('.wrong-email');

let DATA = null;
let pageNum = 0;

const getData = async function (url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error is ${url}, status ${response.status}!`);
    }
    return await response.json();
};

const createCatalogPreview = ({ imageUrl }) => {
    const catalog = document.createElement("div");
    catalog.className = "catalog-image";
    catalog.style.backgroundImage = `url(${imageUrl})`;
    catalogPreview.insertAdjacentElement("beforeend", catalog)
};


const updateCatalogPreview = () => {
    for (let i in catalogPreview.children) {
        if (catalogPreview.children[i].className == 'catalog-image') {
            catalogPreview.children[i].style.display = "none";
        }
    }
};

const catalogFilter = (event) => {
    if (event.target.closest('.menu-item')) {
        const currentCatalog = event.target.innerText.toLowerCase();
        const currentCatalogItems = DATA.flat().filter(item => item.category.toLowerCase() == currentCatalog);
        updateCatalogPreview();
        currentPage.textContent = "01/";
        currentCatalogItems.forEach(item => { createCatalogPreview(item) });
    }
};

const uploadCatalog = (data, num) => {
    updateCatalogPreview();
    data[num].forEach(item => {
        createCatalogPreview(item);
    });
    otherPages.innerText = `0 ${data.length}`;
    currentPage.innerText = `0${num + 1}/`;
};

const nextPage = (data) => {
    if (pageNum < data.length - 1) {
        return pageNum += 1;
    } else {
        return pageNum = 0;
    }
};

const prevPage = (data) => {
    if (pageNum <= data.length - 1 && pageNum != 0) {
        return pageNum -= 1;
    } else {
        return pageNum = data.length - 1;
    }
};

const validEmail = (str) => {
    const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    return emailRegex.test(str);
};

const resetApplicationForm = () => {
    applicationText.style.color = "";
    document.getElementById('user-name').value = "";
    document.getElementById('user-surname').value = "";
    document.getElementById('user-phone').value = "";
    emailInput.value = "";
    applicationForm.style.display = "flex";
    wrongEmail.style.display = "none"
}

const succesfullySent = (event) => {
    event.preventDefault();
    if (validEmail(emailInput.value)) {
        applicationText.style.color = "#9f0311";
        applicationText.textContent = "Thank you! Your Application Has Been Sent Succesfully!";
        resetApplicationForm();
        setTimeout(() => {
            applicationText.textContent = "Application";

        }, 6000)
    } else {
        wrongEmail.style.display = "flex";
    }
}

const init = () => {
    catalogMenu.addEventListener('click', catalogFilter);
    sendApplication.addEventListener('click', succesfullySent);

    getData("./src/db/catalog.json")
        .then(function (data) {
            DATA = data;

            uploadCatalog(data, 0);

            ourCatalogText.addEventListener('click', function () { uploadCatalog(data, 0) });
            arrowNext.addEventListener('click', function () { uploadCatalog(data, nextPage(data)) });
            arrowPrevious.addEventListener('click', function () { uploadCatalog(data, prevPage(data)) });

        }
        );
};

const mySwiper = new Swiper('.swiper-container', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    speed: 900
});


init();

