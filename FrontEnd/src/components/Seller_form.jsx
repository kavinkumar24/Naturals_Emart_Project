  import React from "react";
  import Navbar from "./Navbar";
  import Select from 'react-select';
  import { useState } from "react";
  import { useRef } from "react";
  import { useNavigate } from 'react-router-dom';

  const ProductForm = () => {
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleImageUpload = (event) => {
      const files = Array.from(event.target.files);
      const imageFiles = files.filter(file => file.type.startsWith('image/'));

      // Ensure only 2 images are uploaded
      if (imageFiles.length + images.length > 2) {
        alert('You can only upload a maximum of 2 images');
        return;
      }

      // Create object URLs to preview images
      const imagePreviews = imageFiles.map(file => URL.createObjectURL(file));

      // Update the state with the newly uploaded images
      setImages((prevImages) => [...prevImages, ...imagePreviews]);
    };

    const handleRemoveImage = (index) => {
      const updatedImages = images.filter((_, imgIndex) => imgIndex !== index);
      setImages(updatedImages);

      // Clear the file input when an image is removed
      fileInputRef.current.value = "";
    };

    const category = [
      "உணவு பொருட்கள்",
      "விளை பொருட்கள்",
      "இடு பொருட்கள்",
      "தானியங்கள்",
      "Spices",
      "பழங்கள்",
      "காய்கறிகள்",
      "உலர் பழங்கள்",
      "தீவனங்கள்",
      "அரிசி வகைகள்",
      "பருப்பு வகைகள்",
      "எண்ணை வகைகள்",
      "விதைகள்",
      "மலர்கள்",
      "சிறுதானியங்கள்",
      "தென்னை பொருட்கள்",
      "பனை பொருட்கள்",
      "உரங்கள்",
      "நாற்றுகள்",
      "வாசனை திரவியங்கள்",
      "சோப்பு வகைகள்",
      "தேன்",
      "மூலிகைகள்",
      "தேயிலை, காபி",
      "மாவு வகைகள்",
      "மசாலா பொருட்கள்",
      "கடல் சார் பொருட்கள்",

      "வீட்டு உபயோக பொருட்கள்",
      "கைவினை பொருட்கள்",
      "திண்பண்டங்கள்",
      "கிழங்கு வகைகள்",
      "பால் பொருட்கள்",
    ];
    const categoryOptions = category.map((item) => ({ value: item, label: item }));

  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const userDataString = localStorage.getItem('userData');
const userData = userDataString ? JSON.parse(userDataString) : null; // Retrieve user data from localStorage
  
      if (!userData) {
          alert('User not found. Please log in again.');
          return;
      }
  
      const organic = event.target.organic.value === 'true'; // Convert to boolean
      const formData = {
          title: event.target.title.value,
          description: event.target.description.value,
          category: selectedCategory ? selectedCategory.value : '',
          organic,
          images,
          size: event.target.size.value,
          price: parseFloat(event.target.price.value), // Convert to number
          name: event.target.name.value,
          phone: event.target.phone.value,
          address: event.target.address.value,
      };
      
      console.log(formData); // Log form data for debugging
  
      try {
          const response = await fetch('http://localhost:5000/api/Seller', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
          });
  
          const data = await response.json();
  
          if (response.ok) {
            alert('Product submitted for approval.');
            // navigate('/admin');
              // Optionally, reset the form or redirect
          } else {
              alert(data.message || 'Error saving product');
          }

          localStorage.setItem('products', JSON.stringify(data.products)); // Save products to localStorage
      } catch (error) {
          alert('Error submitting the form');
          console.error(error);
      }
  };
  
    return (
      <>
        <Navbar />
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-3xl mx-auto mt-20">
          <h1 className="text-2xl font-semibold text-center mb-6">
            Seller Form
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Title */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
              name = "title"
                type="text"
                placeholder="Enter Title"
                className="block w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                required
              />
            </div>

            {/* பொருளடக்கம் (Dropdown) */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                பொருளடக்கம் <span className="text-red-500">*</span>
              </label>
              <Select
          options={categoryOptions}
          className="w-full"
          placeholder="Select an option"
          isSearchable
          onChange={option => setSelectedCategory(option)}

        />
            </div>

            {/* ஆர்கானிக் (Radio Buttons) */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                ஆர்கானிக் <span className="text-red-500">*</span>
              </label>
              <div className="space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="organic"
                    className="form-radio"
                    required
                  />
                  <span className="ml-2">ஆமாம்</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="organic"
                    className="form-radio"
                    required
                  />
                  <span className="ml-2">இல்லை</span>
                </label>
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                போட்டோ <span className="text-red-500">*</span>
              </label>
              <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="block w-full text-gray-500 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
          multiple
          onChange={handleImageUpload}
          required
          disabled={images.length >= 2} // Disable input if 2 images are already uploaded
        />

        {/* Show image previews */}
        <div className="mt-4 flex flex-wrap gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`Uploaded preview ${index}`}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                X
              </button>
            </div>
          ))}
        </div>

        {/* Error message for less than 2 images */}
        {images.length < 2 && (
          <p className="text-red-500 mt-2">Please upload exactly 2 images.</p>
        )}
            </div>

            {/* பொருள் விபரம் (Textarea) */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                பொருள் விபரம் <span className="text-red-500">*</span>
              </label>
              <textarea
              name="description"
                placeholder="Enter description"
                className="block w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                rows="4"
                required
              ></textarea>
            </div>

            {/* Additional Inputs */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                அளவு <span className="text-red-500">*</span>
              </label>
              <input
              name ="size"
                type="text"
                placeholder="Qnt"
                className="block w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                விலை <span className="text-red-500">*</span>
              </label>
              <input
              name ="price"
                type="text"
                placeholder="Based on quantity"
                className="block w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                required
              />
            </div>

            {/* பெயர் */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                பெயர் <span className="text-red-500">*</span>
              </label>
              <input
              name = "name"
                type="text"
                placeholder="Enter Name"
                className="block w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                required
              />
            </div>

            {/* செல் எண் */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                செல் எண் <span className="text-red-500">*</span>
              </label>
              <input
              name = "phone"
                type="text"
                placeholder="Enter Mobile Number"
                className="block w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                required
              />
            </div>

            {/* முகவரி */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                முகவரி <span className="text-red-500">*</span>
              </label>
              <input
              name = "address"
                type="text"
                placeholder="Enter Address"
                className="block w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                required
              />
            </div>

            {/* Terms & Conditions Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                Terms and Condition <span className="text-red-500">*</span>
              </label>
            </div>

            {/* Preview and Submit Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                className="px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-400"
              >
                Preview
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600"
              >
                Submit
              </button>
            </div>
          </form>

          {/* Footer terms text */}
          <p className="mt-6 text-sm text-gray-600">
            இந்த Appன் மூலம் விவரனை செய்வில் பொருளுக்கு 2% அல்லது Rs 1000 இதிலும்
            எது குறைவோ அதே கட்டணம் தரசம் மதிக்கிறது.
          </p>
        </div>
      </>
    );
  };

  export default ProductForm;
