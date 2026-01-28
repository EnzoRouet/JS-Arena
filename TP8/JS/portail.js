const skinsContainer = document.getElementById("skins-container");
const totalSkins = 29;
const btn = document.getElementById("btn-submit");
const inputs = document.querySelectorAll(".input-text");
const form = document.getElementById("form");

for (let i = 1; i <= totalSkins; i++) {
  const optionDiv = document.createElement("div");
  optionDiv.classList.add("skin-option");

  const radioInput = document.createElement("input");
  radioInput.type = "radio";
  radioInput.name = "skinSelection";
  radioInput.id = `skin-${i}`;

  radioInput.value = `../assets/${i}.png`;

  if (i === 1) radioInput.checked = true;

  const label = document.createElement("label");
  label.htmlFor = `skin-${i}`;
  label.classList.add("skin-card");

  const previewSkin = document.createElement("div");
  previewSkin.classList.add("skin-preview");

  previewSkin.style.backgroundImage = `url('./assets/${i}.png')`;

  label.appendChild(previewSkin);
  optionDiv.appendChild(radioInput);
  optionDiv.appendChild(label);

  skinsContainer.appendChild(optionDiv);
}

const allSkins = document.querySelectorAll('input[name="skinSelection"]');
const errForm = document.querySelector(".err-Container");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  let tab = [];

  errForm.innerHTML = " ";
  try {
    inputs.forEach((input) => {
      if (input.value === "") {
        throw new Error("Error : Vous n'avez pas rempli tous les champs");
      } else {
        tab.push(input.value);
      }
    });

    allSkins.forEach((skin) => {
      if (skin.checked === true) {
        tab.push(skin.value);
      }
    });

    window.localStorage.BR = JSON.stringify(tab);
    window.location.href = "./game.html";
  } catch (err) {
    errForm.innerHTML = `<p>Vous n'avez pas rempli tous les champs du formulaire !</p>`;
  }
});
