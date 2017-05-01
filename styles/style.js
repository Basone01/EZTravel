
$(document).ready(function() {
// nav scroll
  $(document).scroll(function(event) {
    var top=$(this).scrollTop();
    if(top>0){
      $('nav.nav').addClass('nav-fixed');
    }else{
      $('nav.nav').removeClass('nav-fixed');
    }

  });

  // sumbit quicksearch
  $('#submitsearch').click(function(event) {
    event.preventDefault();
    var text=$('#quicksearch').val();
    if(text!=''){
      window.location.href="/search?keyword="+text;
    }else{
      alert("Please type your keyword to let us find it for you.")
    }

  });
// click and scroll
  $('.a-link').click(function() {
    event.preventDefault();
    var href = $(this).attr('href');
    if(href!=''){
      var target = $(href).offset().top;
      $('body').stop(true, false).animate(
        {scrollTop:target},
        {duration:500},
        "easeInExpo"
      );
    }

  });

// quicksearch display result

  $("#quicksearch").focusin(function(event) {
    var dis=$("#quickresult");
    var input=$(this);
    input.addClass('span');
    setTimeout(function(){
      if(input.hasClass('span'))
      dis.addClass('span');
    },500);

  });
  $("#quicksearch").focusout(function(event) {
    var dis=$("#quickresult");
    var input=$(this);
    if(input.val()==''){
      dis.removeClass('span');
      input.removeClass('span');
    }

  });

// quicksearch auto suggest

  $("#quicksearch").keyup(function(event) {
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
        res+='<ul class="quicksearch-list">';
          for (var i = 0; i < response.length; i++) {
            res+="<li class='list-item'> <a href=\"\" class='list-suggest-item' to="
            +response[i].name+"><span>"
            +response[i].name+"</span> <span>จังหวัด : "
            +response[i].province
            +"</span></a></li>";
        }
        res+='</ul>';
        target.html(res);
        $(".list-item a").click(function(event) {
          /* Act on the event */
          window.location.href="/search?place="+$(this).attr('to');
        });

        })
      .fail(function() {
        console.log("error");
      });
    }else{
      target.html('');
    }
  });





});
