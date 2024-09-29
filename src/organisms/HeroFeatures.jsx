import FretureList from "../molecules/FretureList";

function HeroFeatures() {
  return (
    <div className="bg-gray-100 mb-14">
      <ul className="w-[90%] mx-auto flex items-center justify-between flex-wrap py-6">
        <FretureList
          icon="shippingIcon"
          title="Free Shipping"
          subtitle="On All Order Over $599"
        />

        <FretureList
          icon="returnIcon"
          title="Easy Returns"
          subtitle="30 Day Returns Policy"
        />

        <FretureList
          icon="paymentSecurityIcon"
          title="Secure Payment"
          subtitle="100% Secure Gaurantee"
        />

        <FretureList
          icon="supportIcon"
          title="Special Support"
          subtitle="24/7 Dedicated Support"
        />
      </ul>
    </div>
  );
}

export default HeroFeatures;