import { useState, useEffect } from "react";
import Folderctx from "./folder-ctx";
import Notification from "../components/UI/Notification";

const FolderProvider = (props) => {
  const [notification, setNotification] = useState({
    message: "",
    type: "green",
  });
  const [showNotification, setShowNotificataion] = useState(false);
  const showNotificationHandler = () => {
    setShowNotificataion(true);
    setTimeout(() => {
      setShowNotificataion(false);
    }, 3000);
  };

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
      setNotification({
        message: "Oops! Something went wrong. Please try again later.",
        type: "red",
      });
      showNotificationHandler();
      return null;
    }
  };

  useEffect(() => {
    fetchBookmarkDataFromFirebase();
  }, []);

  const addFolder = async (folderName) => {
    const firebaseUrl =
      "https://bookmarkvault-7c971-default-rtdb.firebaseio.com/BookMarkFolders.json";

    try {
      const response = await fetch(firebaseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          FolderName: folderName,
          BookMarks: {},
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add new folder to Firebase.");
      }

      const responseData = await response.json();

      // Update the locally stored BookMarkFoldersArray with the new folder data
      setBookMarkFoldersArray((prevFolders) => [
        ...prevFolders,
        {
          id: responseData.name, // Use the Firebase-generated folder ID
          name: folderName,
          bookmarks: [],
        },
      ]);

      setNotification({
        message: "Folder Added Successfully",
        type: "green",
      });
 
      
      showNotificationHandler();
      return responseData.name; // Firebase-generated folder ID
    } catch (error) {
      console.error("Error adding new folder to Firebase:", error);
      setNotification({
        message: "Oops! Something went wrong. Please try again later.",
        type: "red",
      });
      showNotificationHandler();
      return null;
    }
  };

  const renameFolder = async (folderName, folderId) => {
    const firebaseUrl = `https://bookmarkvault-7c971-default-rtdb.firebaseio.com/BookMarkFolders/${folderId}.json`;

    try {
      const response = await fetch(firebaseUrl, {
        method: "PATCH", // Use PATCH method to update the existing folder
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          FolderName: folderName,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to rename folder in Firebase.");
      }

      // Update the locally stored BookMarkFoldersArray with the new folder name
      setBookMarkFoldersArray((prevFolders) => {
        return prevFolders.map((folder) => {
          if (folder.id === folderId) {
            return {
              ...folder,
              name: folderName,
            };
          }
          return folder;
        });
      });

      setNotification({
        message: "Folder Renamed Successfully",
        type: "green",
      });
      showNotificationHandler();
      return true; // Folder renamed successfully
    } catch (error) {
      console.error("Error renaming folder in Firebase:", error);
      setNotification({
        message: "Oops! Something went wrong. Please try again later.",
        type: "red",
      });
      showNotificationHandler();
      return false;
    }
  };

  const removeFolder = async (folderId) => {
    console.log("remove folder runnimg");
    const firebaseUrl = `https://bookmarkvault-7c971-default-rtdb.firebaseio.com/BookMarkFolders/${folderId}.json`;

    try {
      const response = await fetch(firebaseUrl, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove folder from Firebase.");
      }

      // Update the locally stored BookMarkFoldersArray by filtering out the removed folder
      setBookMarkFoldersArray((prevFolders) =>
        prevFolders.filter((folder) => folder.id !== folderId)
      );

      setNotification({
        message: "Folder Removed Successfully",
        type: "green",
      });
      showNotificationHandler();
      return true; // Folder removed successfully
    } catch (error) {
      console.error("Error removing folder from Firebase:", error);
      setNotification({
        message: "Oops! Something went wrong. Please try again later.",
        type: "red",
      });
      showNotificationHandler();
      return false;
    }
  };

  const addBookmark = async (title, url, folderId) => {
    // Check if the url starts with "https://", if not, add it
    if (!url.startsWith("https://") && !url.startsWith("http://")) {
      url = "https://" + url;
    }

    const firebaseUrl = `https://bookmarkvault-7c971-default-rtdb.firebaseio.com/BookMarkFolders/${folderId}/BookMarks.json`;

    try {
      const response = await fetch(firebaseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          url: url,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add bookmark to Firebase folder.");
      }

      const responseData = await response.json();

      // Fetch the updated data from Firebase
      const updatedDataResponse = await fetch(
        `https://bookmarkvault-7c971-default-rtdb.firebaseio.com/BookMarkFolders.json`
      );
      if (!updatedDataResponse.ok) {
        throw new Error("Failed to fetch updated data from Firebase.");
      }
      const updatedData = await updatedDataResponse.json();
      const updatedBookmarkFolders = Object.entries(updatedData).map(
        ([id, folderData]) => ({
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
            : [],
        })
      );
      // Update the locally stored BookMarkFoldersArray with the updated data
      setBookMarkFoldersArray(updatedBookmarkFolders);

      setNotification({
        message: "Bookmark Added Successfully",
        type: "green",
      });
      showNotificationHandler();
      return responseData.name; // Firebase-generated bookmark ID
    } catch (error) {
      console.error("Error adding bookmark to Firebase folder:", error);
      setNotification({
        message: "Oops! Something went wrong. Please try again later.",
        type: "red",
      });
      showNotificationHandler();
      return null;
    }
  };

  const removeBookmark = async (bookmarkId) => {
    const firebaseUrl = `https://bookmarkvault-7c971-default-rtdb.firebaseio.com/BookMarkFolders.json`;

    try {
      const response = await fetch(firebaseUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch data from Firebase.");
      }

      const data = await response.json();
      let folderId;

      // Find the folder containing the bookmark with the specified bookmarkId
      for (const [id, folderData] of Object.entries(data)) {
        if (folderData.BookMarks && folderData.BookMarks[bookmarkId]) {
          folderId = id;
          break;
        }
      }

      if (!folderId) {
        throw new Error("Bookmark not found in any folder.");
      }

      // Delete the bookmark from Firebase
      const deleteBookmarkUrl = `https://bookmarkvault-7c971-default-rtdb.firebaseio.com/BookMarkFolders/${folderId}/BookMarks/${bookmarkId}.json`;
      const deleteResponse = await fetch(deleteBookmarkUrl, {
        method: "DELETE",
      });

      if (!deleteResponse.ok) {
        throw new Error("Failed to remove bookmark from Firebase folder.");
      }

      // Fetch the updated data from Firebase after removing the bookmark
      const updatedDataResponse = await fetch(
        `https://bookmarkvault-7c971-default-rtdb.firebaseio.com/BookMarkFolders.json`
      );
      if (!updatedDataResponse.ok) {
        throw new Error("Failed to fetch updated data from Firebase.");
      }
      const updatedData = await updatedDataResponse.json();
      const updatedBookmarkFolders = Object.entries(updatedData).map(
        ([id, folderData]) => ({
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
            : [],
        })
      );
      // Update the locally stored BookMarkFoldersArray with the updated data
      setBookMarkFoldersArray(updatedBookmarkFolders);

      setNotification({
        message: "Bookmark Removed Successfully",
        type: "green",
      });
      showNotificationHandler();
      return true; // Bookmark removed successfully
    } catch (error) {
      console.error("Error removing bookmark from Firebase folder:", error);
      setNotification({
        message: "Oops! Something went wrong. Please try again later.",
        type: "red",
      });
      showNotificationHandler();
   
      return false;
    }
  };

  const editBookmark = async (title, url, folderId, bookmarkId) => {
    // Check if the url starts with "https://", if not, add it
    if (!url.startsWith("https://") && !url.startsWith("http://")) {
      url = "https://" + url;
    }

    const firebaseUrl = `https://bookmarkvault-7c971-default-rtdb.firebaseio.com/BookMarkFolders/${folderId}/BookMarks/${bookmarkId}.json`;

    try {
      const response = await fetch(firebaseUrl, {
        method: "PATCH", // Use PATCH method for updating an existing bookmark
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          url: url,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update bookmark in Firebase folder.");
      }

      // Fetch the updated data from Firebase after updating the bookmark
      const updatedDataResponse = await fetch(
        `https://bookmarkvault-7c971-default-rtdb.firebaseio.com/BookMarkFolders.json`
      );
      if (!updatedDataResponse.ok) {
        throw new Error("Failed to fetch updated data from Firebase.");
      }
      const updatedData = await updatedDataResponse.json();
      const updatedBookmarkFolders = Object.entries(updatedData).map(
        ([id, folderData]) => ({
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
            : [],
        })
      );
      // Update the locally stored BookMarkFoldersArray with the updated data
      setBookMarkFoldersArray(updatedBookmarkFolders);

      setNotification({
        message: "Bookmark Updated Successfully",
        type: "green",
      });
      showNotificationHandler();
      return true; // Bookmark updated successfully
    } catch (error) {
      console.error("Error updating bookmark in Firebase folder:", error);
      setNotification({
        message: "Oops! Something went wrong. Please try again later.",
        type: "red",
      });
      showNotificationHandler();
      return false;
    }
  };

  return (
    <Folderctx.Provider
      value={{
        addFolder,
        removeFolder,
        addBookmark,
        removeBookmark,
        editBookmark,
        renameFolder,
        BookMarkFoldersArray,
        setNotification,
        showNotificationHandler

      }}
    >
      {props.children}
      {showNotification && <Notification notification={notification} />}
    </Folderctx.Provider>
  );
};

export default FolderProvider;
