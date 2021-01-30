function displayToast(message, color='#444') {
    var toast = $('.toast');

    toast
        .addClass('show')
        .text(message)
        .css('backgroundColor', color);

    setTimeout(() => toast.removeClass('show'), 3000);
}

function displayError(message) {
    displayToast(message, 'firebrick')
}