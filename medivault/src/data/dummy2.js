import React from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineMedicalServices } from 'react-icons/md';


export const links = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'my profile doc',
        icon: <CgProfile />,
      },
    ],
  },
  {
    title: 'My Patients',
    links: [
      {
        name: 'patients',
        icon: <MdOutlineMedicalServices />,
      },
    ],
  },
];

export const themeColors = [
  {
    name: 'blue-theme',
    color: '#1A97F5',
  },
  {
    name: 'green-theme',
    color: '#03C9D7',
  },
  {
    name: 'purple-theme',
    color: '#7352FF',
  },
  {
    name: 'red-theme',
    color: '#FF5C8E',
  },
  {
    name: 'indigo-theme',
    color: '#1E4DB7',
  },
  {
    color: '#FB9678',
    name: 'orange-theme',
  },
];

export const userProfileData = [
  {
    icon: <BsCurrencyDollar />,
    title: 'My Profile',
    desc: 'Account Settings',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
  },
];
