import React from "react";

const Folderctx = React.createContext({
  addFolder: (FolderName) => {},
  removeFolder: (id) => {},
  addBookmark: (UrlTitle, Url, folderId) => {},
  removeBookmark: (id) => {},
  setChangeHappened:()=>{},
  editBookmark:(UrlTitle, Url, folderId, urlId)=>{},
  renameFolder:(folderName, folderId)=>{}
});

export default Folderctx;
