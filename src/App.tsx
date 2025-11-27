"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion, useMotionValue, animate } from "motion/react";
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { useState, useEffect } from "react";

export default function FinancialWrapped() {
  const x = useMotionValue(0);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const screens = [
    {
      id: 0,
      title: "Hey, [Naam],",
      subtitle: "Het is weer zo ver!",
      isWelcome: true,
    },
    {
      id: 1,
      title: "Je omzet deze maand is €12.480",
      text: "Dat is +8% vergeleken met vorige maand",
      graph: "line",
      dataKey: "omzet",
      data: [
        { name: 'Juni', omzet: 8200 },
        { name: 'Juli', omzet: 9500 },
        { name: 'Augustus', omzet: 10200 },
        { name: 'September', omzet: 11500 },
        { name: 'Oktober', omzet: 11000 },
        { name: 'November', omzet: 12480 },
      ],
    },
    {
      id: 2,
      title: "Deze drie klanten hadden de grootste omzet",
      text: "klant a, klant b en klant c",
      animation: true,
    },
    {
      id: 3,
      title: "Je kosten deze maand zijn €9.230",
      text: "Dat is -4% lager dan vorige maand.",
      graph: "line",
      dataKey: "kosten",
      data: [
        { name: 'Juni', kosten: 9500 },
        { name: 'Juli', kosten: 9800 },
        { name: 'Augustus', kosten: 10500 },
        { name: 'September', kosten: 10000 },
        { name: 'Oktober', kosten: 9600 },
        { name: 'November', kosten: 9230 },
      ],
    },
    {
      id: 4,
      title: "Je drie grootste kostenposten waren:",
      text: "Salarissen €4.200, Inkoop €2.900 en Marketing €1.100. Deze drie posten maken samen 85% van je totale kosten uit.",
      graph: "pie",
      data: [
        { name: 'Salarissen', value: 4200 },
        { name: 'Inkoop', value: 2900 },
        { name: 'Marketing', value: 1100 },
        { name: 'Overig', value: 1030 },
      ],
    },
    {
      id: 5,
      title: "De maand krijg/moet je zoveel euro belasting terug/betalen.",
    },
    {
      id: 6,
      title: "Deze maand laat je financiële positie twee belangrijke signalen zien:",
      text: "je cash runway neemt af/toe en het aantal days of cash on hand daalt/stijgt. Beide cijfers geven inzicht in hoe lang je bedrijf kan blijven draaien met de huidige cashsitie en uitgaven.",
      graph: "double-line",
      data: [
        { name: 'Juni', runway: 12, days: 30 },
        { name: 'Juli', runway: 11, days: 28 },
        { name: 'Augustus', runway: 10, days: 25 },
        { name: 'September', runway: 11, days: 28 },
        { name: 'Oktober', runway: 10, days: 26 },
        { name: 'November', runway: 9, days: 24 },
      ],
    },
    {
      id: 7,
      title: "Samenvatting van de maand",
      text: "Deze maand was een succesvolle maand met een omzetgroei van 8% en een kostenverlaging van 4%. Je winst is hierdoor gestegen. De cashpositie is stabiel, maar de cash runway verdient aandacht."
    },
    {
      id: 8,
      title: "Wat kan je nu doen?",
      text: "Focus op het verhogen van de cash runway. Analyseer de grootste kostenposten en kijk waar je kunt besparen. Overweeg een gesprek met een financieel adviseur om de mogelijkheden te bespreken."
    },
  ];

  const COLORS = ["#3b82f6", "#93c5fd", "#60a5fa", "#1d4ed8"];

  function handleSnap(_: any, info: any) {
    const offset = info.offset.x;
    const current = x.get();
    const rawIndex = Math.round((current + offset) / -screenWidth);
    const clampedIndex = Math.max(0, Math.min(screens.length - 1, rawIndex));

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
        {screens.map((screen) => (
          <div
            key={screen.id}
            className="w-screen h-screen flex items-center justify-center p-10"
          >
            <Card className="max-w-lg w-full rounded-2xl shadow-lg bg-white border-gray-200">
              <CardContent className="space-y-6 text-center">
                {screen.isWelcome ? (
                  <div className="flex flex-col items-center justify-center space-y-8 text-slate-800">
                    <div className="text-left self-start">
                      <h1 className="text-4xl font-bold">{screen.title}</h1>
                      <p className="text-3xl">{screen.subtitle}</p>
                    </div>

                    <div className="relative w-48 h-48 flex flex-col items-center justify-center border-2 border-blue-200 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <h2 className="text-2xl font-bold">November 2025</h2>
                      <p className="text-sm">Dit was jouw maand</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                        </svg>
                      </div>
                      <span className="text-2xl font-bold">PocketCFO</span>
                    </div>
                    <span className="bg-slate-800 text-white text-sm font-semibold px-4 py-2 rounded-full">Wrapped</span>
                  </div>
                ) : (
                  <>
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="text-4xl font-semibold"
                    >
                      {screen.title}
                    </motion.h1>

                    {screen.text && !screen.animation && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-base text-gray-600"
                      >
                        {screen.text}
                      </motion.p>
                    )}

                    {screen.animation && (
                      <div className="w-full flex flex-col items-center justify-center space-y-4">
                        {screen.text.replace(' en ', ', ').split(', ').map((customer, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 100, damping: 10, delay: index * 0.2 }}
                            className="text-xl font-medium p-3 bg-blue-100 rounded-lg w-full"
                          >
                            {customer}
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {screen.graph === "line" && screen.data && screen.dataKey && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 120, damping: 12 }}
                        className="w-full h-64 flex items-center justify-center"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={screen.data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey={screen.dataKey} stroke="#3b82f6" activeDot={{ r: 8 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </motion.div>
                    )}

                    {screen.graph === "pie" && screen.data && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 120, damping: 12 }}
                        className="w-full h-64 flex items-center justify-center"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Tooltip />
                            <Pie
                              data={screen.data}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              label
                            >
                              {screen.data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </motion.div>
                    )}

                    {screen.graph === "double-line" && screen.data && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 120, damping: 12 }}
                        className="w-full h-64 flex items-center justify-center"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={screen.data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="runway" stroke="#3b82f6" name="Cash Runway" />
                            <Line type="monotone" dataKey="days" stroke="#93c5fd" name="Days of Cash" />
                          </LineChart>
                        </ResponsiveContainer>
                      </motion.div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
