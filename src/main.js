import { models } from "./config.js";
const modelViewer = document.querySelector("#viewer");
const slidesContainer = document.querySelector(".slides");
const variantSelect = document.querySelector("#variant");
const controls = document.querySelector(".controls");

let currentModel = models[0];

// Handles loading the events for <model-viewer>'s slotted progress bar
const onProgress = (event) => {
  const progressBar = event.target.querySelector(".progress-bar");
  const updatingBar = event.target.querySelector(".update-bar");
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add("hide");
    event.target.removeEventListener("progress", onProgress);
  } else {
    progressBar.classList.remove("hide");
  }
};

const switchSrc = (element, model) => {
  modelViewer.addEventListener("progress", onProgress);
  currentModel = model;
  modelViewer.poster = model.poster;
  modelViewer.src = model.path;
  modelViewer.iosSrc = model.usdz;
  const slides = document.querySelectorAll(".slide");
  slides.forEach((el) => {
    el.classList.remove("selected");
  });
  element.classList.add("selected");
  controls.classList.add("hide");
};

models.forEach((model) => {
  const slide = document.createElement("button");
  slide.className = "slide";
  slide.style.backgroundImage = `url('${model.poster}')`;
  slide.addEventListener("click", () => switchSrc(slide, model));
  slidesContainer.appendChild(slide);
});

slidesContainer.children[0].classList.add("selected");
switchSrc(slidesContainer.children[0], models[0]);

modelViewer.addEventListener("load", () => {
  const names = modelViewer.availableVariants;
  if (names.length > 1) {
    controls.classList.remove("hide");
    variantSelect.innerHTML = "";
    names.forEach((name) => {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      variantSelect.appendChild(option);
    });
  }
});

variantSelect.addEventListener("input", (event) => {
  modelViewer.variantName = event.target.value;
});
