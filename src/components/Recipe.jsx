import React, { useEffect, useRef, useState } from "react";
import style from "../css/Recipe.module.css";
import { useNavigate } from "react-router-dom";
import Li from "./Li";
import axios from "axios";
import { HashLoader } from "react-spinners";

const Recipe = () => {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#90ee90",
  };
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const [recipeData, setRecipeData] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef();
  const buttonRef = useRef();

  async function btnClicked() {
    const query = inputRef.current.value;
    const url = `https://api.edamam.com/search?q=${query}&from=0&to=50&app_id=abc32a2c&app_key=d644645ec14fbf33a06f909660dd9521`;
    setData(query);
    setLoading(true);
    try {
      const res = await axios.get(url);
      const recipes = res.data.hits.map((hit) => hit.recipe);
      setRecipeData(recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
      inputRef.current.value = "";
    }
  }

  const listenToSCroll = () => {
    if (window.pageYOffset > 99) {
      buttonRef.current.style.opacity = "1";
    } else {
      buttonRef.current.style.opacity = "0";
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToSCroll);
  }, []);

  return (
    <>
      <main className={style.main}>
        <nav className={style.navbar}>
          <ul className={style.navitems}>
            <li
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </li>
            <li
              onClick={() => {
                navigate("/recipes");
              }}
            >
              Recipes
            </li>
          </ul>
        </nav>
        <section className={style.interior}>
          <div className={style.search}>
            <input
              type="search"
              placeholder="Potato,Tomato | Biryani"
              className={style.searchBar}
              ref={inputRef}
            />
            <button
              className={style.searchButton}
              type="button"
              onClick={btnClicked}
            >
              Search
            </button>
          </div>
          <div className={style.searchResults}>
            <h2 className={style.recipeResults}>Recipe results for : {data}</h2>
          </div>
          <div className={style.data}>
            {loading ? (
              <HashLoader
                color="#006400"
                cssOverride={override}
                loading={loading}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              <ul className={style.dataItems}>
                {recipeData.map((data, index) => (
                  <Li key={index} label={data.label} image={data.image} />
                ))}
              </ul>
            )}
          </div>
        </section>
        <button
          ref={buttonRef}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={style.upArrow}
        >
          &uarr;
        </button>
      </main>
    </>
  );
};

export default Recipe;
