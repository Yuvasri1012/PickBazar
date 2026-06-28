  import React from "react";
  import "./Banner.css";
  import BannerImg from "../../assets/Banner.png";

  const Banner = () => {
    return (
      <div className="banner-outer">
        <div className="banner-wrapper">
          <img src={BannerImg} alt="Banner" className="banner-img" />
        </div>
      </div>
    );
  };

  export default Banner;