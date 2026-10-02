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
        myLibrary.splice(bookIndex, 1);
    }
    displayBooks();
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
    main.innerHTML = "";

    for (let book of myLibrary) {
        const bookElement = document.createElement("div");
        bookElement.classList.add("book");

        const titleElement = document.createElement("h2");
        titleElement.textContent = book.title;
        const authorElement = document.createElement("p");
        authorElement.textContent = "Author: " + book.author;
        const pagesElement = document.createElement("p");
        pagesElement.textContent = "Number of pages: " + book.pages;
        const genreElement = document.createElement("p");
        genreElement.textContent = "Genre: " + book.genre;
        
        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-button");
        removeBtn.setAttribute("data-id", book.id);
        removeBtn.textContent = "X";
        removeBtn.addEventListener("click", (event) => {
            removeBookFromLibrary(event.target.dataset.id);
        });

        bookElement.appendChild(titleElement);
        bookElement.appendChild(authorElement);
        bookElement.appendChild(pagesElement);
        bookElement.appendChild(genreElement);
        bookElement.appendChild(removeBtn);
        
        main.appendChild(bookElement);
    }

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