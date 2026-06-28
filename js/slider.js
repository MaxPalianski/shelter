import { getPetsData } from "./api.js";

export async function initSlider() {
    const allPets = await getPetsData();
    const cardsContainer = document.querySelector('.slider-cards');
    const btnLeft = document.querySelector('.arrow-left');
    const btnRight = document.querySelector('.arrow-right');
    if(!cardsContainer) return;
    let currentGroup = [];
    let isAnimating = false;
    const groupSize = getGroupSize();
    currentGroup = [...allPets].sort(() => Math.random() - 0.5).slice(0, groupSize);
    renderSliderGroup(cardsContainer, currentGroup);

    function getGroupSize() {
        const width = window.innerWidth;
        if(width >= 1280) return 3;
        if (width >= 768) return 2;
        return 1;
    }

    function renderSliderGroup(container, group) {
        container.innerHTML = group.map(pet => `
            <div class="card">
            <img src="${pet.img}" alt="Pets ${pet.name}">
            <h3>${pet.name}</h3>
            <a href="#pets-info" class="promo-btn btn-secondary">Learn more</a>
            </div>
            `).join('');
    }

    btnRight.addEventListener('click', () => {
        if(isAnimating) return;
        isAnimating = true;
        const groupSize = getGroupSize();
        const currentNames = currentGroup.map(pet => pet.name);
        let availablePets = allPets.filter(pet => !currentNames.includes(pet.name));
        let nextGroup = availablePets.sort(() => Math.random() - 0.5).slice(0, groupSize);
        cardsContainer.classList.add('transition-right');
        setTimeout(() => {
            renderSliderGroup(cardsContainer, nextGroup);
            cardsContainer.classList.remove('transition-right');
            currentGroup = nextGroup;
            isAnimating = false;
        }, 500);
    });

    btnLeft.addEventListener('click', () => {
        if(isAnimating) return;
        isAnimating = true;
        const groupSize = getGroupSize();
        const currentNames = currentGroup.map(pet => pet.name);
        let availablePets = allPets.filter(pet => !currentNames.includes(pet.name));
        let nextGroup = availablePets.sort(() => Math.random() - 0.5).slice(0, groupSize);
        cardsContainer.classList.add('transition-left');
        setTimeout(() => {
            renderSliderGroup(cardsContainer, nextGroup);
            cardsContainer.classList.remove('transition-left');
            currentGroup = nextGroup;
            isAnimating = false;
        }, 500);
    });

    window.addEventListener('resize', () => {
        const groupSize = getGroupSize();
        if (currentGroup.length !== groupSize) {
            currentGroup = [...allPets].sort(() => Math.random() - 0.5).slice(0, groupSize);
            renderSliderGroup(cardsContainer, currentGroup);
        }
    });
}