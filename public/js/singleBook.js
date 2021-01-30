singleBook();

function singleBook(googleId) {
  const queryURL = `https://www.googleapis.com/books/v1/volumes/${googleId}`;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(res => {
    console.log(res);
    const html = `
      <div class="row">
          <div class="col-4">
              <img src="${res.volumeInfo.imageLinks.thumbnail}" alt="Book thumbnail">
          </div>
          <div class="col-8">
              <h2>${res.volumeInfo.title}</h2>
              <h4>${res.volumeInfo.authors[0]}</h4>
              <p>Description:</p>
              <br>
              <p>${res.volumeInfo.description}</p>
              <p>Average Rating: ${res.volumeInfo.averageRating}</p>
              <p>Published Date: ${res.volumeInfo.publishedDate}</p>
              <p>Pages: ${res.volumeInfo.pageCount}</p>
          </div>
      </div>
      <br>
      `;
    $("#displayBookPage").append(html);
  });
}
