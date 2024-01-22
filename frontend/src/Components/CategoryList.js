import React, { useEffect, useState } from "react";
import axios from "axios";
import SideNavBar from "./SideNavBar";
import logo from "../Assets/Category/categorylogo.png";
import search from "../Assets/Category/search.png";
import { Link } from "react-router-dom";
import edit from "../Assets/Category/edit.png";
import deleteIcon from "../Assets/Category/delete.png";
import Swal from "sweetalert2";

export default function CategoryList() {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const deleteCategory = async (id) => {
    // console.log(id);
    try {
      await axios.delete(`http://localhost:5000/api/category/admin/${id}`, {});

      getCategoryList();
    } catch (error) {
      console.error("Error deleting category:", error.message);
    }
  };

  const getCategoryList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/category/",
        {}
      );

      setCategoryList(response.data);
    } catch (error) {
      console.error("Error getting category list:", error);
    }
  };
  // console.log(categoryList);

  return (
    <div>
      <SideNavBar />
      {/* Category List Component */}
      <div>
        <div className="absolute w-[1230px] h-[962px] top-[132px] left-[464px] rounded-[10px] text-white border border-solid border-[1px] border-[#00000040]">
          <div>
            <div className="absolute w-[30px] h-[30px] top-[23px] left-[26px]">
              <img src={logo} />
            </div>
            <div className="absolute w-[119px] h-[36px] top-[20px] left-[81px] font-inter text-[24px] text-[#000000]">
              Category
            </div>
            <div className="absolute w-[563px] h-[40px] top-[20px] left-[295px] rounded-[10px] border border-solid border-[1px] border-[#B0ADAD]">
              <div className="absolute w-[20px] h-[20px] top-[10px] left-[15px]">
                <img src={search} />
              </div>
              <input
                type="text"
                className="absolute w-[508px] h-[30px] top-[5px] left-[45px]"
              />
            </div>
            <button
              type="button"
              className="absolute w-[110px] h-[40px] top-[21px] left-[1100px] rounded-[10px] bg-[#662671] font-poppins text-[14px] text-[#FFFFFF]"
            >
              <Link
                to="/addCategory"
                style={{ color: "white", textDecoration: "none" }}
              >
                Add New
              </Link>
            </button>
          </div>
          {/* Table */}
          <div
            style={{
              position: "absolute",
              width: "1230px",
              height: "800px",
              top: "80px",
            }}
          >
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden ">
                  <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                    <thead style={{ backgroundColor: "#FFF8B7" }}>
                      <tr>
                        <th
                          scope="col"
                          className="font-medium font-poppins text-[20px] text-[#000000]"
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="font-medium font-poppins text-[20px] text-[#000000]"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="font-medium font-poppins text-[20px] text-[#000000]"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="font-medium font-poppins text-[20px] text-[#000000]"
                        >
                          Status
                        </th>
                        <th scope="col" className="p-4">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      {categoryList.map((category) => (
                        <tr
                          key={category._id}
                          style={{ backgroundColor: "#F2F2F2" }}
                        >
                          <td className="font-medium font-poppins text-[20px] text-[#000000]">
                            {category._id}
                          </td>
                          <td
                            style={{
                              fontFamily: "Poppins",
                              fontStyle: "normal",
                              fontWeight: "400",
                              fontSize: "16px",
                              lineHeight: "24px",
                              color: "#000000",
                            }}
                          >
                            {category.name}
                          </td>
                          <td className="font-medium font-poppins text-[20px] text-[#000000]">
                            {category.description}
                          </td>
                          {category.status ? (
                            <td
                              style={{
                                fontFamily: "Poppins",
                                fontStyle: "normal",
                                fontWeight: "400",
                                fontSize: "16px",
                                lineHeight: "24px",
                                color: "#2DA323",
                              }}
                            >
                              Active
                            </td>
                          ) : (
                            <td
                              style={{
                                fontFamily: "Poppins",
                                fontStyle: "normal",
                                fontWeight: "400",
                                fontSize: "16px",
                                lineHeight: "24px",
                                color: "#B13129",
                              }}
                            >
                              Inactive
                            </td>
                          )}
                          <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                            <Link
                              to="/editCategory"
                              style={{ display: "inline-flex" }}
                            >
                              <img src={edit} />
                            </Link>
                            <button
                              type="button"
                              onClick={() => {
                                Swal.fire({
                                  title: "Delete",
                                  text: "Are you sure you want to delete ?",
                                  icon: "warning",
                                  showCancelButton: true,
                                  cancelButtonColor: "#676767",
                                  confirmButtonColor: "#662671",
                                  confirmButtonText: "Confirm",
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    deleteCategory(category._id);
                                  }
                                });
                              }}
                              style={{ display: "inline-flex" }}
                            >
                              <img src={deleteIcon} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
