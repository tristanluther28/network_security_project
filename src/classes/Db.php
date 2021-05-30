<?php
class Db {
    protected function connect(){
        $servername = "alm-db.cpif5gmpkbjh.us-east-1.rds.amazonaws.com";
        $username = "testuser";
        $password = "DGjuKv6PE8yEpg62";
        $dbname = "fingerprint";
        try {
                $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
                // set the PDO error mode to exception
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                //return the connection value
                return $conn;
            }
        catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }
}
?>
