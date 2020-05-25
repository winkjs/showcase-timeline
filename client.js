var getTimeline = function (title) {
  fetch('https://showcase-serverless.herokuapp.com/wp-timeline?title='+title)
    .then(function (res) {
      return res.json();
    }).then(function (d) {
      console.log(d);
      resetUI();
      showResults(d.timeline);
    })
}

var resetUI = function () {
  $('#timeline-button').prop('value', 'Create timeline');
  $('.lds-ripple').hide();
}

var showResults = function (timeline) {
  $('#error').hide();

  if(Object.keys(timeline).length === 0){
    $('#error').show();
    $('#error').text('There in no Wikipedia article with that title. Try a different one, for example "Delhi".')
    return;
  }

  $('.timeline').show();
  $('.entries').empty();

  var lastYear = '';
  Object.keys(timeline).forEach((t) => {
    var century = t[0]+ ''+ t[1];
    var className = '';
    if ( lastYear !== century ) {
        lastYear = century;
        className = 'big'
    }

    $entry = $('<div>').addClass('entry').append(
      $('<div>').addClass('title').addClass(className).text(t),
      $('<div>').addClass('body').text(timeline[t]),
    )


    $('.entries').append($entry);
  });

}

$(function () {
  $('#timeline-button').on('click', function () {
    $('#error').hide();

    // Check input string
    var title = $('#title')[0].value;
    if (title.trim() === '' ) return false;

    // UI changes
    $('#timeline-button').prop('value', 'Fetching timeline…');
    $('.lds-ripple').show();

    // Make API call
    getTimeline(title);
  });
})
