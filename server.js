
const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;
const DATA_FILE = "./books.json";

app.use(express.json());

let books = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));

function saveBooks() {
    fs.writeFileSync(DATA_FILE, JSON.stringify(books, null, 2));
}

function validBook(title, author, price) {
    return typeof title === "string" && title.trim() !== "" &&
           typeof author === "string" && author.trim() !== "" &&
           typeof price === "number" &&
           Number.isFinite(price) && price > 0;
}

// GET: Show all books
app.get("/books", (req, res) => {
    res.status(200).json(books);
});

// GET: Find one book
app.get("/books/:id", (req, res) => {
    const id = Number(req.params.id);
    const book = books.find(b => b.id === id);

    if (!Number.isInteger(id) || !book) {
        return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
});

// POST: Add a new book
app.post("/books", (req, res) => {
    const { title, author, price } = req.body;

    if (!validBook(title, author, price)) {
        return res.status(400).json({
            message: "Enter a valid title, author and positive price"
        });
    }

    const id = books.length
        ? Math.max(...books.map(b => b.id)) + 1
        : 1;

    const newBook = {
        id,
        title: title.trim(),
        author: author.trim(),
        price
    };

    books.push(newBook);
    saveBooks();

    res.status(201).json(newBook);
});

// PUT: Update a book
app.put("/books/:id", (req, res) => {
    const id = Number(req.params.id);
    const book = books.find(b => b.id === id);

    if (!Number.isInteger(id) || !book) {
        return res.status(404).json({ message: "Book not found" });
    }

    const { title, author, price } = req.body;

    if (!validBook(title, author, price)) {
        return res.status(400).json({
            message: "Enter a valid title, author and positive price"
        });
    }

    book.title = title.trim();
    book.author = author.trim();
    book.price = price;

    saveBooks();

    res.status(200).json(book);
});

// DELETE: Remove a book
app.delete("/books/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = books.findIndex(b => b.id === id);

    if (!Number.isInteger(id) || index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    const deletedBook = books.splice(index, 1)[0];
    saveBooks();

    res.status(200).json({
        message: "Book deleted successfully",
        book: deletedBook
    });
});

// Handle unexpected errors
app.use((err, req, res, next) => {
    res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
    console.log(`Book API running at http://localhost:${PORT}`);
});
