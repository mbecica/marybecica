$(function() {
		
    $('header').find('ul a').click(function() {
			splashOff();
		});
		$('header').find('#home').click(function() {
			splashOn();
		});

		var resumeLoad = false;

		var splashOn = function() {
      $('#main').hide();
      $('body').addClass('splashon');
      $('header').css({'position':'fixed', 'top':'auto'});
      imgGen();
		}
    var splashOff = function() {
      var oTop = $(window).height() - $('header').outerHeight();
      $('.splash').css('background-image', 'none');
      $('header').css({'position':'relative', 'top':oTop}).animate({'top':0}, 800, 
        function() {
          $('body').removeClass('splashon');
          $('#main').show();
      });
      //load resume
      $('#resume').show();
      if (!resumeLoad) {
        makeResume();
      }
    }
    var imgGen = function() {
      //Generate background image here
      $('.splash').css('background-image', "url(../img/turner.jpg)");
    }
		var makeResume = function() {
			//Resume
			var resumeEl = $('#resume-template').html();
			var resumeTemplate = Handlebars.compile(resumeEl);
			$.ajax({
				url:"js/resume.json",
				success:function(data) {
					$.each(data["resume"], function(i, d) {
						$('#resume').append(resumeTemplate(d));
					});
					resumeLoad = true;
				}
			});
		}
    imgGen();
});
