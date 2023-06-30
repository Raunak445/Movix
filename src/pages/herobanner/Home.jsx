import React from "react";
import HeroBanner from "./HeroBanner";
import Trending from "../home/trending/Trending";

import "./style.scss"
import Popular from "../../components/popular/Popular";
import TopRated from "../../components/topRated/TopRated";

function Home() {
  return (
    <div className="homePage">
    
        <HeroBanner/>
        <Trending/>
        <Popular/>
        <TopRated/>
      

      
    </div>
  );
}

export default Home;
