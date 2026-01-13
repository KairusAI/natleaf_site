import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative w-14 h-7 rounded-full overflow-hidden group cursor-pointer ${className}`}
      style={{
        background: isDark
          ? "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.04) 100%)"
          : "linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.4) 100%)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: isDark
          ? "1px solid rgba(255, 255, 255, 0.15)"
          : "1px solid rgba(255, 255, 255, 0.5)",
        boxShadow: isDark
          ? "0 4px 16px 0 rgba(31, 38, 135, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)"
          : "0 4px 16px 0 rgba(31, 38, 135, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.6)",
      }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? "Mudar para tema claro" : "Mudar para tema escuro"}
      role="switch"
      aria-checked={isDark}
    >
      {/* Brilho superior */}
      <div
        className="absolute top-0 left-0 right-0 h-px z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%)",
        }}
      />

      {/* Reflexo animado */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(circle at 50% 0%, rgba(147, 197, 253, 0.2) 0%, transparent 60%)"
            : "radial-gradient(circle at 50% 0%, rgba(251, 191, 36, 0.15) 0%, transparent 60%)",
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Ícones de fundo */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5">
        <Sun className={`w-3.5 h-3.5 transition-opacity duration-300 ${isDark ? "opacity-40 text-amber-400/50" : "opacity-0"}`} />
        <Moon className={`w-3.5 h-3.5 transition-opacity duration-300 ${isDark ? "opacity-0" : "opacity-40 text-blue-300/50"}`} />
      </div>

      {/* Switch thumb com ícone */}
      <motion.div
        className="absolute top-0.5 w-6 h-6 rounded-full flex items-center justify-center"
        style={{
          background: isDark
            ? "linear-gradient(135deg, rgba(147, 197, 253, 0.9) 0%, rgba(96, 165, 250, 0.9) 100%)"
            : "linear-gradient(135deg, rgba(251, 191, 36, 0.9) 0%, rgba(245, 158, 11, 0.9) 100%)",
          boxShadow: isDark
            ? "0 2px 8px rgba(147, 197, 253, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)"
            : "0 2px 8px rgba(251, 191, 36, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
        }}
        animate={{
          x: isDark ? 30 : 2,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        <motion.div
          animate={{
            rotate: isDark ? 0 : 0,
            scale: 1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          {isDark ? (
            <Moon className="w-3.5 h-3.5 text-slate-900" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-amber-900" />
          )}
        </motion.div>
      </motion.div>
    </motion.button>
  );
}
