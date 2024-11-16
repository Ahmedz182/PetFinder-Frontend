import React, { useEffect, useState } from "react";
import EditItem from "../../components/EditItem";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [pets, setPets] = useState([]);
  const [userType, setUserType] = useState(null); // State for userType
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      navigate("/Account"); // Redirect to Accounts if not logged in
      return; // Exit early to prevent further execution
    }
  }, [navigate]);

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Retrieve userType from localStorage and set it in state
    const storedUserType = localStorage.getItem("userType");
    setUserType(storedUserType); // Update the userType state
  }, []);

  const fetchPets = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/pets");
      setPets(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  // Fetch pets when the component mounts
  useEffect(() => {
    fetchPets();
  }, []);

  if (!user) {
    return <div>Loading...</div>; // Show loading while user data is fetched
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col py-8">
      <div className="flex justify-between px-10">
        <h1 className="text-3xl font-bold text-darkBlue mb-6">
          {userType === "Admin"
            ? "Dashboard"
            : userType === "vendor"
            ? "Vendor Dashboard"
            : "User Profile"}
        </h1>

        {(userType === "vendor" || userType === "Admin") && ( // Show Add Pet button for vendor or Admin
          <button
            onClick={() => navigate("/AddPet")}
            className="bg-green rounded-xl px-5 py-2 text-black font-semibold hover:bg-darkGreen transition ease-linear hover:scale-95 mb-4">
            <i className="text-darkBlue ri-add-fill me-1"></i>{" "}
            <span className="text-black sm:text-sm">Add Pet</span>
          </button>
        )}
      </div>

      <div className="bg-darkGreen/60 flex mx-10 py-10 text-black/95 items-center text-2xl justify-between px-12 rounded-xl">
        <span>
          <span className="text-3xl flex items-center gap-x-2">
            Welcome Back{" "}
            <strong className="text-black uppercase"> {user.Username}👋</strong>
          </span>
        </span>
        <span className="flex flex-col gap-y-3">
          <p>
            Phone No.: <strong className="text-black">{user.MobileNo}</strong>
          </p>
          <p>
            Email: <strong className="text-black">{user.Email}</strong>
          </p>
        </span>
      </div>

      <h2 className="text-2xl font-bold text-darkBlue mb-6 ps-10 mt-10">
        My Pets
      </h2>
      <div className="flex flex-wrap item-center justify-center gap-4 px-10 ">
        {userType === "vendor" ? (
          // Show only vendor's pets if user is a vendor
          pets.filter((pet) => pet.VendorID === user.UserID).length > 0 ? (
            pets
              .filter((pet) => pet.VendorID === user.UserID)
              .map((pet) => (
                <EditItem
                  key={pet.PetID} // Unique key based on id
                  title={pet.Name}
                  images={pet.imgUrl} // Use the images array directly
                  price={pet.Price}
                  size={pet.Size}
                  Color={pet.Color}
                  EnergyLevel={pet.EnergyLevel}
                  EaseOfTraining={pet.EaseOfTraining}
                  Friendliness={pet.Friendliness}
                  age={pet.Age}
                  DeliveryStatus={pet.DeliveryStatus}
                  PaymentStatus={pet.PaymentStatus}
                  breed={pet.Breed}
                  id={pet.PetID} // Assuming pet has a unique ID
                  gender={pet.gender}
                  adobtAvailabilty={pet.Status === "Available"} // Correct property
                />
              ))
          ) : (
            <p className="text-gray-600">No pets available.</p>
          )
        ) : userType === "Admin" ? (
          // If user is Admin, show all pets
          pets.length > 0 ? (
            pets.map((pet) => (
              <EditItem
                key={pet.PetID}
                title={pet.Name}
                images={pet.imgUrl}
                price={pet.Price}
                size={pet.Size}
                Color={pet.Color}
                DeliveryStatus={pet.DeliveryStatus}
                PaymentStatus={pet.PaymentStatus}
                EnergyLevel={pet.EnergyLevel}
                EaseOfTraining={pet.EaseOfTraining}
                Friendliness={pet.Friendliness}
                age={pet.Age}
                breed={pet.Breed}
                id={pet.PetID}
                gender={pet.gender}
                adobtAvailabilty={pet.Status}
              />
            ))
          ) : (
            <p className="text-gray-600">No pets available.</p>
          )
        ) : (
          // Show "See Pets" button for users who are not Admin or vendor
          <button
            onClick={() => navigate("/Pets")}
            className="bg-darkBlue/90 text-black px-4 py-2 rounded-lg hover:bg-darkBlue">
            See Pets
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
