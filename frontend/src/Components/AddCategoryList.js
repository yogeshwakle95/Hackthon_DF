import React, { useState } from "react";
import axios from 'axios';
import SideNavBar from "./SideNavBar";
import back from "../Assets/Category/back.png";
import { Link, useNavigate } from "react-router-dom";

export default function AddCategoryList() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(true);
  const navigate = useNavigate();

  const cancelCategory = () => {
    setName("");
    setDescription("");
    setStatus(true);
    navigate("/category");
  };

  const saveCategory = async () => {
    if (name && description) {
      try {
        const response = await axios.post(
          'http://localhost:5000/api/category/admin',
          {
            name,
            description,
            status,
          });

        // Handle the response as needed
        if (response.data.message) {
          alert(response.data.message);
          navigate('/category');
        } else {
          navigate('/category');
        }
      } catch (error) {
        console.error('Error saving category:', error);
      }
    } else {
      alert('Please fill all the fields');
    }
  };
  return (
    <div>
      <div className="w-[1728px] h-[1117px] top-[-1699px] left-[-303px]"
      
      >
        <SideNavBar />
        <div>
          <div 
          className="absolute w-[1230px] h-[962px] top-[132px] left-[464px] rounded-[10px]"
            
          >
            <div
            className="a absolute w-[16px] h-[16px] top-[33px] left-[15px]"
             
            >
              <Link to="/category">
                <img src={back} />
              </Link>
            </div>
            <div
            className="absolute w-[167px] h-[36px] top-[24px] left-[54px] font-inter font-[600] text-[#000000] text-[20px] flex items-center tracking-[0.5px]"
              style={{
             
              }}
            >
              Add Category
            </div>
            <div>
              <form>
                <div
                className="absolute w-[380px] h-[64px] top-[109px] left-[23px]"
               
                >
                  <div className="absolute top-[-8px] left-[0px] w-[380px] h-[64px]">
                    <div className="absolute top-[8px] left-[0px] rounded-8xs bg-white box-border w-[380px] h-[64px] overflow-hidden border-[1px] border-solid border-darkgray">
                      <input
                        type="text"
                        className="absolute top-[0px] left-[0px] w-[380px] h-[64px] text-4xl text-[#717070] font-p-posts font-poppins text-[20px]"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                       
                      />
                    </div>
                    <div
                      className="absolute top-[0px] left-[12px] bg-white flex flex-row items-center justify-center py-0 px-1 text-8xl text-dimgray-200 font-inter"
                    
                    >
                      <div
                        className="relative leading-[16px] font-inter text-[16px] text-[#000000] tracking-[0.5px]"
                       
                      >
                        Category Name
                      </div>
                    </div>
                  </div>
                </div>

                <div
                className="absolute w-[380px] h-[64px] top-[109px] left-[425px]"
                 
                >
                  <div className="absolute top-[-8px] left-[0px] w-[380px] h-[64px]">
                    <div className="absolute top-[8px] left-[0px] rounded-8xs bg-white box-border w-[380px] h-[64px] overflow-hidden border-[1px] border-solid border-darkgray">
                      <input
                        type="text"
                        className="absolute top-[0px] left-[0px] w-[380px] h-[64px] text-[20px] text-[#717070] font-p-posts font-poppins"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                       
                      />
                    </div>
                    <div
                      className="absolute top-[0px] left-[12px] bg-white flex flex-row items-center justify-center py-0 px-1 text-8xl text-dimgray-200 font-inter"
                     
                    >
                      <div
                        className="relative leading-[16px] font-inter text-[16px] text-[#000000] tracking-[0.5px]"
                       
                      >
                        Description
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    position: "absolute",
                    width: "380px",
                    height: "64px",
                    top: "109px",
                    left: "828px",
                  }}
                >
                  <div className="absolute top-[-8px] left-[0px] w-[380px] h-[64px]">
                    <div className="absolute top-[8px] left-[0px] rounded-8xs bg-white box-border w-[380px] h-[64px] overflow-hidden border-[1px] border-solid border-darkgray">
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-[380px] h-[64px] text-[20px]"
                        
                      >
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
                      </select>
                    </div>
                    <div
                      className="absolute top-[0px] left-[12px] bg-white flex flex-row items-center justify-center py-0 px-1 text-8xl text-dimgray-200 font-inter"
                     
                    >
                      <div
                        className="relative leading-[16px] font-inter text-[16px] text-[#000000] tracking-[0.5px]"
                        
                      >
                        Status
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute w-[208px] h-[55px] top-[868px] left-[999px] rounded-[100px] bg-[#662671] cursor-pointer"
                 
                >
                  <button
                    type="button"
                    onClick={saveCategory}
                    className="absolute w-[66px] h-[32px] top-[11px] left-[71px] font-inter text-[18px] bg-[#662671] text-[#FFFFFF] flex items-center cursor-pointer"
                   
                  >
                    Save
                  </button>
                </div>
                <div
                className="absolute w-[208px] h-[55px] top-[868px] left-[747px] rounded-[100px] border border-solid border-[#676767] cursor-pointer"
                 
                >
                  <button
                    type="button"
                    onClick={cancelCategory}
                    className="absolute w-[66px] h-[32px] top-[11px] left-[71px] rounded-[100px] bg-white font-inter text-[18px] flex items-center text-[#676767] cursor-pointer"
                   
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
