import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';
import * as BiIcons from 'react-icons/bi';
import * as BsIcons from 'react-icons/bs';
import * as GoIcons from 'react-icons/go';
import * as Fa6Icons from 'react-icons/fa6';
import * as Hi2Icons from 'react-icons/hi2';
export const SidebarData = [
  {
    title: 'Statistics',
    path: '/statistics',
    icon: <Fa6Icons.FaChartSimple />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Products',
    path: '/products',
    icon: <MdIcons.MdProductionQuantityLimits />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Add Product',
        path: '/product/add',
        icon:  <BsIcons.BsCartPlus />,
        cName: 'sub-nav'
      },
    ]
  },
  {
    title: 'Product Category',
    path: '/productcategory',
    icon: <BiIcons.BiCategory />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Add Category',
        path: '/productcategory/add',
        icon: <BiIcons.BiPlus />,
        cName: 'sub-nav'
      },
      {
        title: 'Archive Category',
        path: '/productcategory/archive',
        icon: <Hi2Icons.HiOutlineArchiveBoxXMark />,
        cName: 'sub-nav'
      },
    ]
  },
  {
    title: 'Suppliers',
    path: '/suppliers',
    icon: <GoIcons.GoPeople />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Add Supplier',
        path: '/supplier/add',
        icon: <BsIcons.BsPersonAdd />,
        cName: 'sub-nav'
      },
    ]
  },
  {
    title: 'Sales',
    path: '/sales',
    icon: <BsIcons.BsCashCoin />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <AiIcons.AiOutlineSetting />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Logout',
    path: '/logout',
    icon: <BiIcons.BiLogOut />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
];