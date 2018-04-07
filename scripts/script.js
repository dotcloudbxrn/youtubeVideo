// Searchbar Expand Handler

$(function(){
  var searchfield = $('#query');
  var icon = $('#search-btn');
  
  // Focus Event Handler
  $(searchfield).on('focus', function(){
    //'This' references the searchFiedld/ input textbox
    $(this).animate({
      width: '90%'
    }, 400);
    
    $(icon).animate({
      right: '90px'
    }, 400);
  });
  
  // Blur Event Handler
  $(searchfield).on('blur', function(){
    if(searchfield.val() == ''){
      $(searchfield).animate({
        width: '45%'
      }, 400, function(){});
      
      $(icon).animate({
        right: '452px'
      }, 400, function(){});
    }
  });
  
  $('#search-form').submit(function (e) {
    // prevent default behaviour of the form so it doesnt submit
    e.preventDefault();
  });
});



function search() {
  // Clear Results
  $('#results').html('');
  $('#buttons').html('');
  
  // Get Form Input
  q = $('#query').val();
  
  // Run GET Request on API
  $.get(
    "https://www.googleapis.com/youtube/v3/search", {
      //we're asking for a snippet and an ID
      part: 'snippet, id',
      q: q,
      type: 'video',
      key: 'AIzaSyAVkFUkzQySTSH8MAmTsVcGjtc1UA_16zc'
    },
    //pass it a data variable so you can return the data back
    function(data) {
      //seems like it's an object
      var nextPageToken = data.nextPageToken;
      var previousPageToken = data.prevPageToken;

      
      // we'll be able to loop through each item
      $.each(data.items, function(i, item){
        var output = getOutput(item);
        
        // Display results
        $('#results').append(output);
      })
      
      var buttons = getButtons(previousPageToken, nextPageToken);
      
      // Display Buttons
      $('#buttons').append(buttons);
      
    }
  );
}

// Next Page Fn
function nextPage() {
  // Create Token 
  // gonna come from the data attribute, we're passing a data token which
  // contains the data-token coming from the request
  // same with the query. and you don't feed the method
  // .data('data-token');, you just type .data('token');
  
  var token = $('#nextButton').data('token');
  var q = $('#nextButton').data('query');
   // Clear Results
  $('#results').html('');
  $('#buttons').html('');
  
  // Get Form Input
  q = $('#query').val();
  
  // Run GET Request on API
  $.get(
    "https://www.googleapis.com/youtube/v3/search", {
      //we're asking for a snippet and an ID
      part: 'snippet, id',
      q: q,
      pageToken: token,
      type: 'video',
      key: 'AIzaSyAVkFUkzQySTSH8MAmTsVcGjtc1UA_16zc'
    },
    //pass it a data variable so you can return the data back
    function(data) {
      //seems like it's an object
      var nextPageToken = data.nextPageToken;
      var previousPageToken = data.prevPageToken;

      
      // we'll be able to loop through each item
      $.each(data.items, function(i, item){
        var output = getOutput(item);
        
        // Display results
        $('#results').append(output);
      })
      
      var buttons = getButtons(previousPageToken, nextPageToken);
      // Display Buttons
      $('#buttons').append(buttons);
      
    }
  );
}

// Prev 
function prevPage() {
  // Create Token 
  // gonna come from the data attribute, we're passing a data token which
  // contains the data-token coming from the request
  // same with the query. and you don't feed the method
  // .data('data-token');, you just type .data('token');
  
  var token = $('#prevButton').data('token');
  var q = $('#prevButton').data('query');
   // Clear Results
  $('#results').html('');
  $('#buttons').html('');
  
  // Get Form Input
  q = $('#query').val();
  
  // Run GET Request on API
  $.get(
    "https://www.googleapis.com/youtube/v3/search", {
      //we're asking for a snippet and an ID
      part: 'snippet, id',
      q: q,
      pageToken: token,
      type: 'video',
      key: 'AIzaSyAVkFUkzQySTSH8MAmTsVcGjtc1UA_16zc'
    },
    //pass it a data variable so you can return the data back
    function(data) {
      //seems like it's an object
      var nextPageToken = data.nextPageToken;
      var previousPageToken = data.prevPageToken;

      
      // we'll be able to loop through each item
      $.each(data.items, function(i, item){
        var output = getOutput(item);
        
        // Display results
        $('#results').append(output);
      })
      
      var buttons = getButtons(previousPageToken, nextPageToken);
      console.log(previousPageToken);
      // Display Buttons
      $('#buttons').append(buttons);
      
    }
  );
}

// Build Output
function getOutput(item) {
  var videoId = item.id.videoId;
  var title = item.snippet.title;
  var description = item.snippet.description;
  var thumb = item.snippet.thumbnails.high.url;
  var channelTitle = item.snippet.channelTitle;
  var videoDate = item.snippet.publishedAt;
  
  // Build Output String, Iterates over Each List Item
  var output = '<li>' + 
      '<div class="list-left">' + 
      '<img src="' + thumb + '">' +
      '</div>' +
      '<div class="list-right">' +
      '<h3><a class="fancybox fancybox.iframe" ' +
      'href="https://www.youtube.com/embed/'+videoId+'">' + title + '</a></h3>' +
      //what is small... channel title
      '<small> By <span class="cTitle">' + channelTitle + '</span> on ' + videoDate + '</small>' +
      '<p>'+ description + '</p>' +
      '</div> <!-- closes list-right -->' + 
      '</li>' + 
      '<div class="clearfix"></div>'+ '';
  return output; 
} 

// Build the buttons
function getButtons(prev, next) {
  // if there isn't a previous button
  if(!prev) {
    // div that's holding our buton
    // the button has a shitton of paragraphs that I don't know
    var btnoutput = '<div class="button-container">' +
    '<button id="nextButton" class="paging-button" data-token="' + next +'" data-query="' + q + '" ' + 
    'onclick="nextPage();">Next Page</button></div>';
  } 
  else {
    var btnoutput = '<div class="button-container">' +
    '<button id="prevButton" class="paging-button" data-token="' + prev +'" data-query="' + q + '" ' + 
    'onclick="prevPage();">Previous Page</button>' +
    '<button id="nextButton" class="paging-button" data-token="' + next +'" data-query="' + q + '" ' + 
    'onclick="nextPage();">Next Page</button></div>';
  }
  
  return btnoutput;
}