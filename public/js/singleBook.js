singleBook(
  window.location.href
    .split("?")[1]
    .split("&")[0]
    .split("=")[1]
);
function singleBook(bookId) {
  const apiURL = `https://www.googleapis.com/books/v1/volumes/${bookId}`;

  $.when(
    $.get(apiURL),
    $.get(`/api/comment/${bookId}`),
    $.get("/api/user_data")
  ).then((bookData, commentData, userData) => {
    bookData = bookData[0];
    commentData = commentData[0];
    userData = userData[0];

    populateBookData(bookData);
    insertComments(commentData, userData);
  });
}

function populateBookData(bookData) {
  $("#book-img").attr("src", bookData.volumeInfo.imageLinks.thumbnail);
  $("#book-title").text(bookData.volumeInfo.title);
  $("#book-authors").text(bookData.volumeInfo.authors.join(", "));
  $("#book-description").text(bookData.volumeInfo.description);
  $("#book-rating").text(bookData.volumeInfo.averageRating);
  $("#book-publish-date").text(bookData.volumeInfo.publishedDate);
  $("#book-page-count").text(bookData.volumeInfo.pageCount);
  $("#book-buy-button").attr("href", bookData.saleInfo.buyLink);
}
