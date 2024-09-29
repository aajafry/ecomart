/* eslint-disable react/no-unescaped-entities */
// import { FaGoogle } from "react-icons/fa";
import Heading from "../../atoms/Heading";
import AuthQueryNavigator from "../../molecules/AuthQueryNavigator";
import LoginForm from "../../organisms/LoginForm";

function UserLogin() {
  return (
    <main className="min-h-dvh w-[80dvw] sm:w-[60dvw] md:w-[50dvw] mx-auto flex-center flex-col">
      <div className="w-[inherit] text-center bg-white shadow-md p-8 rounded-[1.5rem] rounded-tl-[4rem] rounded-br-[4rem]">
        <Heading
          label="Login with ecomart"
          size="text-3xl"
          weight="font-medium"
          color="bg-amber-400"
          className="mb-6 text-center inline-flex"
        />

        <LoginForm postUrl={import.meta.env.VITE_CUSTOMER} navigateUrl="/" />
        <AuthQueryNavigator currentForm="login" toForm="/user/signup" />

        {/* <div className="w-full flex items-center gap-2 my-6">
          <span className="flex-1 border-b border-amber-400"></span>
          <p className="uppercase font-medium p-2 border-[1px] border-amber-400 rounded-full shadow-md">
            or
          </p>
          <span className="flex-1 border-b border-amber-400"></span>
        </div> */}

        {/* <div className="w-full">
          <Link
            to=""
            className="flex-center gap-2 py-2 px-3 uppercase font-medium rounded-lg bg-transparent border-[1px] border-gray-400 hover:border-amber-500 hover:shadow-md focus:shadow-md hover:bg-amber-500 hover:active:bg-amber-500 transition-all duration-200 ease-linear"
          >
            <FaGoogle size="18" />
            <p className="">Continune with Google</p>
          </Link>
        </div> */}
      </div>
    </main>
  );
}

export default UserLogin;
