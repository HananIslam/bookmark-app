import { useContext, useState } from "react";
import classes from "./AddNewBookmarkFolderForm.module.css";
import Folderctx from "../../store/folder-ctx";
const AddNewBookmarkFolderForm = (props) => {
  const [isValid, setIsValid] = useState(true);
  const [enteredFolder, setenteredFolder] = useState(props.folderName);
  const ctx = useContext(Folderctx);
  const folderNameChangeHandler = (event) => {
    setenteredFolder(event.target.value);
  };
  const folderSubmitHandler = (event) => {
    event.preventDefault();
    if (enteredFolder.trim().length < 1) {
      setIsValid(false);
      return;
    }
    if (props.folderId) {
      const fId = props.folderId;
      ctx.renameFolder(enteredFolder, fId);
      setIsValid(true);
      props.onClose();
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
        <input
          type="text"
          id="NewFolder"
          value={enteredFolder}
          onChange={folderNameChangeHandler}
        />
        {!isValid && (
          <p className={classes.errorMessage}>
            The folder name cannot be left blank.
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
  );
};

export default AddNewBookmarkFolderForm;
