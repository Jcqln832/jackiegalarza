<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);


$name = $email = $message = $recipient = $subject = $email_content = "";
$errors = array();
$data = array();

if($_SERVER['REQUEST_METHOD'] == 'POST') {

   //check if it's an ajax request, exit if not
    // if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
    //     $errors['ajax'] = 'Request must be an Ajax request.';
    // }

  //check $_POST vars are set, exit if any missing
  	if(!isset($_POST["name"]) || !isset($_POST["email"]) || !isset($_POST["message"]))
    {
  	 $errors['empty'] = 'One or more input fields are empty. Please complete the form and try again.';
    }

   //sanitize input data using PHP filter_var().
      $name = filter_var(trim($_POST["name"]), FILTER_SANITIZE_STRING);
      $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
      $message = filter_var(trim($_POST["message"]), FILTER_SANITIZE_STRING);

   //check for a proper email
      if(!filter_var($email, FILTER_VALIDATE_EMAIL)) //email validation
      	{
      	$errors['invalid'] = 'Please enter a valid email!';
      	}

    //Check errors array. If empty, try to send email.    
      if ( ! empty($errors)) {
        $data['success'] = false;
        $data['errors'] = $errors;
        echo json_encode($data);
      } else {

       /*** Prepare the message for the e-mail ***/
         $recipient = "jcqlnray@gmail.com";
         $subject = "New form message from" .  $name;
         $email_content = "Here is the newest submission from the Get In Touch form: \n\n";
         $email_content .= "Name: " . $name . "\n";
         $email_content .= "Email: " . $email . "\n\n";
         $email_content .= "Comments: " . $message;

      /*** Send the message ***/
        $sentMail = mail($recipient, $subject, $email_content);
        
      	if(!$sentMail)
      	{ 
          $errors['problem'] = 'Something went wrong and your message could not be sent. Please try again later.';
          $data['success'] = false;
          $data['errors'] = $errors;
          echo json_encode($data);
      	} else {
          $data['success'] = true;
          $data['message'] = "success";
          echo json_encode($data);
        }
      }


     
        

}

?>
