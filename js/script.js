   $(document).ready(function(){
	   $(window).bind('scroll', function() {
	   var navHeight = $( window ).height() - 70;
			 if ($(window).scrollTop() > navHeight) {
				 $('nav').addClass('fixed');
			 }
			 else {
				 $('nav').removeClass('fixed');
			 }
       });    
       
  function filterPath(string) {
  return string
    .replace(/^\//,'')
    .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
    .replace(/\/$/,'');
  }
  var locationPath = filterPath(location.pathname);
  var scrollElem = scrollableElement('html', 'body');
 
  $('a[href*=#]').each(function() {
    var thisPath = filterPath(this.pathname) || locationPath;
    if (  locationPath == thisPath
    && (location.hostname == this.hostname || !this.hostname)
    && this.hash.replace(/#/,'') ) {
      var $target = $(this.hash), target = this.hash;
      if (target) {
        var targetOffset = $target.offset().top;
        $(this).click(function(event) {
          event.preventDefault();
          $(scrollElem).animate({scrollTop: targetOffset}, 900, function() {
            location.hash = target;
          });
        });
      }
    }
  });
 
  // use the first element that is "scrollable"
  function scrollableElement(els) {
    for (var i = 0, argLength = arguments.length; i <argLength; i++) {
      var el = arguments[i],
          $scrollElement = $(el);
      if ($scrollElement.scrollTop()> 0) {
        return el;
      } else {
        $scrollElement.scrollTop(1);
        var isScrollable = $scrollElement.scrollTop()> 0;
        $scrollElement.scrollTop(0);
        if (isScrollable) {
          return el;
        }
      }
    }
    return [];
  }
       function transitionBox(from, to) {
    function next() {
        var nextTo;
        if (to.is(":last-child")) {
            nextTo = to.closest(".boxes").children("div").first();
        } else {
            nextTo = to.next();
        }
        to.fadeIn(500, function () {
            setTimeout(function () {
                transitionBox(to, nextTo);
            }, 4000);
        });
    }
    
    if (from) {
        from.fadeOut(500, next);
    } else {
        next();
    }
}
	});

  /**************************/
 /*         FORM           */
/**************************/

 function checkForm() {
	 var wrong = false;
	 var illegalchars = /[^a-zA-Zא-ת]/;
     var illegalnum = /[^0-9\-]/;
	 var mailfilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;


      /*     CHECK NAME     */

     var name = document.forms['contact_form']['name'].value;
	 if (name == '') {
	   show_wrong('please enter name','name');wrong = true;
      }
	 
	 else if (name.length<2 && name != '') {
	   show_wrong('name too short','name');wrong = true;
      }
	 
     else if (illegalchars.test(name)) {
       show_wrong('incorrect name','name');wrong = true;
      }

     else show_correct('name');


       /*    CHECK EMAIL ADDRESS   */
     
    var mail = document.forms['contact_form']['email'].value;

    if (mail == '') {
	 show_wrong('please enter e-mail adress','email');wrong = true;
    }

    else if (!mailfilter.test(mail) && mail != '') {
	 show_wrong('incorrect e-mail address','email');wrong = true;
    }

    else show_correct('email');

     
     /*    CHECK IF ANY WRONG FIELD   */
     	 
	 if (!wrong) {
	   return true;
	  }
	 else
	  {
	   return false
	  }
 }

function show_wrong(comment,field) {
 document.forms['contact_form'][field].style.border = '2px solid #ff0000';
 document.forms['contact_form'][field].style.backgroundColor = '#ffffff';
 document.forms['contact_form'][field].style.color = '#ff0000';
 document.forms['contact_form'][field].value = comment;
}

function show_correct(field) {
 document.forms['contact_form'][field].style.border = 'none';
 document.forms['contact_form'][field].style.backgroundColor = '#e0e0e0';
 document.forms['contact_form'][field].style.color = '#000000';
}

function change_color() {
 document.forms['contact_form']['name'].value = '';
 document.forms['contact_form']['name'].style.color = '#000000';
}