<?php

namespace eshopbe\src\classes;

class Users
{
    protected $name;
    protected $login;
    protected $password;

    public function __construct($name = null, $login = null, $password = null)
    {
        $this->name = $name;
        $this->login = $login;
        $this->password = $password;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setLogin($login)
    {
        $this->login = $login;
    }

    public function getLogin()
    {
        return $this->login;
    }

    public function setPassword($password)
    {
        $this->password = $password;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function saveUserToDatabase($conn)
    {
        $name = $this->getName();
        $login = $this->getLogin();
        $password = $this->getPassword();

        $query = "INSERT INTO users (name, login, password) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('sss', $name, $login, $password);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }


      public function loginExistsInDatabase($conn, $login)
      {
          $query = "SELECT * FROM users WHERE login = ?";
          $stmt = $conn->prepare($query);
          $stmt->bind_param('s', $login);
          $stmt->execute();

          $result = $stmt->get_result();

          if ($result === false) {
              return false;
          }

          return $result->num_rows > 0;
      }

    public function validateLogin($conn, $login, $password)
    {
        $stmt = $conn->prepare('SELECT * FROM users WHERE login = ?');
        $stmt->bind_param('s', $login);
        $stmt->execute();

        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $row = $result->fetch_assoc();
            $hashedPassword = $row['password'];

            if (password_verify($password, $hashedPassword)) {
                $this->name = $row['name'];
                return true;
            }
        }

        return false;
    }


}
