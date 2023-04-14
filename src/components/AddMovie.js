import React, { useEffect, useRef, useState } from "react";

import classes from "./AddMovie.module.css";

function AddMovie(props) {
  const [isValid, setIsValid] = useState(false);
  const [istitleRef, setIstitleRef] = useState("");
  const [isopeningTextRef, setIsopeningTextRef] = useState("");
  const [isreleaseDateRef, setIsreleaseDateRef] = useState("");
  const titleRef = useRef("");
  const openingTextRef = useRef("");
  const releaseDateRef = useRef("");

  const goalInputChangeHandler1 = (event) => {
    setIstitleRef(event.target.value);
  };
  const goalInputChangeHandler2 = (event) => {
    setIsopeningTextRef(event.target.value);
  };
  const goalInputChangeHandler3 = (event) => {
    setIsreleaseDateRef(event.target.value);
  };
  useEffect(() => {
    if (
      istitleRef.trim().length > 0 &&
      isopeningTextRef.trim().length > 0 &&
      isreleaseDateRef.trim().length > 0
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    console.log("isValid", isValid);
  }, [istitleRef, isopeningTextRef, isreleaseDateRef]);

  function submitHandler(event) {
    event.preventDefault();

    // could add validation here...

    const movie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };

    props.onAddMovie(movie);
    //reset the values
    titleRef.current.value = "";
    openingTextRef.current.value = "";
    releaseDateRef.current.value = "";
    setIstitleRef(titleRef.current.value);
    setIsopeningTextRef(openingTextRef.current.value);
    setIsreleaseDateRef(releaseDateRef.current.value);
  }

  return (
    <form onSubmit={submitHandler}>
      <h1>Add Movie</h1>
      <div className={classes.control}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          ref={titleRef}
          onChange={goalInputChangeHandler1}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="opening-text">Opening Text</label>
        <textarea
          rows="5"
          id="opening-text"
          ref={openingTextRef}
          onChange={goalInputChangeHandler2}
        ></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor="date">Release Date</label>
        <input
          type="text"
          id="date"
          ref={releaseDateRef}
          onChange={goalInputChangeHandler3}
        />
      </div>
      {isValid && <button>Add Movie</button>}
    </form>
  );
}

export default AddMovie;
