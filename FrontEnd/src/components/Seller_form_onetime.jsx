  import React from "react";
  import Navbar from "./Navbar";
  import Select from 'react-select';
  import { useState } from "react";
  import { useRef } from "react";
  import { useNavigate } from 'react-router-dom';
  import { toast } from 'react-toastify'; 
  import { ToastContainer } from 'react-toastify';



  const ProductForm = () => {
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [imageFiles, setImageFiles] = useState([]);


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
      setImageFiles((prevFiles) => [...prevFiles, ...imageFiles]);

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
    const select_options = [
      'FPO',
      'SHG',
      'ENT',
      'Farmer',
    ]
    const categoryOptions = category.map((item) => ({ value: item, label: item }));
    const category_select_options = select_options.map((item) => ({ value: item, label: item }));

    const handleSubmit = async (event) => {
      event.preventDefault();
      
      const userDataString = localStorage.getItem('userData');
      console.log('User data:', userDataString);
      const userData = userDataString ? JSON.parse(userDataString) : null;
  
      if (!userData) {
          alert('User not found. Please log in again.');
          return;
      }
  
      const response = await fetch(`http://localhost:5000/api/checkUserProducts?phone=${userData.phone}`);
      const result = await response.json();
  
      if (response.ok && result.productCount >= 5) {
          alert('You already have 5 products. Please remove one before adding a new one.');
          return;
      }
  
      const organic = event.target.organic.value === 'true'; // Convert to boolean
      const formData = new FormData();
      formData.append('title', event.target.title.value);
      formData.append('description', event.target.description.value);
      formData.append('category', selectedCategory ? selectedCategory.value : '');
      formData.append('organic', organic);
      formData.append('size', event.target.size.value);
      formData.append('price', parseFloat(event.target.price.value));
      formData.append('name', event.target.name.value);
      formData.append('phone', event.target.phone.value);
      formData.append('address', event.target.address.value);
  
      // Append image files to formData
      imageFiles.forEach(file => {
          formData.append('images', file);
      });
  
      try {
          const response = await fetch('http://localhost:5000/api/Seller_one_time', {
              method: 'POST',
              body: formData, // No need for 'Content-Type' header; FormData handles it
          });
  
          const data = await response.json();
  
          if (response.ok) {
              toast.success('Product request submitted successfully!');
              // You can navigate or reset the form here
          } else {
              toast.error(data.message || 'Failed to submit the product request.');
          }
      } catch (error) {
          alert('Error submitting the form');
          console.error(error);
      }
  };
  
    
    return (
      <>
        <Navbar />
        <ToastContainer />
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-3xl mx-auto mt-20">
          <h1 className="text-2xl font-semibold text-center mb-6">
            Seller Form (One time Sale)
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
              <label className="font-semibold text-gray-700 mb-2 block">
                போட்டோ <span className="text-red-500">*</span>
                </label>
             
                {/* <label
                      htmlFor="uploadFile1"
                      className={`${
                        theme === "light"
                          ? "bg-white text-gray-500 border-gray-300"
                          : "bg-gray-800 text-gray-300 border-gray-600"
                      } font-semibold text-base rounded max-w-[60%] h-32 flex flex-col items-center justify-center cursor-pointer border-2 border-dashed mx-auto`}
                    >  */}

         
<div
        className="font-semibold text-gray-700 mb-2 max-w-full h-32 flex flex-col items-center justify-center cursor-pointer border-2 border-dashed mx-auto border-gray-300"
        onClick={() => fileInputRef.current.click()} // Trigger file input click
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-11 mb-2 fill-gray-500"
          viewBox="0 0 32 32"
        >
          <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
          <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
        </svg>
        Import Reference Images

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          multiple
          className="absolute opacity-0 cursor-pointer" // Hide visually but still interactable
          onChange={handleImageUpload}
          required
          disabled={images.length >= 2} // Disable input if 2 images are already uploaded
        />
      </div>
         

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


            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Select category <span className="text-red-500">*</span>
              </label>
              <Select
          options={category_select_options}
          className="w-full"
          placeholder="Select an option"
          isSearchable
          onChange={option => setSelectedCategory(option)}

        />
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
              பொருள் அளவு <span className="text-red-500">*</span>
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
