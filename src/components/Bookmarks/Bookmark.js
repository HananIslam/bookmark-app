import { Fragment, useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Bookmark.module.css";
import Folderctx from "../../store/folder-ctx";
import AddNewBookmarkForm from "./AddNewBookmarkForm";
import QRCode from "qrcode.react";
import CopyToClipboardField from "../UI/CopyToClipboardField";

const deleteIconSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M10 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;
const editIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z" fill="#000000"/>
</svg>`;
const qrIcon= `<svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 24 24" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 5H9.5V9.5H5V5ZM6.5 6.5V8H8V6.5H6.5Z" fill="#000000"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.4999 5H18.9999V9.5H14.4999V5ZM15.9999 6.5V8H17.4999V6.5H15.9999Z" fill="#000000"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 14.5H9.5V19H5V14.5ZM6.5 16V17.5H8V16H6.5Z" fill="#000000"/>
<rect x="5" y="11.25" width="1.5" height="1.5" fill="#000000"/>
<rect x="8" y="11.25" width="1.5" height="1.5" fill="#000000"/>
<rect x="11.1666" y="11.25" width="1.5" height="1.5" fill="#000000"/>
<rect x="11.1666" y="14.375" width="1.5" height="1.5" fill="#000000"/>
<rect x="11.1666" y="17.5" width="1.5" height="1.5" fill="#000000"/>
<rect x="11.1666" y="8.125" width="1.5" height="1.5" fill="#000000"/>
<rect x="11.1666" y="5" width="1.5" height="1.5" fill="#000000"/>
<rect x="14.3333" y="11.25" width="1.5" height="1.5" fill="#000000"/>
<rect x="17.4999" y="11.25" width="1.5" height="1.5" fill="#000000"/>
<rect x="14.3333" y="14.375" width="1.5" height="1.5" fill="#000000"/>
<rect x="17.4999" y="14.375" width="1.5" height="1.5" fill="#000000"/>
<rect x="14.3333" y="17.5" width="1.5" height="1.5" fill="#000000"/>
<rect x="17.4999" y="17.5" width="1.5" height="1.5" fill="#000000"/>
</svg>`
const Bookmark = (props) => {
  const [bookmarkClicked, setBookmarkClicked] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  const [QRClicked, setQRClicked] = useState(false);

  const ctx = useContext(Folderctx);
  const bookMarkClickHandler = () => {
    setBookmarkClicked(true);
  };
  const bookMarkCloseHandler = () => {
    setBookmarkClicked(false);
  };
  const deleteButtonClickHander = () => {
    setDeleteClicked(true);
  };
  const deleteModalCloseHandler = () => {
    setDeleteClicked(false);
  };
  const bookmarkDeleteHandler = (event) => {
    event.preventDefault();
    ctx.removeBookmark(props.id);
    setDeleteClicked(false);
  };
  const editButtonClickHander = () => {
    setEditClicked(true);
  };
  const editModalCloseHandler = () => {
    setEditClicked(false);
  };
  const QRButtonClickHander = () => {
    setQRClicked(true);
  };
  const QRModalCloseHandler = () => {
    setQRClicked(false);
  };
  return (
    <Fragment>
      <li>
        <div onClick={bookMarkClickHandler}>{"🔗 " + props.title}</div>
        <div
          onClick={QRButtonClickHander}
          className={classes["delete-icon"]}
          dangerouslySetInnerHTML={{ __html: qrIcon }}
        />
        <div
          onClick={editButtonClickHander}
          className={classes["delete-icon"]}
          dangerouslySetInnerHTML={{ __html: editIcon }}
        />
        
        <div
          onClick={deleteButtonClickHander}
          className={classes["delete-icon"]}
          dangerouslySetInnerHTML={{ __html: deleteIconSVG }}
        />
      </li>

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
      {deleteClicked && (
        <Modal
          onClose={deleteModalCloseHandler}
          heading="Are you sure you want to delete this item permanently?"
        >
          <form onSubmit={bookmarkDeleteHandler}>
            <div className={classes.actions}>
              <button type="button" onClick={deleteModalCloseHandler}>
                Cancel
              </button>
              <button className={classes.submit}>Confirm</button>
            </div>
          </form>
        </Modal>
      )}
      {editClicked && (
        <Modal onClose={editModalCloseHandler} heading="Edit Bookmark">
          <AddNewBookmarkForm
            urlValue={props.url}
            titleValue={props.title}
            onClose={editModalCloseHandler}
            bookmarkId={props.id}
            folderId={props.folderId}
          ></AddNewBookmarkForm>
        </Modal>
      )}
      {QRClicked && (
        <Modal onClose={QRModalCloseHandler} heading="Scan QR Code to open link on your mobile">
          <div className={classes.QrCard}>
            <QRCode value={props.url} className={classes.QrCode}/>
            <CopyToClipboardField value={props.url} />
          </div>
        </Modal>
      )}
    </Fragment>
  );
};
export default Bookmark;
