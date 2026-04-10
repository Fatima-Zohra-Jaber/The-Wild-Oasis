import type { TextareaHTMLAttributes, InputHTMLAttributes } from "react";

type BaseProps = {
  label: string;
  error?: string;
};

type InputProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & {
    type?: Exclude<string, "textarea">;
  };

type TextareaProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    type: "textarea";
    rows?: number;
  };
type Props = InputProps | TextareaProps;

function Input({ label, error, type = "text", ...props }: Props) {
  const isTextarea = type === "textarea";
  const baseClass = `w-full rounded-lg border bg-white px-3 py-2 text-sm text-stone-900
     transition placeholder:text-stone-300 focus:outline-none
      focus:ring-2 ${
        error
          ? "border-red-300 focus:border-red-400 focus:ring-red-100"
          : "border-stone-200 focus:border-indigo-400 focus:ring-indigo-100"
      }`;

  return (
    <div className="grid grid-cols-[1fr_2fr] items-center gap-4 px-6 py-2">
      <label className="text-sm font-medium text-stone-800">
        {label}
        {props.required && <span className="font-bold text-red-600"> *</span>}
      </label>
      {isTextarea ? (
        <textarea
          rows={(props as TextareaProps).rows ?? 3}
          placeholder={props.placeholder}
          className={`${baseClass} resize-none`}
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          type={type}
          placeholder={props.placeholder}
          className={baseClass}
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && (
        <p className="flex items-start gap-1 text-xs text-red-500">
   
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;
