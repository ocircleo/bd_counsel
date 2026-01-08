import Link from "next/link";
import LoginForm from "./LoginForm";
import Image from "next/image";
export const metadata = {
  title: "Login",
  description:
    "Login in to Bangladesh Counsel with your Email to unlock all the features",
};
const Login = () => {
  return (
    <div className="grid grid-cols-2 min-h-screen overflow-y-hidden">
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
          <h1 className="text-4xl font-bold pt-8">Log in to your Account</h1>
          <p className="text-sm pt-2">Welcome back! Select method to login</p>
          <LoginForm />
          <div className="text-center py-8">
            <Link href="/register">
              <span className="text-primary">Don&apos;t have an account?</span>{" "}
              <span className="text-info">Create an account</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1 col-span-2 hidden lg:block h-full">
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

export default Login;
