import { useContext, useEffect, useState } from "react";
import AddNewFolder from "./AddNewFolder";
import BookmarkFolder from "./BookmarkFolder";
import classes from "./BookmarkFolderList.module.css";
import Folderctx from "../../store/folder-ctx";
const BookmarkFolderList = (props) => {

  console.log();
const ctx=useContext(Folderctx);
  const bookmarkFolders =ctx.BookMarkFoldersArray.map((folder) => (
    <BookmarkFolder
      key={folder.id}
      id={folder.id}
      name={folder.name}
      bookmarks={folder.bookmarks} // Pass the array of bookmarks as a prop
    />
  ));

  return (
      <div className={classes.bookmarkFoldersList}>
        <div className={classes.bookmarkFolders}>
          {bookmarkFolders}
        </div>
        <AddNewFolder />
      </div>
  );
};
export default BookmarkFolderList;