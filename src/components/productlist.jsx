import React, { useState, useEffect } from 'react';
import ProductService from '../services/productservice.js';
import { useNavigate } from 'react-router-dom';
import '../styles/productlist.css';
import Notification from './notification.jsx';
import { Armchair, BookBookmark, Disc } from 'phosphor-react';
import { useCookies } from 'react-cookie';

const ProductList = () => {
  const PATH_TO_GET_DATA = '/eshopbe/products/getdata/getdata.php';
  const PATH_TO_DELETE_DATA = '/eshopbe/products/delete/deleteproducts.php';
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState('');
  const [cookies, setCookies] = useCookies(['cart']);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    ProductService.getData(
      PATH_TO_GET_DATA,
      (data) => {
        setProducts(data);
      },
      (error) => {
        console.error('Failed to fetch products:', error);
      }
    );
  };

  const handleMassDeleteClick = () => {
    const selectedProducts = products.filter((product) => product.checked);
    const skusToDelete = selectedProducts.map((product) => product.sku);

    // Delete the items from the cart
    // const updatedCartData = cookies.cart.filter((item) => !skusToDelete.includes(item.sku));
    // document.cookie = `cart=${JSON.stringify(updatedCartData)}; path=/`;

    // Remove the deleted products from the state
    const updatedProducts = products.filter((product) => !skusToDelete.includes(product.sku));
    setProducts(updatedProducts);

    // Sending Request
    const requestData = {
      skusToDelete: skusToDelete,
    };

    ProductService.deleteProducts(
      PATH_TO_DELETE_DATA,
      requestData,
      () => {},
      (error) => {
        console.error('Failed to delete products:', error);
      }
    );
  };

  const handleCheckboxChange = (event, sku) => {
    const updatedProducts = products.map((product) => {
      if (product.sku === sku) {
        return {
          ...product,
          checked: event.target.checked,
        };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const handleAddButtonClick = () => {
    navigate('/addproduct');
  };

  const handleBuyButtonClick = (product) => {
    // Get the existing cart data from the cookies
    const cartData = cookies.cart || [];

    // Check if the product is already in the cart
    const isProductInCart = cartData.some((item) => item.sku === product.sku);

    if (!isProductInCart) {
      // Add the product to the cart
      const cartItem = {
        sku: product.sku,
        name: product.name,
        price: product.price,
        product_type: product.product_type,
        details: getProductDetails(product),
      };
      cartData.push(cartItem);

      // Update the cart data in the cookies
      setCookies('cart', cartData);
      setNotification('Product added to cart!');
    } else {
      setNotification('Product is already in the cart!');
    }
  };

  const getProductDetails = (product) => {
    if (product.product_type === 'DVD') {
      return `Size: ${product.size_mb} MB`;
    } else if (product.product_type === 'Book') {
      return `Weight: ${product.weight_kg} KG`;
    } else if (product.product_type === 'Furniture') {
      return `Dimensions: ${product.height_cm}x${product.width_cm}x${product.length_cm}`;
    }
    return '';
  };

  return (
    <div className="home">
      <div>
        <div className="above-product-list">
          <h1>Product List</h1>
          <button id="add-btn" onClick={handleAddButtonClick}>
            ADD
          </button>
          <button id="delete-product-btn" onClick={handleMassDeleteClick}>
            MASS DELETE
          </button>
        </div>
        <div>{notification && <Notification message={notification} />}</div>
        <br />
        <div className="product-container">
        {products
          .sort((a, b) => a.sku.localeCompare(b.sku))
          .map(product => (
            <div className="product-item" key={product.sku}>
              <div className="product-field">{product.sku}</div>
              <div className="product-field">{product.name}</div>
              <div className="product-field">{product.price} $</div>
              <div className="product-field">
                {product.product_type === 'DVD' && (
                  <div className="product-icons">
                    Size: {product.size_mb} MB
                    <span>
                      <Disc size={45} />
                    </span>
                  </div>
                )}
                {product.product_type === 'Book' && (
                  <div className="product-icons">
                    Weight: {product.weight_kg} KG
                    <span>
                      <BookBookmark size={45} />
                    </span>
                  </div>
                )}
                {product.product_type === 'Furniture' && (
                  <div className="product-icons">
                    Dimensions: {product.height_cm}x{product.width_cm}x{product.length_cm}
                    <span>
                      <Armchair size={45} />
                    </span>
                  </div>                )}
              </div>
              <div className="product-field">
                <input
                  className="delete-checkbox"
                  type="checkbox"
                  checked={product.checked || false}
                  onChange={(event) => handleCheckboxChange(event, product.sku)}
                />
                <div className="product-field">
                <button onClick={() => handleBuyButtonClick(product)}>Buy</button>
              </div>
              </div>
            </div>
          ))}
      </div>
    </div>
    </div>
  );
};

export default ProductList;
