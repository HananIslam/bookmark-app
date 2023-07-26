import { Fragment } from "react";
import classes from './BookmarkFolder.module.css'
import BookmarkList from "../Bookmarks/BookmarkList";

const BookmarkFolder = (props) => {
  return (
    <Fragment>
      <div className={classes.bookmarkFolder}>
        <h2>{props.name}</h2>
        <BookmarkList bookmarks={props.bookmarks} />
      </div>
    </Fragment>
  );
};
export default BookmarkFolder;
