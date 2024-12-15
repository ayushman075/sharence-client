import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuthData } from "../context/AuthContext";
import axiosInstance from "../utils/axiosConfig";
import { toast } from "react-toastify";
import logo from "../../public/shareableLogo.png"
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineRoomPreferences } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { Modal } from 'antd';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const sidebarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };



  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);



  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [fullName,setFullName] = useState("");

  const handleOk  = async () =>  {

    if(!fullName){
        toast.error("Please enter name to continue")
    }
    else{
        axiosInstance.post('auth/update',{fullName:fullName}).then((res)=>{
            if(res.data.statusCode<400){
              toast.success('User profile updated successfully');
              setIsOpen(false);
              setIsNameModalOpen(false);
              window.location.reload();
            } else{
              console.log(res);
              toast.error(res.data.message);
            }
          }).catch((err)=>{
            console.error(err);
            toast.error(err?.response?.data?.message||'Error occurred while updating profile.')
          })
    }

  
  };
  const handleCancel = () => {
    setIsNameModalOpen(false);
  };

  const [isPrefernceModalOpen, setIsPreferenceModalOpen] = useState(false);
  const [preferences,setPreferences] = useState({
    shareEmail: false,
    shareContactNumber: false,
    shareAddress: false,
  });

  const handleToggle = (field) => {
    setPreferences((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  useEffect(()=>{
    axiosInstance.get('preferences/get').then((res)=>{
        if(res.data.statusCode<400){
            console.log(res.data.data)
            setPreferences(res.data.data)
        } else{
          console.log(res);
          toast.error(res.data.message);
        }
      }).catch((err)=>{
        console.error(err);
        toast.error(err?.response?.data?.message||'Error occurred while getting preference.')
      })
  },[])

  const handlePreferenceSubmit = (e) => {
    e.preventDefault();
    axiosInstance.put('preferences/update',{shareEmail:preferences.shareEmail,shareContactNumber:preferences.shareContactNumber,shareAddress:preferences.shareAddress}).then((res)=>{
        if(res.data.statusCode<400){
            console.log(res.data.data)
            setPreferences(res.data.data)
            setIsPreferenceModalOpen(false);
            window.location.reload();
            toast.success("Preferences updated successfully.")
        } else{
          console.log(res);
          toast.error(res.data.message);
        }
      }).catch((err)=>{
        console.error(err);
        toast.error(err?.response?.data?.message||'Error occurred while getting preference.')
      })
  };

  const handlePreferenceCancel = () => {
    setIsPreferenceModalOpen(false);
  };

  const handlePreferenceOpen = () => {
    setIsPreferenceModalOpen(true);
  }

  const {userData,setUserData,logout} = useAuthData();
  const [user,setUser] = useState({
    avatar: null,
    createdAt: null,
    emailId: null,
    fullName: null,
    role: null,
    updatedAt: null,
    userId: null,
    __v: null,
    _id: null,
  });
  useEffect(()=>{
      axiosInstance.get("auth/get").then((res)=>{
          if(res.data.statusCode<400){
              setUser(res.data.data);
              setUserData(res.data.data)
              if(res.data.data?.fullName=="null null"){
                setIsNameModalOpen(true);
              
              }
              else{
                setIsNameModalOpen(false);
                
              }
          }
          else{
              toast.error(res.data.message)
          }
            }).catch((err)=>{
              toast.error(err?.response?.data?.message||"An error occurred while getting user")
          console.log(err)
            })
  },[])




  


  return (
    <div className="flex md:w-1/4">

<Modal closable={false} title="Please enter your Name to continue." open={isNameModalOpen} onOk={handleOk} onCancel={handleCancel}>
       <div>
       <label htmlFor="fullName" className="block text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="email"
              id="email"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2  outline-none focus:ring-0 text-gray-700  border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-400"
              placeholder="Enter your Full Name"
            />
       </div>
      </Modal>
      <Modal footer={null} closable={false} title="Please manage your Preference." open={isPrefernceModalOpen} onOk={handlePreferenceSubmit} onCancel={handlePreferenceCancel}>
       <div>
       <form >
        {/* Share Email */}
        <div className="flex items-center justify-between mb-4">
          <label htmlFor="shareEmail" className="text-gray-700 font-medium">
            Share Email
          </label>
          <button
            type="button"
            onClick={() => handleToggle("shareEmail")}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
              preferences.shareEmail ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                preferences.shareEmail ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </button>
        </div>

        {/* Share Contact Number */}
        <div className="flex items-center justify-between mb-4">
          <label htmlFor="shareContactNumber" className="text-gray-700 font-medium">
            Share Contact Number
          </label>
          <button
            type="button"
            onClick={() => handleToggle("shareContactNumber")}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
              preferences.shareContactNumber ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                preferences.shareContactNumber ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </button>
        </div>

        {/* Share Address */}
        <div className="flex items-center justify-between mb-6">
          <label htmlFor="shareAddress" className="text-gray-700 font-medium">
            Share Address
          </label>
          <button
            type="button"
            onClick={() => handleToggle("shareAddress")}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
              preferences.shareAddress ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                preferences.shareAddress ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </button>
        </div>

        <button
          onClick={(e)=>{handlePreferenceSubmit(e)}}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Save Preferences
        </button>
      </form>
       </div>
      </Modal>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-blue-100 text-black transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-64 md:w-72`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center p-4 bg-blue-200">
          <img
            src={logo} 
            alt="Logo"
            className="w-10 h-10"
          />
        </div>

        {/* User Info */}
        <div className="flex flex-col items-center mt-6">
        {user.avatar?<img
            src={user.avatar} 
            alt="User DP"
            className="h-16 w-16 rounded-full border-2 border-gray-700"
          />:<FaRegUserCircle   className="w-1 text-blue-400 h-10"/>}
          <h2 className="mt-2 text-lg font-semibold">{user?.fullName || "null null"}</h2>
        </div>

        {/* Options */}
        <div className="mt-10 space-y-4 px-4">
          <button onClick={(e)=>{setIsPreferenceModalOpen(true)}} className="w-full px-4 py-2 flex gap-x-2 text-left rounded-lg hover:bg-blue-300">
          <MdOutlineRoomPreferences size={25} className="text-blue-500"/>  Manage Preferences
          </button>
          <button onClick={logout} className="w-full px-4 py-2 flex gap-x-2 text-left rounded-lg hover:bg-blue-300">
          <FiLogOut size={25} className="text-blue-500"/> Logout
          </button>
        </div>
      </div>

      {/* Main Content Overlay for Mobile */}
      <div className="w-full bg-blue-200 px-3 py-2 flex md:hidden">
        <div className="float-left mx-2 items-center flex justify-center"><RxHamburgerMenu onClick={toggleSidebar} size={30} className="text-blue-400"/></div>
        <div className="w-full flex justify-center items-start">  <img
            src={logo}
            alt="Logo"
            className="w-10 h-10"
          /></div>
      </div>
      {isOpen && (
       <div
       ref={sidebarRef}
       className={`fixed top-0 left-0 h-screen bg-blue-100 text-black transition-transform duration-300 ${
         isOpen ? "translate-x-0" : "-translate-x-full"
       } md:translate-x-0 w-64 md:w-72`}
     >
    

       {/* User Info */}
       <div className="flex flex-col items-center mt-6">
       {user.avatar?<img
           src={user.avatar} 
           alt="User DP"
           className="h-16 w-16 rounded-full border-2 border-gray-700"
         />:<FaRegUserCircle   className="w-1 text-blue-400 h-10"/>}
         <h2 className="mt-2 text-lg font-semibold">{user?.fullName || "null null"}</h2>
       </div>

       {/* Options */}
       <div className="mt-10 space-y-4 px-4">
         <button onClick={(e)=>{setIsPreferenceModalOpen(true)}} className="w-full px-4 py-2 flex gap-x-2 text-left rounded-lg hover:bg-blue-300">
         <MdOutlineRoomPreferences size={25} className="text-blue-500"/>  Manage Preferences
         </button>
         <button onClick={logout} className="w-full px-4 py-2 flex gap-x-2 text-left rounded-lg hover:bg-blue-300">
         <FiLogOut size={25} className="text-blue-500"/> Logout
         </button>
       </div>
     </div>
      )}


     
    </div>
  );
};

export default Sidebar;
