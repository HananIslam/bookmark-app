import React from "react";
import { Fragment } from "react";
import Header from "./components/layout/Header";
import BookmarkFolderList from "./components/BookmarkFolder/BookmarkFolderList";
function App() {
  return (
    <Fragment>
      <Header />
      <BookmarkFolderList/>
    </Fragment>
  );
}

export default App;
