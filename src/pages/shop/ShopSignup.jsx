import Heading from "../../atoms/Heading";
import AuthQueryNavigator from "../../molecules/AuthQueryNavigator";
import ShopRegisterForm from "../../organisms/ShopRegisterForm";

function ShopSignup() {
  return (
    <main className="min-h-dvh w-[80dvw] sm:w-[70dvw] md:w-[60dvw] my-8 mx-auto flex-center flex-col">
      <div className="w-[inherit] text-center bg-white shadow-md p-8 rounded-[1.5rem] rounded-tl-[4rem] rounded-br-[4rem]">
        <Heading
          label="Register with ecomart shop"
          size="text-3xl"
          weight="font-medium"
          color="bg-amber-400"
          className="mb-6 text-center inline-flex"
        />

        <ShopRegisterForm />

        <AuthQueryNavigator currentForm="signup" toForm="/shop/login" />
      </div>
    </main>
  );
}

export default ShopSignup;
