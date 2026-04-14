import { useState } from "react";
import logo from "../assets/logo-light.png";
import { useLogin } from "../hooks/useAuth";
import Button from "../components/Button";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      },
    );
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-[#f0f2f5] px-4 py-8 font-sans dark:bg-slate-900">
      <div className="mb-8 flex flex-col items-center gap-2">
        <img src={logo} alt="The Wild Oasis" className="w-28" />
      </div>

      <h1 className="mb-6 text-center text-[22px] font-medium text-gray-800 dark:text-slate-100">
        Log in to your account
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-120 rounded-xl border border-gray-200 bg-white px-10 py-8 dark:border-slate-700 dark:bg-slate-800"
      >
        <div className="mb-5">
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-slate-300">
            Email address
          </label>
          <input
            type="email"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-[15px] outline-none focus:ring-2 focus:ring-indigo-400 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:ring-indigo-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="mb-6">
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-slate-300">
            Password
          </label>
          <input
            type="password"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-[15px] outline-none focus:ring-2 focus:ring-indigo-400 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:ring-indigo-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <Button
          variant="primary"
          type="submit"
          className="w-full"
          isSubmitting={isLoading}
        >
          {isLoading ? "Logging in..." : "Log in"}
        </Button>
      </form>
    </div>
  );
}
export default Login;
