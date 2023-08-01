import React from "react";
import Header from "./components/layout/Header";
import BookmarkFolderList from "./components/BookmarkFolder/BookmarkFolderList";
import FolderProvider from "./store/FolderProvider";
function App() {
  return (
    <FolderProvider>
      <Header />
      <BookmarkFolderList/>
    </FolderProvider>
  );
}

export default App;
