import React from "react";
import style from "../css/Recipe.module.css";
import { useNavigate } from "react-router-dom";
import Li from "./Li";
// import axios from "axios";

const Recipe = () => {
  const navigate = useNavigate();

  // const query = "tomato";
  // const url = `https://api.edamam.com/search?q=${query}&from=0&to=100&app_id=abc32a2c&app_key=d644645ec14fbf33a06f909660dd9521`;

  // axios.get(url).then((res) => {
  //   for (let i = 0; i < res.data.hits.length; i++) {
  //     console.log(res.data.hits[i].recipe.label);
  //   }
  // });

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
              placeholder="Ex: Potato,Tomato | Biryani"
              className={style.searchBar}
            />
            <button className={style.searchButton} type="button">
              Search
            </button>
          </div>
          <div className={style.data}>
            <ul>
              <Li source="" />
            </ul>
          </div>
        </section>
      </main>
    </>
  );
};

export default Recipe;
