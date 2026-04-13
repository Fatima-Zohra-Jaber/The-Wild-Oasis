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
    base: "rounded-md p-1 text-stone-400 transition hover:bg-stone-100 hover:text-stone-600",
    primary:
      "rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:bg-indigo-300",
    secondary:
      "rounded-lg border border-stone-200 px-4 py-2 text-sm font-medium text-stone-800 transition hover:bg-stone-50 disabled:border-stone-300 disabled:text-stone-400 disabled:bg-stone-100",
    danger:
      "rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-[13px] font-medium text-red-600 transition hover:bg-red-100",
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
