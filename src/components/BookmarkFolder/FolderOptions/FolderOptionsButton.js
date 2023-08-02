import { Fragment, useContext, useState } from "react";
import FolderOptions from "./FolderOptions";
import classes from "../BookmarkFolder.module.css";
import Modal from "../../UI/Modal";
import AddNewBookmarkForm from "../../Bookmarks/AddNewBookmarkForm";
import Folderctx from "../../../store/folder-ctx";
import AddNewBookmarkFolderForm from "../AddNewBookmarkFolderForm";

const FolderOptionsButton = (props) => {
  const [addBookmarkClicked, setAddBookmarkClicked] = useState(false);
  const [deleteFolderClicked, setDeleteFolderClicked] = useState(false);
  const [renameFolderClicked, setrenameFolderClicked] = useState(false);

  const ctx = useContext(Folderctx);
  const [optionClicked, setOptionClicked] = useState(false);
  const optionClickHandler = () => {
    setOptionClicked(true);
  };
  const optionCloseHander = () => {
    setOptionClicked(false);
  };
  const addNewBookmarkClickHandler = () => {
    setAddBookmarkClicked(true);
  };

  const addBookmarkCloseHandler = () => {
    setAddBookmarkClicked(false);
  };

  const deleteFolderClickHandler = () => {
    setDeleteFolderClicked(true);
  };

  const deleteFolderCloseHandler = () => {
    setDeleteFolderClicked(false);
  };
  const renameFolderClickHandler = () => {
    setrenameFolderClicked(true);
  };

  const renameFolderCloseHandler = () => {
    setrenameFolderClicked(false);
  };
  const deleteFolder = () => {
    ctx.removeFolder(props.folderId);
    setDeleteFolderClicked(false);
  };

  const headingAddBookmark =
    "Add new bookmark in " + props.folderName + " folder";
  const headingDeleteFolder =
    "Are you sure to delete " + props.folderName + " folder permanently";
    const headingrenameFolder="Rename Folder "

  return (
    <Fragment>
      <span>
        {optionClicked && (
          <FolderOptions
            onClose={optionCloseHander}
            onAddBookmarkClicked={addNewBookmarkClickHandler}
            onDeleteFolderClicked={deleteFolderClickHandler}
            onRenameFolderClicked={renameFolderClickHandler}
          />
        )}
        {!optionClicked && (
          <span onClick={optionClickHandler} className={classes.ellipsis}>
            …
          </span>
        )}
      </span>
      {addBookmarkClicked && (
        <Modal onClose={addBookmarkCloseHandler} heading={headingAddBookmark}>
          <AddNewBookmarkForm
            folderId={props.folderId}
            onClose={addBookmarkCloseHandler}
          />
        </Modal>
      )}
      {deleteFolderClicked && (
        <Modal onClose={deleteFolderCloseHandler} heading={headingDeleteFolder}>
          <div className={classes.actions}>
            <button type="button" onClick={deleteFolderCloseHandler}>
              Cancel
            </button>
            <button className={classes.submit} onClick={deleteFolder}>
              Confirm
            </button>
          </div>
        </Modal>
      )}
      {renameFolderClicked && (
        <Modal onClose={renameFolderCloseHandler} heading={headingrenameFolder}>
         <AddNewBookmarkFolderForm onClose={renameFolderCloseHandler} folderName={props.folderName} folderId={props.folderId}/>
        </Modal>
      )}
    </Fragment>
  );
};

export default FolderOptionsButton;
