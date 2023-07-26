import AddNewBookmark from "./AddNewBookmark";
import Bookmark from "./Bookmark";
import classes from "./BookmarkList.module.css";

const BookmarkList = (props) => {
  
  const bookmarkList = props.bookmarks.map((bookmark) => {
    return (
      <Bookmark
        key={bookmark.id}
        title={bookmark.title}
        url={bookmark.url}
      />
    );
  });
  return (
    <ul className={classes.ul}>
      {bookmarkList}
      <AddNewBookmark />
    </ul>
  );
};

export default BookmarkList;
