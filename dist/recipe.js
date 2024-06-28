"use strict";
const params = new URL(document.location.href).searchParams;
const recipeId = parseInt(params.get('id'));
const mainElement = document.querySelector('main');
const platesList = JSON.parse(localStorage.getItem('plates') || '[]');
const recipe = platesList.find((element) => element.id === recipeId);
const isLoggedIn = JSON.parse(sessionStorage.getItem('isConnected') || 'false');
// Je fais en sorte que les utilisateur non authentifié ne puissent pas accéder au détails des recettes
// J'ai enlevé cette fonctionnalité parce que quand on est pas connecté on peut rien faire...
// if (!isLoggedIn) {
//     window.location.href = 'connect.html'
// }
// else {
if (recipe === undefined) {
    mainElement.innerHTML = `
    <h1 class="font-bold text-4xl">Recette Introuvable<h1>
    <p>Vous allez être redirigé vers la page d'accueil</p>
    `;
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 3000);
}
else {
    mainElement.innerHTML = `
    <section class="flex flex-col gap-2">
                <h1 class="text-center text-3xl font-bold">${recipe.title}</h1>
                <div class="w-[90vw] max-w-[36rem] aspect-square bg-[url(${recipe.image})] bg-cover bg-center self-center">
                </div>
                
                <p>Categorie : <em class="underline">${recipe.category}</em></p>
            </section>
            <section class="flex flex-col gap-2">
                <p>Temps de préparation: ${recipe.time.preparation}</p>
                <p>Temps de cuisson : ${recipe.time.cooking}</p>
                <h2 class="text-xl font-bold">Ingredients</h2>
                <ul class='flex flex-col gap-2'>
                    ${recipe.ingredients.map((ingredient) => {
        return '<li>- ' + ingredient.name + ' : ' + ingredient.quantity + ingredient.mesure + '</li>';
    }).join('')}
</ul>
    <h2 class="text-xl font-bold"> Préparation </h2>
        <ul class='flex flex-col gap-2'>
        ${recipe.steps.map((step) => {
        return '<li>- ' + step + '</li>';
    }).join('')}
            </ul>
            </section>
            `;
}
// }
