$.get("/api/userData").then(data => {
    const text = `id: ${data.id} email: ${data.email} name: ${data.firstName} ${data.firstName}`;
    $("#welcome").text(text);
})

function getAllBooks(title) {
    let queryURL = `https://www.googleapis.com/books/v1/volumes?q=${title}&key=AIzaSyAKge42MtCOGCe7Y898T64vRpM-SpXkdfw`
    $.get(queryURL).then(res => {
        console.log(res);

        var bookId = res.items[0].id;
        $("#google").data("bookId", bookId);

        console.log(bookId)
        getBookById(bookId)
    })
}

$("#book-search").click(event => {
    event.preventDefault();
    let bookTitle = $("#book-title").val().trim();
    getAllBooks(bookTitle);
})

function getBookById(bookId) {
    let queryURL = `https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyAKge42MtCOGCe7Y898T64vRpM-SpXkdfw`
    $.get(queryURL).then(res => {
        console.log(res);
    })
}

const shelf = $("#put-in-shelf");

async function putInShelf() {
    const data = await $.get("/api/userData");
    const userId = data.id
    const bookId = $("#google").data("bookId");
    console.log(bookId)
    $.post("/api/bookList", {
        bookId: bookId,
        completed: true,
        ranking: 10,
        userId: userId,
    }).then(() => {
        console.log("ok")
    })
}


shelf.on("click", event => {
    event.preventDefault();

    putInShelf();
});