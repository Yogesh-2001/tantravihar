import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import CreateProfile from "./pages/student/CreateProfile";
import Login from "./pages/Login";
import StudentDashboard from "./pages/student/StudentDashboard";
import HomePage from "./pages/HomePage";
import Home from "./comment-section/Home";
import AddStudent from "./pages/admin/AddStudent";
import AllStudentsTable from "./pages/admin/AllStudentsTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddPlacement from "./pages/admin/AddPlacement";
import AddNotice from "./pages/admin/AddNotice";
import ViewProfile from "./pages/ViewProfile";
import AddTestForm from "./pages/admin/AddTestForm";
import AddMaterial from "./pages/admin/AddMaterial";
import AllDrivesTable from "./pages/AllDrivesTable";
import ViewDrive from "./pages/ViewDrive";
import AddDrive from "./pages/admin/AddDrive";
import PageNotFound from "./pages/PageNotFound";
import AdminRoute from "./routes/AdminRoute";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import HrRoute from "./routes/HrRoute";
import HrDashboard from "./pages/hr/HrDashboard";
import JobsPosted from "./pages/hr/JobsPosted";
import ParticularDriveTable from "./pages/hr/ParticularDriveTable";
import ViewTest from "./pages/student/ViewTest";
import ViewMaterials from "./pages/student/ViewMaterials";
import NotificationPage from "./pages/student/NotificationPage";
import ViewNotices from "./pages/student/ViewNotices";
const App = () => {
  return (
    <>
      <ToastContainer autoClose={1000} />
      <Layout>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/student/dashboard"
            element={
              <PrivateRoute>
                <StudentDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/dashboard/view-notifications"
            element={
              <PrivateRoute>
                <NotificationPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/hr/dashboard/:id"
            element={
              <HrRoute>
                <HrDashboard />
              </HrRoute>
            }
          />

          <Route
            path="/discussion-forum"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            exact
            path="/admin/dashboard/add-student"
            element={
              <AdminRoute>
                <AddStudent />
              </AdminRoute>
            }
          />
          <Route
            path="/student/dashboard/all-drives"
            element={
              <PrivateRoute>
                <AllDrivesTable />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/dashboard/view-test"
            element={
              <PrivateRoute>
                <ViewTest />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/dashboard/view-material"
            element={
              <PrivateRoute>
                <ViewMaterials />
              </PrivateRoute>
            }
          />
          <Route
            path="/view-drive/:id"
            element={
              <PrivateRoute>
                <ViewDrive />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/dashboard/view-all-students"
            element={
              <AdminRoute>
                <AllStudentsTable />
              </AdminRoute>
            }
          />
          <Route
            path="/hr/dashboard/:id/add-placement"
            element={
              <HrRoute>
                <AddPlacement />
              </HrRoute>
            }
          />
          <Route
            path="/hr/dashboard/:id/jobs-posted"
            element={
              <HrRoute>
                <JobsPosted />
              </HrRoute>
            }
          />
          <Route
            path="/hr/dashboard/:id/view-applicants/:Id"
            element={
              <HrRoute>
                <ParticularDriveTable />
              </HrRoute>
            }
          />
          <Route
            path="/admin/dashboard/add-notice"
            element={
              <AdminRoute>
                <AddNotice />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/dashboard/add-test"
            element={
              <AdminRoute>
                <AddTestForm />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/dashboard/add-class-material"
            element={
              <AdminRoute>
                <AddMaterial />
              </AdminRoute>
            }
          />
          <Route
            path="/student/dashboard/create-profile"
            element={
              <PrivateRoute>
                <CreateProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/dashboard/view-profile/:id"
            element={
              <PrivateRoute>
                <ViewProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/dashboard/edit-student/:id"
            element={
              <PrivateRoute>
                <CreateProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/dashboard/view-notices"
            element={
              <PrivateRoute>
                <ViewNotices />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
