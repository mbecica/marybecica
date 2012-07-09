$(function() {
		$('.splash').height($(window).height() - $('header').outerHeight());	
		$('header').find('ul a').click(function() {
			splashOn(false, $(this));
		});
		$('header').find('#home').click(function() {
			splashOn(true);
		});

		var resumeLoad = false,
				workLoad = false;

		var splashOn = function(mode, link) {
			if (mode) {
				$('#main').hide();
				$('body').addClass('splashon');
				$('header').find('a').removeClass('active');
				$('.splash').css({'top':0}).show();
			} else {
				if ($('body').hasClass('splashon')) {
					var oTop = $('header').offset().top;
					$('.splash').animate({'top':-oTop}, 800, function() {
						$('.splash').hide();
					});
					$('header').animate({'top':-oTop}, 800, 
						function() {
							$(this).css({'top':'0px'});
							$('body').removeClass('splashon');
							$('#main').show();
				  });
				};
				$('header').find('a').removeClass('active');
				link.addClass('active');
				if (link.attr('id') == 'resumelink') {
					//load resume
					$('#resume').show();
					$('#work').hide();
					if (!resumeLoad) {
						makeResume();
					}
				} else if (link.attr('id') == 'worklink') {
					//load Work
					$('#resume').hide();
					$('#work').show();
					if (!workLoad) {
						makeWork();
					}
				}
			}
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
		var makeWork = function() {
			//Work
			var workEl = $('#work-template').html();
			var workTemplate = Handlebars.compile(workEl);
			$.ajax({
				url:"js/work.json",
				success:function(data) {
					$.each(data["work"], function(i, d) {
						$('#work').append(workTemplate(d));
					});
					workLoad = true;
				}
			});
		}
});

var launch = function(href) {
	window.open(href);
}

var show = function(images) {
	//Nothing yet
}
