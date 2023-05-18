import React, { useState } from "react";
import ProductForm from "./productform.jsx";
import { useNavigate } from "react-router-dom";
import Notification from "./notification";
import ProductService from "../services/productservice.js";
import "../styles/addproductform.css";

const AddProductForm = () => {
  const PATH_TO_SAVEDATA = "/eshopbe/products/save/insertdata.php";
  const PATH_TO_GET_SKU = "/eshopbe/products/getsku/getsku.php";
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  const saveProduct = async () => {
    const validForm = await validateForm();
    if (validForm) {
      const productData = getProductData();
      ProductService.saveProduct(PATH_TO_SAVEDATA, productData);
      handleCancelButtonClick();
    }
  };

  const validateForm = async () => {
    const sku = document.getElementById("sku").value;
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const productType = document.getElementById("productType").value;
    const singleQuote = "'";

    if (
      sku.trim() === "" ||
      name.trim() === "" ||
      price.trim() === "" ||
      productType === ""
    ) {
      setNotification("Please, submit required data");
      return false;
    }

    // Check if SKU already exists
    const skuExistsResponse = await ProductService.checkSKUExists(
      PATH_TO_GET_SKU,
      sku
    );
    if (skuExistsResponse) {
      setNotification("Please, provide the data of indicated type. SKU already exists. Please choose a different SKU.");
      //skuInput.focus();
      return false;
    }

    // Apparently you can't input " ' " in name field and id
    if (sku.includes(singleQuote) || name.includes(singleQuote)) {
      setNotification(
        "Please, provide the data of indicated type. Remove single quote (') form sku and name"
      );
      return false;
    }

    const decimalPattern = /^\d+(\.\d{1,2})?$/;
    if (!decimalPattern.test(price)) {
      setNotification(
        "Please, provide the data of indicated type.Price must be a decimal, use dot (.) for float numbers. Only 2 numbers allowed after dot. No dollar sign."
      );
      return false;
    }

    const selectedType = productType;
    if (selectedType === "DVD") {
      const size = document.getElementById("size").value;
      if (!Number.isInteger(Number(size)) || size.trim() === "") {
        setNotification(
          "Please, provide the data of indicated type. Size must be an integer"
        );
        return false;
      }
    } else if (selectedType === "Furniture") {
      const height = document.getElementById("height").value;
      const width = document.getElementById("width").value;
      const length = document.getElementById("length").value;

      if (
        !Number.isInteger(Number(height)) ||
        height.trim() === "" ||
        !Number.isInteger(Number(width)) ||
        width.trim() === "" ||
        !Number.isInteger(Number(length)) ||
        length.trim() === ""
      ) {
        setNotification(
          "Please, provide the data of indicated type. Lack of valid dimensions for furniture. Dimensions must be an integer."
        );
        return false;
      }
    } else if (selectedType === "Book") {
      const weight = document.getElementById("weight").value;
      if (!Number.isInteger(Number(weight)) || weight.trim() === "") {
        setNotification(
          "Please, provide the data of indicated type. Weight must be an integer."
        );
        return false;
      }
    }

    return true;
  };

  const getProductData = () => {
    const sku = document.getElementById("sku").value;
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const productType = document.getElementById("productType").value;

    let productSpecificData = {};

    switch (productType) {
      case "DVD":
        productSpecificData = {
          size: document.getElementById("size").value,
        };
        break;
      case "Furniture":
        productSpecificData = {
          height: document.getElementById("height").value,
          width: document.getElementById("width").value,
          length: document.getElementById("length").value,
        };
        break;
      case "Book":
        productSpecificData = {
          weight: document.getElementById("weight").value,
        };
        break;
      default:
        break;
    }

    return {
      sku,
      name,
      price,
      productType,
      ...productSpecificData,
    };
  };

  const handleCancelButtonClick = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="add-product-page">
      <div className="add-product-container">
        <div className="add-product-h1-btn">
          <h1>Product Add</h1>
          <button className="save-btn" onClick={saveProduct}>
            Save
          </button>
          <button className="cancel-btn" onClick={handleCancelButtonClick}>
            Cancel
          </button>
        </div>
        {notification && <Notification message={notification} />}
        <ProductForm />
        <div className="vertical-line"></div>
      </div>
    </div>
  );
};

export default AddProductForm;
