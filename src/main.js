import { models } from "./config.js";
const modelViewer = document.querySelector("#viewer");
const slidesContainer = document.querySelector(".slides");
const textureSelect = document.querySelector("#textures");

let currentModel = models[0];

const updateTextures = () => {
  textureSelect.innerHTML = "";
  currentModel.textures.forEach((texture, index) => {
    const option = document.createElement("option");
    option.value = texture;
    option.textContent = `Texture ${index + 1}`;
    textureSelect.appendChild(option);
  });
};

const switchSrc = (element, model) => {
  currentModel = model;
  modelViewer.src = model.path;
  modelViewer.iosSrc = model.usdz;
  modelViewer.poster = model.poster;
  const slides = document.querySelectorAll(".slide");
  slides.forEach((el) => {
    el.classList.remove("selected");
  });
  element.classList.add("selected");
  updateTextures();
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

textureSelect.addEventListener("input", async (event) => {
  const texture = await modelViewer.createTexture(event.target.value);
  const material = modelViewer.model.materials[0];
  material.pbrMetallicRoughness.baseColorTexture.setTexture(texture);
});

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
modelViewer.addEventListener("progress", onProgress);
