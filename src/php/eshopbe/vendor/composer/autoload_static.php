<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitc15e50eb01d02dc078c63d5283e29c8e
{
    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
        'eshopbe\\src\\classes\\BookProduct' => __DIR__ . '/../..' . '/src/classes/BookProduct.php',
        'eshopbe\\src\\classes\\DVDProduct' => __DIR__ . '/../..' . '/src/classes/DVDProduct.php',
        'eshopbe\\src\\classes\\DatabaseConnector' => __DIR__ . '/../..' . '/src/classes/DatabaseConnector.php',
        'eshopbe\\src\\classes\\FurnitureProduct' => __DIR__ . '/../..' . '/src/classes/FurnitureProduct.php',
        'eshopbe\\src\\classes\\Product' => __DIR__ . '/../..' . '/src/classes/Product.php',
        'eshopbe\\src\\classes\\ProductFactory' => __DIR__ . '/../..' . '/src/classes/ProductFactory.php',
        'eshopbe\\src\\classes\\Users' => __DIR__ . '/../..' . '/src/classes/Users.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->classMap = ComposerStaticInitc15e50eb01d02dc078c63d5283e29c8e::$classMap;

        }, null, ClassLoader::class);
    }
}
