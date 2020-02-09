var contactMessages = [
	"what's on your mind?",
	"drop a line!",
	"we'd love to hear from you!"
];

function escapeHTML(unsafe) {
	return unsafe
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
 }

$(document).ready(function() {
	// Pick a random message
	let contactMessage = contactMessages[Math.floor(Math.random() * contactMessages.length)];
	$("#contact-message").text(contactMessage);
	
	$("#contact-form").submit(function(event) {
		event.preventDefault();
		$.ajax({
			url: $("#contact-form").prop("action"),
			data: {
				name: $("#contact-name").val(),
				from: $("#contact-email").val(),
				subject: $("#contact-subject").val(),
				msg: $("#contact-message").val(),
				to: $("#contact-recipient").val()
			},
			dataType: "json"
		}).done(function(res) {
			if (res.status === "success") {
				M.toast({html: "message sent!"});
//				$("#contact-form").trigger("reset");
				$("#contact-form [name]").prop("disabled", "disabled");
			} else if (res.status === "error") {
				reason = escapeHTML(res.payload.reason);
				M.toast({
					html: "<b>error</b><p><pre>" + reason + "</pre></p>",
					classes: "block"
				});
				console.log(res);
			} else {
				M.toast({
					html: "<b>error</b><p>Something weird happened...</p>",
					classes: "block"
				});
				console.log(res);
			}
		})
	});
});