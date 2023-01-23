import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { LayoutContent } from "./LayoutContent";
import { useState } from 'react';

export const LayoutWithOptions = ({ role }: { role: string }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const options = getOptionsByRole(role);
  return (
    <Layout>
      <Sider
        theme="light"
        className="py-16"
        collapsedWidth={0}
        breakpoint="lg"
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["0"]}
          items={options.map((option, index) => ({
            key: index,
            label: option.name,
          }))}
          onSelect={({key}) => setSelectedOption(key)}
        />
      </Sider>
      <Layout className="py-16 px-8">
        <LayoutContent selectedOption={selectedOption} />
      </Layout>
    </Layout>
  );
};

const getOptionsByRole = (role: string) => {
  return options.filter(
    (option) => option.role === "any" || option.role === role
  );
};

const options = [
  {
    name: "Vehicles",
    role: "any",
  },
  {
    name: "Parking",
    role: "any",
  },
  {
    name: "Vehicle Types",
    role: "admin",
  },
  {
    name: "Users",
    role: "admin",
  },
];
