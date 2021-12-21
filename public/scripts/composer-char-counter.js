//Update character counter
$(document).ready(() => {
  const $messageTyped = $('#tweet-text');
  const $counter = $('.counter');

  $messageTyped.on('keyup', (event) => {
    $('.error-message').val('');
    const currentMessage = event.target.value;
  
    if(currentMessage.length >= 140) {
      $counter.val(0);
      $('.error-message').val('Limit reached: Maximum 140 characters');
      return $messageTyped.val(currentMessage.substring(0, 140));
    }
    return $counter.val(140 - currentMessage.length);
  });
});