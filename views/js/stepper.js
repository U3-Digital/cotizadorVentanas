let steps = [];
let layouts = [];

const progress = document.getElementById('multisteps-progress');
const container = document.getElementById('steps-container');

function setSteps(texts) {
  steps = [];
  texts.forEach((text) => {
    steps.push(text);
  });
}

function setLayouts(fLayouts) {
  layouts = [];
  fLayouts.forEach((layout) => {
    layouts.push(layout);
  });
}

function generateSteps() {
  progress.innerHTML = '';
  let i = 0;
  steps.forEach((text) => {
    if (i === 0) {
      progress.innerHTML += `<button class="multisteps-form__progress-btn js-active" type="button" title="${text}">${text}</button>`;
    } else {
      progress.innerHTML += `<button class="multisteps-form__progress-btn" type="button" title="${text}">${text}</button>`;
    }
    i++;
  });
}

function generateStepsLayout() {
  container.innerHTML = '';
  let i = 0;
  layouts.forEach((layout) => {
    if (i === 0) {
      container.innerHTML += `<div class="multisteps-form__panel shadow p-4 rounded bg-white js-active">${layout}</div>`;
    } else {
      container.innerHTML += `<div class="multisteps-form__panel shadow p-4 rounded bg-white">${layout}</div>`;
    }
    i++;
  });
}

function generateStepper() {
  if (steps.length > 0 && layouts.length > 0) {
    if (progress) {
      generateSteps();

      if (container) {
        generateStepsLayout();
      } else {
        console.log('El elemento multisteps-form__form');
      }
    } else {
      console.log('El elemento multisteps-form__progress no existe');
    }
  } else {
    console.log('Te falta una opcion pvto');
  }
}
