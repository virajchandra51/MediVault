import React from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FaAllergies } from 'react-icons/fa';
import { IoDocumentOutline} from 'react-icons/io5';
import { MdOutlineMeetingRoom, MdOutlineMedicalServices, MdMedicalServices} from 'react-icons/md';


export const links = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'my profile',
        icon: <CgProfile />,
      },
    ],
  },
  
  {
    title: 'Health Records',
    links: [
      {
        name: 'insurance',
        icon: <IoDocumentOutline />,
      },
      {
        name: 'allergies',
        icon: <FaAllergies />,
      },
      {
        name: 'medical history',
        icon: <MdOutlineMedicalServices />,
      },
      {
        name: 'hospitalization history',
        icon: <MdMedicalServices />,
      },
      {
        name: 'checkup history',
        icon: <MdOutlineMeetingRoom/>,
      }
    ],
  },
  {
    title: 'Available Doctors',
    links: [
      {
        name: 'doctors',
        icon: <MdOutlineMedicalServices />,
      },
    ],
  },
  {
    title: 'Feeling Low?',
    links: [
      {
        name: 'predict disease',
        icon: <MdOutlineMedicalServices />,
      }
    ]
  }
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
