"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion, useMotionValue, animate } from "motion/react";
import {
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  LabelList,
} from "recharts";
import { useState, useEffect, useRef } from "react";
import { CountUp } from "@/components/ui/count-up";
import { CircularProgressBar } from "@/components/ui/circular-progress-bar";

interface ScreenType {
  id: number;
  title: string;
  subtitle: string;
  isWelcome?: boolean;
  graph?: 'circle' | 'line' | 'bar' | 'horizontal-bar' | 'double-line';
  value?: number;
  dataKey?: string;
  dataKey2?: string;
  data?: any[];
  icon?: string;
  prefix?: string;
  invertPerformanceColors?: boolean;
  screenType?: 'summary' | 'nextSteps';
}

export default function FinancialWrapped() {
  const x = useMotionValue(0);
  const [screenWidth, setScreenWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const screens: ScreenType[] = [
    {
      id: 0,
      title: "Hey, [Naam],",
      subtitle: "Het is weer zo ver!",
      isWelcome: true,
    },
    {
      id: 1,
      title: "Jouw netto winst",
      subtitle: "Dit is jouw nette winst deze maand.",
      graph: "circle",
      value: 3250,
    },
    {
      id: 2,
      title: "Jouw totale kosten",
      subtitle: "",
      graph: "line",
      dataKey: "kosten",
      data: [
        { name: "Oktober", kosten: 9600 },
        { name: "November", kosten: 9230 },
      ],
      invertPerformanceColors: true,
    },
    {
      id: 3,
      title: "Jouw omzet toppers",
      subtitle: "Dit zijn jouw drie grootste partners deze maand",
      graph: "bar",
      data: [
        { name: "Partner A", omzet: 4500, rank: 2 },
        { name: "Partner B", omzet: 6200, rank: 1 },
        { name: "Partner C", omzet: 3800, rank: 3 },
      ],
    },
    {
      id: 4,
      title: "Jouw grootste partnerkosten",
      subtitle: "Dit is een overzicht van jouw drie duurste partners deze maand.",
      graph: "horizontal-bar",
      data: [
        { name: "Partner X", value: 2100 },
        { name: "Partner Y", value: 1800 },
        { name: "Partner Z", value: 1500 },
      ],
    },
    {
      id: 5,
      title: "Jouw cashbuffer deze maand",
      subtitle: "",
      graph: "double-line",
      data: [
        { name: "Oktober", runway: 10, days: 26 },
        { name: "November", runway: 9, days: 24 },
      ],
      dataKey: "runway",
      dataKey2: "days",
    },
    {
      id: 6,
      title: "Jouw belasting deze maand",
      subtitle: "Zoveel belasting krijg jij/ moet je betalen",
      graph: "circle",
      value: 5759,
      icon: "money-bag",
      prefix: "+€",
    },
    {
      id: 7,
      title: "Jouw samenvatting",
      subtitle: "Een overzicht van jouw financiele maand.",
      screenType: "summary",
    },
    {
      id: 8,
      title: "Wat nu?",
      subtitle: "Volgende stappen en aanbevelingen.",
      screenType: "nextSteps",
    },
  ];

  const COLORS = ["#3b82f6", "#93c5fd", "#60a5fa", "#1d4ed8"];

  function handleSnap(_: any, info: any) {
    const offset = info.offset.x;
    const current = x.get();
    const rawIndex = Math.round((current + offset) / -screenWidth);
    const clampedIndex = Math.max(0, Math.min(screens.length - 1, rawIndex));
    setCurrentIndex(clampedIndex);

    animate(x, -clampedIndex * screenWidth, {
      type: "spring",
      stiffness: 180,
      damping: 28,
    });
  }

  return (
    <div className="w-full overflow-hidden bg-slate-900 text-gray-800">
      <motion.div
        className="flex h-screen"
        style={{ width: `${screens.length * 100}vw`, x }}
        drag="x"
        dragConstraints={{
          left: -screenWidth * (screens.length - 1),
          right: 0,
        }}
        dragElastic={0.15}
        onDragEnd={handleSnap}
      >
        {screens.map((screen, index) => (
          <Screen
            key={screen.id}
            screen={screen}
            isActive={index === currentIndex}
          />
        ))}
      </motion.div>
    </div>
  );
}

function DynamicSubtitle({ screen }: { screen: ScreenType }) {
  const { data, dataKey } = screen;
  if (!data || data.length < 2 || !dataKey) return null;

  const previousValue = data[0][dataKey];
  const currentValue = data[1][dataKey];

  const percentageChange = ((currentValue - previousValue) / previousValue) * 100;
  const isPositive = percentageChange > 0;

  let color: string;
  let changeText: string;
  let performanceMessage: string;

  if (screen.invertPerformanceColors) {
    // Higher value is worse (e.g., costs)
    color = isPositive ? "text-red-500" : "text-green-500";
    changeText = isPositive
      ? `${Math.round(percentageChange)}% meer kosten`
      : `${Math.round(Math.abs(percentageChange))}% minder kosten`;
    performanceMessage = isPositive
      ? "probeer je kosten te verlagen."
      : "goed bezig met het verlagen van je kosten!";
  } else {
    // Higher value is better (e.g., profit)
    color = isPositive ? "text-green-500" : "text-red-500";
    changeText = isPositive
      ? `${Math.round(percentageChange)}% winst`
      : `${Math.round(Math.abs(percentageChange))}% verlies`;
    performanceMessage = isPositive
      ? "dat is een mooie vooruitgang!"
      : "kijk goed uit dat je niet meer verliest.";
  }

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="text-base text-gray-600"
    >
      Je hebt <span className={color}>{changeText}</span> gedraaid,{" "}
      {performanceMessage}
    </motion.p>
  );
}


