import classes from './Notification.module.css'
const Notification = (props) => {

  return (
    <div className={classes.errorBanner}>
        <span><p>✔</p></span>
      <span>{props.message}</span>
    </div>
  );
};

export default Notification;
