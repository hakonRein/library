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

/* Rendering code */

function displayBooks() {
    for (let book of myLibrary) {
        // Render books

        console.log(`${book.id}: ${book.title} by ${book.author} has ${book.pages} pages, and is of genre ${book.genre}`);
    }
}



/* Testing code */

addBookToLibrary("Bible", "God", 900, "Religion");
addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 1000, "Fantasy");
addBookToLibrary("Frelseren", "Jo Nesbø", 400, "Crime");

displayBooks();

removeBookFromLibrary(myLibrary[1].id);

displayBooks();