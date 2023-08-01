import { Fragment, useState } from "react";
import classes from "./BookmarkFolder.module.css";
import BookmarkList from "../Bookmarks/BookmarkList";
import FolderOptions from "./FolderOptions";

const BookmarkFolder = (props) => {
  const [optionClicked, setOptionClicked] = useState(false);
  const optionClickHandler = () => {
    setOptionClicked(true);
  };
  const optionCloseHander = () => {
    setOptionClicked(false);
  };
  return (
    <Fragment>
      <div>
        <div className={classes.bookmarkFolder}>
          <h2 className={classes.heading}>{props.name}</h2>
          <span >
            {optionClicked && <FolderOptions onClose={optionCloseHander} folderId={props.id} />}
            {!optionClicked && <span onClick={optionClickHandler} className={classes.ellipsis}>…</span>}
          </span>
        </div>
        <BookmarkList
          folderName={props.name}
          bookmarks={props.bookmarks}
          folderId={props.id}
        />
      </div>
    </Fragment>
  );
};
export default BookmarkFolder;
