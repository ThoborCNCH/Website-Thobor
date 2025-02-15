import React from "react";
import "./loading.scss"; // Import SCSS file

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div class="mosaic-loader">
  <div class="cell d-0"></div>
  <div class="cell d-1"></div>
  <div class="cell d-2"></div>
  <div class="cell d-3"></div>
  <div class="cell d-1"></div>
  <div class="cell d-2"></div>
  <div class="cell d-3"></div>
  <div class="cell d-4"></div>
  <div class="cell d-2"></div>
  <div class="cell d-3"></div>
  <div class="cell d-4"></div>
  <div class="cell d-5"></div>
  <div class="cell d-3"></div>
  <div class="cell d-4"></div>
  <div class="cell d-5"></div>
  <div class="cell d-6"></div>
</div>
    </div>
  );
};

export default LoadingScreen;
