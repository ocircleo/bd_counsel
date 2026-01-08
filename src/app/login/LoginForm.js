"use client";
import { TfiMobile } from "react-icons/tfi";
import { TbLockPassword } from "react-icons/tb";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useState } from "react";
import Link from "next/link";

import Alert from "../components/alert/Alert";
import { AuthActionContext, AuthContext } from "../state/AuthProvider";
import fetchWithTimeOut from "../components/fetchwithtimeout/fetchWithTimeOut";
import { APP_CONFIG } from "@/config/app.config";

const LoginForm = () => {
  const { setUser } = useContext(AuthActionContext);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = () => {
    const redirectUrl = searchParams.get("redirect");
    router.replace(redirectUrl ?? "/");
  };
  let loading = false;
  const submitHandler = async (e) => {
    e.preventDefault();
    if (loading) return;

    let form = e.target;
    let phone = form.phone.value;
    let password = form.password.value;
    let remember = form.remember.checked;
    let submitButton = form.submitButton;
    submitButton.disabled = true;
    submitButton.innerText = "Logging in...";
    loading = true;

    try {
      const res = await fetchWithTimeOut(
        `${APP_CONFIG.apiUrl}/authv2/login`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            phone,
            password,
            remember,
          }),
        },
        12000
      );
      const data = await res.json();
      loading = false;
      submitButton.disabled = false;
      submitButton.innerText = "Login";

      if (data.success) {
        setUser(data.data);
        redirect();
      } else {
        Alert("error", data.message);
      }
    } catch (error) {
      if (error.name === "AbortError") Alert("error", "Request timed out");
      else Alert("error", error.message || "Something went wrong");

      loading = false;
      submitButton.disabled = false;
      submitButton.innerText = "Login";
    }
  };

  return (
    <>
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-4 w-full sm:w-96  mt-8"
      >
        <fieldset className="join w-full">
          <button
            role="button"
            className="btn  bg-base-300 join-item pointer-events-none"
          >
            <TfiMobile className="text-xl  text-light-gray" />
          </button>
          <input
            name="phone"
            type="text"
            required
            className=" join-item border-0 bg-base-300 placeholder:text-light-gray  focus:outline-0 w-full"
            placeholder="Phone Number (01...)"
          />
        </fieldset>
        <fieldset className="join relative">
          <button
            type="button"
            className="btn pointer-events-none  bg-base-300 join-item "
          >
            <TbLockPassword className="text-xl  text-light-gray" />
          </button>
          <input
            name="password"
            type={show ? "text" : "password"}
            minLength={6}
            required
            className="input join-item border-0 bg-base-300 placeholder:text-light-gray focus:outline-0 w-full"
            placeholder="Password"
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="btn  bg-base-300  absolute right-0 top-0 z-10 hover:border-0 "
          >
            {show ? (
              <FaRegEye className="text-xl  text-light-gray" />
            ) : (
              <FaRegEyeSlash className="text-xl  text-light-gray" />
            )}
          </button>
        </fieldset>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="h-4 w-4 cursor-pointer"
            />
            <label
              htmlFor="remember"
              className={`text-custom-blue select-none cursor-pointer `}
            >
              Remember me
            </label>
          </div>
          <Link href="/forgot-password" className="text-info">
            Forgot Password?
          </Link>
        </div>
        <button
          id="submitButton"
          className="btn btn-block bg-custom-blue font-semibold text-white rounded-lg"
        >
          Login
        </button>
      </form>
    </>
  );
};
export default LoginForm;
