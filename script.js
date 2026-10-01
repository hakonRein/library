/* Library code */

const myLibrary = [];

function Book(title, author, pages, genre) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
}

function addBookToLibrary(title, author, pages, genre) {
    const book = new Book(title, author, pages, genre);
    myLibrary.push(book);
}

function removeBookFromLibrary(id) {
    const bookIndex = myLibrary.findIndex( (book) => {
        return book.id === id;
    })
    if (bookIndex != -1) {
        myLibrary.splice(bookIndex, bookIndex);
    }
}

/* Access DOM-objects */

const newButton = document.querySelector("#new-button");
const main = document.querySelector("#main");

newButton.addEventListener("click", () => {
    addBookToLibrary("Bible", "God", 900, "Religion");
    displayBooks();
})

/* Rendering code */

function displayBooks() {
    let html = "";
    for (let book of myLibrary) {
        html += `
            <div class="book">
                <h2>${book.title}</h2>
                <p>Author: ${book.author}</p>
                <p>Number of pages: ${book.pages}</p>
                <p>Genre: ${book.genre}</p>
            </div> 
        `;
    }
    main.innerHTML = html;
}


/* Testing code */

/*
addBookToLibrary("Bible", "God", 900, "Religion");
addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 1000, "Fantasy");
addBookToLibrary("Frelseren", "Jo Nesbø", 400, "Crime");

displayBooks();

removeBookFromLibrary(myLibrary[1].id);

displayBooks();
*/