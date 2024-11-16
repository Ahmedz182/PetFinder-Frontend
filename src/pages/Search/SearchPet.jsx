import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Item from "../../components/Item";

const SearchPet = () => {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const initialCategory = queryParams.get("category") || "";
  const initialLocation = queryParams.get("location") || "";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [locationInput, setLocationInput] = useState(initialLocation);
  const [categoryItemVisible, setCategoryItemVisible] = useState(false);

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Function to fetch products based on category and location
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/pets?category=${selectedCategory}&location=${locationInput}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Handle category selection
  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setCategoryItemVisible(false);
  };

  // Navigate to the new URL with updated query parameters on search click
  const handleSearch = () => {
    const newUrl = `/search/?category=${selectedCategory}&location=${locationInput}`;
    navigate(newUrl); // Use navigate instead of location.href
  };

  // Fetch products based on URL parameters whenever they change
  useEffect(() => {
    // Update local state with new query parameters
    const updatedCategory = queryParams.get("category") || "";
    const updatedLocation = queryParams.get("location") || "";

    if (updatedCategory !== selectedCategory || updatedLocation !== locationInput) {
      setSelectedCategory(updatedCategory);
      setLocationInput(updatedLocation);
    }

    fetchProducts(); // Fetch products when the component mounts or URL parameters change
  }, [location.search]); // Trigger on location.search change

  return (
    <div className="px-10 py-8">
      <div className="text-4xl text-darkBlue tracking-widest font-semibold">
        Search Your Desired <span className="text-darkGreen text-4xl">PET</span>
      </div>
      <div className="bg-lightGreen/20 p-2 mt-5 rounded">
        <div className="flex items-center justify-center">
          <div className="flex flex-col gap-2">
            <span
              className="bg-white rounded-3xl px-4 py-2 cursor-pointer flex items-center font-medium"
              onClick={() => setCategoryItemVisible((prev) => !prev)}>
              <i className="ri-menu-2-line"></i> &nbsp;
              <p className="sm:hidden">{selectedCategory || "All Categories"}</p>
            </span>

            {categoryItemVisible && (
              <span className="absolute fixed left-[9dvw] mt-12 pt-3 items-center bg-lightGreen py-2 rounded-xl transition ease-in">
                {categories.map((category) => (
                  <p
                    className="px-4 font-medium pb-2 cursor-pointer hover:bg-white/30 transition ease-in-out hover:translate-x-1"
                    key={category.CategoryID}
                    onClick={() => handleCategorySelect(category.CategoryName)}>
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
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)} // Update location on input change
            />
          </span>
          <span
            className="bg-green flex items-center justify-center py-[6px] w-12 ms-[-45px] rounded-tr-3xl rounded-br-3xl cursor-pointer"
            onClick={handleSearch} // Call handleSearch on button click
          >
            <i className="ri-search-2-line text-xl text-white ms-[-5px]"></i>
          </span>
          <p
  className="text-black ps-5 cursor-pointer underline"
  onClick={() => {
    // Reset the state
    setSelectedCategory(""); // Clear the selected category
    setLocationInput(""); // Clear the location input
    navigate(`/search/`); // Navigate to the search page
  }}
>
  Clear Search
</p>

        </div>

      
      </div>

      <div className="py-20 px-18 flex flex-wrap gap-4 justify-center">
        {products.length > 0 ? (
          products.map(
            ({ Name, Price, imgUrl, Breed, Status, Color, PetID, CategoryName }) => (
              <Item
                key={PetID}
                title={Name}
                images={imgUrl}
                price={Price}
                breed={Breed}
                CategoryName={CategoryName}
                id={PetID}
                Color={Color}
                adoptAvailability={Status}
              />
            )
          )
        ) : (
          <p className="text-lg font-bold text-red-600">No pets found in your location for your searched category.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPet;
