import { Fragment, useState } from "react";
import classes from "./Bookmark.module.css";
import Modal from "../UI/Modal";

const Bookmark = (props) => {
  const [bookmarkClicked, setBookmarkClicked] = useState(false);

  const bookMarkClickHandler = () => {
    setBookmarkClicked(true);
  };
  const bookMarkCloseHandler = () => {
    setBookmarkClicked(false);
  };

  return (
    <Fragment>
      <li onClick={bookMarkClickHandler}>
        {props.title}</li>
      {bookmarkClicked && (
        <Modal onClose={bookMarkCloseHandler} heading="Bookmark Details">
          <div>
            <span>Title: </span>
            <span>{props.title}</span>
          </div>
          <div>
            <span>Url: </span>
            <a href={props.url} target="_blank" rel="noopener noreferrer">
              {props.url}
            </a>
          </div>
        </Modal>
      )}
    </Fragment>
  );
};
export default Bookmark;
