import React, { useState } from "react";
import { FiSearch, FiChevronDown, FiSliders } from "react-icons/fi";
import { MdStorefront } from "react-icons/md";
import { BiLeaf } from "react-icons/bi";
import "./Navbar.css";
import logo from "../../assets/pickbazarlogo.png";

const Navbar = () => {
  const [pagesOpen, setPagesOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-row1">
        <div className="navbar-left">
          <div className="navbar-logo">
            <img src={logo} alt="PickBazar" className="navbar-logo-img" />
          </div>
          <div className="navbar-category-wrapper navbar-desktop-only">
            <button className="navbar-category-btn">
              <BiLeaf className="navbar-category-icon" />
              <span>Grocery</span>
              <FiChevronDown className="navbar-chevron" />
            </button>
          </div>
        </div>
        <div className="navbar-right navbar-desktop-only">
          <ul className="navbar-links">
            <li><a href="#">Shops</a></li>
            <li><a href="#">Offers</a></li>
            <li><a href="#">Contact</a></li>
            <li
              className="navbar-pages-dropdown"
              onMouseEnter={() => setPagesOpen(true)}
              onMouseLeave={() => setPagesOpen(false)}
            >
              <a href="#">Pages <FiChevronDown className="navbar-chevron-sm" /></a>
              {pagesOpen && (
                <ul className="navbar-dropdown-menu">
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">FAQ</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Terms & Conditions</a></li>
                </ul>
              )}
            </li>
          </ul>
          <button className="navbar-search-btn" aria-label="Search">
            <FiSearch size={18} />
          </button>
          <button className="navbar-join-btn">Join</button>
          <button className="navbar-seller-btn">
            <MdStorefront size={16} style={{ marginRight: "6px" }} />
            Become a Seller
          </button>
        </div>
      </div>
      <div className="navbar-row2 navbar-mobile-only">
        <button className="navbar-filter-btn">
          <FiSliders size={16} />
          <span>Filter</span>
        </button>
        <div className="navbar-category-wrapper">
          <button className="navbar-category-btn">
            <BiLeaf className="navbar-category-icon" />
            <span>Grocery</span>
            <FiChevronDown className="navbar-chevron" />
          </button>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;