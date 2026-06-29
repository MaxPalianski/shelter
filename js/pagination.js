import { getPetsData } from "./api.js";
export function generatePets(petsData) {
    let bigPetsArray = [];
    for (let i = 0; i < 6; i++) {
        let snuffledGroup = [...petsData].sort(() => Math.random() - 0.5);
        bigPetsArray = bigPetsArray.concat(snuffledGroup);
    }
    return bigPetsArray;
}
function renderPage(cardsContainer, fullPetsList, currentPage, itemsPerPage) {
    let start = (currentPage - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let pagePets = fullPetsList.slice(start, end);
    cardsContainer.innerHTML = '';
    pagePets.forEach(pet => {
        cardsContainer.innerHTML += `
        <div class = "card">
        <img src="${pet.img}" alt="Pets ${pet.name}">
        <h3>${pet.name}</h3>
        <a href="#pets-info" class="promo-btn btn-secondary">Learn more</a>
        </div>
        `;
    });

    const pageNumberDisplay = document.querySelector('.pagination-current');
    if (pageNumberDisplay) pageNumberDisplay.innerText = currentPage;
    const btnDoubleLeft = document.querySelector('.pagination-double-left');
    const btnLeft = document.querySelector('.pagination-left');
    const btnRight = document.querySelector('.pagination-right');
    const btnDoubleRight = document.querySelector('.pagination-double-right');
    let maxPage = fullPetsList.length / itemsPerPage;
    if (currentPage === 1) {
        btnDoubleLeft.disabled = true;
        btnLeft.disabled = true;
    } else {
        btnDoubleLeft.disabled = false;
        btnLeft.disabled = false;
    }
    if (currentPage === maxPage) {
        btnRight.disabled = true;
        btnDoubleRight.disabled = true;
    } else {
        btnRight.disabled = false;
        btnDoubleRight.disabled = false;
    }



}
export async function initPagination() {
    let cardsContainer = document.querySelector('.pets-cards');
    if (!cardsContainer) return;
    const data = await getPetsData();
    const fullPetsList = generatePets(data);
    let currentPage = 1;
    let itemsPerPage = 8;
    let screenWidth = window.innerWidth;
    if (screenWidth >= 1280) {
        itemsPerPage = 8;
    } else if (screenWidth >= 768 && screenWidth <= 1279) {
        itemsPerPage = 6;
    } else {
        itemsPerPage = 3;
    }
    renderPage(cardsContainer, fullPetsList, currentPage, itemsPerPage);

    let maxPage = fullPetsList.length / itemsPerPage;
    function changePage(newPage) {
        cardsContainer.classList.add('fade');
        setTimeout(() => {
            currentPage = newPage;
            renderPage(cardsContainer, fullPetsList, currentPage, itemsPerPage);
            setTimeout(() => {
                cardsContainer.classList.remove('fade');
            }, 20);
        }, 300);
    }

    const btnRight = document.querySelector('.pagination-right');
    btnRight.addEventListener('click', () => {
        if (currentPage < maxPage) {
            changePage(currentPage + 1);
        }
    });
    const btnLeft = document.querySelector('.pagination-left');
    btnLeft.addEventListener('click', () => {
        if (currentPage > 1) {
            changePage(currentPage - 1);
        }
    });
    const btnDoubleLeft = document.querySelector('.pagination-double-left');
    btnDoubleLeft.addEventListener('click', () => {
        if (currentPage !== 1) {
            changePage(1);
        }
    });

    const btnDoubleRight = document.querySelector('.pagination-double-right');
    btnDoubleRight.addEventListener('click', () => {
        if (currentPage !== maxPage) {
            changePage(maxPage);
        }
    });
}