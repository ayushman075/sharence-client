import { useAuthData } from "../context/AuthContext";
import React, { useEffect } from "react";


const OAuthCallback = () => {
  const { handleOAuthCallback } = useAuthData();

  useEffect(() => {
    handleOAuthCallback();
  }, [handleOAuthCallback]);

  return <div>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="relative flex items-center justify-center">
        
        <div className="w-16 h-16 border-4 border-t-primary border-gray-300 rounded-full animate-spin"></div>
        <div className="absolute text-primary font-bold text-xl">Sharence</div>
      </div>
      <p className="mt-4 text-gray-600 text-sm font-medium">Logging you in...</p>
    </div>
  </div>;
};

export default OAuthCallback;
