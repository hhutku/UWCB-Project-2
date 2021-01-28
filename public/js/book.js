

// $.get("/api/user_data").then(data => {
//     const text = "id " + data.id + " " + " email : " + data.email + " name :" + data.first_name;
//     $("#welcome").text(text);

// })

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
            console.log(res.items[0].volumeInfo.description.substring(0, 100))
            $("#book-results").empty()
            for (i = 0; i < 20; i++) {

                let googleId = res.items[i].id;

                const html = `<div class="card flex-row">
        <img class="card-header border-0 book-image" src="https://via.placeholder.com/200" alt="Card image cap" id="img${i}">

        <div class="card-body">
            <h5 class="card-title title-name" id="title${i}"></h5>
            <h6 class="book-subtitle" id="subtitle${i}"></h6>
            <h7 class="author" id="author${i}"></h7>
            <p class="card-text book-description" id="description${i}"></p>
            <button class="btn btn-primary put-in-shelf" data-googleId=${googleId}>Add To My Bookshelf</button>
        </div>

        </div>`

                $("#book-results").append(html);
                $("#img" + i).attr("src", res.items[i].volumeInfo.imageLinks.smallThumbnail);
                $("#title" + i).text(res.items[i].volumeInfo.title);
                $("#author" + i).text(res.items[i].volumeInfo.authors[0]);
                $("#description" + i).text(res.items[i].volumeInfo.description.substring(0, 280) + "...");
                $("googleID" + i).attr("data-bookId", bookId)

            }

            console.log(bookId);
            // getBookById(bookId);

        })
}

$("#book-search").click(function (event) {
    event.preventDefault();
    let bookTitle = $("#book-title").val().trim();
    getAllBooks(bookTitle);
    $("#book-results").removeClass("hidden");
})


// function getBookById(bookId) {

//     let queryURL = `https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyAKge42MtCOGCe7Y898T64vRpM-SpXkdfw`
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     })
//         .then(function (res) {
//             console.log(res);
//         })
// }


const shelf = $(".put-in-shelf");

async function putInShelf(googleId) {
    const data = await $.get("/api/user_data");
    const userProfileId = data.id
 
    const check = await $.get(`/api/check/${userProfileId}/${googleId}`);
  
    console.log(check)
    if (!check.length) {

        $.post("/api/bookList", {
            google_book_id: googleId,
            userProfileId: userProfileId
        })
            .then(() => {
                console.log("ok")
            })
    }

}

$("#book-results").on("click", ".put-in-shelf", function (event) {

    event.preventDefault();

    const googleId = $(this).attr("data-googleId");

    putInShelf(googleId);

    console.log("click")

});

$("#dust-off-shelf").on("click", function(event){
    event.preventDefault();
    console.log("Dusting Bookshelf...");
    location.reload();
});
