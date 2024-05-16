import React, { useRef } from "react";
import style from "../css/Li.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Li = (props) => {
  const sourceRef = useRef();
  const urlRef = useRef();
  function sourceBtnPressed() {
    let src = sourceRef.current.value;
    const removedBlankSpace = src.replace(" ", "");
    window.open(`https://${removedBlankSpace}.com`, "_blank");
  }
  function recipeBtnPressed() {
    window.open(urlRef.current.value, "_blank");
  }
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
          <button
            onClick={sourceBtnPressed}
            type="button"
            value={props.source}
            className={style.button}
            ref={sourceRef}
          >
            Source
          </button>
          <button
            onClick={recipeBtnPressed}
            type="button"
            value={props.url}
            className={style.button}
            ref={urlRef}
          >
            Recipe
          </button>
        </div>
      </li>
    </>
  );
};

export default Li;
