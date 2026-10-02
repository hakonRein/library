/* Library code */

const myLibrary = [];

function Book(title, author, pages, genre) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.read = true;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
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
        displayBooks();
    }
}

function setReadStatus(id) {
    const bookIndex = myLibrary.findIndex( (book) => {
        return book.id === id;
    })
    if (bookIndex != -1) {
        myLibrary[bookIndex].toggleRead();
        displayBooks();
    }
    
}

/* Access DOM-objects */

const submitButton = document.querySelector("#submit-button");
const sortTitleButton = document.querySelector("#sort-title");
const sortAuthorButton = document.querySelector("#sort-author");
const exampleBooksButton = document.querySelector("#example-books");

const main = document.querySelector("#main");

const newBookDialog = document.querySelector("#new-book-dialog");
const newBookForm = document.querySelector("#new-book-form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const genreInput = document.querySelector("#genre");


submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;

    const genreIndex = genreInput.selectedIndex;
    const genre = genreInput.options[genreIndex].text;

    addBookToLibrary(title, author, pages, genre);
    newBookForm.reset();
    newBookDialog.close();
    displayBooks();
});

exampleBooksButton.addEventListener("click", () => {
    myLibrary.push(...exampleLibrary);
    displayBooks();
});

sortTitleButton.addEventListener("click", () => {
    myLibrary.sort( (book1, book2) => 
        book1.title > book2.title ? 1 : -1 );
    displayBooks();
});

sortAuthorButton.addEventListener("click", () => {
    myLibrary.sort( (book1, book2) => 
        book1.author > book2.author ? 1 : -1 );
    displayBooks();
})

/* Rendering code */

function displayBooks() {
    main.innerHTML = "";

    for (const book of myLibrary) {
        const bookElement = document.createElement("div");
        bookElement.classList.add("book");

        const titleElement = document.createElement("h2");
        titleElement.textContent = book.title;

        const authorElement = createBookElement("Author:", book.author);
        const pagesElement = createBookElement("Pages:", book.pages);
        const genreElement = createBookElement("Genre:", book.genre);
        
        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-button");
        removeBtn.setAttribute("data-id", book.id);
        removeBtn.textContent = "X";
        removeBtn.addEventListener("click", (event) => {
            removeBookFromLibrary(event.target.dataset.id);
        });

        const readBtn = document.createElement("button");
        readBtn.classList.add("read-button");
        const readImage = document.createElement("img");
        readImage.setAttribute("src", `images/${book.read ? "book-open-outline.svg" : "book.svg"}`);
        readImage.setAttribute("data-id", book.id);
        readBtn.appendChild(readImage);
        readBtn.addEventListener("click", (event) => {
            setReadStatus(event.target.dataset.id);
        })

        bookElement.appendChild(titleElement);
        bookElement.appendChild(authorElement);
        bookElement.appendChild(pagesElement);
        bookElement.appendChild(genreElement);
        bookElement.appendChild(removeBtn);
        bookElement.appendChild(readBtn);
        
        main.appendChild(bookElement);
    }

}

function createBookElement(label, value) {
    const elementDiv = document.createElement("div");
    elementDiv.classList.add("book-element");
    const labelElement = document.createElement("p");
    labelElement.textContent = label;
    const valueElement = document.createElement("p");
    valueElement.textContent = value;
    elementDiv.appendChild(labelElement);
    elementDiv.appendChild(valueElement);
    return elementDiv;
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

/* Static book library */

const exampleLibrary = [
    new Book("Bible", "God", 900, "Religion"),
    new Book("Lord of the Rings", "JRR Tolkien", 1000, "Fantasy"),
    new Book("Frelseren", "Jo Nesbø", 400, "Crime")
]