import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (email, username) => {
    setIsLoading(true);
    setError(null);

    const loginData = {
      username,
      email,
    };

    // TODO Change localhost to remote web server
    const response = await axios.post(
      "https://a22-web-project.onrender.com/login",
      loginData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.data.status === "No Auth") {
      setIsLoading(false);
      setError(response.error);
    } else {
      const json = response.data;
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      // update loading state
      setIsLoading(false);

      
      navigate("/welcome")
    }
  };

  return { login, isLoading, error };
};
