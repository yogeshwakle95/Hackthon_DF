import React, { useEffect, useState } from "react";
import axios from "axios";
import SideNavBar from "./SideNavBar";
import { Link, useNavigate } from "react-router-dom";
import back from "../Assets/Category/back.png";
import upload from "../Assets/Products/upload.png";

export default function AddProduct() {
  const [category, setCategory] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [name, setName] = useState("");
  const [packSize, setPackSize] = useState("");
  const [mrp, setMrp] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState(true);
  const navigate = useNavigate();
  const trial = ["electronics", "mobile", "Sports"];

  const cancelProduct = () => {
    setCategory("");
    setName("");
    setPackSize("");
    setMrp("");
    setImage("df");
    setStatus(true);
    navigate("/products");
  };

  const saveProduct = async () => {
    const formData = new FormData();
    formData.append("photo", image);
    formData.append("name", name);
    formData.append("packSize", packSize);
    formData.append("category", category);
    formData.append("mrp", mrp);
    formData.append("status", status);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      if (name && packSize && mrp && image && category) {
        const res = await axios.post(
          "http://localhost:5000/api/product/admin/",
          formData,
          config
        );
        console.log(res);

        setCategory("");
        setName("");
        setPackSize("");
        setMrp("");
        setImage(null);
        setStatus(true);

        // Navigate to appropriate page
        navigate("/products");
      } else {
        alert("Please fill all the fields");
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/category/");

      setCategoryList(response.data.map((category) => category.name));
    } catch (error) {
      console.error("Error getting category list:", error);
    }
  };

  return (
    <div>
      <div className="w-[1728px] h-[1117px] top-[-1699px] left-[-303px]">
        <SideNavBar />
        {/* Add Product Component */}
        <div>
          <div className="absolute w-[1230px] h-[962px] top-[132px] left-[464px] rounded-[10px] border-solid border-[1px] text-white cursor-pointer">
            <div className="absolute w-[16px] h-[16px] top-[33px] left-[30px]">
              <Link to="/products">
                <img src={back} />
              </Link>
            </div>
            <div className="absolute w-[167px] h-[36px] top-[24px] left-[54px] font-inter text-[24px] text-[#000000] flex items-center">
              Add Product
            </div>
            <div>
              <form>
                <div className="absolute w-[380px] h-[64px] top-[109px] left-[23px]">
                  <div className="absolute top-[-8px] left-[0px] w-[380px] h-[64px]">
                    <div className="absolute top-[8px] left-[0px] rounded-8xs bg-white box-border w-[380px] h-[64px] overflow-hidden border-[1px] border-solid border-darkgray">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-[380px] h-[64px] border border-solid border-[#686868] text-[16px] text-[000000] font-inter"
                      >
                        <option value={null}>Select an option</option>
                        {categoryList.map((category) => {
                          return <option value={category}>{category}</option>;
                        })}
                      </select>
                    </div>
                    <div className="absolute w-[127px] h-[16px] top-[0px] left-[12px] bg-white flex flex-row items-center justify-center py-0 px-1 text-[16px] text-[#1F1F1F] font-inter">
                      <div className="relative tracking-[0.5px] leading-[16px] font-inter text-[16px] text-[#000000]">
                        Category
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute w-[380px] h-[64px] top-[109px] left-[425px]">
                  <div className="absolute top-[-8px] left-[0px] w-[380px] h-[64px]">
                    <div className="absolute top-[8px] left-[0px] rounded-8xs bg-white box-border w-[380px] h-[64px] overflow-hidden border-[1px] border-solid border-darkgray">
                      <input
                        type="text"
                        className="absolute font-poppins text-[20px] top-[0px] left-[0px] w-[380px] h-[64px] text-4xl text-[#717070]"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="absolute w-[127px] h-[16px]  top-[0px] left-[12px] bg-white flex flex-row items-center justify-center py-0 px-1 text-[16px] text-[#1F1F1F] font-inter">
                      <div>Product Name</div>
                    </div>
                  </div>
                </div>

                <div className="absolute w-[380px] h-[64px] top-[109px] left-[828px]">
                  <div className="absolute top-[-8px] left-[0px] w-[380px] h-[64px]">
                    <div className="absolute top-[8px] left-[0px] rounded-8xs bg-white box-border w-[380px] h-[64px] overflow-hidden border-[1px] border-solid border-darkgray">
                      <input
                        type="text"
                        className="absolute top-[0px] left-[0px] w-[380px] h-[64px] text-[20px] font-poppins text-[#717070]"
                        value={packSize}
                        onChange={(e) => setPackSize(e.target.value)}
                      />
                    </div>
                    <div className="absolute top-[0px] left-[12px] bg-white flex flex-row items-center justify-center py-0 px-1 text-[16px] text-[#1F1F1F] font-inter">
                      <div>Pack Size</div>
                    </div>
                  </div>
                </div>

                <div className="absolute w-[380px] h-[64px] top-[208px] left-[23px]">
                  <div className="absolute top-[-8px] left-[0px] w-[380px] h-[64px]">
                    <div className="absolute top-[8px] left-[0px] rounded-8xs bg-white box-border w-[380px] h-[64px] overflow-hidden border-[1px] border-solid border-darkgray">
                      <input
                        type="text"
                        className="absolute top-[0px] left-[0px] w-[380px] h-[64px] text-[20px] text-[#717070] font-poppins"
                        value={mrp}
                        onChange={(e) => setMrp(e.target.value)}
                      />
                    </div>
                    <div className="absolute w-[50px] h-[16px] top-[0px] left-[12px] bg-white flex flex-row items-center justify-center py-0 px-1 text-[16px] text-[#1F1F1F] font-inter">
                      <div className="relative tracking-[0.15px] leading-[16px]">
                        MRP
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute w-[380px] h-[64px] top-[208px] left-[425px]">
                  <div className="absolute top-[-8px] left-[0px] w-[380px] h-[64px]">
                    <div className="absolute top-[8px] left-[0px] rounded-8xs bg-white box-border w-[380px] h-[64px] overflow-hidden border-[1px] border-solid border-darkgray">
                      <div></div>
                      <div>
                        <label>
                          <label
                            for="file-upload"
                            class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>
                              <img src={upload} alt=" upload" />
                            </span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              onChange={(e) => setImage(e.target.files[0])}
                              className="sr-only absolute top-[0px] left-[0px]  "
                            />
                          </label>
                        </label>
                      </div>
                    </div>
                    <div className="absolute top-[0px] left-[12px] bg-white flex flex-row items-center justify-center py-0 px-1 text-8xl text-dimgray-200 font-inter">
                      <div className="relative tracking-[0.15px] leading-[16px] font-inter text-[16px] text-[#000000]">
                        Product Image
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute w-[380px] h-[64px] top-[208px] left-[828px]">
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
                    <div className="absolute top-[0px] left-[12px] bg-white flex flex-row items-center justify-center py-0 px-1 text-8xl text-dimgray-200 font-inter">
                      <div className="relative tracking-[0.5px] leading-[16px] font-inter text-[16px] text-[#000000]">
                        Status
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute w-[208px] h-[55px] top-[868px] left-[999px] rounded-[100px] bg-[#662671] cursor-pointer">
                  <button
                    type="button"
                    onClick={saveProduct}
                    className="absolute w-[66px] h-[32px] top-[11px] left-[71px] rounded-[100px] bg-[#662671] font-inter text-[18px] text-[#FFFFFF] cursor-pointer"
                  >
                    Save
                  </button>
                </div>
                <div className="absolute w-[208px] h-[55px] top-[868px] left-[747px] rounded-[100px] border-[1px] border-solid border-[#676767] cursor-pointer">
                  <button
                    type="button"
                    onClick={cancelProduct}
                    className="absolute w-[66px] h-[32px] top-[11px] left-[71px] rounded-[100px] bg-white font-inter text-[18px] text-[#676767] cursor-pointer"
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
