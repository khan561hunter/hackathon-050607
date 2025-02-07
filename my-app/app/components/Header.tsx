"use client";
import Link from "next/link";
import { LuShoppingCart } from "react-icons/lu";
import { IoMdMenu } from "react-icons/io";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaList } from "react-icons/fa6";
import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  const handleToggleMenu = () => {
    setOpen(!open);
  };

  return (
    <div className="md:flex bg-gradient-to-r from-gray-800 to-gray-400 md:items-center xs:flex xs:items-center">
      <main className="w-full">
        <div className="max-w-[1440px] mx-auto flex justify-between p-6 items-center text-white">
          {/* Logo */}
          <div className="md:text-3xl md:font-bold xs:text-2xl xs:text-nowrap">
            <p>CARRY IT</p>
          </div>

          {/* Navigation Menu */}
          <ul className="hidden md:flex gap-12 text-md font-bold">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/Products-Listing"}>Products</Link>
            </li>
            <li>
              <Link href={"/contact"}>Contact</Link>
            </li>
            <li>
              <Link href={"/inventory"}>Inventory</Link>
            </li>
          </ul>

          {/* Icons */}
          <div className="md:flex md:gap-3 md:items-center xs:flex xs:items-center xs:gap-3 ">
            <ClerkLoaded>
            
              {user ? (
                <div className="md:flex md:items-center md:gap-3  ">
                  <div className="xs:hidden md:block">
                  Welcome back!  {user?.firstName? user.firstName.charAt(0).toUpperCase() + user.firstName?.slice(1):"User"}
                  </div>
                  <div className="xs:block">
                <UserButton afterSignOutUrl="/"  /></div>
                  
                </div>
                
                
              ) : (
                <SignInButton mode="modal">
                  <button className=" text-white">
                    Sign In 
                  </button>
                </SignInButton>
              )}
            </ClerkLoaded>

            {/* Cart & Wishlist */}
            <ClerkLoaded>
              {user ? (
                <>
                  <Link href={"/cart"}>
                    <LuShoppingCart className="w-6 h-6 cursor-pointer" />
                  </Link>
                  <Link href={"/wishlist"}>
                    <FaList className="w-6 h-6 cursor-pointer" />
                  </Link>
                  <Link href={"/admin/dashboard"}>Admin</Link>
                </>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <button aria-label="Sign in to access cart">
                      <LuShoppingCart className="w-6 h-6 cursor-pointer" />
                    </button>
                  </SignInButton>
                  <SignInButton mode="modal">
                    <button aria-label="Sign in to access wishlist">
                      <FaList className="w-6 h-6 cursor-pointer" />
                    </button>
                  </SignInButton>
                </>
              )}
            </ClerkLoaded>
          </div>
        </div>
      </main>

      {/* Mobile View Menu */}
      <div className="md:hidden p-6 relative">
        {!open ? (
          <IoMdMenu
            className="w-6 h-6 fill-white cursor-pointer"
            onClick={handleToggleMenu}
          />
        ) : (
          <div>
            <RxCross2
              className="w-6 h-6 fill-white absolute top-4 right-6 cursor-pointer"
              onClick={handleToggleMenu}
            />
            <ul className="absolute top-14 right-6 bg-white text-black shadow-lg rounded-md py-2 z-10 w-40">
              <li className="p-2 px-4 hover:bg-[#f0f0f0]">
                <Link href={"/"}>Home</Link>
              </li>
              <li className="p-2 px-4 hover:bg-[#f0f0f0]">
                <Link href={"/Products-Listing"}>Products</Link>
              </li>
              <li className="p-2 px-4 hover:bg-[#f0f0f0]">
                <Link href={"/contact"}>Contact</Link>
              </li>
              <li className="p-2 px-4 hover:bg-[#f0f0f0]">
                <Link href={"/inventory"}>Inventory</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
