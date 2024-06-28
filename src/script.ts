// Liste des Admins, que j'enregistre dans le localStorage si elle n'existe pas
if (!localStorage.getItem('admins')) {
    const admins: Array<{ email: string; password: string }> = [
        { email: "admin1", password: "azerty" },
        { email: "admin2", password: "azerty" },
        { email: 'admin3', password: 'qwerty' }
    ];
    localStorage.setItem("admins", JSON.stringify(admins));
}

// Je vérifie sur l'utilisateur est connecté
const isConnected: boolean = JSON.parse(sessionStorage.getItem('isConnected') || 'false')

// Je récupére les element du DOM dont j'ai besoin
const connectLink: HTMLLinkElement = document.getElementById('connectLink') as HTMLLinkElement

const searchRecipes: HTMLInputElement = document.getElementById('searchRecipes') as HTMLInputElement

const searchRecipesBtn: HTMLButtonElement = document.getElementById('searchRecipesBtn') as HTMLButtonElement

const categoryFilter: HTMLSelectElement = document.getElementById('categoryFilter') as HTMLSelectElement

const recipeList: HTMLElement = document.getElementById('recipeList') as HTMLElement

const addRecipeForm: HTMLFormElement = document.getElementById('addRecipeForm') as HTMLFormElement

const addRecipeLink: HTMLElement = document.getElementById('addRecipeLink') as HTMLElement

const newTitle: HTMLInputElement = document.getElementById(
    "newTitle"
) as HTMLInputElement;

const recipeCategory: HTMLInputElement = document.getElementById(
    "recipeCategory"
) as HTMLInputElement;

const ingredientName: HTMLInputElement = document.getElementById(
    "ingredientName"
) as HTMLInputElement;

const quantityOfIngredient: HTMLInputElement = document.getElementById(
    "quantityOfIngredient"
) as HTMLInputElement;

const mesureOfIngredient: HTMLSelectElement = document.getElementById('mesure') as HTMLSelectElement

const addIngredient: HTMLButtonElement = document.getElementById(
    "addIngredient"
) as HTMLButtonElement;

const newStepDescription: HTMLTextAreaElement = document.getElementById(
    "newStepDescription"
) as HTMLTextAreaElement;

const addStepBtn: HTMLButtonElement = document.getElementById(
    "addStepBtn"
) as HTMLButtonElement;

const preparationTime: HTMLInputElement = document.getElementById(
    "preparationTime"
) as HTMLInputElement;

const cookingTime: HTMLInputElement = document.getElementById(
    "cookingTime"
) as HTMLInputElement;

const recipePicture: HTMLInputElement = document.getElementById(
    "recipePicture"
) as HTMLInputElement;

const addRecipeBtn: HTMLButtonElement = document.getElementById(
    "addRecipeBtn"
) as HTMLButtonElement;

const listOfStep: HTMLElement = document.getElementById("listOfStep") as HTMLElement;
const listOfIngredient: HTMLElement = document.getElementById("listOfIngredient") as HTMLElement;

// Déclarartion des types perso
type Ingredient = {
    name: string;
    quantity: number,
    mesure: string
}

type Recipe = {
    id: number,
    title: string;
    category: string;
    ingredients: Ingredient[];
    steps: string[];
    time: { preparation: string; cooking: string };
    image: string;
}

if (isConnected) {
    addRecipeLink.classList.remove('hidden')
    connectLink.innerHTML = '<span class="hidden md:inline">Deconnexion</span><i class="fa-solid fa-right-from-bracket md:hidden" ></i>'
    // Si l'utilisateur est déjà connecté, le boutons sert alors à se déconnecter
    connectLink.addEventListener('click', (event): void => {
        event.preventDefault()
        sessionStorage.removeItem('isConnected')
        document.location.href = document.location.href
    })
}

// Fonction qui récupère la liste des recette du localStorage
const getPlates = (): Recipe[] => JSON.parse(localStorage.getItem('plates') || '[]')

let plates = getPlates()

// Variable pour garder l'id, necessaire pour la modif dans le form
let currentId: number | undefined = undefined

