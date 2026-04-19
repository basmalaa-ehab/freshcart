"use client";

import { Button } from "_/components/ui/button";
import { Input } from "_/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "_/components/ui/navigation-menu";
import Link from "next/link";
import * as React from "react";
import { BsHeadset } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";

// import logo from "../../../assets/images/logo.png";
import { FaRegHeart } from "react-icons/fa";
import { FaCartShopping, FaRegCircleUser } from "react-icons/fa6";
import logo from "../../../assets/images/freshcart.svg";

import { useSession } from "next-auth/react";
import { AiOutlineUser } from "react-icons/ai";
import Sidebar from "../Sidebar/Sidebar";
import { useCart } from "_/app/_context/CartContext";
import { useWishlist } from "_/app/_context/WishlistContext";
import { ProfileButton } from "../../profile/ProfileButton";

// const components: { title: string; href: string; description: string }[] = [
//   {
//     title: "Alert Dialog",
//     href: "/docs/primitives/alert-dialog",
//     description:
//       "A modal dialog that interrupts the user with important content and expects a response.",
//   },import { Image } from 'next/image';

//   {
//     title: "Hover Card",
//     href: "/docs/primitives/hover-card",
//     description:
//       "For sighted users to preview content available behind a link.",
//   },
//   {
//     title: "Progress",
//     href: "/docs/primitives/progress",
//     description:
//       "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
//   },
//   {
//     title: "Scroll-area",
//     href: "/docs/primitives/scroll-area",
//     description: "Visually or semantically separates content.",
//   },
//   {
//     title: "Tabs",
//     href: "/docs/primitives/tabs",
//     description:
//       "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
//   },
//   {
//     title: "Tooltip",
//     href: "/docs/primitives/tooltip",
//     description:
//       "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
//   },
// ];

