import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const VARIANTS = {
  primary: "bg-gradient-to-r from-rose-600 to-rose-400 text-white shadow-[var(--shadow-glow-rose)]",
  gold: "bg-gradient-to-r from-gold-500 to-gold-400 text-charcoal-900 shadow-[var(--shadow-glow-gold)]",
  outline: "glass text-charcoal-800 border border-rose-200",
  dark: "bg-charcoal-900 text-cream-50",
};

const SIZES = {
  sm: "px-5 py-2 text-xs",
  md: "px-7 py-3 text-sm",
  lg: "px-9 py-4 text-base",
};

function Button({
  children,
  to,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...rest
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300 ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.04, y: -2 },
    whileTap: { scale: 0.97 },
    transition: { type: "spring", stiffness: 300, damping: 20 },
  };

  if (to) {
    return (
      <Link to={to} className="inline-block">
        <motion.span className={classes} {...motionProps}>
          {children}
        </motion.span>
      </Link>
    );
  }

  if (href) {
    return (
      <motion.a href={href} className={classes} {...motionProps} {...rest}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} className={classes} {...motionProps} {...rest}>
      {children}
    </motion.button>
  );
}

export default Button;