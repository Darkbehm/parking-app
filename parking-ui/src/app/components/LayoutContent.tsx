import { Content } from 'antd/es/layout/layout';
import Table from 'antd/es/table/Table';
import { FC, useState, useEffect, ReactElement } from 'react';
import Button from './Button';
import type { ColumnsType } from 'antd/es/table';
import { useApolloClient, useQuery } from '@apollo/client';
import { GET_VEHICLES_TYPES, GET_VEHICLES } from '../services/queries/';
import { Vehicle } from '../interfaces/vehicle.interface';
import { dashboardKeysType } from '../utils/dashboardOptions';
import {
  getVehiclesResponse,
  getVehiclesResponseItem,
} from '../services/queries/getVehicles';
import { VehicleType } from '../interfaces/vehicleType.interface';
import {
  getVehicleTypesResponse,
  getVehicleTypesResponseItem,
} from '../services/queries/getVehicleTypes';
import { Empty } from 'antd';
import { VehicleModal } from './Modals/VehicleModal';
import { ConfirmationModal } from './Modals/ConfirmationModal';

const getQuery = (selectedOption: dashboardKeysType) => {
  const queries = {
    vehicles: GET_VEHICLES,
    parking: GET_VEHICLES,
    users: GET_VEHICLES,
    vehicleTypes: GET_VEHICLES_TYPES,
  };
  return queries[selectedOption];
};

