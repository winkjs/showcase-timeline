var getTimeline = function (title) {
  fetch('https://showcase-serverless.herokuapp.com/wp-timeline?title='+title)
    .then(function (res) {
      return res.json();
    }).then(function (d) {
      resetUI();
      showResults(d.timeline);
    })
}

var resetUI = function () {
  $('#timeline-button').prop('value', 'Create timeline');
  $('.lds-ripple').hide();
  $('.timeline').show();
}

var showResults = function (timeline) {
  $('#error').hide();

  if(timeline.length === 0){
    $('#error').show();
    $('.timeline').hide();
    $('#error').html('There in no Wikipedia article with that title (maybe it has a different captilaziation).<br>Try a different one, for example <a href="javascript:void(0)" class="js-article-ex">Delhi</a>.');
    return;
  }

  $('.timeline').show();
  $('.entries').empty();

  var lastYear = '';
  timeline.forEach((t) => {
    if (isNaN(t.date)) {
      className = 'big';
    } else {
      var century = t.date[0]+ ''+ t.date[1];
      var className = '';
      if ( lastYear !== century ) {
          lastYear = century;
          className = 'big'
      }
    }

    $entry = $('<div>').addClass('entry').append(
      $('<div>').addClass('title').addClass(className).text(t.date),
      $('<div>').addClass('body').html(t.sentence),
    )

    $('.entries').append($entry);
  });
}

var loadArticle = function (title) {
  // UI changes
  $('#title').prop('value',title)
  $('#error').hide();
  $('#timeline-button').prop('value', 'Fetching timeline…');
  $('.lds-ripple').show();
  $('.timeline').hide();

  // Make API call
  getTimeline(title);
}

$(function () {
  // Warming up the server for the user's request
  fetch('https://showcase-serverless.herokuapp.com/wp-timeline?title=New York City');

  $('#timeline-button').on('click', function () {
    // Check input string
    var title = $('#title')[0].value;
    if (title.trim() === '' ) return false;

    loadArticle(title);
  });

  $(document).on('click','.js-article-ex',function () {
    var title = $(this).text();
    loadArticle(title);
  })
})
