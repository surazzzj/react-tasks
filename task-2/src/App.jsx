// Simple Todo App (Add / Remove / Toggle)

import { useState } from "react";
import '../src/App.css'

const ProductCRUD = () => {

  // react states for storing the data
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', price: "80000" },
    { id: 2, name: 'Phone', price: "55000" },
    { id: 3, name: 'Tablet', price: "30000" }
  ]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: ''
  });
  const [isEditing, setIsEditing] = useState(false);


  // Function for CREATE - Add new product
  const createProduct = () => {
    if (!formData.name || !formData.price) return;

    const newProduct = {
      id: products.length + 1,
      name: formData.name,
      price: Number(formData.price)
    }

    setProducts([...products, newProduct]);
    resetForm();
  }


  // Function for UPDATE - Edit existing product
  const updateProduct = () => {
    if (!formData.name || !formData.price || !formData.id) return;

    setProducts(products.map(product =>
      (product.id === formData.id) ? { ...product, name: formData.name, price: Number(formData.price) }
        : product
    ))
    resetForm()
  }



  // Function for DELETE - Remove product
  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id != id));
  }



  // INPUT HANDLING
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  // EDIT BUTTON FUNCTION
  const setEditForm = (product) => {
    setFormData({
      id: product.id,
      name: product.name,
      price: product.price
    });
    setIsEditing(true);
  };


  // RESET FORM FUNCTION
  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      price: ''
    });
    setIsEditing(false);
  };



  return (

    <div>
      <h1>Product CRUD Operations</h1>

      <div>
        <h3>{isEditing ? "Edit Product" : "Add new Project"}</h3>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />

        {isEditing ? (
          <>
            <button onClick={updateProduct}>Update Product</button>
            <button onClick={resetForm}>Cancel</button>
          </>
        ) : (
          <button onClick={createProduct}>Add Product</button>
        )};

      </div>


      <div id="display">
        <h3>Product List</h3>
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="4" >
                  No products found
                </td>
              </tr>
            ) : (
              products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>₹{product.price}</td>
                  <td>
                    <button id="btn1"
                      onClick={() => setEditForm(product)}
                 
                    >
                      Edit
                    </button>
                    <button id="btn2"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <p id="p_last">
          Total Products: <strong>{products.length}</strong>
        </p>
      </div>

    </div>

  )
}

export default ProductCRUD;