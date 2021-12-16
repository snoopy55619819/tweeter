
$(document).ready(() => {
  const $messageTyped = $('#tweet-text');
  const $counter = $('.counter');

  $messageTyped.on('keyup', (event) => {
    const currentMessage = event.target.value;
  
    if(currentMessage.length >= 140) {
      $counter.val(0);
      return $messageTyped.val(currentMessage.substring(0, 140));
    }
    return $counter.val(140 - currentMessage.length);
  });
});