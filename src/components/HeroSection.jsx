import React, { useEffect, useState } from "react";
import TextTransition, { presets } from "react-text-transition";
import img from "/women-shoppingwomen.png";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

const HeroSection = () => {
  const TEXTS = ["Pick Your Pet.", "Get Your Pet.", "Love Your Pet."];
  const COLORS = ["text-darkGreen ", "text-red", "text-purple"];

  const [index, setIndex] = useState(0);
  const [CategoryItem, setCategoryItem] = useState(false);
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category
  const [locationInput, setLocationInput] = useState(""); // State for location input
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const showCategory = () => {
    setCategoryItem((prev) => !prev);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setCategoryItem(false);
    });
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000
    );
    return () => clearInterval(intervalId);
  }, []);

  const handleSearch = () => {
    const newUrl = `/search/?category=${selectedCategory}&location=${locationInput}`;
    navigate(newUrl); // Use navigate instead of location.href
  };

  return (
    <>
      <div className="bg-lightGreen/20 p-2">
        <div className="flex items-center justify-center">
          <div className="flex flex-col gap-2">
            <span
              className="bg-white rounded-3xl px-4 py-2 cursor-pointer flex items-center font-medium"
              onClick={showCategory}>
              <i className="ri-menu-2-line"></i> &nbsp;
              <p className="sm:hidden">{selectedCategory || "All Categories"}</p>
            </span>

            {CategoryItem && (
              <span className="absolute fixed left-[9dvw] mt-12 pt-3 items-center bg-lightGreen py-2 rounded-xl transition ease-in">
                {categories.map((category) => (
                  <p
                    className="px-4 font-medium pb-2 cursor-pointer hover:bg-white/30 transition ease-in-out hover:translate-x-1"
                    key={category.CategoryID}
                    onClick={() => {
                      setSelectedCategory(category.CategoryName); // Set selected category
                      setCategoryItem(false); // Close dropdown after selection
                    }}>
                    {category.CategoryName}
                  </p>
                ))}
              </span>
            )}
          </div>
          <span className="bg-white rounded-3xl px-4 py-2 ms-2 w-[70dvw]">
            <input
              className="w-[65dvw] search"
              type="search"
              name="search"
              id="search"
              placeholder="Enter your Location"
              value={locationInput} // Set input value to state
              onChange={(e) => setLocationInput(e.target.value)} // Update state on input change
            />
          </span>
          <span
            className="bg-green flex items-center justify-center py-[6px] w-12 ms-[-45px] rounded-tr-3xl rounded-br-3xl cursor-pointer"
            onClick={handleSearch} // Call handleSearch on button click
          >
            <i className="ri-search-2-line text-xl text-white ms-[-5px]"></i>
          </span>
        </div>

      
      </div>

      <div className="flex flex-row flex-wrap ps-16 sm:ps-8 items-center mt-2 sm:flex-col">
        <div className="flex flex-col gap-1 sm:gap-3 mt-4 w-[45dvw] sm:w-[98%]">
          <span className="bg-lightGreen/15 rounded-l-3xl rounded-r-lg w-[70%] sm:w-[100%] ps-6 text-darkBlue font-semibold p-2">
            Best <strong>Pet Finder </strong> in the town.
          </span>
          <p className="text-7xl font-semibold tracking-wider text-darkBlue sm:text-6xl leading-tight">
            <strong>Pet Find Foundation</strong>
            <br />
            <span className="text-7xl font-light sm:text-6xl leading-tight text-darkBlue">
              Find your Pets.
            </span>
          </p>

          <p className={`text-7xl font-semibold sm:text-5xl ${COLORS[index % TEXTS.length]}`}>
            <TextTransition springConfig={presets.gentle}>
              {TEXTS[index % TEXTS.length]}
            </TextTransition>
          </p>
          <p className="text-xl sm:text-lg font-medium mt-10 sm:mt-5">
            Creating a Healthier, Happier Pet Community.
            <br />
            Building a Better World for Pets and Their People.
          </p>

          <Link to="/Pets">
            <button className="bg-green rounded-xl px-5 py-3 mt-6 w-40 text-white font-semibold transition ease-linear hover:scale-105">
              Browse Pet
            </button>
          </Link>
        </div>

        <div className="bg-img w-[45dvw] ms-5 sm:ms-0 sm:me-2 mt-8 sm:w-[98%]">
          <img src={img} alt="shopImg" loading="lazy" className="man-img" />
          <div className="card bg-white shadow-lg rounded-lg flex mt-[-100px] px-5 items-center">
            <span>
              <img
                src="https://img.freepik.com/premium-vector/avatar-icon002_750950-52.jpg"
                className="w-16"
              />
            </span>
            <span className="px-5 ms-[-10px]">
              <p className="font-bold">Aurora ✨</p>
              <p className="sm:text-sm">
                I found the best human-friendly pets here.
                <span className="text-red"> &#10084;</span>
              </p>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
