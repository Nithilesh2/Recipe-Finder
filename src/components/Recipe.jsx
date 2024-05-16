import React, { useEffect, useRef, useState } from "react";
import style from "../css/Recipe.module.css";
import { useNavigate } from "react-router-dom";
import Li from "./Li";
import axios from "axios";
import { HashLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/ToastStyles.css";

const Recipe = () => {
  const notifyTrue = () =>
    toast.success("Range is not kept so recipes will be up to 50", {
      className: "Toastify__toast--custom",
      progressClassName: "Toastify__progress-bar--custom",
    });

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
  const rangeRef = useRef();

  async function btnClicked() {
    if (inputRef.current.value === "") {
      alert("Please enter input");
    } else {
      let url;
      if (rangeRef.current.value === "") {
        url = `https://api.edamam.com/search?q=${inputRef.current.value}&from=0&to=50&app_id=abc32a2c&app_key=d644645ec14fbf33a06f909660dd9521`;
        notifyTrue();
      } else {
        url = `https://api.edamam.com/search?q=${inputRef.current.value}&from=0&to=${rangeRef.current.value}&app_id=abc32a2c&app_key=d644645ec14fbf33a06f909660dd9521`;
      }
      setData(inputRef.current.value);
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
  }

  const listenToScroll = () => {
    if (window.pageYOffset > 99) {
      buttonRef.current.style.opacity = "1";
    } else {
      buttonRef.current.style.opacity = "0";
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => {
      window.removeEventListener("scroll", listenToScroll);
    };
  }, []);

  function enterKeyPressed(eve) {
    if (eve.key === "Enter") {
      if (eve.target.id === "recipesNeeded") {
        btnClicked();
      } else {
        document.getElementById("recipesNeeded").focus();
      }
    }
  }

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
              onKeyPress={enterKeyPressed}
              id="search"
            />
            <button
              className={style.searchButton}
              type="button"
              onClick={btnClicked}
              id="searchButton"
            >
              Search
            </button>
          </div>
          <div className={style.range}>
            <input
              type="number"
              placeholder="50"
              className={style.recipesNeededNumber}
              ref={rangeRef}
              id="recipesNeeded"
              onKeyPress={enterKeyPressed}
            />
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
                  <Li
                    key={index}
                    source={data.source}
                    label={data.label}
                    image={data.image}
                    url={data.url}
                  />
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Recipe;
