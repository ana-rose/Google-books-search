import { getBooks } from "./fetching-books.js";
import { createElementWithText } from "./dom-utensils.js";

const BASE_URL = "https://www.googleapis.com/books/v1/volumes?q={search terms}";

const button = document.getElementById("searchBooks");
const results = document.getElementById("results");

// Search button - on click:

button.addEventListener("click", async () => {
    // Refreshing the search:
    while (results.lastChild) {
        results.removeChild(results.lastChild);
    }

    const input = document.getElementById("searchInput");
    const searchTerm = input.value;

    // "Empty search bar" alert:
    if (searchTerm === "") {
        alert("Nothing to search. Please specify your search term.");
    }
    const books = await getBooks(searchTerm);

    // Creating a book list:
    const listBooks = books.map((book) => {
        const element = document.createElement("div");

        // Images:
        const img = document.createElement("img");
        if (book.imageLinks === undefined) {
            img.src =
                "https://www.iconpacks.net/icons/2/free-opened-book-icon-3163-thumb.png";
            element.appendChild(img);
        } else {
            img.src = `${book.imageLinks.thumbnail}`;
            element.appendChild(img);
        }
        // Titles:
        createElementWithText("h3", book.title, element);

        // Authors:
        if (book.authors === undefined) {
            createElementWithText("p", "Unknown author", element);
        } else {
            createElementWithText("p", book.authors, element);
        }

        // Description:
        if (book.description === undefined) {
            createElementWithText("p", "Description not available.", element);
        } else if (book.description && book.description.length > 300) {
            const dot = book.description.indexOf(".", 300);
            const shortDescription = book.description.slice(0, dot) + ".";
            createElementWithText("p", shortDescription, element);
        } else {
            createElementWithText("p", book.description, element);
        }

        return element;
    });

    listBooks.forEach((book) => {
        results.appendChild(book);
    });
});
