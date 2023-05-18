import API from '../utils/api';

const ProductService = {
  checkSKUExists: async (path, sku) => {
    try {
      const response = await API.post(path, { sku });
      return response.data.skuExists;
    } catch (error) {
      console.error('Failed to check SKU existence:', error);
      return false; // Return false in case of error
    }
  },

  saveProduct: (path, productData) => {
    // Make a POST request to the backend API to save the product data
    API.post(path, productData)
      .then((response) => {
        // Handle success response
        console.log('Product saved successfully!');
      })
      .catch((error) => {
        // Handle error response
        console.error('Failed to save product:', error);
      });
  },

  registerUser: (path, userData) => {
    // Make a POST request to the backend API to save the product data
    API.post(path, userData)
      .then((response) => {
        // Handle success response
        console.log('Product saved successfully!');
      })
      .catch((error) => {
        // Handle error response
        console.error('Failed to save product:', error);
      });
  },

  getData: (path, successCallback, errorCallback) => {
    API.get(path)
      .then((response) => {
        const data = response.data;
        successCallback(data);
      })
      .catch((error) => {
        console.error('Failed to fetch data:', error);
        errorCallback(error);
      });
  },

  deleteProducts: (path, formData, successCallback, errorCallback) => {
    API.post(path, formData)
      .then((response) => {
        console.log('Products deleted successfully:', response.data);
        successCallback();
      })
      .catch((error) => {
        console.error('Failed to delete products:', error);
        errorCallback(error);
      });
  },
};

export default ProductService;
