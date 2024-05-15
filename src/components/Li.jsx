import React from "react";
import style from "../css/Li.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Li = (props) => {
  return (
    <>
      <li className={style.listItems}>
        <LazyLoadImage
          effect="blur"
          alt={props.label}
          src={props.image}
          className={style.image}
        />
        <h4 className={style.recipeName}>{props.label}</h4>
        <div className={style.buttons}>
          <button type="button" className={style.button}>
            Source
          </button>
          <button type="button" className={style.button}>
            Recipe
          </button>
        </div>
      </li>
    </>
  );
};

export default Li;
