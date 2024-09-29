import { Link } from "react-router-dom";
import HappyShoppingGirl from "../assets/happy-jumping-woman-with-bag.png";
import Button from "../atoms/Button";
import Heading from "../atoms/Heading";


function HeroBanner() {
  return (
    <div className="w-full h-[calc(100dvh-73.33px)] bg-gradient-to-br from-amber-200 via-amber-300 to-amber-400 flex justify-center">
      <div className="w-full h-full mx-auto relative overflow-hidden bg-[url('/banner_circle_scatter.svg')] bg-cover">
        <div className="pl-[5%] w-[80%] md:w-[60%] h-full flex flex-col items-start justify-center gap-4 relative z-10">
          <Heading
            label="Discover Endless Choices in One Marketplace"
            size="text-3xl"
            weight="font-thin"
            className="tracking-wider uppercase"
          />
          <Heading
            label="Bringing together your favorite brands and unique finds—shop the
            world, all in one place!"
            size="text-base"
            className="tracking-wide capitalize"
          />

          <Link to="/">
            <Button
              type="button"
              label="Shop Now"
              size="medium"
              variant="Primary"
              className="w-full !rounded-none"
            />
          </Link>
        </div>
        <img
          src={HappyShoppingGirl}
          alt="HappyShoppingGirl"
          className="w-full md:w-[70%] h-full absolute right-0 top-1/2 -translate-y-1/2 object-contain"
        />
      </div>
    </div>
  );
}

export default HeroBanner;