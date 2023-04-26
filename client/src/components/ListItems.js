import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Link } from "react-router-dom";
import CreateIcon from "@material-ui/icons/Create";
import ChatIcon from "@material-ui/icons/Chat";
import ViewListIcon from "@material-ui/icons/ViewList";
import { MdAssignmentAdd } from "react-icons/md";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import ScheduleIcon from "@material-ui/icons/Schedule";
import AttachmentIcon from "@material-ui/icons/Attachment";
import { useAuth } from "../context/AuthContext";
import { useProfile } from "../context/ProfileDetailsContext";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddBoxIcon from "@material-ui/icons/AddBox";
import WorkIcon from "@material-ui/icons/Work";
import VisibilityIcon from "@material-ui/icons/Visibility";
const ListItems = () => {
  const [{ user }, setAuth] = useAuth();
  const { profiledetails } = useProfile();
  const logout = () => {
    localStorage.removeItem("authToken");
    setAuth({ user: null, token: "" });
  };

  function Signout() {
    return (
      <>
        <Link onClick={logout} to={"/login"}>
          <ListItem button>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </Link>
      </>
    );
  }
  if (user?.role == 0) {
    return (
      <>
        <Link to={"/student/dashboard"}>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        {!profiledetails?.photourl && (
          <Link to={"/student/dashboard/create-profile"}>
            <ListItem button>
              <ListItemIcon>
                <AddCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Create Profile" />
            </ListItem>
          </Link>
        )}
        <Link to={"/discussion-forum"}>
          <ListItem button>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="Discussion Forum" />
          </ListItem>
        </Link>
        {profiledetails?.photourl && (
          <Link to={"student/dashboard/all-drives"}>
            <ListItem button>
              <img
                src="/images/grid.png"
                width={25}
                style={{ marginRight: "30px" }}
              />

              <ListItemText primary="All Drives" />
            </ListItem>
          </Link>
        )}
        <Link to={"/student/dashboard/view-test"}>
          <ListItem button>
            <img
              src={"/images/classtest.png"}
              style={{ width: "25px", marginRight: "30px" }}
            />

            <ListItemText primary="View Tests" />
          </ListItem>
        </Link>
        <Link to={"/student/dashboard/view-material"}>
          <ListItem button>
            <ListItemIcon>
              <img src="/images/view-material.png" style={{ width: "25px" }} />
            </ListItemIcon>

            <ListItemText primary="View Material" />
          </ListItem>
        </Link>
        <Link to={"/student/dashboard/view-notices"}>
          <ListItem button>
            <ListItemIcon>
              <ListItemIcon>
                <VisibilityIcon />
              </ListItemIcon>
            </ListItemIcon>

            <ListItemText primary="View Notices" />
          </ListItem>
        </Link>
        <Signout />
      </>
    );
  } else if (user?.role == 1) {
    return (
      <>
        <Link to={"/admin/dashboard/"}>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        <Link to={"/admin/dashboard/add-student"}>
          <ListItem button>
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary="Add Student" />
          </ListItem>
        </Link>

        <Link to={"/admin/dashboard/view-all-students"}>
          <ListItem button>
            <ListItemIcon>
              <ViewListIcon />
            </ListItemIcon>
            <ListItemText primary="View All Students" />
          </ListItem>
        </Link>
        <Link to={"/admin/dashboard/add-notice"}>
          <ListItem button>
            <ListItemIcon>
              <NoteAddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Notice" />
          </ListItem>
        </Link>
        <Link to={"/admin/dashboard/add-test"}>
          <ListItem button>
            <ListItemIcon>
              <ScheduleIcon />
            </ListItemIcon>
            <ListItemText primary="Add Test" />
          </ListItem>
        </Link>
        <Link to={"/admin/dashboard/add-class-material"}>
          <ListItem button>
            <ListItemIcon>
              <AttachmentIcon />
            </ListItemIcon>
            <ListItemText primary="Add Placement Material" />
          </ListItem>
        </Link>
        <Link to={"/discussion-forum"}>
          <ListItem button>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="Discussion Forum" />
          </ListItem>
        </Link>
        <Signout />
      </>
    );
  } else if (user?.role == 2) {
    return (
      <>
        <Link to={`/hr/dashboard/${user?._id}/jobs-posted`}>
          <ListItem button>
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Jobs Posted" />
          </ListItem>
        </Link>
        <Link to={`/hr/dashboard/${user._id}/add-placement`}>
          <ListItem button>
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Add Placement Drive" />
          </ListItem>
        </Link>
        <Link to={"/discussion-forum"}>
          <ListItem button>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="Discussion Forum" />
          </ListItem>
        </Link>
        <Signout />
      </>
    );
  } else {
    return <></>;
  }
};

export default ListItems;
