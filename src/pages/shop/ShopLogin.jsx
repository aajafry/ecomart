import Heading from "../../atoms/Heading";
import AuthQueryNavigator from "../../molecules/AuthQueryNavigator";
import LoginForm from "../../organisms/LoginForm";

function ShopLogin() {
  return (
    <main className="min-h-dvh w-[80dvw] sm:w-[60dvw] md:w-[50dvw] mx-auto flex-center flex-col">
      <div className="w-[inherit] text-center bg-white shadow-md p-8 rounded-[1.5rem] rounded-tl-[4rem] rounded-br-[4rem]">
        <Heading
          label="Login with ecomart shop"
          size="text-3xl"
          weight="font-medium"
          color="bg-amber-400"
          className="mb-6 text-center inline-flex"
        />
        <LoginForm
          postUrl={import.meta.env.VITE_SHOP}
          navigateUrl="/shop/dashboard"
        />

        <AuthQueryNavigator currentForm="login" toForm="/shop/signup" />
      </div>
    </main>
  );
}

export default ShopLogin;
