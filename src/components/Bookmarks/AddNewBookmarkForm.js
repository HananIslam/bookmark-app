import { Fragment, useContext,  useState } from "react";
import classes from "./AddNewBookmarkForm.module.css";
import React from "react";
import Folderctx from "../../store/folder-ctx";

const AddNewBookmarkForm = (props) => {
  const [isValid, setIsValid] = useState(true);
  const titlePropValue = props.titleValue;
  const [titleValue, setTitleValue] = useState(titlePropValue);
  const urlPropValue = props.urlValue;
  const [urlValue, setUrlValue] = useState(urlPropValue);

  const newBookMarkSubmitHandler = (event) => {
    event.preventDefault();

    if (urlValue.trim().length < 1 || titleValue.trim().length < 1) {
      setIsValid(false);
      return;
    }
    if (props.bookmarkId) {
      const pi=props.urlId;
      console.log("Editing function running",pi);

      setIsValid(true);
      props.onClose();
      ctx.editBookmark(titleValue, urlValue, props.folderId, props.bookmarkId);
      return;
    }
    setIsValid(true);
    props.onClose();
    ctx.addBookmark(titleValue, urlValue, props.folderId);
  };

  const titleChangeHandler = (event) => {
    setTitleValue(event.target.value);
  };
  const urlChangeHandler = (event) => {
    setUrlValue(event.target.value);
  };

  const ctx = useContext(Folderctx);

  return (
    <Fragment>
      <form className={classes.form} onSubmit={newBookMarkSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Url Title </label>
          <input
            value={titleValue}
            onChange={titleChangeHandler}
            type="text"
            id="title"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="url">Url </label>
          <input
            value={urlValue}
            onChange={urlChangeHandler}
            type="text"
            id="url"
          />
          {!isValid && (
            <p className={classes.errorMesage}>
              Url title or Url can not be left empty.
            </p>
          )}
        </div>
        <div className={classes.actions}>
          <button type="button" onClick={props.onClose}>
            Cancel
          </button>
          <button className={classes.submit}>Confirm</button>
        </div>
      </form>
      {console.log("at final place", props.folderId)}
    </Fragment>
  );
};

export default AddNewBookmarkForm;
