interface ButtonProps {
  variant?: "primary" | "secondary" | "base" | "danger";
  type?: "button" | "submit" | "reset";
  className?: string;
  isSubmitting?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

function Button({
  variant = "primary",
  type = "button",
  className = "",
  isSubmitting,
  onClick,
  children,
}: ButtonProps) {
  const variantStyles = {
    base: "rounded-md p-1 text-stone-400 transition hover:bg-stone-100 hover:text-stone-600 dark:text-slate-500 dark:hover:bg-slate-700 dark:hover:text-slate-300",
    primary:
      "rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:bg-indigo-300 dark:bg-indigo-700 dark:hover:bg-indigo-600 dark:disabled:bg-indigo-900",
    secondary:
      "rounded-lg border border-stone-200 px-4 py-2 text-sm font-medium text-stone-800 transition hover:bg-stone-50 disabled:border-stone-300 disabled:text-stone-400 disabled:bg-stone-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700 dark:disabled:border-slate-700 dark:disabled:text-slate-500 dark:disabled:bg-slate-800",
    danger:
      "rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-[13px] font-medium text-red-600 transition hover:bg-red-100 dark:border-red-900 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50",
  };
  return (
    <button
      type={type}
      className={`${variantStyles[variant]} ${className}`}
      onClick={onClick}
      disabled={isSubmitting}
    >
      {children}
    </button>
  );
}

export default Button;
