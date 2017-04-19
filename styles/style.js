$(document).ready(function() {

  $('.scroll-link').click(function() {
    /* Act on the event */
    event.preventDefault();
    var target = $($(this).attr('href')).offset().top;


    $('body').stop(true, false).animate({scrollTop:target}, {duration:500},"easeInExpo");
  });

  $("#quicksearch").keyup(function(event) {
    /* Act on the event */
    var place = $(this).val();
    var target = $("#quickresult");
    if (place!='') {
      $.ajax({
        url: '/listsearch',
        type: 'GET',
        dataType: 'json',
        data: {place: place}
      })
      .done(function(response) {
        target.html('');
        var res='';
        res+='<ul class="list">';
          for (var i = 0; i < response.length; i++) {
            res+="<li class='list-item'> <a class='list-suggest-item' to="+response[i].name+">"+response[i].name+" , จังหวัด : "+response[i].province+"</a></li>";
        }
        res+='</ul>';
        target.html(res);
        $(".list-suggest-item").click(function(event) {
          /* Act on the event */
          window.location.href="/search?place="+$(this).attr('to');


        });
        console.log("result");;

        })
      .fail(function() {
        console.log("error");
      })
      .always(function() {
        console.log("complete");
      });
    }else{
      target.html('');
    }


  });
});
