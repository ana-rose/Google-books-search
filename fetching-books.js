import { createElementWithText } from "./dom-utensils.js";

export const getBooks = async (searchTerm) => {
    const responsePromise = fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=12`,
    );
    const response = await responsePromise;
    const jsonResponse = await response.json();
    const items = jsonResponse.items;
    if (items === undefined) {
        createElementWithText(
            "p",
            "Nothing matches your search criteria.",
            results,
        );
    }
    const volumeInfo = items.map((item) => item.volumeInfo);
    return volumeInfo;
};
