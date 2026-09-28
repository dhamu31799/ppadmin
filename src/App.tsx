import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";

import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import Payment from "./pages/Payment/Payment";
import FeedbackList from "./pages/Feedback/FeedbackList";
import ForgotPassword from "./pages/Forgotpassword/ForgotPassword";
import VerifyEmail from "./pages/verify-email/VerifyEmail";
import OnboardingAndDashboard from "./pages/OnboardingPage/OnboardingPage";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { isAuthenticated } from "./utils/auth";
export default function App() {
  function BackButtonHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) return;

    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
      navigate(location.pathname + location.search, { replace: true });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location.pathname, location.search, navigate]);

  return null;
}
  return (
    <>
          <Toaster position="top-center" />

      <Router>
          <BackButtonHandler />

        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Home />} />

              {/* Others Page */}
              <Route path="/profile" element={<UserProfiles />} />
               <Route path="/Payment" element={<Payment />} />
                <Route path="/FeedbackList" element={<FeedbackList />} />
                              <Route path="/Onboarding" element={<OnboardingAndDashboard />} />


         
          
              {/* Charts */}
            
            </Route>
          </Route>

          {/* Auth Layout */}
          <Route
            path="/"
            element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} replace />}
          />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
 <Route path="/verifyEmail" element={<VerifyEmail />} />


          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}