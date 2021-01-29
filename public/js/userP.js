
$.get("/api/user_data").then(data => {
    const text = "id " + data.id + " " + " email : " + data.email + " name :" + data.first_name;
    $("#welcome").text(text);

    userBooks(data.id)

})

async function userBooks(userId) {

    const data = await $.get(`/api/bookList/${userId}`);
    console.log(data.length)


    for (i = 0; i < data.length; i++) {
        const googleId = data[i].google_book_id

        let queryURL = `https://www.googleapis.com/books/v1/volumes/${googleId}?key=AIzaSyAKge42MtCOGCe7Y898T64vRpM-SpXkdfw`
        const books = await $.ajax({ url: queryURL, method: "GET" })
        console.log(books)
        console.log(books.volumeInfo.title)

        var html = `<div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${books.volumeInfo.imageLinks.smallThumbnail}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${books.volumeInfo.title}</h5>
          <p class="card-text">completed : ${data.completed}</p>
          <p class="card-text">ranking : ${data.ranking}</p>
         
        </div>
      </div> `

        $(".book-display").append(html)
    }
}




