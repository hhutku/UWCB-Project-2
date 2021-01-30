/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
// let socket;

let user;
let bookId;

const notDisplayedMessage = "This comment has been removed.";

function createComment(commentId, timestamp, userId, userName, text, displayed) {
  const box = $(`<div id='comment-${commentId}' class='comment-box' data-id='${commentId}' data-commenter='${userId}'></div>`);
  const metaBox = $("<div class='meta-box'></div>").appendTo(box);
  const nameDisplay = $(`<span class='name-display'>${userName}</span>`).appendTo(metaBox);
  const time = moment(timestamp);
  const timeDisplay = $(`<span class='time-display' data-timestamp='${time.format("LLL")}'>${time.fromNow()}</span>`).appendTo(metaBox);
  const messageBox = $("<div class='message-box'></div>").appendTo(box);
  const messageDisplay = $(`<div class='message-display${displayed ? "" : " removed"}'>${displayed ? text : notDisplayedMessage}</div>`).appendTo(messageBox);
  if (displayed) {
    const optionsBox = $("<div class='options-box'></div>").appendTo(messageBox);
    const replyButton = $("<button class='reply-button comment-option'>💬 Reply</button>").appendTo(optionsBox);
    if (userId === user.id) {
      const editButton = $("<button class='edit-button comment-option'>✏️ Edit</button>").appendTo(optionsBox);
      const deleteButton = $("<button class='delete-button comment-option'>❌ Delete</button>").appendTo(optionsBox);
    }
  }
  const inputBox = $("<div class='input-box'></div>").appendTo(box).hide();
  const messageInput = $("<textarea class='message-input' rows='3'></textarea>").appendTo(inputBox);
  const inputButtonBox = $("<div class='input-button-box'></div>").appendTo(inputBox);
  const saveInputButton = $("<button class='save-input-button'>Save</button>").appendTo(inputButtonBox);
  const cancelInputButton = $("<button class='cancel-input-button'>Cancel</button>").appendTo(inputButtonBox);
  const subcommentList = $("<div class='subcomment-list'></div>").appendTo(box);
  return box;
}

function displayComment(data) {
  const {id, timestamp, userId, userName, text, displayed, parentId} = data;
  const parent = parentId === null ? $("#comment-root") : $(`#comment-${parentId} > .subcomment-list`);
  createComment(id, timestamp, userId, userName, text, displayed).appendTo(parent);
}

function updateComment(commentId, message) {
  $(`#comment-${commentId} > .message-box > .message-display`).text(message);
}

function removeComment(commentId) {
  const comment = $(`#comment-${commentId}`);
  if (comment.children(".subcomment-list").children().length === 0) {
    comment.remove();
  } else {
    $(`#comment-${commentId} > .message-box > .message-display`)
      .text(notDisplayedMessage)
      .addClass("removed");
    $(`#comment-${commentId} > .message-box > .options-box`).remove();
  }
}

$("#comment-root").on("click", "button", event => {
  const target = event.target;
  const classList = Object.values(target.classList);
  const comment = $(target.closest(".comment-box"));

  if (classList.includes("reply-button")) {return onReplyButtonClicked(comment);}
  if (classList.includes("edit-button")) {return onEditButtonClicked(comment);}
  if (classList.includes("delete-button")) {return onDeleteButtonClicked(comment);}
  if (classList.includes("save-input-button")) {return onSaveInputClicked(comment);}
  if (classList.includes("submit-input-button")) {return onSubmitInputClicked();}
  if (classList.includes("cancel-input-button")) {return onCancelInputClicked(comment);}

  target.blur();
});

function onReplyButtonClicked(comment) {
  const inputBox = $(comment.find(".input-box")[0]);
  inputBox.data("editing", false);
  inputBox.show();
  $(inputBox.find(".message-input")).text("").focus();
}

function onEditButtonClicked(comment) {
  const messageBox = $(comment.find(".message-box")[0]);
  messageBox.hide();
  const text = messageBox.find(".message-display").text();

  const inputBox = $(comment.find(".input-box")[0]);
  inputBox.data("editing", true);
  inputBox.show();
  $(inputBox.find(".message-input")).text(text).focus();
}

function onDeleteButtonClicked(comment) {
  const commentId = comment.data("id");

  updateRecord(commentId, {displayed: false}).then(() => {
    removeComment(commentId);
  // todo: add soccet connection.
  });
}

function onSaveInputClicked(comment) {
  const commentId = comment.data("id");

  const inputBox = $(comment.find(".input-box")[0]);
  inputBox.hide();
  const text = inputBox.find(".message-input").val().trim();
    
  if (inputBox.data("editing")) {
    const messageBox = $(comment.find(".message-box")[0]);
    messageBox.show();

    updateRecord(commentId, {text}).then(data => {
      updateComment(commentId, text);
    // todo: add soccet connection.
    });
  } else {
    $.post("/api/comment", {
      userId: user.id,
      bookId,
      text,
      displayed: true,
      parentId: commentId
    }).then(data => {  
      displayComment({
        id: data.id, 
        timestamp: data.createdAt, 
        userId: user.id, 
        userName: user.name, 
        text, 
        displayed: true,
        parentId: commentId
      });
    });

    //todo: add soccet connection.
  }
}

function onSubmitInputClicked() {
  const textarea = $("#root-input > .message-input");
  const text = textarea.val().trim();
  textarea.val("");

  $.post("/api/comment", {
    userId: user.id,
    bookId,
    text,
    displayed: true
  }).then(data => {  
    displayComment({
      id: data.id, 
      timestamp: data.createdAt, 
      userId: user.id, 
      userName: user.name, 
      text, 
      displayed: true,
      parentId: null
    });
  });
}

function onCancelInputClicked(comment) {
  $(comment.find(".input-box")[0]).hide();

  $(comment.find(".message-box")[0]).show();
}

function updateRecord(id, data) {
  return $.ajax("/api/comment", {
    type: "PUT",
    data: { id: {id}, data }
  });
}

function insertComments(bookData, commentData, userData) {
  bookId = bookData.id;
  for (const comment of commentData) {
    user = userData;
    displayComment({
      id: comment.id, 
      timestamp: comment.createdAt, 
      userId: comment.userId,
      userName: `${comment.userProfile.first_name} ${comment.userProfile.last_name}`, 
      text: comment.text, 
      displayed: comment.displayed,
      parentId: comment.parentId
    });
  }

  $(".comment-box:not(#comment-root)").filter(function() {
    const subs = $(this).children(".subcomment-list").children().length === 0;
    const removed = $(this).children(".message-box").children(".removed").length > 0;
    return subs && removed;
  }).remove();
}

insertComments();