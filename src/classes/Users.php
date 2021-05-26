<?php
class User extends Db {
    //Fix input with escape characters
    function escape($value){
        $search = array("\\",  "\x00", "\n",  "\r",  "'",  '"', "\x1a");
        $replace = array("\\\\","\\0","\\n", "\\r", "\'", '\"', "\\Z");
    
        return str_replace($search, $replace, $value);
    }
    //Insert a new user data
    public function add($firstName, $lastName, $email, $hash){
        $sql = "INSERT INTO user (firstName, lastName, email, password) VALUES ('$firstName', '$lastName', '$email', '$hash')";
        $this->connect()->query($sql);
    }
    //Check for similar uid within a certain timestamp
    public function select_uid($uid){
        $sql = "SELECT * FROM users WHERE uid='$uid'";
        $result = $this->connect()->query($sql);
        if($result->rowCount() > 0){
            while($row = $result->fetch()){
                $data[] = $row;
            }
            return $data;
        }
    }
}
?>