import React, { useEffect } from 'react'
import Nav from "./Nav"
import { categories } from '../category.js';
import CategoryCard from './CategoryCard';
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { useRef } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import FoodCard from './FoodCard.jsx';

function UserDashboard() {
  const { currentCity, restaurantsInCity, productsInCity } = useSelector(
    (state) => state.user,
  );
  const cateScrollRef =useRef()
  const restaurantScrollRef = useRef();
  const[showLeftCateScrollButton,setShowLeftCateScrollButton] =useState(false)
  const [showRightCateScrollButton, setShowRightCateScrollButton] = useState(false);

  const [showLeftRestaurantScrollButton, setShowLeftRestaurantScrollButton] =
    useState(false);
  const [showRightRestaurantScrollButton, setShowRightRestaurantScrollButton] =
    useState(false);
  const updateButton =(ref,leftButton,rightButton)=>{
    const element =ref.current
    if(element){
      leftButton(element.scrollLeft >0)
      rightButton(element.clientWidth +element.scrollLeft <element.scrollWidth)
    }
  }
  const scrollHandler =(ref,direction)=>{
    if(ref.current){
      ref.current.scrollBy({
        left:direction=="left"?-200:200,
        behavior:"smooth"
      })
    }
  }

  useEffect(()=>{
    if(cateScrollRef.current){
      updateButton(cateScrollRef,setShowLeftCateScrollButton,setShowRightCateScrollButton)
      cateScrollRef?.current?.addEventListener("scroll",()=>{updateButton(cateScrollRef,setShowLeftCateScrollButton,setShowRightCateScrollButton)})
    }

    if(restaurantScrollRef.current){
      updateButton(restaurantScrollRef,setShowLeftRestaurantScrollButton,setShowRightRestaurantScrollButton)
      restaurantScrollRef?.current?.addEventListener('scroll',()=>{
      updateButton(
        restaurantScrollRef,
        setShowLeftRestaurantScrollButton,
        setShowRightRestaurantScrollButton,
      );

      })
    }

    

    return ()=>{cateScrollRef?.current?.removeEventListener('scroll',()=>{
            updateButton(
              cateScrollRef,
              setShowLeftCateScrollButton,
              setShowRightCateScrollButton,
            );

    })

    restaurantScrollRef?.current?.removeEventListener('scroll',()=>{
       updateButton(
         restaurantScrollRef,
         setShowLeftRestaurantScrollButton,
         setShowRightRestaurantScrollButton,
       );
    })
  }
    
  },[categories])
  return (
    <div className="w-screen min-h-screen flex flex-col gap-5 bg-[#fff9f6] items-center overflow-y-auto">
      <Nav />

      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
        <h1 className="text-gray-800 text-2xl sm:text-3xl">
          Inspiration for your first order
        </h1>
        <div className="w-full relative">
          {showLeftCateScrollButton && (
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-primaryColor text-white p-2 rounded-full shadow-lg z-10 hover:bg-[#e64528]"
              onClick={() => scrollHandler(cateScrollRef, "left")}
            >
              <FaChevronCircleLeft />
            </button>
          )}
          <div
            className="w-full flex overflow-x-auto gap-4 pb-2"
            ref={cateScrollRef}
          >
            {categories?.map((ele, ind) => {
              return (
                <CategoryCard name={ele.category} image={ele.image} key={ind} />
              );
            })}
          </div>

          {showRightCateScrollButton && (
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-primaryColor text-white p-2 rounded-full shadow-lg z-10 hover:bg-[#e64528]"
              onClick={() => scrollHandler(cateScrollRef, "right")}
            >
              <FaChevronCircleRight />
            </button>
          )}
        </div>
      </div>

      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
        <h1 className="text-gray-800 text-2xl sm:text-3xl">
          Best Restaurants in {currentCity}
        </h1>
        <div className="w-full relative">
          {showLeftRestaurantScrollButton && (
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-primaryColor text-white p-2 rounded-full shadow-lg z-10 hover:bg-[#e64528]"
              onClick={() => scrollHandler(restaurantScrollRef, "left")}
            >
              <FaChevronCircleLeft />
            </button>
          )}
          <div
            className="w-full flex overflow-x-auto gap-4 pb-2"
            ref={restaurantScrollRef}
          >
            {restaurantsInCity?.map((ele, ind) => {
              return (
                <CategoryCard name={ele.name} image={ele.image} key={ind} />
              );
            })}
          </div>

          {showRightRestaurantScrollButton && (
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-primaryColor text-white p-2 rounded-full shadow-lg z-10 hover:bg-[#e64528]"
              onClick={() => scrollHandler(restaurantScrollRef, "right")}
            >
              <FaChevronCircleRight />
            </button>
          )}
        </div>
      </div>

      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
        <h1 className="text-gray-800 text-2xl sm:text-3xl">
          Suggested food items
        </h1>

        <div className='flex justify-center flex-wrap gap-[20px] h-auto w-full'>
          {
            productsInCity?.map((ele,ind) =>{
              return <FoodCard  data={ele} key={ind} /> 
            })
          }
        </div>
      </div>
    </div>
  );
}

export default UserDashboard
