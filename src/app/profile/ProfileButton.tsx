import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

import { Button } from "_/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "_/components/ui/dropdown-menu";
import Link from "next/link";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaBoxOpen, FaUser } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";
import { RiContactsBook3Fill } from "react-icons/ri";
import { PiGearSixFill } from "react-icons/pi";
import { MdLogout } from "react-icons/md";
import { useSession } from "next-auth/react";

export function ProfileButton() {
  const { data: session } = useSession();
  const userName = session?.user?.name || "User";


  return (
    <div 

className="hidden md:block mt-3 text-xl hover:bg-[#F3F4F6] bg-transparent rounded-[33554400px] cursor-pointer py-1  px-3.5 hover:text-green-500"
>
      <DropdownMenu >
        <DropdownMenuTrigger >
          <FaRegCircleUser 
          className="cursor-pointer"
          
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <FaRegCircleUser className="text-xl text-green-600" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {userName}
                </p>
              </div>
            </div>
          </div>
          <DropdownMenuItem className="w-full cursor-pointer flex items-center gap-3 px-4 py-4 text-sm text-gray-600 hover:text-green-600! hover:bg-green-200! transition-colors">
            <span className="text-gray-400!">
              <FaUser />
            </span>
            My Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="w-full cursor-pointer flex items-center gap-3 px-4 py-4 text-sm text-gray-600 hover:text-green-600! hover:bg-green-200! transition-colors">
            <FaBoxOpen />
            <Link href="/AllOrders"> My Orders</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="w-full cursor-pointer flex items-center gap-3 px-4 py-4 text-sm text-gray-600 hover:text-green-600! hover:bg-green-200! transition-colors">
            <IoIosHeartEmpty />

            <Link href="/wishlist"> My Wishlist</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="w-full cursor-pointer flex items-center gap-3 px-4 py-4 text-sm text-gray-600 hover:text-green-600! hover:bg-green-200! transition-colors">
            <RiContactsBook3Fill />
            MyAdsresses
          </DropdownMenuItem>
          <DropdownMenuItem className="w-full cursor-pointer flex items-center gap-3 px-4 py-4 text-sm text-gray-600 hover:text-green-600! hover:bg-green-200! transition-colors">
            <PiGearSixFill />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="w-full cursor-pointer flex items-center gap-3 px-4 py-4 text-sm text-gray-600 hover:text-green-600! hover:bg-green-200! transition-colors"
            variant="destructive"
          >
            <MdLogout className="" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