// Fonction qui crée un li pour l'affichage 'simple' d'une recette et l'ajoute à la liste dans le DOM
const displayRecipe = (recipe: Recipe): void => {
    const newRecipeElement: HTMLElement = document.createElement('li')
    newRecipeElement.classList.add('flex', 'items-center', 'gap-2', 'border', 'rounded', 'cursor-pointer', 'hover:border-teal-600', 'active:border-teal-300')
    newRecipeElement.innerHTML = `
    <div
        class="bg-[url(${recipe.image})] bg-cover bg-center w-20 h-28 rounded">
    </div>
    <section class='smallInfo'>
        <p class="font-bold text-xl">${recipe.title}</p>
        <p>
            Temps de préparation : ${recipe.time.preparation} | Temps de cuisson:
            ${recipe.time.cooking}
        </p>
    </section>
    `

    // Je vérifie que l'utilisateur est connecté
    if (isConnected) {
        // Création des buttons pour modifier et supprimer, avec les eventlistener associés
        const smallInfo: HTMLElement = newRecipeElement.querySelector('section.smallInfo') as HTMLElement
        const modifiateBtn: HTMLButtonElement = document.createElement('button') as HTMLButtonElement
        modifiateBtn.classList.add('bg-blue-500', 'text-white', 'px-2', 'rounded', 'mr-1', 'mb-1')
        modifiateBtn.innerText = 'Modifier'
        smallInfo.insertAdjacentElement('beforeend', modifiateBtn)
        modifiateBtn.addEventListener('click', (event): void => {
            event.preventDefault()
            event.stopPropagation()
            displayRecipeForm()
            addRecipeBtn.innerText = 'Modifier la recette'
            currentId = recipe.id
            newTitle.value = recipe.title
            recipeCategory.value = recipe.category
            ingredientList = JSON.parse(JSON.stringify(recipe.ingredients))
            stepsList = JSON.parse(JSON.stringify(recipe.steps))
            console.log(recipe.ingredients)
            console.log(ingredientList)
            ingredientList.forEach((ingredient: Ingredient): void => {
                displayIngredient(ingredient)
            })
            stepsList.forEach((step: string): void => {
                displayStep(step)
            })
            preparationTime.value = recipe.time.preparation
            cookingTime.value = recipe.time.cooking
            recipePicture.value = recipe.image
        })

        const removeBtn: HTMLButtonElement = document.createElement('button') as HTMLButtonElement
        removeBtn.classList.add('bg-red-500', 'text-white', 'px-2', 'rounded')
        removeBtn.innerText = 'Supprimer'
        smallInfo.insertAdjacentElement('beforeend', removeBtn)
        removeBtn.addEventListener('click', (event): void => {
            event.preventDefault()
            event.stopPropagation()
            // Je fais en sorte que l'utilisateur doivent cliquer 2x pour supprimer une recette
            if (removeBtn.innerText === 'Supprimer') {
                removeBtn.innerText = 'Vraiment supprimer ?'
                setTimeout((): void => {
                    removeBtn.innerText = 'Supprimer'
                }, 2000)
            }
            else if (removeBtn.innerText === 'Vraiment supprimer ?') {
                const recipeToRemove = plates.indexOf(recipe)
                plates.splice(recipeToRemove, 1)
                console.log(plates)
                localStorage.setItem('plates', JSON.stringify(plates))
                plates = JSON.parse(localStorage.getItem('plates') || '[]')
                newRecipeElement.remove()
            }

        })
    }

    newRecipeElement.addEventListener('click', (): void => {
        window.location.href = 'recipe.html' + `?id=${recipe.id}`
    })
    recipeList.appendChild(newRecipeElement)
}
const updateRecipeList = (recipesArray: Recipe[]): void => {
    recipeList.innerText = ''
    recipesArray.forEach((recipe) => displayRecipe(recipe))
}

// J'affiche toute les recette déjà enregistré à l'arrivée sur la page
updateRecipeList(plates)

