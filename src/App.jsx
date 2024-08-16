import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Games from "./pages/Games";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./features/authentication/ProtectedRoute";
import styled from "styled-components";
import ProfileUser from "./pages/ProfileUser";
import Chat from "./pages/Chat";
import Notifications from "./pages/Notifications";
import Revenues from "./features/dashboard/Revenues";
import DisableZoom from "./styles/DisableZoom";

const StyledDiv = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url("/Group 113.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <>
      <DisableZoom />
      <StyledDiv>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="revenue" element={<Revenues />} />
              <Route path="users" element={<Users />} />
              <Route path="games" element={<Games />} />
              <Route path="settings" element={<Settings />} />
              <Route path="/profile/:profileName" element={<ProfileUser />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/notifications" element={<Notifications />} />
              
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </StyledDiv>
    </>
  );
}

export default App;
