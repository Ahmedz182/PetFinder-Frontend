import axios from "axios";
import React, { useState, useEffect } from "react";

const AddPet = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Breed: "",
    Age: 0,
    Size: "",
    Color: "",
    EnergyLevel: "",
    Friendliness: "",
    EaseOfTraining: "",
    Status: "",
    Price: 0.0,
    UserID: 0,
    imgUrl: "",
    CategoryName: "", // Updated to store CategoryName
    Location: "", // New Location field added
  });

  const [categories, setCategories] = useState([]); // State to store categories

  useEffect(() => {
    // Get vendor ID from local storage
    const vendorId = JSON.parse(localStorage.getItem("user"));
    if (vendorId) {
      setFormData((prevData) => ({
        ...prevData,
        UserID: vendorId.UserID,
      }));
    }

    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/categories"
        );
        setCategories(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    AddPet();
  };

  const AddPet = async () => {
    try {
      console.log("Sending form data:", formData);
      const response = await axios.post(
        `http://localhost:3000/api/pets`,
        formData
      );
      console.log("Response:", response);
      alert("Pet Add Successful");

      location.href = "/Profile";
    } catch (error) {
      console.error("Error adding pet:", error.response?.data || error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="rounded-xl px-5 py-2 text-black font-bold mb-4">
        Add Pet
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-lightGreen shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category
          </label>
          <select
            name="CategoryName" // Updated name to match the field in state
            value={formData.CategoryName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required>
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category.CategoryID} value={category.CategoryName}>
                {category.CategoryName}
              </option>
            ))}
          </select>
          <p className="text-sm">Cannot be changed after Added</p>
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Location
          </label>
          <input
            type="text"
            name="Location"
            value={formData.Location}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter the location"
            required
          />
          <p className="text-sm">Cannot be changed after Added</p>
        </div>

        {/* Breed */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Breed
          </label>
          <input
            type="text"
            name="Breed"
            value={formData.Breed}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Age */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Age
          </label>
          <input
            type="number"
            name="Age"
            value={formData.Age}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Size */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Size
          </label>
          <input
            type="text"
            name="Size"
            value={formData.Size}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Color */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Color
          </label>
          <input
            type="text"
            name="Color"
            value={formData.Color}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Energy Level */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Energy Level
          </label>
          <select
            name="EnergyLevel"
            value={formData.EnergyLevel}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required>
            <option value="">Select Energy Level</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Friendliness */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Friendliness
          </label>
          <select
            name="Friendliness"
            value={formData.Friendliness}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required>
            <option value="">Select Friendliness</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Ease of Training */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Ease of Training
          </label>
          <select
            name="EaseOfTraining"
            value={formData.EaseOfTraining}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required>
            <option value="">Select Ease of Training</option>
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Difficult">Difficult</option>
          </select>
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Status
          </label>
          <select
            name="Status"
            value={formData.Status}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required>
            <option value="">Select Status</option>
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
            <option value="Not Available">Not Available</option>
          </select>
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Price
          </label>
          <input
            type="number"
            name="Price"
            value={formData.Price}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Image URL
          </label>
          <input
            type="text"
            name="imgUrl"
            value={formData.imgUrl}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-green text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Add Pet
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPet;
