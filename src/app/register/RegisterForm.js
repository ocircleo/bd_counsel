"use client";
import { TfiMobile } from "react-icons/tfi";
import { TbLockPassword } from "react-icons/tb";
import { FaRegEye, FaRegEyeSlash, FaRegUser } from "react-icons/fa";

import { useContext, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Alert from "../components/alert/Alert";
import { AuthActionContext } from "../state/AuthProvider";
import fetchWithTimeOut from "../components/fetchwithtimeout/fetchWithTimeOut";
import { APP_CONFIG } from "@/config/app.config";

export const RegisterForm = () => {
  const [show, setShow] = useState(false);
  const { setUser } = useContext(AuthActionContext);
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
    let name = form.name.value;
    let phone = form.phone.value;
    let password = form.password.value;
    let news_letter = form.news.checked;
    let submitButton = form.submitButton;
    submitButton.disabled = true;
    submitButton.innerText = "Please wait...";
    loading = true;

    try {
      const res = await fetchWithTimeOut(
        `${APP_CONFIG.apiUrl}/authv2/register`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            phone,
            password,
            news_letter,
          }),
        },
        12000
      );
      const data = await res.json();
      loading = false;
      submitButton.disabled = false;
      submitButton.innerText = "Register";

      if (data.success) {
        setUser(data.data);
        redirect();
      } else {
        Alert("error", data.message);
      }
    } catch (error) {
      if (error.name === "AbortError")
        Alert("error", "Request timed out, unable to verify request");
      else Alert("error", "Operation Failed");

      loading = false;
      submitButton.disabled = false;
      submitButton.innerText = "Register";
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
            <FaRegUser className="text-xl  text-light-gray" />
          </button>
          <input
            name="name"
            type="text"
            minLength={3}
            required
            className=" join-item border-0 bg-base-300 placeholder:text-light-gray  focus:outline-0 w-full"
            placeholder="Your Name"
          />
        </fieldset>
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
              id="news"
              name="news"
              className="h-4 w-4 cursor-pointer"
            />
            <label
              htmlFor="news"
              className={`text-custom-blue select-none cursor-pointer `}
            >
              Receive news & Update
            </label>
          </div>
        </div>
        <button
          id="submitButton"
          className="btn btn-block bg-custom-blue font-semibold text-white rounded-lg"
        >
          Register
        </button>
      </form>
    </>
  );
};
