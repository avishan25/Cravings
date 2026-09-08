import Nav from "./Nav"
import { useSelector } from "react-redux";
import { MdRestaurant } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { FaPen } from "react-icons/fa";
import RestaurantItemCard from "./RestaurantItemCard";

function RestaurantDashboard() {
  const { restaurantData } = useSelector((state) => state.restaurant)
  const navigate =useNavigate()
  
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-bgColor">
      <Nav />
      {!restaurantData && (
        <div className="flex justify-center items-center p-4 sm:p-6">
          <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-borderColor hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col items-center text-center">
              <MdRestaurant className="w-16 h-16 sm:w-20 sm:h-20 mb-4 text-primaryColor" />

              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                Add Your Restaurant
              </h2>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                Join our food delivery platform and serve thousand of customers
                everyday
              </p>
              <button
                className="bg-primaryColor text-white px-5 sm:px-6 py-2 rounded-full font-medium shadow-md hover:bg-orange-600 transition-colors duration-200 cursor-pointer"
                onClick={() => navigate("/create-edit-restaurant")}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}

      {restaurantData && (
        <div className="w-full flex flex-col items-center gap-6 px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl text-gray-900 flex items-center gap-3 mt-8 text-center">
            {" "}
            <SiHomeassistantcommunitystore className="text-primaryColor w-10 h-10" />
            Welcome {restaurantData.name}
          </h1>

          <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-orange-100 hover:shadow-2xl transition-all duration-300 w-2xl max-w-3xl relative">
            <img
              src={restaurantData.image}
              alt={restaurantData.name}
              className="w-full h-48 sm:h-60 object-cover"
            />
            <div
              className="absolute top-4 right-4 bg-primaryColor text-white p-2 rounded-full shadow-md hover:bg-orange-600 transition-colors cursor-pointer"
              onClick={() => navigate("/create-edit-restaurant")}
            >
              <FaPen size={20} />
            </div>
            <div className="mx-4">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                {restaurantData.name}
              </h1>
              <p className="text-gray-500">
                {restaurantData.city},{restaurantData.state}
              </p>
              <p className="text-gray-500 mb-4">{restaurantData.address}</p>
            </div>
          </div>

          {restaurantData.items.length == 0 && (
            <div className="flex justify-center items-center p-4 sm:p-6">
              <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-borderColor hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col items-center text-center">
                  <MdRestaurant className="w-16 h-16 sm:w-20 sm:h-20 mb-4 text-primaryColor" />

                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                    Add Your Food Product
                  </h2>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    Share your delicious creations with our customers by adding
                    them to the menu.
                  </p>
                  <button
                    className="bg-primaryColor text-white px-5 sm:px-6 py-2 rounded-full font-medium shadow-md hover:bg-orange-600 transition-colors duration-200 cursor-pointer"
                    onClick={() => navigate("/add-product")}
                  >
                    Add Food
                  </button>
                </div>
              </div>
            </div>
          )}
          {restaurantData.items.length > 0 && <div className="flex flex-col items-center gap-4 w-full max-w-3xl">
            
            {restaurantData.items.map((ele,ind)=>{
              
             return <RestaurantItemCard data={ele} key={ind} />;
            })}



            </div>}
        </div>
      )}
    </div>
  );
}

export default RestaurantDashboard


