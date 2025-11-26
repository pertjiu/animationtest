import { Card, CardContent } from "@/components/ui/card"; 
import { motion, useMotionValue, animate } from "motion/react"; 
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"; 
 
 
 
export default function FinancialWrapped() { 
  const x = useMotionValue(0); 
  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 0; 
 
  const screens = [ 
    { 
      id: 0, 
      title: "Your Monthly Business Wrap", 
      text: 
        "Here’s a simple overview of how your business did this month. No complex terms — just the basics you need.", 
    }, 
    { 
      id: 1, 
      title: "Your Income", 
      text: 
        "You earned a total of $12,400 this month. Most of this came from returning customers — great job keeping them happy!", 
    }, 
    { 
      id: 2, 
      title: "Your Expenses", 
      text: 
        "You spent $7,200. Your biggest costs were materials and delivery. Everything stayed within your normal budget.", 
    }, 
    { 
      id: 3, 
      title: "Your Profit", 
      text: 
        "After subtracting expenses from income, you made a profit of $5,200. This means your business is growing well.", 
    }, 
    { 
      id: 4, 
      title: "Your Cash Flow", 
      text: 
        "Money coming in was higher than money going out. This is a strong sign your business is financially healthy.", 
    }, 
    { 
      id: 5, 
      title: "Next Steps", 
      text: 
        "Keep expenses steady and increase customer outreach — next month can be even better.", 
    }, 
    { 
      id: 6, 
      title: "Income vs Expenses", 
      graph: true, 
      text: "A quick overview of how your money moved this month.", 
    }, 
  ]; 
 
  const data = [ 
    { name: "Income", value: 12400 }, 
    { name: "Expenses", value: 7200 }, 
  ]; 
 
  const COLORS = ["#3b82f6", "#93c5fd"]; 
 
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
            <Card className="max-w-lg w-full p-8 rounded-2xl shadow-lg bg-white border border-gray-200">
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
                {!screen.graph && ( 
                  <motion.p 
                    initial={{ opacity: 0 }} 
                    whileInView={{ opacity: 1 }} 
                    transition={{ duration: 0.8 }} 
                    className="text-base text-gray-600" 
                  > 
                    {screen.text} 
                  </motion.p> 
                )} 
 
                {/* Graph slide */} 
                {screen.graph && ( 
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
                          data={data}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#3b82f6"
                          label
                        >
                          {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                    </PieChart> 
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