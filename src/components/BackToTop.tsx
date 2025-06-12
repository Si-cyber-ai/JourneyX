import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled more than 300px
      const shouldBeVisible = window.scrollY > 300;
      setIsVisible(shouldBeVisible);
    };

    // Initial check
    toggleVisibility();

    // Add scroll event listener
    window.addEventListener("scroll", toggleVisibility);

    // Clean up
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn(
            "fixed bottom-8 left-8 z-[100]",
            "flex items-center justify-center",
            "rounded-full bg-primary shadow-lg",
            "transition-all duration-300 ease-in-out",
            "hover:bg-primary/90",
            isHovered ? "w-[140px] pr-6" : "w-12",
            "h-12"
          )}
        >
          <motion.div
            animate={{
              x: isHovered ? 12 : 0,
              y: isHovered ? 0 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <motion.div
              animate={{
                y: isHovered ? -2 : 0,
                rotate: isHovered ? -10 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUp className="h-5 w-5 text-primary-foreground" />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                width: isHovered ? "auto" : 0,
              }}
              transition={{ duration: 0.3 }}
              className="ml-2 text-sm font-medium text-primary-foreground whitespace-nowrap overflow-hidden"
            >
              Back to Top
            </motion.span>
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
