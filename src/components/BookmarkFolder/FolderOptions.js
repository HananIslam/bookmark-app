import { Fragment, useState, useEffect, useRef } from "react";
import classes from "./FolderOptions.module.css";
import Modal from "../UI/Modal";
import AddNewBookmarkForm from "../Bookmarks/AddNewBookmarkForm";

const FolderOptions = (props) => {
  const [addBookmarkClicked, setAddBookmarkClicked] = useState(false);
  const [componentMounted, setComponentMounted] = useState(false); // State variable to track component mounting
  const containerRef = useRef(null); // Create a reference to the optionContainer div

  const addNewBookmarkClickHandler = () => {
    setAddBookmarkClicked(true);
  };

  const AddBookmarkCloseHandler = () => {
    setAddBookmarkClicked(false);
  };

  const heading = "Add new bookmark in " + props.folderName + " folder";

  useEffect(() => {
    // Function to handle click outside the optionContainer
    const handleClickOutside = (event) => {
      if (componentMounted && containerRef.current && !containerRef.current.contains(event.target)) {
        // Clicked outside the optionContainer, call your function here
        console.log("Clicked outside the optionContainer!");
        props.onClose();
      }
    };

    // Mark the component as mounted after the first render
    setComponentMounted(true);

    // Add the event listener to the document
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component is unmounted
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [componentMounted]);

  return (
    <Fragment>
      <div className={classes.optionContainer} ref={containerRef}>
        <button onClick={addNewBookmarkClickHandler}>Add Bookmark</button>
        <button>Edit</button>
        <button>Delete</button>
      </div>
      {addBookmarkClicked && (
        <Modal onClose={AddBookmarkCloseHandler} heading={heading}>
          <AddNewBookmarkForm folderId={props.folderId} onClose={AddBookmarkCloseHandler} />
        </Modal>
      )}
    </Fragment>
  );
};

export default FolderOptions;
