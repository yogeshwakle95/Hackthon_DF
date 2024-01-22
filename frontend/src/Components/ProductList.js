import React, { useEffect, useState } from "react";
import axios from "axios";
import SideNavBar from "./SideNavBar";
import logo from "../Assets/Category/categorylogo.png";
import search from "../Assets/Category/search.png";
import { Link } from "react-router-dom";
import edit from "../Assets/Category/edit.png";
import deleteIcon from "../Assets/Category/delete.png";
import Swal from "sweetalert2";

export default function ProductList() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getProductList();
  }, []);

  const deleteProduct = async (id) => {
    // console.log(id);
    try {
      await axios.delete(`http://localhost:5000/api/product/admin/${id}`, {});

      // Refresh category list after deletion
      getProductList();
    } catch (error) {
      console.error("Error deleting category:", error.message);
    }
  };

  const getProductList = async () => {
    let result = await fetch("http://localhost:5000/api/product/", {
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();

    setProductList(result);
  };

  return (
    <div className="w-[1728px] h-[1117px] top-[-1699px] left-[-303px]">
      <SideNavBar />
      {/* Product List Component */}
      <div>
        <div
          className="absolute w-[1230px] h-[962px] top-[132px] left-[464px] rounded-[10px] text-white "
          style={{
            border: "1px solid #B0ADAD",
            boxShadow: "0px 4px 10px 0px #00000040",
          }}
        >
          <div>
            <div className="absolute w-[30px] h-[30px] top-[23px] left-[26px]">
              <img src={logo} />
            </div>
            <div className="absolute w-[119px] h-[36px] top-[20px] left-[81px] font-inter text-[24px] text-[#000000]">
              Product
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
              <Link to="/addProduct" className=" text-white no-underline ">
                Add New
              </Link>
            </button>
          </div>
          {/* Product Table */}
          <div className="absolute w-[1230px] h-[800px] top-[80px]">
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden ">
                  <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                    <thead style={{ backgroundColor: "#FFF8B7" }}>
                      <tr>
                        <th
                          scope="col"
                          className="font-poppins text-[20px] text-[#000000] font-medium"
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="font-poppins text-[20px] text-[#000000] font-medium"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="font-poppins text-[20px] text-[#000000] font-medium"
                        >
                          Pack Size
                        </th>
                        <th
                          scope="col"
                          className="font-poppins text-[20px] text-[#000000] font-medium"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="font-poppins text-[20px] text-[#000000] font-medium"
                        >
                          MRP
                        </th>
                        <th
                          scope="col"
                          className="font-poppins text-[20px] text-[#000000] font-medium"
                        >
                          Image
                        </th>
                        <th
                          scope="col"
                          className="font-poppins text-[20px] text-[#000000] font-medium"
                        >
                          Status
                        </th>
                        <th scope="col" className="p-4">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      {productList.map((product) => (
                        <tr key={product._id} className="bg-[#F2F2F2]">
                          <td className="font-poppins text-[16px] text-[#000000]">
                            {product._id}
                          </td>
                          <td className="font-poppins text-[16px] text-[#000000]">
                            {product.name}
                          </td>
                          <td className="font-poppins text-[16px] text-[#000000]">
                            {product.packSize}
                          </td>
                          <td className="font-poppins text-[16px] text-[#000000]">
                            {product.category}
                          </td>
                          <td className="font-poppins text-[16px] text-[#000000]">
                            {product.mrp}
                          </td>
                          <td>
                            {/* {product.image} */}
                            <img
                              src={product.image}
                              alt="Img not found"
                              className="w-[50px] h-[50px]"
                            />
                          </td>
                          {product.status ? (
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
                            {/* Link to navigate to Edit Product Page */}
                            <Link
                              to="/editProduct"

                              // style={{ display: "inline-flex" }}
                            >
                              <img src={edit} />
                            </Link>
                            {/* Button for Delete Callout */}
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
                                    deleteProduct(product._id);
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
