

$.get("/api/user_data").then(data => {
    const text ="id " +data.id +" " +" email : " + data.email + " name :"+data.first_name;
    $("#welcome").text(text);

})

function getAllBooks(title) {

    let queryURL = `https://www.googleapis.com/books/v1/volumes?q=${title}&key=AIzaSyAKge42MtCOGCe7Y898T64vRpM-SpXkdfw`
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (res) {
            console.log(res);

            var bookId = res.items[0].id;
            $("#google").data("bookId", bookId);

            console.log(bookId)
            getBookById(bookId)

        })
}

$("#book-search").click(function (event) {
    event.preventDefault();
    let bookTitle = $("#book-title").val().trim();
    getAllBooks(bookTitle);
})


function getBookById(bookId) {

    let queryURL = `https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyAKge42MtCOGCe7Y898T64vRpM-SpXkdfw`
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (res) {
            console.log(res);
        })
}


const shelf = $("#put-in-shelf");

async function putInShelf() {
    const data = await $.get("/api/user_data");
    const UserProfileId = data.id

    const googleId = $("#google").data("bookId");
    console.log(googleId)
    $.post("/api/bookList", {
        google_book_id: googleId,
        completed: true,
        ranking: 10,
        UserProfileId: UserProfileId,
    })
        .then(() => {
            console.log("ok")
        })
}


shelf.on("click", event => {
    event.preventDefault();

    putInShelf();

});


