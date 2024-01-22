import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import Cookies from "js-cookie";
import background from "../Assets/Login/background.png";
import digitalflake from "../Assets/Login/digitalflakeloginlogo.png";
import { Link, useNavigate } from "react-router-dom";
import SideNavBar from "./SideNavBar";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newemail, setNewemail] = useState("");

  const { getLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitForm = async () => {
    try {
      const userData = {
        email,
        password,
      };
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        userData
      );

      const data = response.data;

      if (data.message) {
        alert(data.message);

        navigate("/");
      } else {
        await getLoggedIn();
        navigate("/home");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/password/forgot",
        { newemail }
      );

      const data = response.data;

      alert(data.message);
    } catch (error) {
      console.error("Error during forgot password:", error);

      alert("Error sending forgot password request");
    }
  };

  return (
    <div className="">
      <div className="w-[1728px] h-[1117px]">
        {/* Background Image */}
        <img src={background} alt="" />

        {/* Login Form */}
        <form>
          <div
            className="absolute w-[780px] h-[950px] top-[104px] left-[46px] rounded-[15px] bg-[#FFFFFF]"
            style={{
              boxShadow: "0px 4px 15px 0px #000000BF",
            }}
          >
            <img
              src={digitalflake}
              className="absolute w-[301px] h-[158px] top-[57px] left-[239px]"
              alt=""
            />
            <div className="absolute w-[492px] h-[48px] top-[215px] left-[134px] font-poppins font-[400px] text-[32px] leading-[48px] text-[#717070]">
              Welcome to Digitalflake Admin
            </div>
            <div className="absolute w-[673px] h-[85px] top-[354px] left-[49px]">
              <div className="absolute top-[-8px] left-[0px] w-[673px] h-[92px]">
                <div className="absolute top-[8px] left-[0px] rounded-8xs bg-white box-border w-[673px] h-[84px] overflow-hidden border-[1px] border-solid border-darkgray">
                  <input
                    type="email"
                    className="absolute top-[0px] left-[0px] w-[673px] h-[84px]  font-p-posts font-poppins text-[25px] leading-[48px] text-[#717070]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="absolute top-[0px] left-[12px] bg-white flex flex-row items-center justify-center py-0 px-1 text-8xl text-dimgray-200 font-poppins">
                  <div className="relative tracking-[0.15px] leading-[16px]">
                    Email ID
                  </div>
                </div>
              </div>
            </div>

            <div className="a absolute w-[673px] h-[85px] top-[519px] left-[49px]">
              <div className="absolute top-[-8px] left-[0px] w-[673px] h-[92px]">
                <div className="absolute top-[8px] left-[0px] rounded-8xs bg-white box-border w-[673px] h-[84px] overflow-hidden border-[1px] border-solid border-darkgray">
                  <input
                    type="password"
                    className="absolute top-[0px] left-[0px] w-[673px] h-[84px] font-p-posts font-poppins text-[25px] leading-[48px] text-[#717070]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="absolute top-[0px] left-[12px] bg-white flex flex-row items-center justify-center py-0 px-1 text-8xl text-dimgray-200 font-poppins">
                  <div className="relative tracking-[0.15px] leading-[16px]">
                    Password
                  </div>
                </div>
              </div>
            </div>

            {/* Forgot Password Callout  */}
            <div className="absolute w-[212px] h-[36px] top-[635px] left-[506px] font-poppins text-[24px] leading-[36px] text-[#A08CB1]">
              <Link
                className="no-underline text-current"
                onClick={() => {
                  Swal.fire({
                    title: "Did you forget your password?",
                    text: "Enter your email address and we'll send you a link to restore password",
                    input: "email",
                    inputLabel: "Email Address",
                    inputPlaceholder: "Enter your Email",
                    inputAttributes: {
                      maxlength: "80",
                      autocapitalize: "off",
                      autocorrect: "off",
                    },
                    confirmButtonColor: "#662671",
                    confirmButtonText: "Request reset link",
                  }).then((result) => {
                    handleForgotPassword();
                    if (result.isConfirmed) {
                      const enteredEmail = result.value;
                      setNewemail(enteredEmail);

                      
                    }
                  });
                }}
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="button"
              onClick={submitForm}
              className="absolute w-[673px] h-[80px] top-[784px] left-[49px] rounded-[8px] bg-[#5C218B] font-poppins font-[500] text-[32px] leading-[48px] text-[#FFFFFF] cursor-pointer"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
