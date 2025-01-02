import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import reportIcon from "./assets/report_icon.svg";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import ButtonShowcase from "./components/ui/ButtonShowCase";
import SignupForm from "./components/forms/SignupForm";
import InputField from "./components/ui/InputField";
import CheckMailOtp from "./components/forms/CheckMailOtp";
import ForgotPassword from "./components/forms/ForgotPassword";
import { Route, Routes, useNavigate } from "react-router-dom";
import Button from "./components/ui/Button";

import "./App.css";
import LoginForm from "./components/forms/LoginForm";
import ForgotPasswordOtp from "./components/forms/forgotPasswordOtp";
import ProfileStep1 from "./components/forms/ProfileStep1";
import ProfileStep2 from "./components/forms/ProfileStep2";
import ProfileStep3 from "./components/forms/ProfileStep3";
import LoginPage from "./components/pages/Login";
import SignupPage from "./components/pages/Signup";
function App() {
  const navigate = useNavigate();
  // <Route path="/button-showcase" element={<ButtonShowcase />} />

  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="flex justify-center py-80">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="primary"
                  label="Buttons"
                  onClick={() => navigate("/buttons")}
                  ></Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outlined"
                  label="Sign Up Form"
                  iconLeft={
                    <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
                  }
                  onClick={() => navigate("/signUp")}
                  ></Button>
                <Button
                  variant="outlined"
                  label="CheckMailOtp Form"
                  iconLeft={
                    <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
                  }
                  onClick={() => navigate("/checkMailOtp")}
                ></Button>
                <Button
                  variant="outlined"
                  label="Login Form"
                  iconLeft={
                    <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
                  }
                  onClick={() => navigate("/login")}
                  ></Button>
                <Button
                  variant="outlined"
                  label="ForgotPassword Form"
                  iconLeft={
                    <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
                  }
                  onClick={() => navigate("/forgotPassword")}
                ></Button>
                <Button
                  variant="outlined"
                  label="ForgotPasswordOtp Form"
                  iconLeft={
                    <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
                  }
                  onClick={() => navigate("/forgotPasswordOtp")}
                  ></Button>
                <Button
                  variant="outlined"
                  label="ProfileStep1 Form"
                  iconLeft={
                    <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
                  }
                  onClick={() => navigate("/profileStep1")}
                  ></Button>
                <Button
                  variant="outlined"
                  label="ProfileStep2 Form"
                  iconLeft={
                    <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
                  }
                  onClick={() => navigate("/profileStep2")}
                  ></Button>
                <Button
                  variant="outlined"
                  label="ProfileStep3 Form"
                  iconLeft={
                    <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
                  }
                  onClick={() => navigate("/profileStep3")}
                ></Button>
                <Button
                  variant="outlined-success"
                  label="Login Page"
                  iconLeft={
                    <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
                  }
                  onClick={() => navigate("/loginPage")}
                  ></Button>
              </div>
            </div>
            </>
          }
        />

        <Route path="/buttons" element={<ButtonShowcase />} />
        <Route path="/signUp" element={<SignupPage></SignupPage>} />
        <Route path="/checkMailOtp" element={<CheckMailOtp></CheckMailOtp>} />
        <Route path="/forgotPasswoRd"element={<ForgotPassword></ForgotPassword>}/>
        <Route path="/login"element={<LoginPage></LoginPage>}/>
        <Route path="/forgotPasswordOtp"element={<ForgotPasswordOtp></ForgotPasswordOtp>}/>
        <Route path="/profileStep1"element={<ProfileStep1></ProfileStep1>}/>
        <Route path="/profileStep2"element={<ProfileStep2></ProfileStep2>}/>
        <Route path="/profileStep3"element={<ProfileStep3></ProfileStep3>}/>
        <Route path="/loginPage"element={<LoginPage></LoginPage>}/>
      </Routes>
    </>
  );
}

export default App;
