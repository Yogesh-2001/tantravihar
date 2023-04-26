import { Card } from "@material-ui/core";
import React from "react";
import { useProfile } from "../../context/ProfileDetailsContext";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
const NotificationPage = () => {
  const {
    unreadnotifications,
    readnotifications,
    setreadNotifications,
    setUnreadNotifications,
    setLoading,
  } = useProfile();
  const [{ user }] = useAuth();
  const handleRead = () => {
    setLoading(true);
    axios
      .put(`http://localhost:8080/api/v1/user/mark-all-read/${user?._id}`, {})
      .then((res) => {
        toast.success(res.data.message);
        setreadNotifications([...readnotifications, ...unreadnotifications]);
        setUnreadNotifications([]);
        setLoading(false);
      });
  };
  return (
    <>
      <Card className="col-12 p-3">
        <h4 className="form-title">All Latest Notifications</h4>

        {unreadnotifications && unreadnotifications.length > 0 && (
          <section className="col-12 my-3">
            <h5>UnRead Notifications</h5>
            <a href="#" onClick={handleRead}>
              mark all as read
            </a>
            {unreadnotifications.length > 0 &&
              unreadnotifications.reverse().map((notification, index) => (
                <>
                  <div
                    className="alert alert-dark my-2 d-flex justify-content-between align-items-center"
                    role="alert"
                  >
                    <p className="my-auto">
                      {index + 1} : {notification?.message}
                    </p>
                    <p className="my-auto">
                      {new Date(notification?.timestamp).toDateString()}
                    </p>
                  </div>
                </>
              ))}
          </section>
        )}
        {readnotifications && readnotifications.length > 0 && (
          <section className="col-12 my-3">
            <h5>Read Notifications</h5>
            {readnotifications.length > 0 &&
              readnotifications.reverse().map((notification, index) => (
                <>
                  <div
                    className="alert alert-primary my-2 d-flex justify-content-between align-items-center"
                    role="alert"
                  >
                    <p className="my-auto">
                      {index + 1} : {notification?.message}
                    </p>
                    <p className="my-auto">
                      {new Date(notification?.timestamp).toDateString()}
                    </p>
                  </div>
                </>
              ))}
          </section>
        )}
      </Card>
    </>
  );
};

export default NotificationPage;
