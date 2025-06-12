import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, Globe, TrendingUp } from "lucide-react";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter = ({ end, suffix = "", duration = 2000 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };
      requestAnimationFrame(animateCount);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
};

const StatsSection = () => {
  const stats = [
    {
      number: 50,
      suffix: "K+",
      label: "Happy Travelers",
      icon: Users,
      description: "Satisfied adventurers who trusted us with their journeys",
      color: "from-blue-500/20 to-blue-600/20"
    },
    {
      number: 100,
      suffix: "+",
      label: "Destinations",
      icon: Globe,
      description: "Unique locations across the globe waiting to be explored",
      color: "from-emerald-500/20 to-emerald-600/20"
    },
    {
      number: 4.9,
      suffix: "",
      label: "User Rating",
      icon: TrendingUp,
      description: "Average rating from thousands of verified reviews",
      color: "from-purple-500/20 to-purple-600/20"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.05)_25%,rgba(68,68,68,.05)_50%,transparent_50%,transparent_75%,rgba(68,68,68,.05)_75%)] bg-[length:20px_20px]" />

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Card */}
              <div className="h-full rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                {/* Icon Background */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                
                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <div className="mb-6 inline-block p-4 rounded-xl bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl border border-white/10">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>

                  {/* Number */}
                  <div className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                    <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                  </div>

                  {/* Label */}
                  <h3 className="text-xl font-semibold mb-3">{stat.label}</h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm">{stat.description}</p>

                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-block px-6 py-3 rounded-full bg-primary/10 backdrop-blur-xl border border-primary/20">
            <p className="text-sm font-medium text-primary">
              Trusted by travelers from over 150+ countries worldwide
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;