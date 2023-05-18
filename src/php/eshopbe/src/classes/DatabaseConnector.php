<?php

namespace eshopbe\src\classes;

class DatabaseConnector
{
    private $host = "localhost";
    private $username = "id20766943_drlzz";
    private $password = "LolTree3#";
    private $database = "id20766943_eshop_mysql";
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
