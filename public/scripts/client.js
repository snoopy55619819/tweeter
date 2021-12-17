/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweetObj) {
  const $newTweet = $(`
    <article class="tweet-container">
      <header class='article-tweet header'>
        <img class='article-tweet-img' src="${tweetObj.user.avatars}"> 
        <div class='firstName'>${tweetObj.user.name}</div>
        <div class='userId'>${tweetObj.user.handle}</div>
      </header>

      <div class='article-tweet body'>
        ${escape(tweetObj.content.text)}
      </div>

      <footer class='article-tweet footer'>
        ${timeago.format(tweetObj.created_at)}
        <div class='icons'>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="far fa-heart"></i>
        </div>
      </footer>
    </article>
  `);
  return $newTweet;
};


const renderTweets = function(tweets) {
  // loops through tweets
  for (const tweet of tweets) {
    //create tweet html
    const $tweet = createTweetElement(tweet);
    //append to tweets-container html
    $('#tweets-container').prepend($tweet);
  }
  return;
}

// Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

renderTweets(data)

$(document).ready(() => {

  
  //AJAX GET request:
  const loadTweets = function() {
    
    $.ajax({
      type: 'GET',
      url: '/tweets',
      success: (pastTweets) => {
        //After new tweet added successfully, render tweet history with new tweet.
        // console.log(pastTweets[pastTweets.length - 1])
        renderTweets([pastTweets[pastTweets.length - 1]]);
      },
      dataType: 'JSON'
    });
  };
  // loadTweets()
  //AJAX POST request:
  const $button = $('.form-inline');

  $button.submit(function(event) {
    const $formData = $(this).serialize();

    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $formData,
      success: (body) => {
        //On succesful post, update page using ajax get request
        console.log($('.counter').val())
        if($('.counter').val() === 0) {
          return;
        }
        loadTweets();
        $('#tweet-text').val("");
        $('.counter').val(140);
      },
      error: () => {
        $('.error-message').val('Tweet cannot be empty');
      },
      dataType: 'text'
    });
    event.preventDefault();
  });
});