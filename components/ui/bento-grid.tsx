import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  href,
  accentColor = "blue",
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  accentColor?: string;
}) => {
  const glowMap: Record<string, string> = {
    blue:   "group-hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]  group-hover:border-blue-500/40",
    orange: "group-hover:shadow-[0_0_40px_rgba(249,115,22,0.25)]  group-hover:border-orange-500/40",
    green:  "group-hover:shadow-[0_0_40px_rgba(34,197,94,0.25)]   group-hover:border-green-500/40",
    purple: "group-hover:shadow-[0_0_40px_rgba(168,85,247,0.25)]  group-hover:border-purple-500/40",
    cyan:   "group-hover:shadow-[0_0_40px_rgba(6,182,212,0.25)]   group-hover:border-cyan-500/40",
  };
  const glow = glowMap[accentColor] ?? glowMap.blue;

  return (
    <div
      className={cn(
        "row-span-1 rounded-3xl group cursor-pointer transition-all duration-300",
        "p-6 flex flex-col gap-4",
        "bg-white/5 border border-white/8 backdrop-blur-sm",
        "hover:bg-white/8 hover:-translate-y-1",
        glow,
        className
      )}
    >
      {/* Icon card visual */}
      <div className="flex-1 rounded-2xl overflow-hidden">
        {header}
      </div>

      {/* Text content */}
      <div className="flex flex-col gap-2 group-hover:translate-x-1 transition-transform duration-300">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-white/10">{icon}</div>
          <h3 className="font-heading font-bold text-white text-lg leading-snug">
            {title}
          </h3>
        </div>
        <p className="font-sans font-normal text-white/55 text-sm leading-relaxed pl-0.5">
          {description}
        </p>
        <div className="flex items-center gap-1.5 mt-1 text-[11px] font-bold text-white/30 group-hover:text-white/60 transition-colors uppercase tracking-wider">
          Selengkapnya <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
