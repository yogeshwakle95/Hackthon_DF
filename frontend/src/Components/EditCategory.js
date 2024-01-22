import React from "react";
import { Link } from "react-router-dom";

export default function EditCategory() {
  return (
    <div>
      EditCategory
      <div style={{ backgroundColor: "red" }}>
        <Link to="/category">Category</Link>
      </div>
    </div>
  );
}
