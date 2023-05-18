<?php

namespace eshopbe\src\classes;

use eshopbe\src\classes\DVDProduct;
use eshopbe\src\classes\FurnitureProduct;
use eshopbe\src\classes\BookProduct;

class ProductFactory
{
    public static function createProduct($productType, $data)
    {

        switch ($productType) {
            case 'DVD':
                $size = $data['size'];
                return new DVDProduct($data['sku'], $data['name'], $data['price'], $data['productType'], $size);
            case 'Furniture':
                $height = $data['height'];
                $width = $data['width'];
                $length = $data['length'];
                return new FurnitureProduct($data['sku'], $data['name'], $data['price'], $data['productType'], $height, $width, $length);
            case 'Book':
                $weight = $data['weight'];
                return new BookProduct($data['sku'], $data['name'], $data['price'], $data['productType'], $weight);
            default:
                return null;
        }
    }
}
