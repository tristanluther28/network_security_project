<?php

    //Debugging statements
    
    error_reporting(-1);
    ini_set('display_errors', 'On');
    set_error_handler("var_dump");
    
    
    require_once "../classes/Db.php";
    require_once "../classes/Users.php";
    require_once '../../vendor/autoload.php';
    include('../services/logger.php');
    
    //Use the Matomo Device Detector (https://github.com/matomo-org/device-detector)
    use DeviceDetector\DeviceDetector;
    use DeviceDetector\Parser\Device\AbstractDeviceParser;

    session_start();
    //Make sure the get var with the uid is given, otherwise there was an error
    if(isset($_GET['uid'])&&isset($_GET['fcm'])){
        //Create a user object
        $user = new Users();
        //Escape the uid
        $uid = $user->escape($_GET['uid']);
        //Escape the fcm
        $fcm = $user->escape($_GET['fcm']);
        //Get device information
        $dd = new DeviceDetector($_SERVER['HTTP_USER_AGENT']);
        $dd->parse();
        // //Get the browser type
        $browser_array = $dd->getClient();
        $browser = $browser_array['name'];
        //Get the operating system
        $os_array = $dd->getOs();
        $os = $os_array['name'];
        //Get the public IP address. Proxy or VPN will spoof this
        $ip = "67.169.208.115";
        //Get the device type
        if($dd->isSmartphone()){
            $device_type = "Smartphone";
        }
        else if($dd->isTablet()){
            $device_type = "Tablet";
        }
        else if($dd->isConsole()){
            $device_type = "Console";
        }
        else if($dd->isCarBrowser()){
            $device_type = "Car Computer";
        }
        else if($dd->isTV()){
            $device_type = "Smart TV";
        }
        else{
            //Default to desktop computer
            $device_type = "Desktop/Laptop";
        }
        //Get the time zone
        //Grab current user location information based on public IP Address
        $url = 'http://ip-api.com/json/'.$ip;
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_HTTPGET, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response_json = curl_exec($ch);
        curl_close($ch);
        $ip_api=json_decode($response_json, true);
        $timezone = $ip_api['timezone'];
        $timezone = $user->escape($timezone);
        //Get the os verion
        $os_version = $os_array['version'];
        //Get the browser version
        $browser_version = $browser_array['version'];
        //Add this user login to the db
        $user_id = $user->add($uid, $browser, $ip, $os, $device_type, $os_version, $browser_version, $timezone, $fcm);
        //Add this login to the session
        $_SESSION['id'] = $user_id;
        //Post to CloudWatch 
        $logger->notice('User Data: ', [
            'type' => 'user-data',
            'uid' => $uid,
            'fcmToken' => $fcm,
            'os' => [
                'type' => $os,
                'version' => $os_version
            ],
            'browser' => [
                'type' => $browser,
                'version' => $browser_version
            ],
            'timezone' => $timezone,
            'deviceType' => $device_type,
            'ip' => $ip
        ]);
        //Direct the user to the details page with the user id 
        header('Location: details.php?id='.$user_id);
    }
    else{
        echo 'Hrrrrrrrrg! Something went wrong, go back.';
    }
?>