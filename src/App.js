import React from "react";
import Header from "./components/layout/Header";
import BookmarkFolderList from "./components/BookmarkFolder/BookmarkFolderList";
import FolderProvider from "./store/FolderProvider";
function App() {
  const url = "https://facebook.com";
  return (
    <FolderProvider>
      <Header />
      <BookmarkFolderList />
    </FolderProvider>
  );
}

export default App;
