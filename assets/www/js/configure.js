// This is a JavaScript file

// make app_config object.
app_config = {};
$.ajaxSetup({ async: false });
$.getJSON("js/config.json"　,function(data){
  app_config = data;
});
$.ajaxSetup({ async: true });

// make Access page and Open page
$(function (){
//  console.log(app_config);
  var maps_url = "https://maps.googleapis.com/maps/api/staticmap";
  maps_url += "?zoom=17&size=320x320&sensor=false";
  maps_url += "&center=" + app_config.access.latitude + "," + app_config.access.longitude;
  var maps_link = "http://maps.google.com/maps";
  maps_link += "?q=" + app_config.access.latitude + "," + app_config.access.longitude;
  
  $('#zip_data').text(app_config.access.zip);
  $('#address_data').text(app_config.access.address1 + app_config.access.address2 + app_config.access.address3 + app_config.access.address4);

  $.each(app_config.access.stations, function(){
    $('#stations_data').append("<li>" + this + "</li>");   
  });
  $('#tel_data').text(app_config.access.tel);
  $('#map_data').attr("src",maps_url);
  $('#maps_link').attr("href",maps_link);
  $('#hours_data').text(app_config.open.hours);
  $('#day_data').text(app_config.open.day);
  $('#temporary_closure_data').text(app_config.open.temporary_closure);

});

// make Information page
$(function (){
  $.ajax({
    url: app_config.feed,
    dataType: 'xml'
  }).done(function(feed){
    $(feed).find("item").each(function(){

      var feed_item =  "<li><a rel='external' target='_blank' href='"
      + $(this).find('link').text()
      + "'><h2>" 
      + $(this).find('title').text() 
      + "</h2>"
      + "<p>"
      + $(this).find('description').text().slice(0, 100)
      + "</p></a>"
      + "</li>";
            
      $("#feed").append(feed_item).listview();
      $("#feed").listview('refresh');
            

    });
  });
});

