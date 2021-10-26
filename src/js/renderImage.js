import fetchQuery from "./apiService.js";
import galleryCards from "../templates/galleryCards.hbs";

import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

const refs = {
  searchForm: document.querySelector(".search_form"),
  galleryList: document.querySelector(".gallery_list"),
  loadMoreBtn: document.querySelector(".load-more-btn"),
};

let page = 1;
let currentValue = "";

refs.searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  refs.galleryList.innerHTML = "";
  page = 1;
  currentValue = event.target.elements.query.value;

  if (currentValue.length === 0) {
    error("Enter text");
  } else {
    renderCards();
    refs.searchForm.reset();
  }

  refs.loadMoreBtn.addEventListener("click", () => renderCards());
});

function createImgCards(result) {
  refs.galleryList.insertAdjacentHTML("beforeend", galleryCards(result.hits));
}

function renderCards() {
  fetchQuery(currentValue, page).then((result) => {
    if (result.total === 0) {
      error("This picture was not found");
    }
    createImgCards(result);
    scrollNextImg();
  });
  page += 1;
}

function scrollNextImg() {
  refs.galleryList.scrollIntoView({
    behavior: "smooth",
    block: "end",
  });
}
