import React, { useContext, useRef } from "react";
import classes from "./CopyToClipboardField.module.css";
import Folderctx from "../../store/folder-ctx";

const CopyToClipboardField = ({ value }) => {
  const inputRef = useRef(null);
  const ctx = useContext(Folderctx);
  const copyToClipboardHandler = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand("copy");
      ctx.setNotification({
        message: "Url Copied to Clipboard",
        type: "green",
      });
      ctx.showNotificationHandler();
    }
  };

  return (
    <div className={classes.CopyToClipboardField}>
      <input ref={inputRef} type="text" value={value} readOnly />
      <button onClick={copyToClipboardHandler}>Copy</button>
    </div>
  );
};

export default CopyToClipboardField;
