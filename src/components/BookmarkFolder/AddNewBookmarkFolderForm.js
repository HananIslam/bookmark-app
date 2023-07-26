import classes from './AddNewBookmarkFolderForm.module.css'
const AddNewBookmarkFolderForm = (props) => {
    return (
      <form className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="NewFolder">New Folder Name </label>
          <input type="text" id="NewFolder" />
        </div>
        <div className={classes.actions}>
          <button type='button' onClick={props.onClose}>
            Cancel
          </button>
          <button className={classes.submit}>Confirm</button>
        </div>
      </form>
    );
  };

  export default AddNewBookmarkFolderForm;
  