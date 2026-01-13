import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface LiquidGlassProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  blur?: number;
  opacity?: number;
  borderOpacity?: number;
  glowColor?: string;
}

export function LiquidGlass({
  children,
  className = "",
  blur = 24,
  opacity = 0.08,
  borderOpacity = 0.18,
  glowColor = "59, 130, 246",
  ...props
}: LiquidGlassProps) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(135deg, rgba(255, 255, 255, ${opacity}) 0%, rgba(255, 255, 255, ${opacity * 0.4}) 100%)`,
        backdropFilter: `blur(${blur}px) saturate(180%)`,
        WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
        border: `1px solid rgba(255, 255, 255, ${borderOpacity})`,
        boxShadow: `
          0 8px 32px 0 rgba(31, 38, 135, 0.2),
          inset 0 1px 0 0 rgba(255, 255, 255, 0.25),
          inset 0 -1px 0 0 rgba(255, 255, 255, 0.08)
        `,
      }}
      {...props}
    >
      {/* Efeito de brilho superior */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)",
        }}
      />

      {/* Reflexo líquido estático (removida animação infinita para performance) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, rgba(${glowColor}, 0.1) 0%, transparent 60%)`,
        }}
      />

      {/* Conteúdo */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
