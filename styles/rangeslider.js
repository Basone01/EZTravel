$('input[type=range].styled-range#minprice').on('input', function(e){
  minSliderEvent(e);
}).trigger('input');

function minSliderEvent(e){
  var min = e.target.min,
      max = e.target.max,
      val = e.target.value;
  dis = $('#minprice-display');
  dis.val(val);
  $(e.target).css({
    'backgroundSize': (val - min) * 100 / (max - min) + '% 100%'
  });
}

$('input[type=range].styled-range#maxprice').on('input', function(e){
  maxSliderEvent(e);
}).trigger('input');

function maxSliderEvent(e){
  var min = e.target.min,
      max = e.target.max,
      val = e.target.value;
  dis = $('#maxprice-display');
  dis.val(val);
  $(e.target).css({
    'backgroundSize': (val - min) * 100 / (max - min) + '% 100%'
  });
}

$('input[type=range].styled-range#minprice').on('change', function(e){
  var val=e.target.value;
  var max=Number($('#maxprice-display').val());
  var dis=$('#minprice-display');
  if(val>max){
    $(e.target).val(max);
    dis.val(max);
    $(e.target).css({
      'backgroundSize': (max - e.target.min) * 100 / (e.target.max - e.target.min) + '% 100%'
    });
  }



});
$('input[type=range].styled-range#maxprice').on('change', function(e){
  var val=e.target.value;
  var min=Number($('#minprice-display').val());
  var dis=$('#maxprice-display');
  if(val<min){
    $(e.target).val(min);
    dis.val(min);
    $(e.target).css({
      'backgroundSize': (min - e.target.min) * 100 / (e.target.max - e.target.min) + '% 100%'
    });
  }
});
$('#maxprice-display').focusout(function(event) {
   maxInputEvent(event)
});

function maxInputEvent(event){
  var min = event.target.min,
      max = event.target.max;
  var dis=$(event.target);
  var minprice=Number($('#minprice-display').val());
  if(Number(dis.val())>event.target.max){
    dis.val(event.target.max);
  }else if (Number(dis.val())<minprice) {
    dis.val(minprice);
  }
  var slider=$('#maxprice');
  slider.val(dis.val());
  slider.css({
    'backgroundSize': (dis.val() - min) * 100 / (max - min) + '% 100%'
  });
}

$('#minprice-display').focusout(function(event) {
  minInputEvent(event)
});

function minInputEvent(event){
  var min = event.target.min,
      max = event.target.max;
  var dis=$(event.target);
  var maxprice=Number($('#maxprice-display').val());
  if(Number(dis.val())<event.target.min){
    dis.val(event.target.min);
  }else if (Number(dis.val())>maxprice) {
    dis.val(maxprice);
  }
  var slider=$('#minprice');
  slider.val(dis.val());
  slider.css({
    'backgroundSize': (dis.val() - min) * 100 / (max - min) + '% 100%'
  });
}
