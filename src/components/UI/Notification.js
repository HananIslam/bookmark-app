import classes from "./Notification.module.css";

const Notification = (props) => {
  const notificationType = props.notification.type === "green" ? "green" : "red";

  return (
    <div
      className={`${classes.errorBanner} ${classes[notificationType]}`}
    >
      <div>{props.notification.message}</div>
    </div>
  );
};

export default Notification;