function Screen({ screen, isActive }: { screen: ScreenType; isActive: boolean }) {
  const ref = useRef(null);

  const maxValue = screen.data && screen.graph === 'horizontal-bar'
    ? Math.max(...screen.data.map((item: any) => item.value))
    : 0;

  return (
    <div
      ref={ref}
      className="w-screen h-screen flex items-center justify-center p-10"
    >
      <Card className="max-w-lg w-full rounded-2xl shadow-lg bg-white border-gray-200">
        <CardContent className="space-y-6 text-center p-6">
          {screen.isWelcome ? (
            <div className="flex flex-col items-center justify-center space-y-8 text-slate-800">
              <div className="text-left self-start">
                <h1 className="text-4xl font-bold">{screen.title}</h1>
                <p className="text-3xl">{screen.subtitle}</p>
              </div>

              <div className="relative w-48 h-48 flex flex-col items-center justify-center border-2 border-blue-200 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-blue-500 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <h2 className="text-2xl font-bold">November 2025</h2>
                <p className="text-sm">Dit was jouw maand</p>
              </div>

              <div className="flex items-center space-x-2">
                <img src="/logo.svg" className="w-10 h-10" />
                <span className="text-2xl font-bold">PocketCFO</span>
              </div>
              <span className="bg-slate-800 text-white text-sm font-semibold px-4 py-2 rounded-full">
                Wrapped
              </span>
            </div>
          ) : (
            <>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-semibold"
              >
                {screen.title}
              </motion.h1>

              {(screen.id === 2 || screen.id === 5) ? (
                <DynamicSubtitle screen={screen} />
              ) : (
                screen.subtitle && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-base text-gray-600"
                  >
                    {screen.subtitle}
                  </motion.p>
                )
              )}

              {/* {screen.screenType === "summary" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
                    <span className="font-medium">Netto Winst</span>
                    <span className="font-bold">€{screens.find(s => s.id === 1)?.value}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
                    <span className="font-medium">Totale Kosten</span>
                    <span className="font-bold">€{screens.find(s => s.id === 2)?.data?.[1].kosten}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
                    <span className="font-medium">Top Partner</span>
                    <span className="font-bold">{screens.find(s => s.id === 3)?.data?.reduce((prev, current) => (prev.omzet > current.omzet) ? prev : current).name}</span>
                  </div>
                  <button className="w-full bg-slate-800 text-white font-semibold py-2 px-4 rounded-full mt-4">
                    Deel
                  </button>
                </div>
              )} */}

              {screen.screenType === "nextSteps" && (
                <div className="space-y-4">
                  <a
                    href="https://pocketcfo.io/nl/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block bg-blue-500 text-white font-semibold py-2 px-4 rounded-full mt-4"
                  >
                    Bezoek PocketCFO
                  </a>
                  <p className="text-gray-600">
                    Neem contact op met je partner voor meer informatie en advies.
                  </p>
                </div>
              )}

              {screen.graph === "circle" && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: isActive ? 1 : 0.8,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 12 }}
                  className="w-full h-64 flex items-center justify-center"
                >
                  <div className="relative w-48 h-48 flex flex-col items-center justify-center">
                    <CircularProgressBar isActive={isActive} />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isActive ? 1 : 0 }}
                      transition={{ delay: 1.5, duration: 0.5 }}
                      className="absolute"
                    >
                      <h2 className="text-3xl font-bold">
                        <CountUp
                          value={screen.value || 0}
                          formatter={(v) => `${screen.value || "€"}${Math.round(v)}`}
                          isActive={isActive}
                          delay={1.5}
                        />
                      </h2>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {screen.graph === "line" &&
                screen.data &&
                screen.dataKey && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: isActive ? 1 : 0.8,
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 120,
                      damping: 12,
                    }}
                    className="w-full h-64 flex items-center justify-center"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={screen.data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey={screen.dataKey}
                          stroke="#3b82f6"
                          activeDot={{ r: 8 }}
                          animationDuration={1000}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}

              {screen.graph === "bar" && screen.data && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: isActive ? 1 : 0.8,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 12 }}
                  className="w-full h-64 flex items-center justify-center"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={screen.data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="omzet"
                        fill="#3b82f6"
                        animationDuration={1000}
                      >
                        <LabelList dataKey="rank" position="top" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>
              )}


                {screen.graph === "horizontal-bar" && screen.data && (
                  <div className="w-full flex flex-col items-center justify-center space-y-4">
                    {screen.data.map((item: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -50 }}
                        transition={{ type: "spring", stiffness: 100, damping: 10, delay: index * 0.2 }}
                        className="w-full"
                      >
                        <div className="flex items-center justify-between bg-blue-100 rounded-lg p-3">
                          <span className="font-medium">{item.name}</span>
                          <span className="font-bold">
                            <CountUp value={item.value} isActive={isActive} />
                          </span>
                        </div>
                        <div className="h-2 bg-blue-200 rounded-full mt-1">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: isActive ? `${(item.value / maxValue) * 100}%` : "0%",
                            }}
                            transition={{ type: "spring", stiffness: 100, damping: 10, delay: index * 0.2 }}
                            className="h-full bg-blue-500 rounded-full"
                          ></motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

              {screen.graph === "double-line" &&
                screen.data &&
                screen.dataKey &&
                screen.dataKey2 && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: isActive ? 1 : 0.8,
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 120,
                      damping: 12,
                    }}
                    className="w-full h-64 flex items-center justify-center"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={screen.data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey={screen.dataKey}
                          stroke="#3b82f6"
                          name="Cash Runway"
                          animationDuration={1000}
                        />
                        <Line
                          type="monotone"
                          dataKey={screen.dataKey2}
                          stroke="#93c5fd"
                          name="Days of Cash"
                          animationDuration={1000}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
