//////////////////////// Code fourni (ne pas modifier) ////////////////////////

// Définir la taille du tableau de notes au hasard entre 15 et 30 éléments
let taille_minimum = 7;
let taille_maximum = 10;
let taille =
  Math.floor(Math.random() * (taille_maximum - taille_minimum + 1)) +
  taille_minimum;

// Déclarer le tableau pour stocker les notes
let notes = [];
// Définir la note maximale (pas besoin de définir la note minimale car elle est 0 par défaut)
let note_maximum = 20;

// Itérer autant de fois qu'on a de notes aléatoires à générer
for (let i = 0; i < taille; i++) {
  // Générer une note aléatoire entre 0 et note_maximum (inclus)
  let note = Math.floor(Math.random() * (note_maximum + 1));
  // Ajouter la note générée au tableau
  notes.push(note);
}

///////////////////////////////////////////////////////////////////////////////

// PARTIE 1

// On défini un nouveau tableau pour limiter les effets de bords
let tabPart1 = [...notes];

// On défini le max et le min sur le premier terme
let maxValue = tabPart1[0];
let minValue = tabPart1[0];
// On parcours le tableau en entiers
for (let i = 0; i < tabPart1.length; i++) {
  // Si une valeur est plus grande que notre max alors ca devient notre max et on continue de bouclé
  if (tabPart1[i] > maxValue) {
    maxValue = tabPart1[i];
    // Si une valeur est plus petite que notre min alors ca devient notre min et on continue de bouclé
  } else if (tabPart1[i] < minValue) {
    minValue = tabPart1[i];
  }
}

// Affichage
console.log("La taille du tableau est la suivante : " + taille);
console.log("La valeur minimale du tableau est : " + minValue);
console.log("La valeur maximale du tableau est : " + maxValue);
console.log("Le tableau est le suivant : " + tabPart1);

// PARTIE 2

// On défini l'index
let indice = 0;
indice = notes.indexOf(minValue); // On utilise la méthode native JS des array pour retrouver l'index de la plus petite valeur qu'on a trouver plus haut
console.log(
  "La valeure minimale est : " + minValue + " et son index est : " + indice // On affiche la valeur minimale et on donne son index
);

// PARTIE 3

// Méthode pour échanger la plus petite valeur a la place de la première du tableau
[notes[0], notes[indice]] = [notes[indice], notes[0]];
console.log(notes);

// PARTIE 4 | 5 & BONUS 1 | 2

console.log("==========  Croissant ==========");
// On défini un nouveau tableau pour limiter les effets de bords
let tabCroissant = [...notes];
console.log("Le tableau de base est : " + notes);

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
    if (tabCroissant[i] < tabCroissant[minIndex]) {
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
  // On affiche le tableau a chaque changement
  console.log("Tableau pendant changement : " + tabCroissant);
  compt++; // On incrémente les tour de boucles
}

// On affiche
console.log("Le tableau une fois le tri croissant terminé : " + tabCroissant);
console.log("Nombre de changement en croissant : " + changes);
console.log("Nombre de vérifications en croissant : " + compt2);
console.log("Tour de boucle i en croissant : " + compt);
console.log("Tour de boucle j en croissant : " + compt2);
console.log("Total de tour de boucles en croissant : " + compt * compt2);

// BONUS 3
console.log("========== Décroissant ==========");
// On défini un nouveau tableau pour limiter les effets de bords
let tabDécroissant = [...notes];
console.log("Le tableau de base est : " + notes);

// On défini des compteur pour la boucle 1, la boucle 2 et le nombre de changement
let comptDec = 0;
let compt2Dec = 0;
let changesDec = 0;
// On parcourt le tableau jusqu'a l'avant dernier
for (let j = 0; j < tabDécroissant.length - 1; j++) {
  let minIndex = j; // L'index de la plus petite valeur est forcément la ou on recommence a chaque tour de boucle car avant = trié
  for (let i = j + 1; i < tabDécroissant.length; i++) {
    // On change juste le signe de la vérification de tout ca après c'est le meme fonctionnement
    if (tabDécroissant[i] > tabDécroissant[minIndex]) {
      minIndex = i;
      changesDec++;
    }
    compt2Dec++;
  }
  [tabDécroissant[j], tabDécroissant[minIndex]] = [
    tabDécroissant[minIndex],
    tabDécroissant[j],
  ];
  console.log("Tableau pendant changement : " + tabDécroissant);
  comptDec++;
}

console.log(
  "Le tableau une fois le tri décroissant terminé : " + tabDécroissant
);
console.log("Nombre de changement en décroisant : " + changesDec);
console.log("Nombre de vérifications en décroissant : " + compt2Dec);
console.log("Tour de boucle i en décroissant: " + comptDec);
console.log("Tour de boucle j en décroissant : " + compt2Dec);
console.log(
  "Total de tour de boucles en décroissant : " + comptDec * compt2Dec
);
