"use client";

import { motion } from "framer-motion";

interface CircularProgressBarProps {
  isActive: boolean;
}

export function CircularProgressBar({ isActive }: CircularProgressBarProps) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  const draw = {
    hidden: { strokeDashoffset: circumference },
    visible: {
      strokeDashoffset: 0,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative w-48 h-48">
      <motion.svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          className="stroke-blue-200"
          strokeWidth="5"
          fill="none"
        />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          className="stroke-blue-500"
          strokeWidth="5"
          fill="none"
          strokeDasharray={circumference}
          variants={draw}
          style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
        />
      </motion.svg>
    </div>
  );
}
