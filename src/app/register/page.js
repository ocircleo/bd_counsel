import Image from "next/image";
import Link from "next/link";
import { RegisterForm } from "./RegisterForm";
export const metadata = {
  title: "Register",
  description:
    "Register in Bangladesh Counsel with your Email to unlock all the features",
};
const Register = () => {
  return (
    <div className="grid grid-cols-2 min-h-screen overflow-y-hidden">
      <>
        <div className="flex h-full w-full items-center justify-center bg-base-100 col-span-2 lg:col-span-1 px-4 sm:px-0">
          <div>
            <Link href={"/"}>
              <Image
                width={250}
                height={200}
                src={"/images/logos/logo.png"}
                alt=""
                className="h-16 rounded"
              />
            </Link>
            <h1 className="text-4xl font-bold pt-8">Register</h1>
            <div className="w-full lg:w-96">
              <p className="text-sm pt-2">
                Welcome! To get started, simply fill out the information below
                to create your account.
              </p>
            </div>
            <RegisterForm />
            <div className="pt-4">
              <Link href="/login">
                <span className=" text-sm">Already have an account?</span>{" "}
                <span className="text-info font-semibold">Login</span>
              </Link>
            </div>
          </div>
        </div>
      </>
      <div className="lg:col-span-1 col-span-2 hidden lg:block">
        <Image
          height={500}
          width={500}
          quality={50}
          src="https://images.unsplash.com/photo-1529539795054-3c162aab037a"
          alt="Login image "
          className="w-full h-full object-cover bg-base-200"
        />
      </div>
    </div>
  );
};

export default Register;
