const quizData = {
    // Thèmes spécifiques
    themes: {
        geographie: [
            {
                question: "Quel pays a pour capitale Luanda ?",
                options: ["Angola", "Mozambique", "Ouganda", "Zambie"],
                correct: 0,
                image: "images/geo_theme.png"
            },
            {
                question: "Quelle est la plus grande ville d'Amérique du sud en terme de superficie ?",
                options: ["Buenos Aires", "Rio de Janeiro", "São Paulo", "Brasília"],
                correct: 2,
                image: "images/geo_theme.png"
            },
            {
                question: "Quel pays est réputé pour la danse du tango ?",
                options: ["Espagne", "Brésil", "Argentine", "Mexique"],
                correct: 2,
                image: "images/geo_theme.png"
            },
            {
                question: "Quel pays est réputé pour la danse de la salsa ?",
                options: ["Cuba", "Argentine", "Colombie", "Espagne"],
                correct: 0,
                image: "images/geo_theme.png"
            },
            {
                type: "association",
                question: "Associe chaque capitale à son pays :",
                pairs: [
                    { a: "Dakar", b: "Sénégal" },
                    { a: "Abidjan", b: "Côte d'Ivoire" },
                    { a: "Bamako", b: "Mali" },
                    { a: "Conakry", b: "Guinée" }
                ],
                image: "images/geo_theme.png"
            }
        ],
        mathematiques: [
            {
                question: "Combien font 7 x 8 ?",
                options: ["54", "56", "64", "48"],
                correct: 1,
                image: "images/math_theme.png"
            },
            {
                question: "Quel est le résultat de 15 % de 200 ?",
                options: ["15", "25", "30", "45"],
                correct: 2,
                image: "images/math_theme.png"
            },
            {
                question: "Comment s'appelle un triangle avec trois côtés inégaux ?",
                options: ["Isocèle", "Équilatéral", "Scalène", "Rectangle"],
                correct: 2,
                image: "images/math_theme.png"
            }
        ],
        physique: [
            {
                question: "Quelle est la vitesse de la lumière (environ) ?",
                options: ["300 000 km/s", "150 000 km/s", "3 000 000 km/s", "30 000 km/s"],
                correct: 0,
                image: "images/physics_theme.png"
            },
            {
                question: "Quelle est la première femme à être allée dans l'espace ?",
                options: ["Sally Ride", "Valentina Tereshkova", "Mae Jemison", "Claudie Haigneré"],
                correct: 1,
                image: "images/physics_theme.png"
            },
            {
                question: "Quelle particule a une charge électrique négative ?",
                options: ["Proton", "Neutron", "Électron", "Positron"],
                correct: 2,
                image: "images/physics_theme.png"
            }
        ],
        francais: [
            {
                question: "Cette robe épouse parfaitement ta corpulence, elle te va comme...",
                options: ["Une merveille", "Un gant", "Un charme", "Une fleur"],
                correct: 1,
                image: "images/french_theme.png"
            },
            {
                question: "J'ai perdu ma carte SIM dans ce bazar, la chercher reviendrait à chercher une aiguille...",
                options: ["Dans le sable", "Sous le tapis", "Sur une botte de foin", "Dans l'océan"],
                correct: 2,
                image: "images/french_theme.png"
            },
            {
                question: "J'ai tellement faim que j'ai l'impression d'avoir l'estomac dans les...",
                options: ["Chaussettes", "Genoux", "Talons", "Poches"],
                correct: 2,
                image: "images/french_theme.png"
            },
            {
                question: "Que signifie le mot 'CALEMBREDAINE' ?",
                options: ["Une bêtise", "Un plat typique", "Une petite fleur", "Un vent froid"],
                correct: 0,
                image: "images/french_theme.png"
            },
            {
                type: "association",
                question: "Associe chaque expression à sa signification :",
                pairs: [
                    { a: "Poser un lapin", b: "Ne pas venir à un rdv" },
                    { a: "Avoir le cafard", b: "Être triste" },
                    { a: "Donner sa langue au chat", b: "Abandonner" },
                    { a: "Raconter des salades", b: "Mentir" }
                ],
                image: "images/french_theme.png"
            }
        ],
        culinaire: [
            {
                question: "Quel est l'ingrédient principal du guacamole ?",
                options: ["La tomate", "L'avocat", "L'oignon", "Le poivron"],
                correct: 1,
                image: "images/culinary_theme.png"
            },
            {
                question: "Quelle pâtisserie française est composée de pâte à choux et de crème pâtissière, souvent en forme de roue ?",
                options: ["Le Mille-feuille", "Le Paris-Brest", "L'Éclair", "Le Saint-Honoré"],
                correct: 1,
                image: "images/culinary_theme.png"
            },
            {
                question: "Dans quel pays est né le plat appelé 'Paella' ?",
                options: ["Portugal", "Mexique", "Espagne", "Italie"],
                correct: 2,
                image: "images/culinary_theme.png"
            },
            {
                question: "Quel fromage est utilisé traditionnellement pour une vraie pizza Margherita ?",
                options: ["Emmental", "Gorgonzola", "Mozzarella", "Parmesan"],
                correct: 2,
                image: "images/culinary_theme.png"
            }
        ],
        divers: [
            {
                question: "Qui a peint les nymphéas ?",
                options: ["Van Gogh", "Renoir", "Picasso", "Claude Monet"],
                correct: 3,
                image: ""
            },
            {
                question: "Quel acteur a joué James Bond dans Casino Royale ?",
                options: ["Pierce Brosnan", "Sean Connery", "Daniel Craig", "Roger Moore"],
                correct: 2,
                image: ""
            },
            {
                question: "Qui est le créateur de la marque Mercedes ?",
                options: ["Henry Ford", "Enzo Ferrari", "Karl Benz", "Ferdinand Porsche"],
                correct: 2,
                image: ""
            }
        ],
        informatique_python: [
            {
                question: "Que signifie 'print' en Python ?",
                options: ["Imprimer un document", "Afficher à l'écran", "Créer une variable", "Fermer le programme"],
                correct: 1,
                image: ""
            },
            {
                question: "Comment déclare-t-on une fonction en Python ?",
                options: ["function myFunc():", "def myFunc():", "create myFunc():", "func myFunc():"],
                correct: 1,
                image: ""
            },
            {
                question: "Quel type de boucle n'existe pas en Python ?",
                options: ["for", "while", "do...while", "Les trois existent"],
                correct: 2,
                image: ""
            },
            {
                type: "association",
                question: "Associe ces types de données Python :",
                pairs: [
                    { a: "Entier", b: "int" },
                    { a: "Chaîne de caractères", b: "str" },
                    { a: "Booléen", b: "bool" },
                    { a: "Liste", b: "list" }
                ],
                image: ""
            }
        ],
        informatique_c: [
            {
                question: "Qui a créé le langage C ?",
                options: ["Dennis Ritchie", "Ken Thompson", "Bjarne Stroustrup", "James Gosling"],
                correct: 0,
                image: ""
            },
            {
                question: "Quelle fonction est le point d'entrée d'un programme en C ?",
                options: ["start()", "init()", "main()", "run()"],
                correct: 2,
                image: ""
            },
            {
                question: "Comment allouer de la mémoire dynamiquement en C ?",
                options: ["alloc()", "malloc()", "new", "create()"],
                correct: 1,
                image: ""
            },
            {
                type: "association",
                question: "Associe ces concepts du langage C :",
                pairs: [
                    { a: "printf", b: "Affichage" },
                    { a: "scanf", b: "Saisie" },
                    { a: "*ptr", b: "Pointeur" },
                    { a: "&var", b: "Adresse" }
                ],
                image: ""
            }
        ]
    }
};
