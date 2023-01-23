import { Content } from "antd/es/layout/layout";
import Table from "antd/es/table/Table";
import { FC, useState, useEffect } from "react";
import Button from "./Button";
import type { ColumnsType } from "antd/es/table";
import { useLazyQuery } from "@apollo/client";
import { GET_VEHICLES } from "../services/queries/getVehicles";
import { Vehicle } from "../interfaces/vehicle.interface";

const columns: ColumnsType<Vehicle> = [
  {
    key: "1",
    title: "plate",
    dataIndex: "plate",
  },
  {
    key: "2",
    title: "type",
    dataIndex: "type",
  },
];

interface props {
  selectedOption: string;
}
export const LayoutContent: FC<props> = ({ selectedOption }: props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [getVehicles, { loading, data }] = useLazyQuery(GET_VEHICLES);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const tableProps = {
    bordered: true,
    rowSelection,
    showHeader: true,
  };

  useEffect(() => {
    getVehicles();
  }, []);

  return (
    <Content className="bg-white rounded-lg sm:px-12 flex flex-col">
      <div className="flex flex-col my-4 md:flex-row justify-around items-center">
        <Button type="primary">
          <>Crear Nuevo {selectedOption}</>
        </Button>
        <Button type="normal">Refrescar</Button>
      </div>
      <div className="flex w-full overflow-hidden self-center">
        {loading && <p>Loading...</p>}
        {!loading && data && data.vehicles && (
          <Table
          className="w-full"
            {...tableProps}
            columns={columns}
            dataSource={data.vehicles.map((vehicle: any) => ({
              plate: vehicle.plate,
              type: vehicle.vehicleType.type,
              key: vehicle._id,
            }))}
            pagination={
              {
                hideOnSinglePage: true,
              }
            }
          />
        )}
      </div>
    </Content>
  );
};
