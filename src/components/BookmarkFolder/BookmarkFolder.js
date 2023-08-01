import { Fragment } from "react";
import classes from "./BookmarkFolder.module.css";
import BookmarkList from "../Bookmarks/BookmarkList";
import FolderOptionsButton from "./FolderOptions/FolderOptionsButton";

const BookmarkFolder = (props) => {
  return (
    <Fragment>
      <div>
        <div className={classes.bookmarkFolder}>
          <h2 className={classes.heading}>{props.name}</h2>
          <FolderOptionsButton folderId={props.id} folderName={props.name} />
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
