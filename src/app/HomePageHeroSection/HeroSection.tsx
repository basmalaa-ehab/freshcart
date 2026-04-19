"use client";

import { motion } from "framer-motion";
import { FaTruck } from "react-icons/fa";
import { FaShieldHalved } from "react-icons/fa6";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { MdHeadsetMic } from "react-icons/md";

const heroItems = [
  {
    icon: FaTruck,
    iconBg: "#FEF2F2",
    iconColor: "#2B7FFF",
    title: "Free Delivery",
    description: "On orders over 500 EGP",
  },
  {
    icon: FaShieldHalved,
    iconBg: "#ECFDF5",
    iconColor: "#16A34A",
    title: "Secure Payment",
    description: "100% secure transactions",
  },
  {
    icon: FaArrowRotateLeft,
    iconBg: "#FFF7ED",
    iconColor: "#F97316",
    title: "Easy Returns",
    description: "14-day return policy",
  },
  {
    icon: MdHeadsetMic,
    iconBg: "#F9FAFB",
    iconColor: "#AD46FF",
    title: "24/7 Support",
    description: "Dedicated support team",
  },
];

export default function HeroSection() {
  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-4 gap-4">
      {heroItems.map(({ icon: Icon, iconBg, iconColor, title, description }, index) => (
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: index * 0.1 }}
          className="relative z-10 flex items-center gap-3 bg-white py-5.5 rounded-[12px] px-4 shadow-sm hover:shadow-md transition-shadow duration-300 will-change-transform transform-gpu"
        >
          <div
            className="h-10 w-10 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: iconBg, color: iconColor }}
          >
            <Icon />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">{title}</h4>
            <p className="text-xs/[16px] font-medium text-[#6A7282]">{description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}




