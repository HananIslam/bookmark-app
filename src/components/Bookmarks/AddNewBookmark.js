import { Fragment, useState } from "react";
import classes from "./AddNewBookmark.module.css";
import Modal from "../UI/Modal";
import AddNewBookmarkForm from "./AddNewBookmarkForm";
const AddNewBookmark = (props) => {

  const [addBookmarkClicked, setAddBookmarkClicked] = useState(false);
  const addNewBookmarkClickHandler = () => {
    setAddBookmarkClicked(true);
  };
  const AddBookmarkCloseHandler = () => {
    setAddBookmarkClicked(false);
  };
  const heading="Add new bookmark in "+ props.folderName + " folder";
  return (
    <Fragment>
      <li
        onClick={addNewBookmarkClickHandler}
        className={classes.addNewBookmark}
      >
        +
      </li>
      {addBookmarkClicked && (
        <Modal onClose={AddBookmarkCloseHandler} heading={heading}>
          <AddNewBookmarkForm folderId={props.folderId} titleValue="" urlValue="" onClose={AddBookmarkCloseHandler} />
        </Modal>
      )}
    </Fragment>
  );
};

export default AddNewBookmark;
