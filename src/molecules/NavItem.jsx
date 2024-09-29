/* eslint-disable react/prop-types */
import { AiFillProduct } from "react-icons/ai";
import { FaUser, FaUsers } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { GrUserWorker } from "react-icons/gr";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdBorderColor, MdCategory, MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { RiCoupon3Fill } from "react-icons/ri";

const Icons = {
  GrUserWorker,
  IoMdCloseCircleOutline,
  MdBorderColor,
  MdCategory,
  MdDashboard,
  AiFillProduct,
  FaShop,
  FaUser,
  FaUsers,
  RiCoupon3Fill,
};

const NavLinkStyle =
  "px-4 py-2 flex items-center gap-2 hover:text-amber-500 focus:text-amber-500 active:text-amber-500 hover:bg-[#f5f5f5] focus:bg-[#f5f5f5] active:bg-[#e0e0e0] dark:hover:dark:bg-slate-800 focus:dark:bg-slate-800 dark:active:bg-slate-800  transition-colors duration-200 ease-linear";


function NavItem({ to, icon, label }) {
  const Icon = Icons[icon]  
  return (
    <NavLink to={to} className={NavLinkStyle}>
      <Icon size="20" className="text-amber-500" />
      <span>{label}</span>
    </NavLink>
  );
}

export default NavItem;
