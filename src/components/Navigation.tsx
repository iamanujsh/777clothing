// @ts-nocheck
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "@/contexts/user.context";
import { signOutUser } from "../utils/firebase/firebase.util";
import logo from "@/assets/logo.png";
import CardDropDown from "./cardDropDown/cardDropDown.component";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const signOutHandler = () => {
    signOutUser();
    setCurrentUser(null);
  };

  const HeaderList = [
    {
      title: "Shop",
      icon: <MdOutlineShoppingBag className="w-7 h-7" />,
      url: "shop",
    },
    currentUser
      ? {
          title: "Sign Out",
          icon: <IoPersonOutline className="w-7 h-7" />,
          url: "/",
        }
      : {
          title: "Sign In",
          icon: <IoPersonOutline className="w-7 h-7" />,
          url: "signin",
        },
  ];

  return (
    <div>
      <div className="h-20 flex items-center justify-around px-10 shadow-lg">
        <Link to="/">
          <img src={logo} alt="food_logo" className="h-20 transition-all" />
        </Link>
        <div>
          <ul className="flex gap-16 text-gray-600 font-semibold cursor-pointer ">
            {HeaderList.map((list) => (
              <div key={list.title}>
                {list.title === "Sign Out" ? (
                  <span
                    key={list.url}
                    onClick={signOutHandler}
                    className="flex items-center gap-3 hover:text-neutral-400"
                  >
                    {list.icon} <span>{list.title}</span>
                  </span>
                ) : (
                  <Link
                    key={list.url}
                    to={list.url}
                    className="flex items-center gap-3 hover:text-neutral-400"
                  >
                    {list.icon} <span>{list.title}</span>
                  </Link>
                )}
              </div>
            ))}
            <CardDropDown />
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Navigation;
