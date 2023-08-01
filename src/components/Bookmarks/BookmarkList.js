import { Fragment } from "react";
import AddNewBookmark from "./AddNewBookmark";
import Bookmark from "./Bookmark";
import classes from "./BookmarkList.module.css";

const BookmarkList = (props) => {

  const bookmarkList = props.bookmarks.map((bookmark) => {
    return (
      <Fragment>
      <Bookmark key={bookmark.id} id={bookmark.id} title={bookmark.title} url={bookmark.url} />
      <hr/>
      </Fragment>

    );
  });
  return (
    <ul className={classes.ul}>
      {bookmarkList}
      <AddNewBookmark folderId={props.folderId} folderName={props.folderName} />
    </ul>
  );
};

export default BookmarkList;
