$(function() {
		//Resume
		var resumeEl = $('#resume-template').html();
		var resumeTemplate = Handlebars.compile(resumeEl);
		$.ajax({
			url:"js/resume.json",
			success:function(data) {
				$.each(data["resume"], function(i, d) {
					$('#resume').append(resumeTemplate(d));
				});
			}
		});
});
