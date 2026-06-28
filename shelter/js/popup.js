import { getPetsData } from './api.js';
export async function initPopup() {
    const petsData = await getPetsData();
    console.log(petsData);

    const popup = document.querySelector('.popup');
    const cards = document.querySelectorAll('.card');
    const popupImg = document.querySelector('.popup-img');
    const popupInfo = document.querySelector('.popup-info');
    const popup_close = document.querySelector('.popup-close');
    const overlay = document.querySelector('.overlay');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const petName = card.querySelector('h3').textContent;
            console.log('Кликнули на:', petName);

            const petInfo = petsData.find(pet => pet.name === petName);
            console.log('Данные питомца:', petInfo);

            const petImgName = petInfo.name.toLowerCase();
            popupImg.innerHTML = `<img src="${petInfo.img}" alt="${petInfo.name}">`;
            popupInfo.innerHTML = `
            <h2>${petInfo.name}</h2>
            <h3>${petInfo.type} - ${petInfo.breed}</h3>
            <p>${petInfo.description}</p>
            <ul>
                <li><strong>Age:</strong> ${petInfo.age}</li>
                <li><strong>Inoculations:</strong> ${petInfo.inoculations.join(', ')}</li>
                <li><strong>Diseases:</strong> ${petInfo.diseases.join(', ')}</li>
                <li><strong>Parasites:</strong> ${petInfo.parasites.join(', ')}</li>
            </ul>`;

            popup.classList.add('open');
            overlay.classList.add('open');
            document.body.classList.add('no-scroll');
        });
    });
    popup_close.addEventListener('click', () => {
        popup.classList.remove('open');
        overlay.classList.remove('open');
        document.body.classList.remove('no-scroll');
    });
    overlay.addEventListener('click', () => {
        popup.classList.remove('open');
        overlay.classList.remove('open');
        document.body.classList.remove('no-scroll');
    });
}
