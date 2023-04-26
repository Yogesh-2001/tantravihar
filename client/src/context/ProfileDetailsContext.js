import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
const ProfileContext = createContext();
// http://localhost:8080/api/v1/user/get-all-notifications/64297e2b39cab824f099fd6c
const ProfileContextProvider = ({ children }) => {
  const [{ user }] = useAuth();
  const [profiledetails, setprofileDetails] = useState();
  const [unreadnotifications, setUnreadNotifications] = useState([]);
  const [readnotifications, setreadNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allStudents, setAllStudents] = useState([]);
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:8080/api/v1/user/get-profile-url/${user?._id}`)
        .then((res) => {
          setprofileDetails(res.data[0]);
        });
    }
  }, [user]);

  useEffect(() => {
    if (profiledetails) {
      axios
        .get(
          `http://localhost:8080/api/v1/user/get-all-notifications/${user?._id}`
        )
        .then((res) => {
          setUnreadNotifications(res.data.unread);
          setreadNotifications(res.data.read);
        });
    }
  }, [profiledetails]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/admin/get-allstudents/")
      .then((res) => {
        setAllStudents(res.data.allstudents);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const contextValue = {
    profiledetails,
    setprofileDetails,
    unreadnotifications,
    readnotifications,
    setreadNotifications,
    setUnreadNotifications,
    loading,
    setLoading,
    setAllStudents,
    allStudents,
  };
  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
};

const useProfile = () => useContext(ProfileContext);

export { ProfileContextProvider, useProfile };
