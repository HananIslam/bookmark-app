import { useState } from "react";
import Folderctx from "./folder-ctx";
import Notification from "../components/UI/Notification";

const FolderProvider = (props) => {
  const [notificationJsx, setNotificationJsx] = useState({
    myJSXElement: <p>Hello, I am JSX!</p>,
  });
  const [showNotification, setShowNotificataion] = useState(false);
  const showNotificationHandler = () => {
    setShowNotificataion(true);
    setTimeout(() => {
      setShowNotificataion(false);
    }, 2000);
  };
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
      setNotificationJsx({
        myJSXElement: <p>Folder Added Successfully</p>,
      });
      showNotificationHandler();
      return responseData.name; // Firebase-generated folder ID
    } catch (error) {
      console.error("Error adding new folder to Firebase:", error);
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
  
      setNotificationJsx({
        myJSXElement: <p>Folder Renamed Successfully</p>,
      });
      showNotificationHandler();
      return true; // Folder renamed successfully
    } catch (error) {
      console.error("Error renaming folder in Firebase:", error);
      return false;
    }
  };
  

  const removeFolder = async (folderId) => {
    const firebaseUrl = `https://bookmarkvault-7c971-default-rtdb.firebaseio.com/BookMarkFolders/${folderId}.json`;

    try {
      const response = await fetch(firebaseUrl, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove folder from Firebase.");
      }

      setNotificationJsx({
        myJSXElement: <p>Folder Removed Successfully</p>,
      });
      showNotificationHandler();
      return true; // Folder removed successfully
    } catch (error) {
      console.error("Error removing folder from Firebase:", error);
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
      setNotificationJsx({
        myJSXElement: <p>Bookmark Added Successfully</p>,
      });
      showNotificationHandler();
      return responseData.name; // Firebase-generated bookmark ID
    } catch (error) {
      console.error("Error adding bookmark to Firebase folder:", error);
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

      setNotificationJsx({
        myJSXElement: <p>Bookmark Removed Successfully</p>,
      });
      showNotificationHandler();
      return true; // Bookmark removed successfully
    } catch (error) {
      console.error("Error removing bookmark from Firebase folder:", error);
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
  
      setNotificationJsx({
        myJSXElement: <p>Bookmark Updated Successfully</p>,
      });
      showNotificationHandler();
      return true; // Bookmark updated successfully
    } catch (error) {
      console.error("Error updating bookmark in Firebase folder:", error);
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
        renameFolder
      }}
    >
      {props.children}
      {showNotification && (
        <Notification message={notificationJsx.myJSXElement} />
      )}
    </Folderctx.Provider>
  );
};

export default FolderProvider;
