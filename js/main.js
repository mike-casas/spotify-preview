$('#tracks-container').perfectScrollbar();
var source   = $("#track-template").html();
var template = Handlebars.compile(source);

$('#input-finder').keyup(function(event) {
  if ( event.which == 13 && !!$.trim(this.value).length) {
    var text=$('#input-finder').val();
    $.ajax({
      url: 'https://api.spotify.com/v1/search?q='+text+'&type=track',
      type: 'GET',
      dataType: 'json',
    })
    .done(function(data) {
        if(data.tracks.items.length===0){
          $('#tracks-container').html('<div class="brand_water">Track, Not Found</div>');
        }else{
          var html= template({'track':data.tracks.items});
          $('#tracks-container').html(html);
        }
      $('#input-finder').val('');
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });
  }else{
    $('#tracks-container').html('<div class="brand_water">Please, input the name</div>');
  }
});
