import { useForm, useWatch } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import { useSignup } from "../hooks/useAuth";
import { useEffect } from "react";

interface User {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function Users() {
  const { signup, isLoading } = useSignup();
  const {
    register,
    handleSubmit,
    control,
    trigger,
    // getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const password = useWatch({ name: "password", control });

  useEffect(() => {
    trigger("confirmPassword");
  }, [password, trigger]);

  const onSubmit = (data: User) => {
    signup(
      {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      },
      { onSuccess: () => reset() },
    );
  };

  return (
    <>
      <h1 className="mb-6 text-2xl font-medium text-stone-800 dark:text-slate-50">
        Create a new user
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl rounded-lg bg-white p-6 dark:bg-slate-800"
      >
        <Input
          label="Full name"
          type="text"
          placeholder="e.g. John Doe"
          {...register("fullName", { required: "This field is required" })}
          error={errors.fullName?.message}
          disabled={isLoading}
        />
        <Input
          label="Email"
          type="text"
          placeholder="e.g. john@example.com"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/i,
              message: "Invalid email address",
            },
          })}
          error={errors.email?.message}
          disabled={isLoading}
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          error={errors.password?.message}
        />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          {...register("confirmPassword", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            validate: (value) =>
              // value === getValues("password") || "Passwords do not match",
              value === password || "Passwords do not match",
          })}
          error={errors.confirmPassword?.message}
          disabled={isLoading}
        />
        <div className="flex items-center justify-end gap-3">
          <Button
            variant="secondary"
            type="reset"
            onClick={() => {}}
            isSubmitting={isLoading}
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit" isSubmitting={isLoading}>
            Create User
          </Button>
        </div>
      </form>
    </>
  );
}

export default Users;
