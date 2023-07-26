import { Fragment } from "react";
import classes from "./AddNewBookmarkForm.module.css";

const AddNewBookmarkForm = (props) => {
  return (
    <Fragment>

      <form className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="title">Url Title </label>
          <input type="text" id="title" />
        </div>
        <div className={classes.control}>
          <label htmlFor="url">Url </label>
          <input type="text" id="url" />
        </div>
        <div className={classes.actions}>
          <button type="button" onClick={props.onClose}>
            Cancel
          </button>
          <button className={classes.submit}>Confirm</button>
        </div>
      </form>
    </Fragment>
  );
};

export default AddNewBookmarkForm;
