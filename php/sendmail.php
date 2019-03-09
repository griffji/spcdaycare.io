<?php
if($_POST)
{
	$to_email   	= "youremail@email.com"; //Recipient email, Replace with own email here
	
	//check if its an ajax request, exit if not
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
		
		$output = json_encode(array( //create JSON data
			'type'=>'error', 
			'text' => 'Sorry Request must be Ajax POST'
		));
		die($output); //exit script outputting json data
    } 
	
	//Sanitize input data using PHP filter_var().
	$user_name		= filter_var($_POST["user_name"], FILTER_SANITIZE_STRING);
	$user_email		= filter_var($_POST["user_email"], FILTER_SANITIZE_EMAIL);
	$subject		= filter_var($_POST["subject"], FILTER_SANITIZE_EMAIL);
	$message		= filter_var($_POST["msg"], FILTER_SANITIZE_STRING);
	
	//additional php validation
	if(strlen($user_name)<2){ // If length is less than 4 it will output JSON error.
		$output = json_encode(array('type'=>'error', 'text' => '<div class="alert alert-danger" role="alert">Name is too short or empty!</div>'));
		die($output);
	}
	if(!filter_var($user_email, FILTER_VALIDATE_EMAIL)){ //email validation
		$output = json_encode(array('type'=>'error', 'text' => '<div class="alert alert-danger" role="alert">Please enter a valid email!</div>'));
		die($output);
	}	
	if(strlen($message)<3){ //check emtpy message
		$output = json_encode(array('type'=>'error', 'text' => '<div class="alert alert-danger" role="alert">Too short message! Please enter something.</div>'));
		die($output);
	}
	
	//email body
	$message_body = "\r\nName:".$user_name."\r\nSubject: ".$subject."\r\nEmail: ".$user_email."\r\nMessage: ".$message;
	
	//proceed with PHP email.
	$headers = 'From: '.$user_name.'' . "\r\n" .
	'Reply-To: '.$user_email.'' . "\r\n" .
	'X-Mailer: PHP/' . phpversion();
	
	$send_mail = mail($to_email, "\rMessage", $message_body, $headers);
	
	if(!$send_mail)
	{
		//If mail couldn't be sent output error. Check your PHP email configuration (if it ever happens)
		$output = json_encode(array('type'=>'error', 'text' => '<p>Could not send mail! Please check your PHP mail configuration.</p>'));
		die($output);
	}else{
		$output = json_encode(array('type'=>'message', 'text' => '<div class="alert alert-success" role="alert">
		Hi '.$user_name .', Thank you very much for your message, we will contact you soon.</div>'));
		die($output);
	}
}
?>