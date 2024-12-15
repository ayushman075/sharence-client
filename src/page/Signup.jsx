import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthData } from "../context/AuthContext";
import Lottie from 'react-lottie-player';
import Signupani from "../../public/AnimationSignup.json";
import logo from "../../public/shareableLogo.png";
import googleLogo from "../../public/search.png";
import { Card } from "antd";

const Signup = () => {
  const { register, googleLogin, isSignedIn } = useAuthData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  
  useEffect(() => {
    if (isSignedIn) {
      navigate("/");
    }
  }, [isSignedIn, navigate]);

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      toast.error("All fields are required");
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else if (password.length < 8) {
      toast.error("Passwords should be at least 8 characters");
    } else {
      await register(email, password, navigate);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-wrap h-max w-2/3 max-md:w-full">
        {/* Left Section */}
        <div className="w-1/2 h-full my-auto max-md:w-full">
          <Lottie
            loop
            animationData={Signupani}
            play
            style={{ width: "100%", height: "100%" }}
          />
        </div>
  
        {/* Right Section */}
        <div className="flex-col w-2/5 m-auto h-fit max-md:w-full">
          <Card className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-4 shadow-lg">
            <div className="text-center">
              <div className="flex mb-2 flex-row justify-center">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-14 w-14 rounded-full"
                />
                <span className="ml-3 text-xl font-bold align-middle my-auto text-gray-800">
                  Sharence
                </span>
              </div>
            </div>
            <div>
            <p className="text-sm text-center my-2 text-gray-700">
            Create your account to get started
          </p>
              <div className="flex sm:px-12 justify-center items-center">
                <button
                  onClick={googleLogin}
                  className="w-full px-4 py-2 flex justify-center items-center bg-blue-300 text-black rounded"
                >
                  <img
                    src={googleLogo}
                    className="mx-3"
                    width={25}
                    height={25}
                    alt="google_logo"
                  />
                  <span>Continue with Google</span>
                </button>
              </div>
              <div className="flex flex-row items-center justify-evenly mt-4">
                <span className="w-2/5 border-t-2 border-gray-500"></span>
                <p className="text-center mx-2">OR</p>
                <span className="w-2/5 border-t-2 border-gray-500"></span>
              </div>
              <form className="space-y-4 mt-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 mt-2 bg-blue-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 mt-2 bg-blue-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="Enter your password"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 mt-2 bg-blue-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="Confirm your password"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSignup}
                  className="w-full px-4 py-2 text-black bg-blue-300 rounded-lg hover:bg-blue-400 focus:ring-2 focus:ring-indigo-400"
                >
                  Sign Up
                </button>
                <div className="flex mt-2">
                  <Link
                    className="text-sm text-gray-600 hover:text-black"
                    to={"/login"}
                  >
                    Already have an account? Login
                  </Link>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );  
};

export default Signup;
