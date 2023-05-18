import React, { useState } from "react";
import "../styles/productform.css";

const ProductForm = () => {
  const [selectedType, setSelectedType] = useState("");

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const renderForm = () => {
    switch (selectedType) {
      case "DVD":
        return (
          <div className="form-content">
            <div className="form-row">
              <p>Please provide size for DVD</p>
            </div>
            <div className="form-row">
              <label htmlFor="size">Size (MB):</label>
              <input type="text" id="size" maxLength="10" />
            </div>
            <div className="form-row">
              <p>
                Sample DVD Description. <br></br>
                <br></br>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                dignissim lectus sed lectus consectetur, nec iaculis dui luctus.
                Donec sodales massa nunc, sed semper tellus fermentum id.
                Suspendisse euismod laoreet diam, sed sagittis enim aliquet ac.
                Nam augue ipsum, euismod vel faucibus vel, dictum quis lorem.
                Sed lacinia lectus vel est tincidunt gravida. Nunc a sem ut
                lacus molestie sagittis. Nullam ipsum lectus, sodales ultricies
                tempus iaculis, sollicitudin euismod tortor. Nam eleifend sed
                tellus id malesuada. Curabitur fringilla purus vel sapien
                ullamcorper, in consectetur ligula pretium. Suspendisse ut
                facilisis nunc. In eleifend eros justo, et accumsan odio egestas
                ac. Sed tempus vitae urna sit amet aliquam.
              </p>
            </div>
          </div>
        );
      case "Furniture":
        return (
          <div className="form-content">
            <div className="form-row">
              <p>Please provide dimensions for Furniture</p>
            </div>
            <div className="form-row">
              <label htmlFor="height">Height (CM):</label>
              <input type="text" id="height" maxLength="10" />
            </div>
            <div className="form-row">
              <label htmlFor="width">Width (CM):</label>
              <input type="text" id="width" maxLength="10" />
            </div>
            <div className="form-row">
              <label htmlFor="length">Length (CM):</label>
              <input type="text" id="length" maxLength="10" />
            </div>
            <div className="form-row">
              <p>
                Sample Furniture Description.<br></br>
                <br></br>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                dignissim lectus sed lectus consectetur, nec iaculis dui luctus.
                Donec sodales massa nunc, sed semper tellus fermentum id.
                Suspendisse euismod laoreet diam, sed sagittis enim aliquet ac.
                Nam augue ipsum, euismod vel faucibus vel, dictum quis lorem.
                Sed lacinia lectus vel est tincidunt gravida. Nunc a sem ut
                lacus molestie sagittis. Nullam ipsum lectus, sodales ultricies
                tempus iaculis, sollicitudin euismod tortor. Nam eleifend sed
                tellus id malesuada. Curabitur fringilla purus vel sapien
                ullamcorper, in consectetur ligula pretium. Suspendisse ut
                facilisis nunc. In eleifend eros justo, et accumsan odio egestas
                ac. Sed tempus vitae urna sit amet aliquam.
              </p>
            </div>
          </div>
        );
      case "Book":
        return (
          <div className="form-content">
            <div className="form-row">
              <p>Please provide weight for Book</p>
            </div>
            <div className="form-row">
              <label htmlFor="weight">Weight (KG):</label>
              <input type="text" id="weight" maxLength="10" />
            </div>
            <div className="form-row">
              <p>
                Sample Book Description. <br></br>
                <br></br>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                dignissim lectus sed lectus consectetur, nec iaculis dui luctus.
                Donec sodales massa nunc, sed semper tellus fermentum id.
                Suspendisse euismod laoreet diam, sed sagittis enim aliquet ac.
                Nam augue ipsum, euismod vel faucibus vel, dictum quis lorem.
                Sed lacinia lectus vel est tincidunt gravida. Nunc a sem ut
                lacus molestie sagittis. Nullam ipsum lectus, sodales ultricies
                tempus iaculis, sollicitudin euismod tortor. Nam eleifend sed
                tellus id malesuada. Curabitur fringilla purus vel sapien
                ullamcorper, in consectetur ligula pretium. Suspendisse ut
                facilisis nunc. In eleifend eros justo, et accumsan odio egestas
                ac. Sed tempus vitae urna sit amet aliquam.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div id="product_form">
      <div className="form-row">
        <label htmlFor="sku">SKU:</label>
        <input type="text" id="sku" maxLength="30" />
      </div>
      <div className="form-row">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" maxLength="30" />
      </div>
      <div className="form-row">
        <label htmlFor="price">Price ($):</label>
        <input type="text" id="price" maxLength="10" />
      </div>
      <div className="form-row">
        <label htmlFor="productType">Type Switcher:</label>
        <select id="productType" onChange={handleTypeChange}>
          <option value="">Select a type</option>
          <option value="DVD">DVD</option>
          <option value="Furniture">Furniture</option>
          <option value="Book">Book</option>
        </select>
      </div>
      {renderForm()}
    </div>
  );
};

export default ProductForm;
