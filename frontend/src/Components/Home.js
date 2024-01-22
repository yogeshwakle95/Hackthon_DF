import React from "react";
import TransLogo from "../Assets/Home/TransLogo.png";
import LogoutLogo from "../Assets/Home/LogoutLogo.png";
import home from "../Assets/Home/home.png";
import category from "../Assets/Home/categoru.png";
import products from "../Assets/Home/products.png";
import arrow from "../Assets/Home/Arrow.png";
import digitalflakelogo from "../Assets/Login/digitalflakeloginlogo.png";
import { Link } from "react-router-dom";
import SideNavBar from "./SideNavBar";

export default function Home() {
  return (
    <div>
      <div className="w-[1728px] h-[1117px] top-[-1699px] left-[-303px]"
        
      >
        <SideNavBar />
        {/* Home Component */}
        <div>
          <div className="absolute w-[341px] h-[179px] top-[361px] left-[875px]"
          >
            <img src={digitalflakelogo} />
          </div>
          <div
           className=" absolute w-[468px] h-[41px] top-[549px] left-[811px] font-inter text-[32px] text-[#040404]"
          
          >
            Welcome to Digitalflake Admin
          </div>
        </div>
      </div>
    </div>
  );
}
