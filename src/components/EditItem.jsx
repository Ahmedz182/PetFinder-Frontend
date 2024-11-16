import React, { useEffect, useState } from "react";
import { Tooltip, Modal, Button, message } from "antd";
import axios from "axios";

const EditItem = ({
  title,
  price,
  images,
  breed,
  age,
  adobtAvailabilty,
  Friendliness,
  EnergyLevel,
  EaseOfTraining,
  size,
  Color,
  PaymentStatus,
  DeliveryStatus,
  id,
}) => {
  const [imgSrc, setImgSrc] = useState(images);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    Name: title,
    Breed: breed,
    Age: age,
    Size: size,
    Color: Color,
    EnergyLevel: EnergyLevel,
    Friendliness: Friendliness,
    EaseOfTraining: EaseOfTraining,
    Status: adobtAvailabilty,
    Price: price,
    imgUrl: imgSrc,
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      // You can handle login-related logic here if needed
    }
  }, []);

  const handleError = () => {
    setImgSrc(
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOP9_jE5QAFKzRmc2OCwy1bkZBG825XT6u2A&s"
    );
  };

  const handleEditClick = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/pet/${id}`,
        formData
      );

      console.log("Edit response:", response.data);
      setIsModalVisible(false);
      alert("Edit successful!");
      location.reload();
      // Optionally, you could trigger a re-fetch or update state here
    } catch (error) {
      message.error("Error updating pet.");
      console.error("Edit error:", error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this pet?"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/pet/${id}`
        );
        message.success("Delete successful!");
        console.log("Delete response:", response.data);
        location.reload();
        // Optionally, trigger a re-fetch or update state here to remove the deleted pet
      } catch (error) {
        message.error("Error deleting pet.");
        console.error("Delete error:", error);
      }
    }
  };
  const handleRecived = async () => {
    const userid = JSON.parse(localStorage.getItem("user")).UserID;

    const confirmPayment = window.confirm(
      "Are you sure the payment is received?"
    );
    if (confirmPayment) {
      try {
        const currentDate = new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " ");

        const payload = {
          PetID: id, // Make sure your pet object contains PetID
          PreviousStatus: "Booked",
          NewStatus: "Not Available",
          ChangeDate: new Date().toISOString().slice(0, 19).replace("T", " "), // Format to "YYYY-MM-DD HH:MM:SS"
          ChangedBy: userid, // Use the UserID from local storage
        };

        console.log("Payload:", payload);

        const response = await axios.post(
          `http://localhost:3000/api/petStatusChangeLog`,
          payload
        );

        message.success("Change status successful!");
        console.log("Changing status response:", response.data);
        location.reload();
      } catch (error) {
        message.error("Error while changing status");
        console.error(
          "Changing status error:",
          error.response?.data || error.message
        );
      }
    }
  };

  return (
    <>
      <div className="transition ease-in hover:bg-lightGreen/80 w-[20dvw] sm:w-full rounded">
        <div className="rounded-xl cursor-pointer overflow-hidden flex flex-col">
          <img
            className="rounded-t-xl aspect-square p-10"
            loading="lazy"
            src={imgSrc}
            alt={title}
            onError={handleError}
          />
          <span className="flex justify-between ps-6 items-center text-2xl pe-6 py-4">
            <p className="font-bold text-darkBlue tracking-wider">{title}</p>
            <p className="font-medium text-base">$ {price}</p>
          </span>
          <p className="font-light text-lg text-darkBlue tracking-wider ps-6 mt-1">
            <strong>Availability:</strong> {adobtAvailabilty}
          </p>

          <p className="font-light text-lg text-darkBlue tracking-wider ps-6 mt-1">
            <strong>Payment :</strong> {PaymentStatus}
          </p>
          <p className="font-light text-lg text-darkBlue tracking-wider ps-6 mt-1">
            <strong>Delivery :</strong> {DeliveryStatus}
          </p>
        </div>
        <div className="flex justify-center py-4 text-2xl gap-x-3">
          {PaymentStatus == "Pending" && (
            <Tooltip title="Edit">
              <span onClick={handleEditClick}>
                <i className="ri-pencil-line text-black hover:cursor-pointer"></i>
              </span>
            </Tooltip>
          )}
          {/* <Tooltip title="Delete">
            <span onClick={handleDelete}>
              <i className="ri-delete-bin-5-line text-red hover:cursor-pointer"></i>
            </span>
          </Tooltip> */}
          {PaymentStatus == "Pending" && (
            <Tooltip title="Paymeny Rescived">
              <span onClick={handleRecived}>
                <button className="px-2 py-1 text-sm bg-darkBlue text-white rounded ">
                  Payment Recived
                </button>
              </span>
            </Tooltip>
          )}
        </div>
      </div>

      <Modal
        title="Edit Pet Information"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}>
        <form
          onSubmit={handleFormSubmit}
          className="bg-lightGreen shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleFormChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Breed
            </label>
            <input
              type="text"
              name="Breed"
              value={formData.Breed}
              onChange={handleFormChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Age
            </label>
            <input
              type="number"
              name="Age"
              value={formData.Age}
              onChange={handleFormChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Size
            </label>
            <input
              type="text"
              name="Size"
              value={formData.Size}
              onChange={handleFormChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Color
            </label>
            <input
              type="text"
              name="Color"
              value={formData.Color}
              onChange={handleFormChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Energy Level
            </label>
            <select
              name="EnergyLevel"
              value={formData.EnergyLevel}
              onChange={handleFormChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required>
              <option value="">Select Energy Level</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Friendliness
            </label>
            <select
              name="Friendliness"
              value={formData.Friendliness}
              onChange={handleFormChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required>
              <option value="">Select Friendliness</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Ease of Training
            </label>
            <select
              name="EaseOfTraining"
              value={formData.EaseOfTraining}
              onChange={handleFormChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required>
              <option value="">Select Ease of Training</option>
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Difficult">Difficult</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Status
            </label>
            <select
              name="Status"
              value={formData.Status}
              onChange={handleFormChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required>
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Price
            </label>
            <input
              type="number"
              name="Price"
              value={formData.Price}
              onChange={handleFormChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default EditItem;
