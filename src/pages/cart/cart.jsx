import React from "react";
import { useCookies } from "react-cookie";
import "../../styles/cart.css";

const Cart = () => {
  const [cookies, setCookie] = useCookies(["cart"]);

  const getTotalPrice = () => {
    let total = 0;
    if (Array.isArray(cookies.cart)) {
      cookies.cart.forEach((item) => {
        total += Number(item.price);
      });
    }
    return total.toFixed(2);
  };

  const handleDeleteFromCart = (sku) => {
    // Get the existing cart data from the cookie
    const cartData = cookies.cart || [];

    // Filter out the item with the specified SKU
    const updatedCartData = cartData.filter((item) => item.sku !== sku);

    // Update the cart data in the cookie
    setCookie("cart", updatedCartData, { path: "/" });
  };

  return (
    <div className="cart">
      <h1>Cart</h1>
      <table>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Name</th>
            <th>Price</th>
            <th>Product Type</th>
            <th>Details</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(cookies.cart) && cookies.cart.length > 0 ? (
            cookies.cart.map((item) => (
              <tr key={item.sku}>
                <td>{item.sku}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.product_type}</td>
                <td>{item.details}</td>
                <td>
                  <button onClick={() => handleDeleteFromCart(item.sku)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Cart is empty</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="total-price">Total Price: ${getTotalPrice()}</div>
      <button className="payment-button">Dummy Payment</button>
    </div>
  );
};

export default Cart;
