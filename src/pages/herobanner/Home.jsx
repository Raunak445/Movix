import React from "react";
import HeroBanner from "./HeroBanner";
import Trending from "../home/trending/Trending";

import "./style.scss"
function Home() {
  return (
    <div className="homePage">
    
        <HeroBanner/>
        <Trending/>
      

      <div style={{height:1000}}></div>
    </div>
  );
}

export default Home;
