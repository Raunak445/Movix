import { useState, useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import Home from "./pages/herobanner/Home";
import Details from "./pages/details/Details";
import Explore from "./pages/explore/Explore";
import SearchResults from "./pages/searchResults/SearchResults";
import PageNotFound from "./pages/404/PageNotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.home.url);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      console.log(res);
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    });
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};
    endPoints.forEach((url) => {
      return promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });
    // promise.all returns data from both of them
    const data = await Promise.all(promises);
    console.log(data);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });

    // console.log("AllGenres object")
    // console.log(allGenres);
    dispatch(getGenres(allGenres))
  };

  // optional changing if value of variable is undefined the later code is not executed
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>

        {/*  mediaType=  whether it is movie or tv show */}
        <Route path="/:mediaType/:id" element={<Details />}></Route>
        <Route path="/search/:query" element={<SearchResults />}> </Route>
          <Route path="/explore/:mediaType" element={<Explore/>}></Route>

          <Route path="*" element={<PageNotFound />}></Route>
       
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
