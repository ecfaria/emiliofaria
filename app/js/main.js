// Array shuffle
  function Shuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  }

  // Animations
  wow = new WOW({
    offset: 130
  });

  wow.init();

  // Instagram feed

  $.getJSON("https://api.instagram.com/v1/users/2964328/media/recent?access_token=2964328.5b9e1e6.cea5930827ed468c944fb3efa458a454&callback=?", function(result){
    var imagesArray = [];
    $.each(result.data, function(index, item){
      imagesArray.push(item.images.standard_resolution.url);
    });
    Shuffle(imagesArray);
    $.each(imagesArray, function(index, photo){
      if (index < 10) {
        $('#images').append('<img src="'+imagesArray[index]+'">');
      }
    });
  });