const displayRecipeForm = (): void => {
    addRecipeForm.reset()
    ingredientList = []
    stepsList = []
    listOfIngredient.innerText = ''
    listOfStep.innerText = ''
    addRecipeForm.classList.toggle('hidden')
    recipeList.classList.toggle('hidden')
    addRecipeLink.innerText = addRecipeLink.innerText === 'Ajouter une recette' ? 'Retour à la liste des recette' : 'Ajouter une recette'
}

// Je verifie si l'utilisateur est authentifié afin d'afficher le formulaire d'ajout 
// de recette, sinon je le redirige sur la page de connexion
addRecipeLink.addEventListener('click', (event) => {
    event.preventDefault()
    if (!isConnected) {
        window.location.href = 'connect.html'
    }
    else {
        displayRecipeForm()
        addRecipeBtn.innerText = 'Ajouter la recette'
    }
})

// Fonction qui affiche un message d'erreur sous le formulaire d'ajout, le paramètre est le contenu du msg
const recipeError = (errorMsg: string, id: string): void => {
    if (!document.getElementById(id)) {
        const error: HTMLElement = document.createElement('p');
        error.id = id
        error.classList.add('text-center', 'text-red-500')
        error.innerText = errorMsg
        addRecipeForm.insertAdjacentElement('afterend', error)
        setTimeout(() => {
            error.remove()
        }, 2000)
    }
}

// Je crée deux listes qui correspondent au listes d'ingredient et d'étapes
let ingredientList: Ingredient[] = []
let stepsList: string[] = []

// Je verifie que les listes ne sont pas vide grace à cette fonction
const checkEmptyList = (list: { name: string; quantity: number }[] | string[]): boolean => {
    return list.length > 0
}

const displayIngredient = (ingredient: Ingredient): void => {
    const newLine: HTMLElement = document.createElement('li')
    newLine.innerText = `- ${ingredient.name} : ${ingredient.quantity}${ingredient.mesure} `
    const removeIngredient: HTMLElement = document.createElement('i') as HTMLElement
    removeIngredient.classList.add('fa-solid', 'fa-xmark')
    removeIngredient.addEventListener('click', (): void => {
        newLine.remove()
        const ingredientToRemove = ingredientList.indexOf(ingredient)
        console.log(ingredientToRemove)
        ingredientList.splice(ingredientToRemove, 1)
        console.log(ingredientList)
    })
    newLine.insertAdjacentElement('beforeend', removeIngredient)
    listOfIngredient.appendChild(newLine)
}

const displayStep = (step: string): void => {
    const newLine: HTMLElement = document.createElement('li')
    newLine.innerText = '- ' + step + ' '
    const removeStep: HTMLElement = document.createElement('i') as HTMLElement
    removeStep.classList.add('fa-solid', 'fa-xmark')
    removeStep.addEventListener('click', () => {
        newLine.remove()
        const stepToRemove = stepsList.indexOf(step)
        console.log(stepToRemove)
        stepsList.splice(stepToRemove, 1)
        console.log(stepsList)
    })
    newLine.insertAdjacentElement('beforeend', removeStep)
    listOfStep.appendChild(newLine)
}

// J'ajoute un nouvel ingredient à la liste ingredientList 
addIngredient.addEventListener('click', (event) => {
    event.preventDefault()
    const validValues: boolean = ingredientName.value.trim() !== '' && parseInt(quantityOfIngredient.value) > 0
    // Je vérifie que le champs n'est pas vide, si il l'est j'affiche un msg
    if (!validValues) {
        recipeError('Vous devez remplir les champs des ingrédients', 'emptyIngredient')
    }
    // Si tout est bon je l'ajoute à la liste au même format que les elements de liste du localStorage
    else {
        const newIngredient: Ingredient = {
            name: ingredientName.value.trim(),
            quantity: parseInt(quantityOfIngredient.value),
            mesure: mesureOfIngredient.value.trim()
        }
        ingredientList.push(newIngredient)
        displayIngredient(newIngredient)
        ingredientName.value = ''
        quantityOfIngredient.value = '0'
    }
})

