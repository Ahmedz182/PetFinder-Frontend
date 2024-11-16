import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [userType, setUserType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (password.includes(" ")) {
      console.log("Password has space");
      return; // Prevent submission if password has spaces
    }
    
    const user = {
      Username: name, // Change 'Name' to 'Username'
      Password: password, // Keep Password as is
      Email: email, // Keep Email as is
      UserType: userType, // Keep UserType as is
      MobileNo: mobileNumber, // Change 'MobileNumber' to 'MobileNo'
      Address: address, // Keep Address as is
      imgUrl: "http://example.com/customer2.jpg" // Add a default image URL
    };

    try {
      const response = await axios.post("http://localhost:3000/api/users", user);
      console.log("Account Created:", response.data);
      alert("Account Created Successfully.");
      location.reload();
    } catch (error) {
      console.error("There was an error creating the account:", error);
      alert("Failed to create account. Please try again.");
    }

    // Reset form fields
    setPassword("");
    setEmail("");
    setName("");
    setAddress("");
    setMobileNumber("");
    setUserType("");
  };

  return (
    <>
      <div className="w-[75dvw] rounded-xl shadow-lg flex flex-col px-10 p-4 gap-6 pt-10">
        <div className="flex pt-10">
          <div className="me-20 h-96 overflow-hidden aspect-square sm:hidden">
            <img
              className="aspect-square"
              src="https://img.freepik.com/premium-photo/user-profile-sign-icon-right-side-with-white-background_187299-40020.jpg"
              alt="bg-Signin"
            />
          </div>
          <form
            className="flex flex-col gap-4 w-1/2 sm:w-full pb-10"
            onSubmit={handleClick}>
            <p className="text-3xl text-darkBlue font-bold -tracking-tighter ">
              Create An Account
            </p>
            <p className="text-darkBlue/90 font-semibold">Get your Desired Pet on – Pet<span className="text-darkGreen"> Finder </span> Foundation.</p>
            <div className="flex flex-col gap-4 ">
              <label htmlFor="name" className="font-medium font-semibold">
                Full Name :
              </label>
              <input
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
                className="border-b-[1px] px-2 border-b-darkBlue/70 h-8"
                placeholder="ABC"
              />
            </div>
            <div className="flex flex-col gap-4 ">
              <label htmlFor="email" className="font-medium font-semibold">
                Email Address :
              </label>
              <input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="border-b-[1px] px-2 border-b-darkBlue/70 h-8"
                placeholder="xyz@provider.com"
              />
            </div>
            <div className="flex flex-col gap-4 ">
              <label htmlFor="password" className="font-medium font-semibold">
                Password :
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className="border-b-[1px] px-2 border-b-darkBlue/70 h-8"
                placeholder="Enter Your Password"
              />
              <span className="flex items-center ">
                <input
                  type="checkbox"
                  name="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="mr-2"
                />
                <label htmlFor="showPassword">Show Password</label>
              </span>
            </div>
            <div className="flex flex-col gap-4 ">
              <label htmlFor="address" className="font-medium font-semibold">
                Address :
              </label>
              <input
                type="text"
                name="address"
                onChange={(e) => setAddress(e.target.value)}
                className="border-b-[1px] px-2 border-b-darkBlue/70 h-8"
                placeholder="123 Main St, City, Country"
              />
            </div>
            <div className="flex flex-col gap-4 ">
              <label htmlFor="mobile" className="font-medium font-semibold">
                Mobile Number :
              </label>
              <input
                type="tel"
                name="mobile"
                onChange={(e) => setMobileNumber(e.target.value)}
                className="border-b-[1px] px-2 border-b-darkBlue/70 h-8"
                placeholder="+1234567890"
              />
            </div>
            
            <div className="flex flex-col gap-4 ">
              <label className="font-medium font-semibold">User Type:</label>
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  id="customer"
                  name="userType"
                  value="customer"
                  checked={userType === "customer"}
                  onChange={(e) => setUserType(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="customer">Customer</label>
                <input
                  type="radio"
                  id="vendor"
                  name="userType"
                  value="vendor"
                  checked={userType === "vendor"}
                  onChange={(e) => setUserType(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="vendor">Vendor</label>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <input
                type="submit"
                className="bg-green rounded-xl w-full px-40 py-2 text-white font-semibold hover:bg-darkGreen transition ease-linear hover:scale-95"
                value="Create Account"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
