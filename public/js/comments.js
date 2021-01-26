let socket

const messageInput = $('#message-input')

const notDisplayedMessage = 'This comment has been removed.'

function displayComment(data) {
    const {id, timestamp, userID, userName, text, displayed, liked, disliked, parentID} = data
    const parent = parentID == null ? $('#comment-root') : $(`#comment-${parentID} .subcomment-list`)
    const box = $(`<div id='comment-${id}' class='comment-box' data-commenter='${userID}'></div>`).appendTo(parent)
    const metaDisplay = $(`<div class='meta-display'><div>`).appendTo(box)
    const nameDisplay = $(`<span class'name-display'>${userName}</span>`).appendTo(metaDisplay)
    const timeDisplay = $(`<span class'time-display'>${timestamp}</span>`).appendTo(metaDisplay)
    const messageDisplay = $(`<p class'message-display'>${displayed ? text : notDisplayedMessage}</p>`).appendTo(box)
    const optionsDisplay = $(`<div class='options-display'><div>`).appendTo(box)
    const likeButton = $(`<button class='like-button comment-option'>👍 ${liked}</button>`).appendTo(optionsDisplay)
    const dislikeButton = $(`<button class='dislike-button comment-option'>👎 ${disliked}</button>`).appendTo(optionsDisplay)
    const replyButton = $(`<button class='reply-button comment-option'>💬 Reply</button>`).appendTo(optionsDisplay)
    if (userID == activeUser.id && displayed) {
        const editButton = $(`<button class='edit-button comment-option'>✏️ Edit</button>`).appendTo(optionsDisplay)
        const deleteButton = $(`<button class='delete-button comment-option'>❌ Delete</button>`).appendTo(optionsDisplay)
    }
    const replayInput = $(`<div class='reply_input'></div>`).appendTo(box)
    const subcommentList = $(`<div class='subcomment-list'></div>`).appendTo(box)
}

function updateLiked(commentID, count) {
    $(`#comment-${commentID} .like-button`).text(`👍 ${count}`)
}

function updateDisliked(commentID, count) {
    $(`#comment-${commentID} .dislike-button`).text(`👎 ${count}`)
}

function updateComment(commentID, message) {
    $(`#comment-${commentID} .message-display`).text(message)
}

function removeComment(commentID) {
    $(`#comment-${commentID} .message-display`)
        .text(notDisplayedMessage)
        .addClass('removed')
}

function init(userID, bookID) {
    socket = io.connect(path)
}