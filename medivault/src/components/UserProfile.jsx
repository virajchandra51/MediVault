import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { Link, NavLink } from "react-router-dom";

import { userProfileData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import avatar from '../data/avatar.png';
import { useCookies } from 'react-cookie';
import { Button } from '.';

const UserProfile = () => {
  const { currentColor } = useStateContext();
  const [cookies, setCookie, removeCookie] = useCookies();

  function logout() {
    removeCookie('temporary');
    removeCookie('name');
    removeCookie('mail');
    removeCookie('index');
    removeCookie('password');
    removeCookie('patients');
    removeCookie('doctors');
    removeCookie('insurance');
    removeCookie('type');
    removeCookie('allergies');

    window.location.href = "/";
  }

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={avatar}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200"> {cookies['name']} </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">  {cookies['type'].toUpperCase()}   </p>
        <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> {cookies['mail']} </p>
        </div>
      </div>
      <div className="mt-5">
        <input type="button" style={{backgroundColor: "rgb(3, 201, 215)", padding: "8px 12px", borderRadius:'4px', color:'white'}} value="Logout" onClick={logout} />
      </div>
    </div>

  );
};

export default UserProfile;
