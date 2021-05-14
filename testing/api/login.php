<?php

$data = json_decode($_POST['data']);
$email =  $data->email;
$password = $data->password;

$response = array('email' => $email, 'password' => $password);

echo json_encode($response);

?>