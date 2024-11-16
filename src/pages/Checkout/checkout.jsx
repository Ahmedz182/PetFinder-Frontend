import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [pet, setPet] = useState(null); // Initialize as null
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const items = localStorage.getItem("pet");
    const user = localStorage.getItem("user");
    if (items) {
      try {
        const parsedPet = JSON.parse(items); // Parse the pet data
        setPet(parsedPet); // Set the parsed object
      } catch (error) {
        console.error("Error parsing pet data from localStorage", error);
      }
    }
    if (user) {
      try {
        const parsedUser = JSON.parse(user); // Parse the user data
        setUser(parsedUser); // Set the parsed object
      } catch (error) {
        console.error("Error parsing user data from localStorage", error);
      }
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      alert("Please Login First.");
      navigate("/Account"); // Use navigate instead of window.location.href
      return; // Exit the function if not logged in
    }

    // Prepare the API payload
    const petStatusChangeLog = {
      PetID: pet?.PetID, // Ensure pet is defined before accessing PetID
      PreviousStatus: "Available",
      NewStatus: "Booked",
      ChangeDate: new Date().toISOString().slice(0, 19).replace("T", " "), // Format to "YYYY-MM-DD HH:MM:SS"
      ChangedBy: user?.UserID, // Use optional chaining for safety
    };

    console.log("Form submitted", {
      pet,
      paymentMethod,
    });

    try {
      // First API call to update the pet status change log
      const petStatusResponse = await axios.post(
        "http://localhost:3000/api/petStatusChangeLog",
        petStatusChangeLog
      );
      console.log("Pet status change log success:", petStatusResponse.data);

      alert(
        "Your order is placed. Make payment within 3 hours, otherwise your order will be cancelled."
      );

      // Navigate to the Thank You page
      navigate("/ThankYou");
    } catch (error) {
      // Handle any errors for either API
      console.error("Error posting data:", error);
    } finally {
      // Remove pet data from local storage after the API call is done
      localStorage.removeItem("pet");
    }
  };

  return (
    <div className="min-h-screen text-text/90 bg-gray-100 flex items-center justify-center">
      <div className="bg-lightGreen shadow-lg rounded-lg p-8 w-[75dvw] flex">
        <div className="w-1/2">
          <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div>
              <label className="block mb-1 font-semibold">Full Name</label>
              <input
                type="text"
                defaultValue={user?.UserID} // Use optional chaining to prevent errors if user is null
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="XYZ"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Email</label>
              <input
                type="email"
                defaultValue={user?.Email} // Use optional chaining to prevent errors if user is null
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="xyz@example.com"
                required
              />
            </div>

            {/* Shipping Information */}
            <div>
              <label className="block mb-1 font-semibold">
                Shipping Address
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="123 Main St"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">City</label>
              <input
                type="text"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="City"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Country</label>
              <input
                type="text"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Country"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Zip Code</label>
              <input
                type="text"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="12345"
                required
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block mb-1 font-semibold">Payment Method</label>
              <div className="flex items-center font-semibold mt-2">
                <input
                  type="radio"
                  id="bankTransfer"
                  name="paymentMethod"
                  value="bankTransfer"
                  checked={paymentMethod === "bankTransfer"}
                  onChange={() => setPaymentMethod("bankTransfer")}
                  className="mr-2"
                />
                <label htmlFor="bankTransfer">Bank Transfer</label>
              </div>
            </div>

            {/* Bank Transfer Information (if selected) */}
            {paymentMethod === "bankTransfer" && (
              <div className="px-15 py-2 ">
                <span className="font-semibold">Bank Name:</span> XYZ Bank{" "}
                <br />
                <span className="font-semibold">Account Number:</span>{" "}
                PK15OKIA1236547896258
                <br />
                <span className="font-semibold">Title:</span> ABC <br />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-green rounded-xl w-fit text-center px-10 py-2 text-white font-semibold hover:bg-darkGreen transition ease-linear hover:scale-95">
              Check Out
            </button>
          </form>
        </div>
        <div className="w-1 h-screen bg-darkBlue/70 m-5"></div>
        {/* Pet Information Display */}
        <div className="w-1/2 flex flex-col px-10 mt-20">
          {pet && (
            <>
              <h2 className="text-xl font-black">Total Amount: ${pet.Price}</h2>
              <br />
              <hr />
              <br />
              <h2 className="text-xl font-black">Pet Detail</h2>
              <p className="text-black">
                Name : <strong>{pet.Name}</strong>
              </p>
              <p className="text-black">
                Age : <strong>{pet.Age}</strong>
              </p>
              <p className="text-black">
                Breed : <strong>{pet.Breed}</strong>
              </p>
              <p className="text-black">
                Category : <strong>{pet.CategoryName}</strong>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
