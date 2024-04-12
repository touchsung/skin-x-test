import { Menu } from "@headlessui/react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useState } from "react";

interface DropdownProps {
  name: string;
  itemLists: string[];
  onSelect: (selectedItem: string) => void;
}

const Dropdown = ({ name, itemLists, onSelect }: DropdownProps) => {
  const [visibleItems, setVisibleItems] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget;
    if (
      element.scrollTop + element.clientHeight >= element.scrollHeight - 20 &&
      !loading
    ) {
      setLoading(true);
      setVisibleItems((prevVisibleItems) =>
        Math.min(prevVisibleItems + 5, itemLists.length)
      );
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex items-center bg-gray-200 px-4 py-2 rounded-md">
        <h4 className="mr-2">{name}</h4>
        <RiArrowDropDownLine />
      </Menu.Button>
      <Menu.Items
        className="absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none h-40 overflow-y-auto"
        onScroll={(e) => handleScroll(e)}
      >
        <div className="py-1">
          {itemLists.slice(0, visibleItems).map((item, index) => (
            <Menu.Item key={index}>
              {({ active }) => (
                <li
                  className={`${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                  } block px-4 py-2 text-sm`}
                  onClick={() => {
                    onSelect(item);
                  }}
                >
                  {item}
                </li>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default Dropdown;
