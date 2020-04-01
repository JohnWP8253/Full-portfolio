<?php
$config = include('mail-config.php');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if(isset($_POST['email']) && !empty($_POST['email'])) {
	$name = $_POST['name'];
	$email = $_POST['email'];
	$message = $_POST['message'];
	$text = "Name : ".$name."\r\n". "Email : ".$email."\r\n". "Message :".$message;
	$to = $config['to'];
	$subject = ucfirst($name)." has a message for you";
	$txt = $text;
	$headers = "From: ".$email. "\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text\r\n";
	$mail = mail($to,$subject,$txt,$headers);
	
	if($mail) {
		$json['success'] = true;
		$json['message'] = 'Your message submitted successfully!';
	} else {
		$json['success'] = false;

		$json['message'] = 'Oops! Something went wrong';
	}
	echo json_encode($json);
	exit();
}
?>