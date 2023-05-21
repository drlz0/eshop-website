<?php

namespace eshopbe\src\classes;

class DatabaseConnector
{
    private $host = "actual_host";
    private $username = "actual_username";
    private $password = "actual_password";
    private $database = "actual_db";
    private $conn;

    public function __construct()
    {
        $this->conn = new \mysqli($this->host, $this->username, $this->password, $this->database);

        // Check for connection errors
        if ($this->conn->connect_error) {
            die('Connection failed: ' . $this->conn->connect_error);
        }
    }

    public function getConnection()
    {
        return $this->conn;
    }
}