// Même chose que pour les ingrédient mais avec les étapes de préparation
addStepBtn.addEventListener('click', (event) => {
    event.preventDefault()
    const validValues: boolean = newStepDescription.value.trim() !== ''
    console.log(validValues)
    if (!validValues) {
        recipeError('Vous devez remplir le champ de description des étapes', 'emptyStep')
    }
    else {
        const newStep: string = newStepDescription.value.trim()
        stepsList.push(newStep)
        displayStep(newStepDescription.value)
        newStepDescription.value = ''
    }
})

// J'ajoute la recette à la liste du localStorage, et je l'affiche dans le DOM à la suite des autres recettes
addRecipeBtn.addEventListener('click', (event) => {
    event.preventDefault()
    const isValid: boolean = newTitle.value.trim() !== '' && recipeCategory.value !== '' && cookingTime.value !== '' && (preparationTime.value !== '' && preparationTime.value !== '00:00') && recipePicture.value.trim() !== ''
    // Je verifie que les listes ne sont pas vide
    if (!checkEmptyList(ingredientList)) {
        recipeError('Vous devez renseigner des ingrédients', 'emptyIngredients')
    }
    if (!checkEmptyList(stepsList)) {
        recipeError('Vous devez renseigner des étapes de préparation', 'emptySteps')
    }
    // Je verifie que les champs sont bien tous rempli
    if (!isValid) {
        recipeError('Vous devez renseigner tous les champs', 'emptyValues')
    }
    // Je reverifie que l'utilisateur est connecté avant de valider le form
    if (!isConnected) {
        window.location.href = 'connect.html'
    }
    // Si tout vas bien, je crée un nouvel objet recette avec les bonnes propriétés et je l'ajoute.
    if (isValid && checkEmptyList(ingredientList) && checkEmptyList(stepsList) && isConnected) {
        if (currentId) {
            const recipeToModif: Recipe | undefined = plates.find((recipe: Recipe) => recipe.id === currentId)
            if (recipeToModif) {
                recipeToModif.title = newTitle.value.trim()
                recipeToModif.category = recipeCategory.value
                recipeToModif.ingredients = ingredientList
                recipeToModif.steps = stepsList
                recipeToModif.time.cooking = cookingTime.value
                recipeToModif.time.preparation = preparationTime.value
                recipeToModif.image = recipePicture.value.trim()
            }
            currentId = undefined
            recipeList.innerText = ''
        }
        else {
            const lastId: number = plates[plates.length - 1].id
            const newRecipe: Recipe = {
                id: lastId + 1,
                title: newTitle.value.trim(),
                category: recipeCategory.value,
                ingredients: ingredientList,
                steps: stepsList,
                time: { preparation: preparationTime.value, cooking: cookingTime.value },
                image: recipePicture.value.trim()
            }
            plates.push(newRecipe)
        }
        localStorage.setItem('plates', JSON.stringify(plates))
        displayFilteredList()
        // Je vide le formulaire
        addRecipeForm.reset()
        stepsList = []
        ingredientList = []
        listOfIngredient.innerText = ''
        listOfStep.innerText = ''
        // Je cache le formulaire et j'affiche les recettes
        addRecipeForm.classList.add('hidden')
        recipeList.classList.remove('hidden')
        addRecipeLink.innerText = 'Ajouter une recette'
    }
})

const getFilteredList = (): Recipe[] => {
    const currentCategory = categoryFilter.value
    if (currentCategory === 'Toutes') {
        return plates
    }
    return plates.filter((recipe: Recipe) => recipe.category === currentCategory)
}

const displayFilteredList = (): void => {
    const searchedValue = searchRecipes.value.trim()
    const filteredSearchList = getFilteredList()
    if (searchedValue === '') {
        updateRecipeList(filteredSearchList)
    }
    else {
        const searchedList = filteredSearchList.filter((recipe: Recipe) => recipe.title.toLowerCase().includes(searchedValue.toLowerCase()))
        updateRecipeList(searchedList)
    }
}

categoryFilter.addEventListener('change', (event): void => {
    displayFilteredList()
})

searchRecipesBtn.addEventListener('click', (): void => {
    displayFilteredList()
})