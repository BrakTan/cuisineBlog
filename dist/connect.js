"use strict";
const connectBtn = document.getElementById('connectBtn');
const connectForm = document.getElementById('connectForm');
console.log(connectForm);
const emailElement = document.getElementById('email');
const passwordElement = document.getElementById('password');
const adminsList = JSON.parse(localStorage.getItem('admins') || '[]');
const connectError = (message) => {
    connectForm.reset();
    const errorMessage = document.createElement('p');
    errorMessage.innerText = message;
    errorMessage.classList.add('text-red-500', 'text-center');
    connectForm.appendChild(errorMessage);
    setTimeout(() => {
        errorMessage.remove();
    }, 2000);
};
connectBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const emailValue = emailElement.value;
    const passwordValue = passwordElement.value;
    const validValues = (emailValue !== '' && isNaN(parseInt(emailValue))) && (passwordValue !== '' && isNaN(parseInt(passwordValue)));
    if (!validValues) {
        connectError('Tout les champs doivent être rempli');
    }
    else {
        let adminExist = false;
        adminsList.forEach((element) => {
            if (element.email === emailValue && element.password === passwordValue) {
                adminExist = true;
                sessionStorage.setItem('isConnected', JSON.stringify(true));
                window.location.href = './index.html';
            }
        });
        if (!adminExist) {
            connectError('Les identifiants sont incorrectes');
        }
    }
});
