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
        itemsPerPage = 4;
    }
    renderPage(cardsContainer, fullPetsList, currentPage, itemsPerPage);
}