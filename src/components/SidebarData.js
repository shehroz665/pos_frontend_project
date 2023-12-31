import React from 'react';
//import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import * as BiIcons from 'react-icons/bi';
import * as BsIcons from 'react-icons/bs';
import * as GoIcons from 'react-icons/go';
import * as Fa6Icons from 'react-icons/fa6';
import * as Hi2Icons from 'react-icons/hi2';
import * as TbIcons from 'react-icons/tb';
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
    icon: <RiIcons.RiProductHuntLine />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Add Product',
        path: '/product/add',
        icon:  <BiIcons.BiPlus  />,
        cName: 'sub-nav'
      },
      {
        title: 'Archive Product',
        path: '/product/archive',
        icon: <Hi2Icons.HiOutlineArchiveBoxXMark />,
        cName: 'sub-nav'
      },
      {
        title: 'Out of Stock',
        path: '/product/outofstock',
        icon: <BsIcons.BsExclamationCircle />,
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
      {
        title: 'Archive Supplier',
        path: '/supplier/archive',
        icon: <Hi2Icons.HiOutlineArchiveBoxXMark />,
        cName: 'sub-nav'
      },
    ]
  },
  {
    title: 'Add To Cart',
    path: '/addtocart',
    icon: <BiIcons.BiCartDownload />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Invoices',
    path: '/invoices',
    icon: <TbIcons.TbFileInvoice />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Sales',
    path: '/sales',
    icon: <BsIcons.BsCashCoin />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Credit',
    path: '/credit',
    icon: <BsIcons.BsCreditCard />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  // {
  //   title: 'Settings',
  //   path: '/settings',
  //   icon: <AiIcons.AiOutlineSetting />,
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,
  // },
  {
    title: 'Logout',
    path: '/logout',
    icon: <BiIcons.BiLogOut />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
];