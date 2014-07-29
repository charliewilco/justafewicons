/**
 * parses any RSS/XML feed through Google and returns JSON data
 * source: http://stackoverflow.com/a/6271906/477958
 */

 
function parseRSS(url, location, container) {
  $.ajax({
    url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=5&callback=?&q=' + encodeURIComponent(url),
    dataType: 'json',
    success: function(data) {
      //console.log(data.responseData.feed);
      $(location).prepend('<h3>'+capitaliseFirstLetter(data.responseData.feed.title)+'</h3>').append('<ul id="rsslist"></ul>');

      $.each(data.responseData.feed.entries, function(key, value){
        var thehtml = '<li>'+value.title+'&nbsp;<a href="'+value.link+'" target="_blank">&rarr;</a></li>';
        $('#rsslist').append(thehtml);
      });
    }
  });
}

/**
 * Capitalizes the first letter of any string variable
 * source: http://stackoverflow.com/a/1026087/477958
 */
function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
parseRSS('http://arwhd.co/feed.xml', '#arwhd', 'ul');
