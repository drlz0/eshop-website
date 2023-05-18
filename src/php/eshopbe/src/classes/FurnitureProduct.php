<?php

namespace eshopbe\src\classes;

use eshopbe\src\classes\Product;

class FurnitureProduct extends Product
{
    protected $height;
    protected $width;
    protected $length;

    public function __construct($sku, $name, $price, $productType, $height, $width, $length)
    {
        parent::__construct($sku, $name, $price, $productType);
        $this->height = $height;
        $this->width = $width;
        $this->length = $length;
    }

    public function setHeight($height)
    {
        $this->height = $height;
    }

    public function getHeight()
    {
        return $this->height;
    }

    public function setWidth($width)
    {
        $this->width = $width;
    }

    public function getWidth()
    {
        return $this->width;
    }

    public function setLength($length)
    {
        $this->length = $length;
    }

    public function getLength()
    {
        return $this->length;
    }

    public function getInsertQuery()
    {
        return "INSERT INTO furniture_products (sku, height_cm, width_cm, length_cm) VALUES (?,?,?,?)";
    }

    public function bindParameters($stmt)
    {
        $sku = $this->getSku();
        $height = $this->getHeight();
        $width = $this->getWidth();
        $length = $this->getLength();
        
        $stmt->bind_param('ssss', $sku, $height, $width, $length);
    }

    public function saveSubProductToDatabase($conn)
    {
        $sql = $this->getInsertQuery();
        $stmt = $conn->prepare($sql);
        $this->bindParameters($stmt);

        if ($stmt->execute()) {
            echo 'Furniture product saved to the database successfully!';
        } else {
            echo 'Failed to save furniture product to the database: ' . $stmt->error;
        }

        $stmt->close();
    }
}
