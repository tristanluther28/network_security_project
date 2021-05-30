<?php
class Users extends Db {
    //Fix input with escape characters
    function escape($value){
        $search = array("\\",  "\x00", "\n",  "\r",  "'",  '"', "\x1a");
        $replace = array("\\\\","\\0","\\n", "\\r", "\'", '\"', "\\Z");
    
        return str_replace($search, $replace, $value);
    }
    //Insert a new user data
    public function add($uid, $browser, $ip, $os, $device_type, $os_version, $browser_version, $timezone, $fcm){
        $sql = "INSERT INTO users (browser, ip, os, device_type, time_zone, os_version, browser_version, uid_firebase, fcmToken) VALUES ('$browser', '$ip', '$os', '$device_type', '$timezone', '$os_version', '$browser_version', '$uid', '$fcm')";
        $conn = $this->connect();
        $conn->query($sql);
        return $conn->lastInsertId();
    }
    //Check for similar uid within a certain timestamp
    public function select_uid($uid){
        $sql = "SELECT * FROM users WHERE uid_firebase='$uid'";
        $result = $this->connect()->query($sql);
        if($result->rowCount() > 0){
            while($row = $result->fetch()){
                $data[] = $row;
            }
            return $data;
        }
    }
    //Check for similar id
    public function select_id($id){
        $sql = "SELECT * FROM users WHERE id='$id'";
        $result = $this->connect()->query($sql);
        if($result->rowCount() > 0){
            while($row = $result->fetch()){
                $data[] = $row;
            }
            return $data[0]; //Should only have one instance so return the first in array
        }
    }
}
?>