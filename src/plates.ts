// Si la liste des recette n'existe pas dans le localStorage, le crée et l'y enregistré
if (!localStorage.getItem('plates')) {
    const plates: Recipe[] = [
        {
            id: 1,
            title: "Choucroute",
            category: "Plat Principal",
            ingredients: [
                { name: "Sel", quantity: 100, mesure: 'g' },
                { name: "Poivre", quantity: 200, mesure: 'g' },
                { name: "Vin", quantity: 300, mesure: 'ml' },
            ],
            steps: [
                'Préchauffer le four',
                'Mettre le sel',
                'Mettre le poivre'
            ],
            time: {
                preparation: '00:10',
                cooking: '01:00'
            },
            image: 'https://assets.afcdn.com/recipe/20181017/82795_w600.jpg'
        },
        {
            id: 2,
            title: "Cassoulet",
            category: "Plat Principal",
            ingredients: [
                { name: "Haricot", quantity: 100, mesure: 'g' },
                { name: "Sauce", quantity: 200, mesure: 'g' },
            ],
            steps: [
                'Préchauffer le four',
                'Mettre le haricot',
                'Mettre le sauce'
            ],
            time: {
                preparation: '00:20',
                cooking: '02:00'
            },
            image: 'https://assets.afcdn.com/recipe/20130823/61472_w600.jpg'
        },
        {
            id: 3,
            title: "Fondant au chocolat",
            category: "Dessert",
            ingredients: [
                {
                    name: "Chocolat",
                    quantity: 100,
                    mesure: 'g'
                },
                {
                    name: "Beurre",
                    quantity: 50,
                    mesure: 'g'
                }
            ],
            steps: [
                "Faire fondre le beurre et le chocolat au micro-onde",
                "Mélanger le tout"
            ],
            time: {
                preparation: "00:30",
                cooking: "00:10"
            },
            image: "https://assets.afcdn.com/recipe/20220929/135540_w600.jpg"
        },
        {
            id: 4,
            title: "Bœuf Bourguignon",
            category: "Plat Principal",
            ingredients: [
                { name: "Bœuf", quantity: 500, mesure: 'g' },
                { name: "Oignon", quantity: 2, mesure: 'g' },
                { name: "Carottes", quantity: 3, mesure: 'g' },
                { name: "Vin rouge", quantity: 300, mesure: 'ml' },
            ],
            steps: [
                "Faites revenir l'oignon et les carottes",
                "Ajoutez le bœuf et le vin rouge",
                "Laissez mijoter pendant 2 heures",
            ],
            time: {
                preparation: "00:20",
                cooking: "02:00",
            },
            image: "https://assets.afcdn.com/recipe/20131009/56293_w600.jpg",
        },
        {
            id: 5,
            title: "Tarte aux Pommes",
            category: "Dessert",
            ingredients: [
                { name: "Pâte brisée", quantity: 1, mesure: "unité" },
                { name: "Pommes Golden", quantity: 4, mesure: "unité" },
                { name: "Sucre vanillé", quantity: 1, mesure: "unité" },
                { name: "Beurre", quantity: 50, mesure: "g" },
            ],
            steps: [
                "Éplucher et découper en morceaux 4 Golden.",
                "Faire une compote : les mettre dans une casserole avec un peu d'eau (1 verre ou 2). Bien remuer.",
                "Quand les pommes sont tendres, les écraser à la fourchette.",
                "Préchauffer le four à 180°C.",
                "Étaler la pâte brisée dans un moule à tarte.",
                "Verser la compote de pommes sur la pâte.",
                "Saupoudrer de sucre vanillé et disposer des petits morceaux de beurre sur le dessus.",
                "Enfourner pendant environ 30 à 35 minutes, jusqu'à ce que la tarte soit dorée.",
            ],
            time: {
                preparation: "00:20",
                cooking: "00:30",
            },
            image: "https://assets.afcdn.com/recipe/20230127/139908_w600.jpg",
        },
        {
            id: 6,
            title: "Crème Brûlée",
            category: "Dessert",
            ingredients: [
                { name: "Sucre", quantity: 200, mesure: "g" },
                { name: "Jaunes d'œuf", quantity: 6, mesure: "unité" },
                { name: "Crème liquide", quantity: 40, mesure: "cl" },
                { name: "Lait", quantity: 25, mesure: "cl" },
            ],
            steps: [
                "Préchauffez le four à 150°C.",
                "Mélangez les jaunes d'œufs avec le sucre jusqu'à obtenir un mélange homogène.",
                "Faites chauffer la crème liquide avec la vanille jusqu'à ce qu'elle soit bien chaude.",
                "Versez la crème chaude sur le mélange œufs-sucre en remuant doucement.",
                "Répartissez la préparation dans des ramequins.",
                "Enfournez au bain-marie pendant environ 40 minutes.",
                "Laissez refroidir, puis réfrigérez pendant quelques heures.",
                "Avant de servir, saupoudrez de sucre et caramélisez à l'aide d'un chalumeau de cuisine.",
            ],
            time: {
                preparation: "00:15",
                cooking: "00:40",
            },
            image: "https://assets.afcdn.com/recipe/20181120/83971_w1024h768c1cx2985cy1114cxt0cyt0cxb4999cyb3342.jpg",
        },
        {
            id: 7,
            title: "Carpaccio de Saint-Jacques et grenade",
            category: "Entrée",
            ingredients: [
                { name: "Saint-Jacques", quantity: 200, mesure: 'g' },
                { name: "Grenade", quantity: 1, mesure: 'unité' },
                // Ajoutez d'autres ingrédients
            ],
            steps: [
                "Tranchez finement les Saint-Jacques.",
                "Disposez-les sur une assiette.",
                "Parsemez de graines de grenade.",
                // Ajoutez d'autres étapes
            ],
            time: {
                preparation: "15 minutes",
                cooking: "0 minutes",
            },
            image: "https://assets.afcdn.com/recipe/20180829/82044_w600.jpg",
        },
        {
            id: 8,
            title: "Beignets de blettes",
            category: "Entrée",
            ingredients: [
                { name: "Blettes", quantity: 1, mesure: 'unité' },
                { name: "Farine", quantity: 100, mesure: 'g' },
                // Ajoutez d'autres ingrédients
            ],
            steps: [
                "Coupez les blettes en morceaux.",
                "Trempez-les dans la pâte à beignets.",
                "Faites frire jusqu'à ce qu'ils soient dorés.",
                // Ajoutez d'autres étapes
            ],
            time: {
                preparation: "20 minutes",
                cooking: "10 minutes",
            },
            image: "https://assets.afcdn.com/recipe/20220714/133515_w600.jpeg",
        },
        {
            id: 9,
            title: "Salade de pois chiches, feta et concombre",
            category: "Entrée",
            ingredients: [
                { name: "Pois chiches cuits", quantity: 400, mesure: 'g' },
                { name: "Feta", quantity: 150, mesure: 'g' },
                { name: "Concombre", quantity: 1, mesure: 'unité' },
                // Ajoutez d'autres ingrédients
            ],
            steps: [
                "Mélangez les pois chiches, la feta et le concombre coupé en dés.",
                "Assaisonnez avec de l'huile d'olive, du citron et des herbes.",
                // Ajoutez d'autres étapes
            ],
            time: {
                preparation: "10 minutes",
                cooking: "0 minutes",
            },
            image: "https://assets.afcdn.com/recipe/20200708/112594_w600.jpg",
        },
        {
            id: 10,
            title: "Verrine aux asperges et St Môret",
            category: "Apéritif",
            ingredients: [
                { name: "Asperges vertes", quantity: 200, mesure: 'g' },
                { name: "Fromage St Môret", quantity: 100, mesure: 'g' },
                // Ajoutez d'autres ingrédients
            ],
            steps: [
                "Faites cuire les asperges vertes et coupez-les en morceaux.",
                "Alternez les couches d'asperges et de St Môret dans des verrines.",
                // Ajoutez d'autres étapes
            ],
            time: {
                preparation: "10 minutes",
                cooking: "10 minutes",
            },
            image: "https://assets.afcdn.com/recipe/20130627/13306_w600.jpg",
        },
        {
            id: 11,
            title: "Feuilletés apéritifs au chorizo et au gruyère",
            category: "Apéritif",
            ingredients: [
                { name: "Pâte feuilletée", quantity: 1, mesure: 'unité' },
                { name: "Chorizo", quantity: 100, mesure: 'g' },
                { name: "Gruyère râpé", quantity: 50, mesure: 'g' },
                // Ajoutez d'autres ingrédients
            ],
            steps: [
                "Découpez la pâte feuilletée en rectangles.",
                "Déposez des tranches de chorizo et du gruyère râpé sur chaque rectangle.",
                "Enfournez jusqu'à ce que les feuilletés soient dorés.",
                // Ajoutez d'autres étapes
            ],
            time: {
                preparation: "20 minutes",
                cooking: "15 minutes",
            },
            image: "https://assets.afcdn.com/recipe/20140701/59374_w1024h768c1cx1771cy1180.jpg",
        }
    ];
    localStorage.setItem('plates', JSON.stringify(plates))
}