import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

const API_KEY = "24022420-d4b3a2f8f052f21486674bd5c";

export default fetchQuery;

function fetchQuery(searchQuery, page) {
  return fetch(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=12&key=${API_KEY}`
  )
    .then((response) => response.json())
    .catch((error) => error);
}
