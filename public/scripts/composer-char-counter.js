//Update character counter on any input in text form
$(document).ready(() => {
  const $messageTyped = $('#tweet-text');
  const $counter = $('.counter');

  $messageTyped.on('input', (event) => {
    $('.error-message').val('');
    const currentMessage = event.target.value;
  
    $counter.css("color", 'black');
    if(currentMessage.length > 140) {
      // $counter.val(0);
      $('.error-message').val('Limit reached: Maximum 140 characters');
      // return $messageTyped.val(currentMessage.substring(0, 140));
      $counter.css("color", 'red');
    }
    return $counter.val(140 - currentMessage.length);
  });
});