export default function Navbar() {
  const { data: session, status } = useSession();
  const isUserAuthenticated = status === "authenticated";
  const isAuthLoading = status === "loading";
  const { numOfCartItems } = useCart();
  const { numOfWishlistItems } = useWishlist();

  return (
    <>
      <nav className="bg-white  sticky top-0 z-40 shadow-sm   px-4 ">
        <div className="container mx-auto  ">
          <div className="flex items-center justify-between h-14 lg:h-16 gap-4 lg:gap-7">
            {/* logo */}

            <img src={logo.src} alt="freshcartlogo" className=" " />

            {/* search input */}
            <div className="hidden lg:flex flex-1 max-w-2xl  items-center px-3  py-6     ">
              <div className="relative w-full flex-1 ">
                <Input
                  type="text"
                  id="navbar-search-input"
                  className="w-full  py-5.5  bg-[#F9FAFB80]    rounded-[33554400px] border-[#E5E7EB]  placeholder:text-[#36415380] font-medium text-sm/[100%] px-4    focus:outline-none! focus:ring-2! focus:ring-green-500/20! focus:border-green-500!"
                  placeholder="Search for products, brands and more..."
                />
                <Button
                  type="submit"
                  className="absolute   right-1.5 top-1/2 -translate-y-1/2  bg-[#16A34A] hover:bg-green-700 rounded-full w-9 h-9 text-white text-sm font-normal"
                >
                  <IoSearch />
                </Button>
              </div>
            </div>

            <NavigationMenu className="">
              <NavigationMenuList>
                <NavigationMenuItem className="hidden xl:flex ">
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link
                      className="font-medium text-base leading-6 text-[#364153] hover:bg-transparent bg-transparent  hover:text-green-600"
                      href="/"
                    >
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem className="hidden xl:flex ">
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link
                      className="font-medium text-base leading-6 text-[#364153] hover:bg-transparent bg-transparent  hover:text-green-600"
                      href="/shop"
                    >
                      Shop
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem className="hidden xl:flex font-medium text-base leading-6 text-[#364153] hover:bg-transparent bg-transparent  hover:text-green-600">
                  <NavigationMenuTrigger className="hover:bg-transparent">
                    Categories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="hover:bg-transparent">
                    <ul className="w-96 ">
                      <ListItem href="/" title="All Categories"></ListItem>
                      <ListItem
                        href="/docs/installation"
                        title="Electronics"
                      ></ListItem>
                      <ListItem href="/" title="Women's Fashion"></ListItem>
                      <ListItem href="/" title="Men's Fashion"></ListItem>
                      <ListItem href="/" title="Beauty & Health"></ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem className="hidden xl:flex ">
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link
                      className="font-medium text-base leading-6 text-[#364153] hover:bg-transparent bg-transparent  hover:text-green-600"
                      href="/brands"
                    >
                      Brands
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <div className="flex-row hidden lg:flex">
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      className={navigationMenuTriggerStyle()}
                    >
                      <Link
                        className="lg:flex items-center gap-2 pr-3 mr-2  hover:bg-transparent bg-transparent     font-medium flex flex-row text-base leading-6 text-[#364153]"
                        href="/contact"
                      >
                        <div className="bg-[#F0FDF4] pl-0.75 rounded-[33554400px] w-10 h-10 flex items-center justify-center font-bold text-base">
                          <BsHeadset className="text-[#16A34A] font-bold text-base stroke-1" />
                        </div>
                        <div className="flex flex-col gap-y-0.75">
                          <div className="text-[#99A1AF] font-medium text-sm/[16px]">
                            Support
                          </div>

                          <span className="text-#364153 font-semibold text-xs/[16px]">
                            24/7 Help{" "}
                          </span>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <div className="w-px h-8 bg-gray-300 "></div>
                </div>

                <div className="flex flex-row text-[#6A7282] gap-0 justify-center lg:gap-2   items-center   ">
                  <Link
                    href="/wishlist"
                    className="relative px-1 ms-2  hover:text-green-500 hover:bg-[#F3F4F6] bg-transparent text-lg group pr-1 lg:text-base  rounded-[33554400px]  w-10 h-10 flex items-center justify-center"
                  >
                    <FaRegHeart className="text-[#6A7282] font-bold text-xl stroke-1  group-hover:text-green-600 transition-colors" />
                    {!!numOfWishlistItems && (
                      <span className="absolute top-0.5 right-0.5 size-4.5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                        {numOfWishlistItems}
                      </span>
                    )}
                  </Link>

                  <Link
                    href="/cart"
                    className="px-1  relative pt-1 hover:text-green-500 hover:bg-[#F3F4F6] bg-transparent text-2xl!  group  lg:text-base rounded-[33554400px]  w-10 h-10 flex items-center justify-center"
                  >
                    <FaCartShopping className="text-[#6A7282] font-bold   group-hover:text-green-600 transition-colors  stroke-1   text-xl  " />
                    {isUserAuthenticated && !!numOfCartItems && (
                      <span className="absolute top-0.5 right-0.75 size-4.5 rounded-full bg-green-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                        {numOfCartItems}
                      </span>
                    )}
                  </Link>

    {isUserAuthenticated ? <ProfileButton /> : null}

                  <Sidebar />

                  {/* user */}

                  {/* <Link
                    href="/profile"
                    className="hidden lg:flex hover:text-green-500 hover:bg-[#F3F4F6] bg-transparent group rounded-[33554400px]  w-10 h-10  items-center justify-center"
                  >
                    <FaRegCircleUser className="text-[#6A7282] font-bold  stroke-1 text-xl  group-hover:text-green-600 transition-colors" />
                  </Link> */}

              

                  {!isAuthLoading && !isUserAuthenticated ? (
                    <Link
                      href={"/Login"}
                      className="hidden lg:flex items-center gap-2 ml-2 px-5 py-2.5 rounded-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors shadow-sm shadow-green-600/20"
                    >
                      <AiOutlineUser className="text-base" />
                      <span className="text-nowrap">Sign In</span>
                    </Link>
                  ) : null}
                </div>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </nav>
    </>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
            <div className="line-clamp-2 text-muted-foreground">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
