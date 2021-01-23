function getAllBooks(title) {

    let queryURL = `https://www.googleapis.com/books/v1/volumes?q=${title}`

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(res) {
        console.log(res);
    })
}

$("#book-search").click(function(event) {
    event.preventDefault();
    let bookTitle = $("#book-title").val().trim();
    getAllBooks(bookTitle);
})

function getBookById(bookId) {

    let queryURL = `https://www.googleapis.com/books/v1/volumes/${bookId}`

    
}