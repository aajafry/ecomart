import Heading from "../atoms/Heading";
import { InformationLinks, helpLinks, legalLinks } from "../config/links";
import SocialLinks from "../molecules/SocialLinks";
import SubscriptionForm from "../molecules/SubscriptionForm";
import { renderLinks } from "../utilities/renderLinks";


function SiteFooter() {
  return (
    <footer>
      <div className="bg-gray-100">
        <div className="w-[90%] mx-auto py-16 flex flex-wrap gap-8">
          <div className="sm:flex-1 flex-none w-full">
            <Heading
              label="Information"
              size="text-xl"
              weight="font-medium"
              className="tracking-wide mb-4"
            />
            <ul className="flex flex-col gap-1">
              {renderLinks(InformationLinks)}
            </ul>
          </div>
          <div className="sm:flex-[2] flex-none w-full text-left sm:text-center">
            <Heading
              label="Newsletter"
              size="text-4xl"
              weight="font-medium"
              color="text-amber-400"
            />
            <p className="text-sm my-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              tempora assumenda reiciendis excepturi magni. Quos quaerat quia
              excepturi eius aperiam exercitationem sit voluptatum temporibus
              nesciunt?
            </p>
            <SubscriptionForm />
          </div>
          <div className="sm:flex-1 flex-none w-full">
            <Heading
              label="Help & Support"
              size="text-xl"
              weight="font-medium"
              className="text-left sm:text-right tracking-wide mb-4"
            />
            <ul className="flex flex-col items-start sm:items-end gap-1">
              {renderLinks(helpLinks)}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-200">
        <div className="w-[90%] mx-auto py-4 flex flex-col md:flex-row gap-y-4">
          <div className="text-center">
            <p className="capitalize">all right reserved @2024</p>
          </div>
          <ul className="flex-center gap-4 flex-1">
            {renderLinks(legalLinks)}
          </ul>
          <ul className="flex gap-3 items-center justify-center">
            <p className="">Follow Us:</p>
            <SocialLinks />
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
