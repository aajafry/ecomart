/* eslint-disable react/prop-types */
import Button from "../atoms/Button";

function TabsCard({ tabs, activeTab, changeActiveTab }) {
  return (
    <div className="flex items-center border-b-2 border-gray-400 mb-4">
      {tabs.map((tab, index) => (
        <Button 
          key={index}
          type="button"
          size="medium"
          label={tab}
          onClick={() => changeActiveTab(index)}
          className={`!rounded-none ${
            index === activeTab ? "bg-amber-400" : "bg-gray-400"
          } text-gray-600`}
        />
      ))}
    </div>
  );
}

export default TabsCard