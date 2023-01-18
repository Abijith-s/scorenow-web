import React from "react";

import { Home } from "./Components/Home";
import Navbar from "./Containers/NavbarResponsive";

import { Routes, Route } from "react-router-dom";
import { SignUp } from "./Auth/SignUp";

import { Login } from "./Auth/Login";
import { NonAuthLayout } from "./Auth/Layouts/NonAuthLayout";
import { AuthLayout } from "./Auth/Layouts/AuthLayout";

import { SignInWithLogin } from "./Auth/SignInWithPhone";

import { FinishedMatches } from "./Components/FinishedMatches";
import { FixtureMatches } from "./Components/FixtureMatches";
import { LiveMatches } from "./Components/LiveMatches";
import { News } from "./Components/News";
import { UpcomingMatches } from "./Components/UpcomingMatches";
import { MatchCard } from "./Containers/MatchCard";
import { UserProfile } from "./Components/UserProfile";
import { Favorites } from "./Components/Favorites.js";
import { Leagues } from "./Components/Leagues";
import Ranking from "./Components/Ranking";
import { SnackbarProvider } from "notistack";
import { AdminLogin } from "./Components/AdminPanel/AdminLogin";
import AdminHome from "./Components/AdminPanel/AdminHome";
import { AdminAuthLayout } from "./Components/AdminPanel/AdminAuthLayout";
import { AdminNonAuthLayout } from "./Components/AdminPanel/AdminNonAuthLayout";
import { DetailsPage } from "./Components/Home/DetailsPage";
import { About } from "./Components/About/About";
import { ThemeProvider } from  '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import PrivacyPolicy from "./Components/Privacy-Policy";

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#442d6b',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#A62539',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});
function App() {
  return (
    <>
     <ThemeProvider theme={theme}>
      {!window.location.href.includes("/admin") && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <AuthLayout>
              <Home />
            </AuthLayout>
          }
        />
        <Route
          path="/signin-with-phonenumber"
          element={
            <NonAuthLayout>
              <SignInWithLogin />
            </NonAuthLayout>
          }
        />
        <Route
          path="/login"
          element={
            <NonAuthLayout>
              <SnackbarProvider
                maxSnack={3}
                autoHideDuration={2000}
                sx={{ fontSize: "2em" }}
              >
                <Login />
              </SnackbarProvider>
            </NonAuthLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <SnackbarProvider
              maxSnack={3}
              autoHideDuration={2000}
              sx={{ fontSize: "2em" }}
            >
              <SignUp />
            </SnackbarProvider>
          }
        />
        <Route
          path="/finishedMatches"
          element={
            <AuthLayout>
              <FinishedMatches />
            </AuthLayout>
          }
        />
        <Route
          path="/fixtureMatches"
          element={
            <AuthLayout>
              <FixtureMatches />
            </AuthLayout>
          }
        />
        <Route
          path="/liveMatches"
          element={
            <AuthLayout>
              <LiveMatches />
            </AuthLayout>
          }
        />
        <Route
          path="/news"
          element={
            <AuthLayout>
              <News />
            </AuthLayout>
          }
        />
        <Route
          path="/upcomingMatches"
          element={
            <AuthLayout>
              <UpcomingMatches />
            </AuthLayout>
          }
        />
        <Route
          path="/livematchpage"
          element={
            <AuthLayout>
              <MatchCard />
            </AuthLayout>
          }
        />
        <Route
          path="/upcomingmatchpage"
          element={
            <AuthLayout>
              <MatchCard />
            </AuthLayout>
          }
        />
        <Route
          path="/leagues"
          element={
            <AuthLayout>
              <Leagues />
            </AuthLayout>
          }
        />
        <Route
          path="/finishedmatchpage"
          element={
            <AuthLayout>
              <MatchCard />
            </AuthLayout>
          }
        />
        <Route
          path="/fixturematchpage"
          element={
            <AuthLayout>
              <MatchCard />
            </AuthLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthLayout>
              <UserProfile />
            </AuthLayout>
          }
        />
        <Route
          path="/favourites"
          element={
            <AuthLayout>
              <SnackbarProvider
                maxSnack={3}
                autoHideDuration={2000}
                sx={{ fontSize: "2em" }}
              >
                <Favorites />
              </SnackbarProvider>
            </AuthLayout>
          }
        />
        <Route
          path="/ranking"
          element={
            <AuthLayout>
              <Ranking />
            </AuthLayout>
          }
        />
         <Route
          path="/about"
          element={
              <About />
          }
        />
        <Route
          path="/admin"
          element={
            <SnackbarProvider
              maxSnack={3}
              autoHideDuration={2000}
              sx={{ fontSize: "2em" }}
            >
              <AdminNonAuthLayout>
                <AdminLogin />
              </AdminNonAuthLayout>
            </SnackbarProvider>
          }
        />
        <Route
          path="/admin/home"
          element={
            <SnackbarProvider
              maxSnack={3}
              autoHideDuration={2000}
              sx={{ fontSize: "2em" }}
            >
              <AdminAuthLayout>
                <AdminHome />
              </AdminAuthLayout>
            </SnackbarProvider>
          }
        />
        <Route
          path="/detailspage/:id"
          element={
            <AuthLayout>
              <DetailsPage />
            </AuthLayout>
          }
        />
         <Route
          path="/privacy-policy"
          element={
              <PrivacyPolicy/>
          }
        />
      </Routes>
      </ThemeProvider>
    </>
  );
}
export default App;