import { Fragment } from "react";
import AddNewFolder from "./AddNewFolder";
import BookmarkFolder from "./BookmarkFolder";
import classes from "./BookmarkFolderList.module.css";
const BookmarkFolderList = (props) => {
  const DUMMY_BOOKMARK_FOLDER = [
    {
      id: "i1",
      name: "Education",
      bookmarks: [
        { id: "b1", title: "Learn React", url: "https://example.com/react" },
        { id: "b2", title: "Math Basics", url: "https://example.com/math" },
      ],
    },
    {
      id: "i2",
      name: "Sports",
      bookmarks: [
        {
          id: "b3",
          title: "Football News",
          url: "https://example.com/football",
        },
        {
          id: "b4",
          title: "Tennis Highlights",
          url: "https://example.com/tennis",
        },
      ],
    },
    {
      id: "i3",
      name: "Technology",
      bookmarks: [
        { id: "b5", title: "Tech Updates", url: "https://example.com/tech" },
        { id: "b6", title: "New Gadgets", url: "https://example.com/gadgets" },
      ],
    },
    {
      id: "i4",
      name: "Nature",
      bookmarks: [
        { id: "b5", title: "Animal Planet", url: "https://example.com/nature" },
        { id: "b6", title: "Northen Post", url: "https://example.com/northen" },
      ],
    },
  ];

  const bookmarkFolders = DUMMY_BOOKMARK_FOLDER.map((folder) => (
    <BookmarkFolder
      key={folder.id}
      id={folder.id}
      name={folder.name}
      bookmarks={folder.bookmarks} // Pass the array of bookmarks as a prop
    />
  ));

  return (
    <Fragment>
      <div className={classes.bookmarkFoldersList}>
        <div className={classes.bookmarkFolders}>
            {bookmarkFolders}
            <AddNewFolder />
        </div>
      </div>
    </Fragment>
  );
};
export default BookmarkFolderList;
