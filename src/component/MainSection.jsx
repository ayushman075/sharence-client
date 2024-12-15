import React, { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { MdOutlineDone } from "react-icons/md";
import axiosInstance from "../utils/axiosConfig";
import { toast } from "react-toastify";
import { Input, Modal } from "antd";
import { Form } from "react-router-dom";


const MainSection = () => {
  const [preferences, setPreferences] = useState({
    shareEmail: false,
    shareContactNumber: false,
    shareAddress: false,
  });

  const [userDetails, setUserDetails] = useState({
  
    email: "",
    address: "",
    contactNumber: "",
  });

  const [editingField, setEditingField] = useState(null);


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

  useEffect(()=>{
    axiosInstance.get('details/get').then((res)=>{
        if(res.data.statusCode<400){
            console.log(res.data.data)
            setUserDetails({
                email:res.data.data.email,
                address:res.data.data.address,
                contactNumber:res.data.data.contactNumber
            })
        
        } else{
          console.log(res);
          toast.error(res.data.message);
        }
      }).catch((err)=>{
        console.error(err);
        toast.error(err?.response?.data?.message||'Error occurred while getting Details.')
      })
  },[])

  const handlePreferenceSubmit = (e) => {
    e.preventDefault();
    
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tempDetails, setTempDetails] = useState({field:"",value:""});


  const showEditModal = (field) => {
    setEditingField(field);
    setTempDetails({ field, value: userDetails[field]||"" });
    setIsModalVisible(true);
  };

  const handleModalOk = () => { 
    setUserDetails((prev) => ({
      ...prev,
      [tempDetails.field]: tempDetails.value,
    }));

    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
   
  };

  const handleTempDetailsChange = (e) => {
    setTempDetails((prev) => ({ ...prev, value: e.target.value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    await axiosInstance.put('preferences/update',{shareEmail:preferences.shareEmail,shareContactNumber:preferences.shareContactNumber,shareAddress:preferences.shareAddress}).then(async(res)=>{
      if(res.data.statusCode<400){
          console.log(res.data.data)
          setPreferences(res.data.data)
          await axiosInstance.put('details/update',userDetails).then((res)=>{
            if(res.data.statusCode<400){
                console.log(res.data.data)
                setUserDetails({
                    email:res.data.data.email,
                    address:res.data.data.address,
                    contactNumber:res.data.data.contactNumber
                })
    
                toast.success("User details updated sucessfully.")
                window.location.reload();
            
            } else{
              console.log(res);
              toast.error(res.data.message);
            }
          }).catch((err)=>{
            console.error(err);
            toast.error(err?.response?.data?.message||'Error occurred while saving Details.')
          })
      } else{
        console.log(res);
        toast.error(res.data.message);
      }
    }).catch((err)=>{
      console.error(err);
      toast.error(err?.response?.data?.message||'Error occurred while getting preference.')
    })

    
  };


  useEffect(()=>{
    if(preferences.shareEmail && !userDetails.email){
        showEditModal("email")
    }
    if(preferences.shareAddress && !userDetails.address){
        showEditModal("address")
    }
    if(preferences.shareContactNumber && !userDetails.contactNumber){
        showEditModal("contactNumber")
    }
  },[userDetails])


  return (
    <div className="flex h-screen">
       <Modal
  title={`Edit ${editingField}`}
  open={isModalVisible}
  onOk={handleModalOk}
  onCancel={handleModalCancel}
  okText="Save"
  cancelText="Cancel"
>
  <div className="space-y-6">
    {editingField === "email" && (
      <>
        <label className="block text-gray-700 font-medium">Email</label>
        <Input
          type="email"
          value={tempDetails.value}
          onChange={handleTempDetailsChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Enter your email"
        />
        <div className="flex items-center gap-3 mt-4">
          <input
            type="checkbox"
            id="shareEmail"
            checked={preferences.shareEmail}
            onChange={(e) =>
              setPreferences((prev) => ({
                ...prev,
                shareEmail: e.target.checked,
              }))
            }
            className="w-5 h-5 text-blue-500 focus:ring focus:ring-blue-300 rounded border-gray-300"
          />
          <label htmlFor="shareEmail" className="text-gray-700 font-medium">
            Share Email
          </label>
        </div>
      </>
    )}

    {editingField === "address" && (
      <>
        <label className="block text-gray-700 font-medium">Address</label>
        <Input
          type="text"
          value={tempDetails.value}
          onChange={handleTempDetailsChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Enter your address"
        />
        <div className="flex items-center gap-3 mt-4">
          <input
            type="checkbox"
            id="shareAddress"
            checked={preferences.shareAddress}
            onChange={(e) =>
              setPreferences((prev) => ({
                ...prev,
                shareAddress: e.target.checked,
              }))
            }
            className="w-5 h-5 text-blue-500 focus:ring focus:ring-blue-300 rounded border-gray-300"
          />
          <label htmlFor="shareAddress" className="text-gray-700 font-medium">
            Share Address
          </label>
        </div>
      </>
    )}

    {editingField === "contactNumber" && (
      <>
        <label className="block text-gray-700 font-medium">Contact Number</label>
        <Input
          type="text"
          value={tempDetails.value}
          onChange={handleTempDetailsChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Enter your contact number"
        />
        <div className="flex items-center gap-3 mt-4">
          <input
            type="checkbox"
            id="shareContactNumber"
            checked={preferences.shareContactNumber}
            onChange={(e) =>
              setPreferences((prev) => ({
                ...prev,
                shareContactNumber: e.target.checked,
              }))
            }
            className="w-5 h-5 text-blue-500 focus:ring focus:ring-blue-300 rounded border-gray-300"
          />
          <label
            htmlFor="shareContactNumber"
            className="text-gray-700 font-medium"
          >
            Share Contact Number
          </label>
        </div>
      </>
    )}
  </div>
</Modal>
    <div className="w-1/4 max-md:w-0 "> {/* Sidebar */} </div>
    <div className="flex-grow flex items-center justify-center md:w-3/4 w-full max-md:w-full">
      <div className="max-w-2xl  p-6 rounded-lg bg-blue-50 shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Details</h2>

        {/* User Details Section */}
        <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-2">User Details</h3>
            {Object.entries(userDetails).map(([field, value]) => (
              <div key={field} className="flex gap-x-3  items-center justify-between mb-4">
                <label className="text-gray-700 w-40 max-sm:w-32 capitalize font-medium" htmlFor={field}>
                  {field === "contactNumber" ? "Contact Number" :field}
                </label>
                <span className="text-gray-600 max-sm:w-32 overflow-clip text-wrap">{value || "Not provided"}</span>
                <button
                  onClick={() => showEditModal(field)}
                  className="text-blue-500 hover:underline text-sm"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        <button
              onClick={(e)=>{handleSubmit(e)}}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Save Details
            </button>
      </div>
      
    </div>
  </div>
  );
};

export default MainSection;
