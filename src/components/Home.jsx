import React from "react";
import style from "../css/Home.module.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
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
          <div className={style.left}>
            <h1>Feeling hungry?</h1>
            <h3> Let's whip up something delicious! 🍲</h3>
            <button
              type="button"
              className={style.button}
              onClick={() => {
                navigate("/recipes");
              }}
            >
              Let's Find some Recipes
            </button>
          </div>
          <div className={style.right}>
            <lord-icon
              src="https://cdn.lordicon.com/afqjkqgo.json"
              trigger="hover"
              stroke="bold"
            ></lord-icon>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
