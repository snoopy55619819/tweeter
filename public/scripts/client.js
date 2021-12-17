/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweetObj) {
  // console.log(tweetObj);

  const $newTweet = $(`
    <article class="tweet-container">
      <header class='article-tweet header'>
        <img id='article-tweet-img' src="${tweetObj.user.avatars}"> 
        <firstName>${tweetObj.user.name}</firstName>
        <userId>${tweetObj.user.handle}</userId>
      </header>

      <div class='article-tweet body'>
        ${tweetObj.content.text}
      </div>

      <footer class='article-tweet footer'>
        ${tweetObj.created_at}
        <icons>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="far fa-heart"></i>
        </icons>
      </footer>
    </article>
  `);
  return $newTweet;
};


// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$(document).ready(function() {
  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});