const getButton = (
  selectedOption: dashboardKeysType,
  setOpenFunction: (isOpen: boolean) => void,
): ReactElement => {
  const text = {
    vehicles: 'Agregar nuevo vehículo',
    parking: 'Registrar entrada',
    users: 'Agregar nuevo usuario',
    vehicleTypes: 'Agregar nuevo tipo de vehículo',
  };

  return (
    <Button
      extraClassName="w-2/3 md:w-1/4"
      styleButton="primary"
      onClick={() => {
        setOpenFunction(true);
      }}
    >
      <>{text[selectedOption]}</>
    </Button>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getColumns = (
  selectedOption: dashboardKeysType,
  openEdit: any,
  openDelete: any,
) => {
  const vehicle: ColumnsType<Vehicle> = [
    {
      title: 'Placa',
      dataIndex: 'plate',
      key: 'plate',
    },
    {
      title: 'Tipo de vehículo',
      dataIndex: 'vehicleType',
      key: 'vehicleType',
    },
  ];

  const parking: ColumnsType<Vehicle> = [
    {
      title: 'Placa',
      dataIndex: 'plate',
      key: 'plate',
    },
    {
      title: 'Tipo de vehículo',
      dataIndex: 'vehicleType',
      key: 'vehicleType',
    },
    {
      title: 'Fecha de entrada',
      dataIndex: 'entryDate',
      key: 'entryDate',
    },
    {
      title: 'Fecha de salida',
      dataIndex: 'exitDate',
      key: 'exitDate',
    },
    {
      title: 'Valor pagado ($)',
      dataIndex: 'amountToPay',
      key: 'amountToPay',
    },
    {
      title: 'Tiempo transcurrido',
      dataIndex: 'timeParked',
      key: 'timeParked',
    },
  ];

  const vehicleTypes: ColumnsType<VehicleType> = [
    {
      title: 'Tipo de vehículo',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Valor por minuto ($)',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  const columns = {
    vehicles: vehicle,
    parking: parking,
    users: vehicle,
    vehicleTypes: vehicleTypes,
  };

  const actions = {
    title: 'Acciones',
    dataIndex: 'actions',
    key: 'actions',
    // @eslint-disable-next-line no-explicit-any
    render: (_: any, record: any) => (
      <div className="flex flex-row justify-around">
        <Button
          extraClassName="w-5/12 md:w-2/5"
          styleButton="secondary"
          onClick={() => {
            openDelete(record);
          }}
        >
          Eliminar
        </Button>
        <Button
          extraClassName="w-5/12 md:w-2/5"
          styleButton="primary"
          onClick={() => {
            openEdit(record);
          }}
        >
          Editar
        </Button>
      </div>
    ),
  };

  return [...columns[selectedOption], actions];
};

const getDataSource = (selectedOption: dashboardKeysType, data: unknown) => {
  switch (selectedOption) {
    case 'vehicles':
      return (data as getVehiclesResponse).vehicles?.map(
        (vehicle: getVehiclesResponseItem) => ({
          plate: vehicle.plate,
          vehicleType: vehicle.vehicleType.description,
          key: vehicle._id,
          _id: vehicle._id,
        }),
      );
    case 'vehicleTypes':
      return (data as getVehicleTypesResponse).vehicleTypes?.map(
        (vehicleType: getVehicleTypesResponseItem) => ({
          type: vehicleType.type,
          price: vehicleType.price,
          description: vehicleType.description,
          key: vehicleType._id,
        }),
      );
  }
};

const getTable = ({
  data,
  selectedOption,
  openDelete,
  openEdit,
  rowSelection,
}: {
  selectedOption: dashboardKeysType;
  data: unknown;
  rowSelection: {
    selectedRowKeys: React.Key[];
    onChange: (newSelectedRowKeys: React.Key[]) => void;
  };
  openEdit: any;
  openDelete: any;
}) => {
  const tableProps = {
    scroll: { x: 1000 },
    bordered: true,
    rowSelection,
    showHeader: true,
  };

  return (
    <Table
      {...tableProps}
      columns={
        getColumns(selectedOption, openEdit, openDelete) as ColumnsType<any>
      }
      dataSource={getDataSource(selectedOption, data)}
      size="small"
      className="w-full"
      pagination={{
        hideOnSinglePage: true,
        position: ['bottomCenter'],
      }}
      locale={{
        emptyText: () => (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No hay datos para mostrar"
          />
        ),
      }}
    />
  );
};

interface props {
  selectedOption: dashboardKeysType;
}
export const LayoutContent: FC<props> = ({ selectedOption }: props) => {
  const [actualQuery, setActualQuery] = useState(getQuery(selectedOption));
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { data, loading } = useQuery(actualQuery);
  const [openVehicleModal, setOpenVehicleModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);

  const [record, setRecord] = useState<any>(null);
  const client = useApolloClient();

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleRefresh = () => {
    client.refetchQueries({
      include: [actualQuery],
    });
  };

  const openEdit = (record: any) => {
    setRecord(record);
    setOpenVehicleModal(true);
  };

  const openDelete = (record: any) => {
    setRecord(record);
    setConfirmationModal(true);
  };

  useEffect(() => {
    setActualQuery(getQuery(selectedOption));
  }, [selectedOption]);

  useEffect(() => {
    handleRefresh();
  }, [actualQuery]);

  return (
    <Content className="bg-white rounded-lg sm:px-12 flex flex-col">
      <div className="flex flex-col my-4 md:flex-row justify-around items-center space-y-4">
        <Button
          extraClassName="w-2/3 md:w-1/4"
          styleButton="normal"
          onClick={() => {
            handleRefresh();
          }}
        >
          Refrescar
        </Button>
        {selectedOption === 'parking' && (
          <Button
            extraClassName="w-2/3 md:w-1/4"
            styleButton="secondary"
            onClick={() => {
              //openCreateModal("exit");
            }}
          >
            Registrar salida
          </Button>
        )}
        {getButton(selectedOption, setOpenVehicleModal)}
      </div>
      <div className="flex w-full overflow-hidden self-center">
        {loading && <p>Loading...</p>}
        {!loading &&
          data &&
          getTable({
            selectedOption,
            data,
            rowSelection,
            openEdit,
            openDelete,
          })}
      </div>
      <VehicleModal
        visible={openVehicleModal}
        closeModal={() => {
          setOpenVehicleModal(false);
          setRecord(null);
        }}
        initialValues={record}
        isEdit={!!record}
      />
      <ConfirmationModal
        title="Confirmar eliminación"
        message="¿Está seguro que desea eliminar este registro?"
        closeModal={() => {
          setConfirmationModal(false);
          setRecord(null);
        }}
        visible={confirmationModal}
        record={record}
      />
    </Content>
  );
};
