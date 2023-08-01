import { useEffect, useState } from "react";
import AddNewFolder from "./AddNewFolder";
import BookmarkFolder from "./BookmarkFolder";
import classes from "./BookmarkFolderList.module.css";
const BookmarkFolderList = (props) => {
  const [BookMarkFoldersArray, setBookMarkFoldersArray] = useState([]);
  const fetchBookmarkDataFromFirebase = async () => {
    const firebaseUrl =
      "https://bookmarkvault-7c971-default-rtdb.firebaseio.com/BookMarkFolders.json";

    try {
      const response = await fetch(firebaseUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch data from Firebase.");
      }

      const data = await response.json();
      // Process the data to the desired format
      const bookmarkFolders = Object.entries(data).map(([id, folderData]) => ({
        id,
        name: folderData.FolderName,
        bookmarks: folderData.BookMarks
          ? Object.entries(folderData.BookMarks).map(
              ([bookmarkId, bookmark]) => ({
                id: bookmarkId,
                title: bookmark.title,
                url: bookmark.url,
              })
            )
          : [], // Set an empty array if BookMarks doesn't exist
      }));
      bookmarkFolders.reverse();
      // Return the processed data
      setBookMarkFoldersArray(bookmarkFolders);
    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchBookmarkDataFromFirebase();
  }, []);
  console.log();

  const bookmarkFolders = BookMarkFoldersArray.map((folder) => (
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