import { Fragment, useState } from "react";
import classes from "./AddNewFolder.module.css";
import Modal from "../UI/Modal";
import AddNewBookmarkFolderForm from "./AddNewBookmarkFolderForm";

const AddNewFolder = () => {
  const [addNewFolderOpened, setAddNewFolderOpened] = useState(false);
  const addNewFolderClickHandler = () => {
    setAddNewFolderOpened(true);
  };
  const addNewFolderCloseHandler = () => {
    setAddNewFolderOpened(false);
  };
  return (
    <Fragment>
      <div onClick={addNewFolderClickHandler} className={classes.addNewFolder}>
        <h2>+</h2>
      </div>
      {addNewFolderOpened && (
        <Modal onClose={addNewFolderCloseHandler} heading="Add New Folder">
          {<AddNewBookmarkFolderForm onClose={addNewFolderCloseHandler}/>}
        </Modal>
      )}
    </Fragment>
  );
};

export default AddNewFolder;
