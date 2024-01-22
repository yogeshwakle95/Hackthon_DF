import React, { useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import TransLogo from "../Assets/Home/TransLogo.png";
import LogoutLogo from "../Assets/Home/LogoutLogo.png";
import home from "../Assets/Home/home.png";
import category from "../Assets/Home/categoru.png";
import products from "../Assets/Home/products.png";
import arrow from "../Assets/Home/Arrow.png";
import digitalflakelogo from "../Assets/Login/digitalflakeloginlogo.png";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function SideNavBar() {
  const { getLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log(getLoggedIn);

  async function logOut() {
    await axios.get("http://localhost:5000/api/user/logout");
    await getLoggedIn();
    navigate("/");
  }
  return (
    <div>
      <div>
        <div>
          {/* Side Navbar  */}
          <div className="absolute w-[448px] h-[1117px] bg-[#F4F4F4]">
            {/* Home tab */}
            <Link to="/home">
              <div className="absolute w-[439px] h-[59px] top-[159px] left-[4px]">
                <div className="absolute w-[30px] h-[30px] top-[13px] left-[26px]">
                  <img src={home}></img>
                </div>
                <div className="absolute w-[67px] h-[24px] top-[16px] left-[78px] font-inter text-[24px] text-[#000000]">
                  Home
                </div>
                <div className="absolute w-[20px] h-[10px] top-[18px] left-[422px]">
                  <img src={arrow}></img>
                </div>
              </div>
            </Link>
            {/* Category tab */}
            <Link to="/category">
              <div className="absolute w-[439px] h-[59px] top-[255px] left-[5px]">
                <div className="absolute w-[30px] h-[30px] top-[14px] left-[25px]">
                  <img src={category}></img>
                </div>
                <div className="absolute w-[106px] h-[24px] top-[17px] left-[76px] font-inter text-[24px] text-[#000000]">
                  Category
                </div>
                <div className="absolute w-[20px] h-[10px] left-[421px]">
                  <img src={arrow}></img>
                </div>
              </div>
            </Link>
            {/* Products tab */}
            <Link to="/products">
              <div className="absolute w-[439px] h-[59px] top-[345px] left-[5px]">
                <div className="absolute w-[30px] h-[30px] top-[16px] left-[25px]">
                  <img src={products}></img>
                </div>
                <div className="absolute w-[102px] h-[24px] top-[19px] left-[77px] font-inter text-[24px] text-[#000000]">
                  Products
                </div>
                <div className="absolute w-[20px] h-[10px] top-[21px] left-[421px]">
                  <img src={arrow}></img>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="absolute w-[1728px] h-[118px] bg-[#662671] ">
          <div className="absolute w-[296px] h-[45.96px] top-[36px] left-[30px]">
            <img src={TransLogo}></img>
          </div>
          {/* Logout Callout*/}
          <div>
            <button
              type="button"
              className="absolute w-[50px] h-[50px] top-[31px] left-[1621px] bg-[#662671]"
              onClick={() => {
                Swal.fire({
                  title: "Log Out",
                  text: "Are you sure you want to log out ?",
                  icon: "warning",
                  showCancelButton: true,
                  cancelButtonColor: "#676767",
                  confirmButtonColor: "#662671",
                  confirmButtonText: "Confirm",
                }).then((result) => {
                  if (result.isConfirmed) {
                    logOut();
                  }
                });
              }}
            >
              <img src={LogoutLogo}></img>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
