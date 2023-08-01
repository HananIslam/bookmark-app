import { useContext, useRef, useState } from "react";
import classes from "./AddNewBookmarkFolderForm.module.css";
import Folderctx from "../../store/folder-ctx";
const AddNewBookmarkFolderForm = (props) => {
  const [isValid,setIsValid]=useState(true);
  const ctx = useContext(Folderctx);
  const enteredFolderRef = useRef();
  const folderSubmitHandler = (event) => {
    event.preventDefault();
    const enteredFolder = enteredFolderRef.current.value;
    if (enteredFolder.trim().length<1){
      setIsValid(false);
      return;
    } 
    setIsValid(true);
    props.onClose();
    ctx.addFolder(enteredFolder);
  };

  return (
    <form className={classes.form} onSubmit={folderSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor="NewFolder">📁 New Folder Name </label>
        <input type="text" id="NewFolder" ref={enteredFolderRef} />
        {!isValid && <p className={classes.errorMessage}>The folder name cannot be left blank.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default AddNewBookmarkFolderForm;
