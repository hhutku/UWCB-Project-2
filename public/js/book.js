

$.get("/api/user_data").then(data => {
    const text = "id " + data.id + " " + " email : " + data.email + " name :" + data.first_name;
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

            const bookId = res.items[0].id;
            $("#google").data("bookId", bookId);

            console.log(res.items[0].volumeInfo.imageLinks.smallThumbnail)
            console.log(res.items[0].volumeInfo.title)
            console.log(res.items[0].volumeInfo.authors[0])
            console.log(res.items[0].volumeInfo.description)

            for (i = 0; i < res.length; i++) {
                $("#img" + i).attr("src", res.items[i].volumeInfo.imageLinks.smallThumbnail);
                $("#title" + i).text(res.items[i].volumeInfo.title);
                $("#author" + i).text(res.items[i].volumeInfo.authors[0]);
                $("#description" + i).text(res.items[i].volumeInfo.description);
                $("googleID" + i).attr("data-bookId", bookId)
            }

            console.log(bookId);
            getBookById(bookId);

        })
}

$("#book-search").click(function (event) {
    event.preventDefault();
    let bookTitle = $("#book-title").val().trim();
    getAllBooks(bookTitle);
    $(".book-results").removeClass("hidden");
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


