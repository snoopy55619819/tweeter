/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const db = require("../../server/lib/in-memory-db");

//Escape entered text to avoid intext scripts.
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//Create html for past tweet elements.
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

//Render tweets onto page.
const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
}

$(document).ready(() => {
  // console.log(pastTweets);
  const initialLoadTweets = function() {
    $.ajax({
      type: 'GET',
      url: '/tweets',
      success: (pastTweets) => {
        //After new tweet added successfully, render tweet history with new tweet.
        renderTweets(pastTweets);
      },
      dataType: 'JSON'
    });
  };
  initialLoadTweets();


  //AJAX GET request:
  const loadTweets = function() {
    $.ajax({
      type: 'GET',
      url: '/tweets',
      success: (pastTweets) => {
        //After new tweet added successfully, render tweet history with new tweet.
        renderTweets([pastTweets[pastTweets.length - 1]]);
      },
      dataType: 'JSON'
    });
  };

  const $button = $('.form-inline');
  
  //AJAX POST request:
  //when 'tweet' button is pressed, post the tweet if valid.
  $button.submit(function(event) {
    const $formData = $(this).serialize();

    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $formData,
      success: (body) => {
        //On succesful post, update page using ajax get request

        //If user reached character limit, tweet not posted. Other scripts in show error messages.
        if($('.counter').val() < 0) {
          return;
        }
        //Else, post tweet
        loadTweets();
        $('#tweet-text').val(""); //Set text area to "".
        $('.counter').val(140); //Reset character counter to 140.
        $('.error-message').val(''); //Remove all error messages.
      },

      error: () => {
        $('.error-message').val('Tweet cannot be empty');
      },
      dataType: 'text'
    });
    event.preventDefault();
  });
});