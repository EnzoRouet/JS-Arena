// Partie 1

// Pour faire le tableau. Script donné en tp2
let taille_minimum = 7;
let taille_maximum = 10;
let taille =
  Math.floor(Math.random() * (taille_maximum - taille_minimum + 1)) +
  taille_minimum;

// Stockage de prénom aléatoire
const names = [
  "Alex",
  "Noa",
  "Lucas",
  "Maël",
  "Théo",
  "Nathan",
  "Léo",
  "Jules",
  "Hugo",
  "Ethan",
  "Emma",
  "Lina",
  "Chloé",
  "Inès",
  "Léa",
  "Mila",
  "Zoé",
  "Sarah",
  "Camille",
  "Jade",
];

// On définit notre tab qui prendra nos objets
let classe = [];
// On boucle pour crée le nombre d'étudiants qu'on veut
for (let i = 0; i < taille; i++) {
  let indexName = Math.floor(Math.random() * names.length); // Pour récupérer l'index des prénoms en random
  let randomStudentName = names[indexName]; // On récupère le prénom qui équivaut

  // On définit notre étudiant qui sera redéfini pour chaque tour de boucle. On importe les notes en randomisant
  let student = {
    prenom: randomStudentName,
    notesFrancais: Math.floor(Math.random() * 20),
    notesMaths: Math.floor(Math.random() * 20),
    notesHistoire: Math.floor(Math.random() * 20),
    // Moyenne a 0 car incalculable dans la définition de student
    moyenne: 0,
  };

  // On calcule la moyenne de l'étudiant et lui attribut. On affiche après.
  moy = Math.round(
    (student.notesFrancais + student.notesHistoire + student.notesMaths) / 3
  );
  student.moyenne = moy;
  console.log(student.prenom + " - " + student.moyenne);
  classe.push(student);
}

// Partie 2

// On défini le max et le min sur le premier terme et l'index a 0
let min = classe[0].moyenne;
let max = classe[0].moyenne;
let indice = 0;

// On parcours le tableau en entiers grace a la taille
for (let i = 1; i < taille; i++) {
  // Si une valeur est plus petite que notre moyenne_min alors ca devient notre min, on prend l'index et on continue de bouclé
  if (min > classe[i].moyenne) {
    min = classe[i].moyenne;
    indice = i;
    // Si une valeur est plus grande que notre moyenne_max alors ca devient notre max et on continue de bouclé
  } else if (max < classe[i].moyenne) {
    max = classe[i].moyenne;
  }
}

// Affichage
console.log("Le nombre d'élève est : " + taille);
console.log("La plus petite moyenne est de : " + min);
console.log("La plus grande moyenne est de : " + max);

// Partie 3

// Affichage
console.log(
  `L'élève avec la pire moyenne s'appel : ${classe[indice].prenom}. Il a ${classe[indice].moyenne} de moyenne et se situe a l'index ${indice} du tableau`
);

// Partie 4
// Méthode pour échanger la plus petite valeur a la place de la première du tableau
[classe[0], classe[indice]] = [classe[indice], classe[0]];
console.log(classe[indice].prenom + " - " + classe[indice].moyenne);

// Partie 5
// On défini un nouveau tableau pour limiter les effets de bords
let tabCroissant = [...classe];

// On défini des compteur pour la boucle 1, la boucle 2 et le nombre de changement
let compt = 0;
let compt2 = 0;
let changes = 0;
// On parcourt le tableau jusqu'a l'avant dernier
for (let j = 0; j < tabCroissant.length - 1; j++) {
  let minIndex = j; // L'index de la plus petite valeur est forcément la ou on recommence a chaque tour de boucle car avant = trié
  // On parcourt le tableau a partir de celui devant la ou on commence pour ne pas avoir a repasser sur quelque chose de déjà vu et on limite la complexité
  for (let i = j + 1; i < tabCroissant.length; i++) {
    // On regarde si la valeur de la ou on est est plus petite que la valeur de j qui est normalement après le plus petit ou au premier
    if (tabCroissant[i].moyenne < tabCroissant[minIndex].moyenne) {
      minIndex = i; // On change l'index et on donne i si la valeur de i < a celle de j
      changes++; // On incrémente le compteur de changes
    }
    compt2++; // On incrémente le compteur de la boucle 2
  }
  // On échange l'ancien plus petit par le nouveau
  [tabCroissant[j], tabCroissant[minIndex]] = [
    tabCroissant[minIndex],
    tabCroissant[j],
  ];
  compt++; // On incrémente les tour de boucles
}

// Partie 6

console.log("Tableau avant tri");
for (let i = 0; i < taille; i++) {
  console.log(classe[i].prenom + " - " + classe[i].moyenne);
}
console.log("Tableau après tri croissant");
for (let i = 0; i < taille; i++) {
  console.log(tabCroissant[i].prenom + " - " + tabCroissant[i].moyenne);
}
console.log("Nombre de comparaison : " + compt2);
console.log("Nombre de changement : " + changes);

// Bonus

let tabMatière1 = [...classe];

// On défini des compteur pour la boucle 1, la boucle 2 et le nombre de changement
let comptMat1 = 0;
let compt2Mat1 = 0;
let changesMat1 = 0;
// On parcourt le tableau jusqu'a l'avant dernier
for (let j = 0; j < tabMatière1.length - 1; j++) {
  let minIndex = j; // L'index de la plus petite valeur est forcément la ou on recommence a chaque tour de boucle car avant = trié
  // On parcourt le tableau a partir de celui devant la ou on commence pour ne pas avoir a repasser sur quelque chose de déjà vu et on limite la complexité
  for (let i = j + 1; i < tabMatière1.length; i++) {
    // On regarde si la valeur de la ou on est est plus petite que la valeur de j qui est normalement après le plus petit ou au premier
    if (tabMatière1[i].notesFrancais < tabMatière1[minIndex].notesFrancais) {
      minIndex = i; // On change l'index et on donne i si la valeur de i < a celle de j
      changes++; // On incrémente le compteur de changes
    }
    compt2++; // On incrémente le compteur de la boucle 2
  }
  // On échange l'ancien plus petit par le nouveau
  [tabMatière1[j], tabMatière1[minIndex]] = [
    tabMatière1[minIndex],
    tabMatière1[j],
  ];
  compt++; // On incrémente les tour de boucles
}

// On affiche
console.log("Tableau avant tri en note de francais");
for (let i = 0; i < taille; i++) {
  console.log(classe[i].prenom + " - " + classe[i].notesFrancais);
}
console.log("Tableau après tri par matière en français");
for (let i = 0; i < taille; i++) {
  console.log(tabCroissant[i].prenom + " - " + tabCroissant[i].notesFrancais);
}
console.log("Nombre de comparaison : " + compt2);
console.log("Nombre de changement : " + changes);
