// PARTIE 1
const nameClass = "Pandi"; // Nom de la classe
let number = 28; // nombre d'élèves
let openClass = true; // classe ouverte ou non

// On affiche tout ça
console.log(nameClass);
console.log(number);
console.log(openClass);

// PARTIE 2
// On définit un nouvel élève :
const student = {
  name: "Enzo",
  maths: 17,
  french: 10,
};

// On affiche son nom
console.log(student.name);

// PARTIE 3

// On définit un nouvel élève :
const student2 = {
  name: "Kenzo",
  maths: 12,
  french: 8,
};

// On définit un nouvel élève :
const student3 = {
  name: "Antoine",
  maths: 0,
  french: 0,
};

// On définit un tableau avec les objets élèves
const tab = [student, student2, student3];

// On parcours le tableau entier et on donne le nom de chaque élève dedans
for (let i = 0; i < tab.length; i++) {
  console.log(tab[i].name);
}

// PARTIE 4
// On parcours tous le tableau et pour chaque élève on redéfinni sa moyenne et on l'affiche avec son prénom
for (let i = 0; i < tab.length; i++) {
  let moy = (tab[i].maths + tab[i].french) / 2;
  console.log("L'élève " + tab[i].name + " a " + moy + " de moyenne");
}

// PARTIE 5
// On parcours tous le tableau et pour chaque élève on redéfinni sa moyenne
for (let i = 0; i < tab.length; i++) {
  let moy = (tab[i].maths + tab[i].french) / 2;
  // Si la moyenne est au dessus ou égale à 10 on dit admis
  if (moy >= 10) {
    console.log(tab[i].name + " Admis");
  } else {
    console.log(tab[i].name + " Refusé");
  }
}

// PARTIE 6
// On parcours tous le tableau et pour chaque élève on redéfinni sa moyenne
for (let i = 0; i < tab.length; i++) {
  let moy = (tab[i].maths + tab[i].french) / 2;

  // On vérifie la valeur de la moyenne et on vérifie dans quelle mention on est
  if (moy >= 16) {
    console.log(tab[i].name + " Mention Très bien");
  } else if (moy >= 14) {
    console.log(tab[i].name + " Mention Bien");
  } else if (moy >= 12) {
    console.log(tab[i].name + " Mention Assez bien");
  } else if (moy >= 10) {
    console.log(tab[i].name + " Mention Passable");
  } else {
    console.log(tab[i].name + " Insuffisant");
  }
}

// PARTIE 7
let i = 0; // On définit une variable de passage pour le while
let compt = 0; // On donne le compt en global pour pouvoir le log après une fois le compteur fini
while (i < tab.length) {
  // On vérifie si chaque élève est au dessus de la moyenne pour voir s'il est admis
  if ((tab[i].maths + tab[i].french) / 2 >= 10) {
    compt++; // Si oui on incrémente le compt de 1
  }
  i++; // On avance i pour éviter une boucle infini et tout parcourir
}
console.log("Le nombre d'élève admis : " + compt + " sur " + tab.length);

// BONUS 1
let moy = 0; // On définit la variable en globale pour pouvoir la récupérer apres la fin de for pour pouvoir tester en globalité

// On parcours tout le tableau
for (let i = 0; i < tab.length; i++) {
  moy += (tab[i].maths + tab[i].french) / 2; // Pour chaque élève on ajoute la moyenne
}
console.log("La moyenne de la classe est de : " + Math.round(moy / tab.length));
// On affiche la moyenne en l'arrondissant a l'entier le plus proche pour éviter les 5.66666666666667 tout ca les trucs infini moches

// BONUS 2
// On définit un nouvel élève :
const student4 = {
  name: "Johan",
  maths: 15,
  french: 12,
};

tab.push(student4); // On l'ajoute avec la méthode native des array push
console.log("Le nombre d'élève est de : " + tab.length); // On affiche la taille du tableau qui contient les élèves ca donne le nombre d'élève

// BONUS 3
let y = 0;
let compter = 0;
while (y < tab.length) {
  // On vérifie si chaque élève est au dessus de la moyenne pour voir s'il est admis
  if ((tab[y].maths + tab[y].french) / 2 >= 10) {
    compter++; // Si oui on incrémente le compteur de 1
  }
  y++; // On avance y pour éviter une boucle infini et tout parcourir
}

// Si le nombre d'admis est égale au nombre d'élève on log le message voulu
if (compter === tab.length) {
  console.log("Félicitations !");
}
