import { Content } from 'antd/es/layout/layout';
import Table from 'antd/es/table/Table';
import { FC, useState, useEffect, ReactElement } from 'react';
import Button from './Button';
import type { ColumnsType } from 'antd/es/table';
import { useApolloClient, useQuery } from '@apollo/client';
import {
  GET_VEHICLES_TYPES,
  GET_VEHICLES,
  GET_ENTRIES,
} from '../services/queries/';
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
import { EntryModal } from './Modals/EntriesModal';
import { ConfirmationModal } from './Modals/ConfirmationModal';
import {
  getEntriesResponse,
  getEntriesResponseItem,
} from 'app/services/queries/getEntries';

export const getQuery = (selectedOption: dashboardKeysType) => {
  const queries = {
    vehicles: GET_VEHICLES,
    parking: GET_ENTRIES,
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

  const parking: ColumnsType<getEntriesResponseItem> = [
    {
      title: 'Placa',
      dataIndex: 'plate',
      key: 'plate',
    },
    {
      title: 'Tipo de vehículo',
      dataIndex: 'vehicleType',
      key: 'vehicleType',
      align: 'center',
    },
    {
      title: 'Fecha de entrada',
      dataIndex: 'entryDate',
      key: 'entryDate',
      align: 'center',
    },
    {
      title: 'Fecha de salida',
      dataIndex: 'exitDate',
      key: 'exitDate',
      align: 'center',
    },
    {
      title: 'Valor pagado ($)',
      dataIndex: 'amountToPay',
      key: 'amountToPay',
      align: 'right',
    },
    {
      title: 'Tiempo transcurrido',
      dataIndex: 'timeParked',
      key: 'timeParked',
      align: 'center',
    },
  ];

  const vehicleTypes: ColumnsType<VehicleType> = [
    {
      title: 'Tipo de vehículo',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
    },
    {
      title: 'Valor por minuto ($)',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
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
          {selectedOption === 'parking' ? 'Registrar salida' : 'editar'}
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
          vehicleType: vehicle.vehicleType?.description,
          key: vehicle._id,
          _id: vehicle._id,
        }),
      );
    case 'vehicleTypes':
      return (data as getVehicleTypesResponse).vehicleTypes?.map(
        (vehicleType: getVehicleTypesResponseItem) => ({
          type: vehicleType.type,
          price: getMoneyFormat(vehicleType?.price),
          description: vehicleType?.description,
          key: vehicleType._id,
          _id: vehicleType._id,
        }),
      );
    case 'parking':
      return (data as getEntriesResponse).entries?.map(
        (entry: getEntriesResponseItem) => {
          const enter = new Date(Number(entry.entryDate));
          const exit = new Date(Number(entry.exitDate));
          return {
            plate: entry.plate,
            vehicleType: entry.vehicleType,
            entryDate: enter.toLocaleString('es-HN'),
            entryDateEpoch: entry.entryDate,
            exitDate: exit?.toLocaleString('es-HN'),
            exitDateEpoch: entry.exitDate,
            amountToPay: getMoneyFormat(entry.amountToPay),
            timeParked: entry.timeParked + ' minutos',
            key: entry._id,
            _id: entry._id,
          };
        },
      );
  }
};

const getMoneyFormat = (money: number) => {
  return (money ?? 0).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

const getTable = ({
  data,
  selectedOption,
  openDelete,
  openEdit,
}: {
  selectedOption: dashboardKeysType;
  data: unknown;
  openEdit: any;
  openDelete: any;
}) => {
  const tableProps = {
    scroll: { x: 1000 },
    bordered: true,
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
  const { data, loading } = useQuery(actualQuery);
  const [openVehicleModal, setOpenModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);

  const [record, setRecord] = useState<any>(null);
  const client = useApolloClient();

  const handleRefresh = () => {
    client.refetchQueries({
      include: [actualQuery],
    });
  };

  const openEdit = (record: any) => {
    setRecord(record);
    setOpenModal(true);
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
      <div className="flex flex-col my-4 md:flex-row justify-around items-center">
        <Button
          extraClassName="w-2/3 md:w-1/4"
          styleButton="normal"
          onClick={() => {
            handleRefresh();
          }}
        >
          Refrescar
        </Button>
        {getButton(selectedOption, setOpenModal)}
      </div>
      <div className="flex w-full overflow-hidden self-center">
        {loading && <p>Loading...</p>}
        {!loading &&
          data &&
          getTable({
            selectedOption,
            data,
            openEdit,
            openDelete,
          })}
      </div>
      {selectedOption === 'vehicles' && (
        <VehicleModal
          visible={openVehicleModal}
          closeModal={() => {
            setOpenModal(false);
            setRecord(null);
          }}
          initialValues={record}
          isEdit={!!record}
        />
      )}
      {selectedOption === 'parking' && (
        <EntryModal
          visible={openVehicleModal}
          closeModal={() => {
            setOpenModal(false);
            setRecord(null);
          }}
          initialValues={record}
          isEdit={!!record}
        />
      )}
      <ConfirmationModal
        title="Confirmar eliminación"
        message="¿Está seguro que desea eliminar este registro?"
        closeModal={() => {
          setConfirmationModal(false);
          setRecord(null);
        }}
        visible={confirmationModal}
        record={record}
        selectedOption={selectedOption}
      />
    </Content>
  );
};
