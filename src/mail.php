<?php

$name = $_POST['name'];
$mail = $_POST['mail'];
$phone = $_POST['phone'];
$body = $_POST['body'];

$subject = "[r/o] consulta de $name";

$message = "
<html>
  <head>
    <title>$subject</title>
  </head>
  <body>
    <p>
      Mensaje de $name ($mail)<br>
      teléfono de contacto: $phone
    </p>
    <p>
      body: $body
    </p>
  </body>
</html>";

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers .= 'From: <hola@rodriguezortega.com>' . "\r\n";

function isValidEmail($email) {
  return filter_var($email, FILTER_VALIDATE_EMAIL)
    && preg_match('/@.+\./', $email);
}

if (isValidEmail($mail)) {
  mail("hola@rodriguezortega.com", $subject, $message, $headers);
}

echo "{ name: $name, mail: $mail, phone: $phone, body: $body }";
