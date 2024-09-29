/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function AuthQueryNavigator({currentForm, toForm}) {
  return (
    <div className="w-full">
      <p className="text-sm text-left">
        {currentForm === "login" && "Don't have an Account?"}
        {currentForm === "signup" && "Did you have an Account?"}
        <Link to={toForm} className="ml-1 font-medium text-amber-600">
          {currentForm === "login" ? "Signup" : "Login"}
        </Link>
      </p>
    </div>
  );
}

export default AuthQueryNavigator;
