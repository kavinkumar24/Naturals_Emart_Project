import React, { useEffect }  from "react";
import bg_home from "../assests/bg_img.jpg";
import Grains from "../assests/grains_bg.jpg";
import Navbar from "./Navbar";
import { useState } from "react";
import { FaCircleNotch,FaBusinessTime } from "react-icons/fa";
import { FiArrowDown} from "react-icons/fi";
import "./Styles/home.css";
import { useNavigate } from "react-router";
import Load from "./Loading/Load";
function Home() {
  const navigate = useNavigate();
  const[load,setLoad] = useState(false);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "dark" ? "dark" : "light"
  );
  
  const [categoryCounts, setCategoryCounts] = useState({
    FPO: 0,
    SHG: 0,
    ENT: 0,
    Farmer: 0,
  });

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await fetch("https://naturals-emart-project.onrender.com/api/sellers");
        const sellers = await response.json();

        // Count categories
        const counts = { FPO: 0, SHG: 0, ENT: 0, Farmer: 0 };
        sellers.forEach(seller => {
          seller.products.forEach(product => {
            const category = product.category;

            if (category && counts.hasOwnProperty(category)) {
              counts[category] = (counts[category] || 0) + 1;
            }
          });
        });

        setCategoryCounts(counts);
        console.log("Category Counts:", counts);
      } catch (error) {
        console.error("Error fetching sellers:", error);
      }
    };

    fetchSellers();
  }, []);

  const handle_route = (path)=>{
    setLoad(true);
    setTimeout(()=>{
      setLoad(false);
      navigate(path);
    },1000)
  }

  return (
    <div className="w-[100%] min-h-screen overflow-auto bg-slate-100">
    {load && 
    <Load />
}
    <div
      className={`  md:min-h-screen lg:min-h-screen relative h-[40%] sm:h-12 lg:h-full shadow-md ${
        theme === "light" ? "bg-white" : "bg-slate-800"
      }`}
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 hidden md:block">
        <div
          className="absolute right-[-60%] top-0 w-[150%] h-full"
          style={{
            backgroundImage: `url(${bg_home})`,
            clipPath: "ellipse(70% 120% at 100% 50%)",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>
      </div>

      {/* Navbar - Overlayed on top of the background */}
      <div className="relative z-10">
        <Navbar theme={theme} dark={setTheme} />
      </div>

      <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-between ">
        {/* Left Side - Text and Order Details */}
        <div className="md:w-1/2 text-center md:text-left z-0">
          <h1
            className={`text-4xl md:text-6xl font-bold karla-ExtraBold ${
              theme === "light" ? "text-gray-900" : "text-slate-400"
            }`}
          >
            <span className="block md:leading-[4rem] leading-[2.5rem]">
              Welcome
            </span>
            <span className="block md:leading-[4rem] leading-[2.5rem]">
              to <span className="text-green-600">Naturals</span> E-
              <span className="text-yellow-600">mart</span>
            </span>
          </h1>
            <div className="items-center ml-5 md:items-start md:0">
          <ul className="mt-4 text-gray-500 text-md md:text-sm space-y-2">
            <li className="flex items-center">
              <FaCircleNotch className="text-green-500 mr-2" />
              உழவர் உற்பத்தியாளர் நிறுவனங்கள்
            </li>
            <li className="flex items-center">
              <FaCircleNotch className="text-green-500 mr-2" />
              மகளிர் குழுக்கள்
            </li>
            <li className="flex items-center">
              <FaCircleNotch className="text-green-500 mr-2" />
              சிறுதொழில் முனைவோர்
            </li>
            <li className="flex items-center">
              <FaCircleNotch className="text-green-500 mr-2" />
              விவசாயிகள்
            </li>
          </ul>
          </div>
          <div className="mt-6 text-gray-800 text-sm">
            <span>
              ஆகியோரின் உற்பத்திக்கும் நுகர்வோரின் தேவைக்கும் இடையே உள்ள
              இடைவெளியை இணைக்கும் பாலம்
            </span>
            <br></br>
          <div className="mt-4"><span className="font-bold text-lg">மொத்த விற்பனைக்கான தளம்</span></div>
          </div>
          <div className="mt-6 flex items-center justify-center md:justify-start space-x-4">
            <div className="flex items-center justify-center">
              <div className="relative flex items-center justify-center w-12 h-12 bg-slate-400 rounded-full">
                <FiArrowDown className="text-white animate-bounce" size={24} />
              </div>
            </div>
          </div>

        </div>


        <div className="md:w-1/2 relative mt-12 md:mt-0 flex justify-center md:justify-end shadow-xl md:visible">
  <img
    src={Grains}
    alt="Salad"
    className="absolute left-0 top-1/2 transform -translate-y-1/2 w-50 h-50 md:w-96 md:h-96 object-cover rounded-full -z-[2px] shadow-xl transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-2xl hover:rotate-12 hover:translate-x-9"
  />
       
        </div>
      </div>
      
    </div>
    <div className="mt-12 flex flex-wrap justify-center gap-14 mb-20">
    {Object.entries(categoryCounts).map(([category, count]) => (
          <div key={category} className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-row items-center space-x-4 border-slate-300 border border-solid">
            <div className="bg-yellow-300 p-4 rounded-lg shadow-lg">
              <div className="mt-1 text-gray-700 text-xl font-bold">{category}</div>
            </div>
            <div className="text-2xl font-normal text-blue-600">{count}</div>
          </div>
        ))}
</div>
<div className="w-[60%] h-[.2px] bg-orange-400 mx-auto mt-2 mb-10"></div> {/* Border Line */}
    
    
<div className="flex justify-center items-center p-4 mb-10">
<div className="max-w-sm p-6 bg-white border rounded-lg shadow border-slate-300">
    <FaBusinessTime  className="text-3xl"/>
    <a href="#x">
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-black">Business Value</h5>
    </a>
    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">This is to give the overall business value and current working status</p>
    <a href="#/" className="inline-flex font-medium items-center text-blue-600 hover:underline">
        Follow for more details
        <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
        </svg>
    </a>
</div>
</div>

<div className="w-80 h-[1px] bg-slate-400 mx-auto mt-2 mb-10"></div> 

    <h1 className="justify-center items-center flex flex-row">Select a option you want </h1>
<div className="flex flex-row justify-center items-center p-6 mb-10">
  <div className="flex space-x-4 md:space-x-8">
    <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700" onClick={()=>handle_route('/seller')}>
      Seller
    </button>
    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"  onClick={()=>handle_route('/buyer')}>
      Buyer
    </button>
  </div>
</div>



    </div>
  );
}

export default Home;
