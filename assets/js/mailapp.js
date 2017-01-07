jQuery(document).ready(function($){

	$(function() {

		var $form = $('#ajax-contact');
			// Set up an event listener for the contact form.
			$form.submit(function(event) {
		    // Stop the browser from submitting the form.
		    event.preventDefault();
				submitForm();
			});

			function submitForm(){
				// Serialize the form data.
				var formData = $form.serialize();
				$( "#form-messages p" ).innerHTML = "";
				$( "#formMessages" ).removeClass('error');

				// Submit the form using AJAX.
					$.ajax({
					  type: 'POST',
					  url: 'validate2.php',
						// $form.attr('action')
					  data: formData,
						dataType: 'json',
						encode: true,
					  success: function(data){
									 		if(data.success){
											 formSuccess();
										 } else {
											 $( "#form-messages p" ).innerHTML = data.errors;
											 $( "#form-messages" ).removeClass( "hidden" );
											 $( "#formMessages" ).addClass('error');
										 }
								}
							})

						// .done(function(data)) {
						// 	console.log(data);
						// 	if (data.success){
						// 					 formSuccess();
						// 				 } else {
						// 					 $( "#form-messages p" ).innerHTML = data.errors;
						// 					 $( "#form-messages" ).removeClass( "hidden" );
						// 					 $( "#formMessages" ).addClass('error');
						// 				 }

						//});
					}

					function formSuccess(){
							// Show success message.
						  $( "#form-messages p" ).text("Your message was successfully sent! Thank you for reaching out. I will respond within 24 hours.");
					    $( "#form-messages" ).removeClass( "hidden" );
							// Clear the form.
							$('#name').val('');
							$('#email').val('');
							$('#message').val('');
							// Hide the form.
							$('#ajax-contact').addClass("hidden");
							// Change button
							$('#submit').addClass("hidden");
							$( "<a href='#' data-dismiss='modal' class='btn btn-primary btn-lg cta'>Return to main page</a>" ).appendTo( "div.modal-footer" );
					}

	})
});
