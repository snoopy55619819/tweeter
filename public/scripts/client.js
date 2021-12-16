/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const $messageTyped = $('#tweet-text');
const $counter = $('.counter');

$messageTyped.on('keyup', (event) => {
  const currentMessage = event.target.value;
  console.log(currentMessage);

  if(currentMessage.length >= 140) {
    $counter.val(0);
    return $messageTyped.val(currentMessage.substring(0, 140));
  }
  return $counter.val(140 - currentMessage.length);
});