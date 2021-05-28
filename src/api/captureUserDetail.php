<?php

include('../services/logger.php');

$data = json_decode($_POST['data']);
$fcmToken =  $data->fcmToken;
$email =  $data->email;

$logger->notice('User Data: ', [
    'type' => 'user-data',
    'fcmToken' => $fcmToken,
    'email' => $email
]);

echo "OK";

?>