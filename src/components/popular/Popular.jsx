import React, { useState } from "react";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import Carousel from "../carousel/Carousel";
import useFetch from "../../hooks/useFetch";
import SwitchTabs from "../switchTabs/SwitchTabs";


const Popular = () => {
  const [endpoint, setEndpoint] = useState("movie");

  const { data, loading } = useFetch(`/${endpoint}/popular`);


 

  const onTabChange = (tab) => {
      setEndpoint(tab === "Movies" ? "movie" : "tv");
  };


  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">What's Popular</span>
        <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} 
        endpoint={endpoint}
      />
    </div>
  );
};

export default Popular;
