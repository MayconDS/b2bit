import Api from "../services/api";

import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AiOutlineLoading } from "react-icons/ai";
import { useState } from "react";
import Toast from "./Toast";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(16),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(data: LoginSchema) {
    try {
      setError("");
      setIsLoading(true);
      const response = await Api.login(data);

      if (response.status && [400, 401, 403].includes(response.status)) {
        setError(response.detail.detail);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      localStorage.setItem("tokens", JSON.stringify(response.tokens));
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-white w-[438px] h-[534px] rounded-[18px] shadow-custom flex flex-col items-center px-6 pt-12 gap-6"
      >
        <img
          className="w-[295px] h-[116px]"
          src="/logob2bit.svg"
          alt=""
          srcSet="b2bit logo"
        />

        <div className="fields w-full flex flex-col gap-4">
          <div className="field flex flex-col h-full w-full">
            {!errors.email?.message ? (
              <label
                htmlFor="email"
                className="text-primary-black text-lg font-bold h-8"
              >
                E-mail
              </label>
            ) : (
              <span className="error-email text-red-500 h-8">
                Invalid Email!
              </span>
            )}
            <input
              type="text"
              {...register("email")}
              placeholder="@gmail.com"
              id=""
              className={`h-[54px] bg-primary-gray p-4 rounded-lg outline-0 border  ${
                errors.email?.message ? "border-red-500" : "border-primary-gray"
              }`}
            />
          </div>
          <div className="field flex flex-col h-full w-full">
            {!errors.password?.message ? (
              <label
                htmlFor="password"
                className="text-primary-black text-lg font-bold h-8 "
              >
                Password
              </label>
            ) : (
              <span className="error-password text-red-500 h-8">
                Password must be between 4-16 characters!
              </span>
            )}
            <input
              type="text"
              {...register("password")}
              placeholder="*************"
              id=""
              className={`h-[54px] bg-primary-gray p-4 rounded-lg outline-0 border  ${
                errors.password?.message
                  ? "border-red-500"
                  : "border-primary-gray"
              }`}
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-primary-blue h-[54px] w-full flex items-center justify-center rounded-lg text-white font-bold mt-4 transition-all hover:brightness-150"
        >
          {isLoading == false ? (
            "Sign In"
          ) : (
            <AiOutlineLoading className="animate-spin text-2xl text-primary-yellow" />
          )}
        </button>
      </form>
      {error !== "" ? <Toast messageError={error} /> : null}
    </>
  );
}
