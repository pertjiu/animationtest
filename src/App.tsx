import { Card, CardContent } from "@/components/ui/card";
import { motion, useMotionValue, animate } from "motion/react";
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";



export default function FinancialWrapped() {
  const x = useMotionValue(0);
  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 0;

  const screens = [
    {
      id: 0,
      title: "Welkom bij je wrapped van november 25",
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
      ]
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
    <div className="w-full overflow-hidden bg-gray-50 text-gray-800">
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
            <Card className="max-w-lg w-full rounded-2xl shadow-lg bg-white border border-gray-200">
              <CardContent className="space-y-6 text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl font-semibold"
                >
                  {screen.title}
                </motion.h1>

                {/* Normal text screen */}
                {screen.text && !screen.animation && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-base text-gray-600"
                  >
                    {screen.text}
                  </motion.p>
                )}

                {/* Animation for top revenue */}
                {screen.animation && (
                  <div className="w-full flex flex-col items-center justify-center space-y-4">
                    {screen.text.replace(' en ', ', ').split(', ').map((customer, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 10, delay: index * 0.2 }}
                        className="text-xl font-medium p-3 bg-blue-100 rounded-lg w-full"
                      >
                        {customer}
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Line chart screen */}
                {screen.graph === "line" && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
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

                {/* Pie chart screen */}
                {screen.graph === "pie" && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
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
                          fill="#3b82f6"
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

                {/* Double line chart screen */}
                {screen.graph === "double-line" && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
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
              </CardContent>
            </Card>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
