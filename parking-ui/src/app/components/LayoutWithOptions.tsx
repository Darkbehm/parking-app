import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { LayoutContent } from "./LayoutContent";
import { useState } from "react";
import {
  dashboardOptions,
  dashboardKeysType,
  dashboardOptionsType,
} from "../utils/dashboardOptions";

export const LayoutWithOptions = ({ role }: { role: dashboardOptionsType["role"] }) => {
  const options = getOptionsByRole(role);
  const [selectedOption, setSelectedOption] = useState<dashboardKeysType>(
    options[0].key
  );
  return (
    <Layout >
      <Sider
        theme="light"
        className="py-16 z-50"
        collapsedWidth={0}
        breakpoint="sm"
        collapsible
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={[options[0].name]}
          items={options.map((option) => ({
            key: option.key,
            label: option.name,
          }))}
          onSelect={({ key }) => setSelectedOption(key as dashboardKeysType)}
        />
      </Sider>
      <Layout className="py-16 z-0 sm:px-8">
        <LayoutContent selectedOption={selectedOption} />
      </Layout>
    </Layout>
  );
};

const getOptionsByRole = (role: dashboardOptionsType["role"]) => {
  return dashboardOptions.filter(
    (option) => option.role === "any" || option.role === role
  );
};
