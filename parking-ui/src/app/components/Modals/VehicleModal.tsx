import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { Form, Input, Modal, Select } from 'antd';
import { CREATE_VEHICLE, EDIT_VEHICLE } from '../../services/mutations';
import { useEffect, useState } from 'react';
import { GET_VEHICLES, GET_VEHICLES_TYPES } from '../../services/queries';
import Button from '../Button';

export interface VehicleModalProps {
  visible: boolean;
  closeModal: () => void;
  isEdit?: boolean;
  initialValues?: {
    _id: string;
    plate: string;
    vehicleType: string;
  };
}

export const VehicleModal = ({
  visible,
  closeModal,
  initialValues,
  isEdit,
}: VehicleModalProps) => {
  const {
    data: vehicleTypes,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_VEHICLES_TYPES);
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>('');
  const [form] = Form.useForm();
  const [values, setValues] = useState<{
    plate: string;
    vehicleType: string;
  }>({
    plate: '',
    vehicleType: '',
  });
  const mutation = isEdit ? EDIT_VEHICLE : CREATE_VEHICLE;
  const input =
    isEdit && initialValues
      ? {
          _id: initialValues._id,
          plate: initialValues.plate,
          vehicleType: selectedVehicleType,
        }
      : {
          plate: values.plate,
          vehicleType: selectedVehicleType,
        };

  const [create, { error: mutationError, loading: mutationLoading }] =
    useMutation(mutation, {
      variables: {
        input,
      },
    });

  const client = useApolloClient();

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(queryLoading || mutationLoading);
  }, [queryLoading, mutationLoading]);

  useEffect(() => {
    setError(queryError?.message || mutationError?.message || null);
  }, [queryError, mutationError]);

  const onFinish = () => {
    const mutationResult = isEdit ? 'updateVehicle' : 'createVehicle';
    create()
      .then((res) => {
        if (res.data[mutationResult].plate) {
          handleCloseModal();
        }
        client.refetchQueries({
          include: [GET_VEHICLES],
        });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const onVehicleTypeChange = (value: string) => {
    setSelectedVehicleType(value);
  };

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <Modal
      open={visible}
      title={
        <span className="font-bold text-xl text-sky-500">
          {isEdit ? 'Editar Vehiculo' : 'Agregar nuevo vehículo'}
        </span>
      }
      onCancel={handleCloseModal}
      footer={null}
      destroyOnClose={true}
      closeIcon={
        <div className="from-stone-500 to-slate-300 hover:from-stone-600 hover:to-slate-400 active:from-stone-800 active:to-slate-600 min-h-12 transition ease-in-out duration-500 bg-gradient-to-r text-neutral-50 font-medium px-4 py-2 rounded-md shadow-md absolute right-0 top-0">
          x
        </div>
      }
    >
      <Form
        preserve={false}
        layout="horizontal"
        form={form}
        name="vehicleForm"
        onFinish={onFinish}
        initialValues={initialValues}
        style={{ maxWidth: '600' }}
        size="large"
        className="space-y-8 py-4"
        onValuesChange={(_, values) => {
          setValues({
            plate: values.plate,
            vehicleType: values.type,
          });
        }}
      >
        <div className="flex flex-row justify-between items-center">
          <div
            className="font-semibold bg-gradient-to-r from-sky-500 to-teal-300 text-transparent bg-clip-text select-none text-md md:text-lg"
          >
            Placa del vehículo:
          </div>
          <Form.Item
            name="plate"
            rules={[
              {
                required: true,
                max: 8,
                min: 8,
                message:
                  'La placa debe tener entre 4 y 10 caracteres y tener el formato correcto (ABC-1234)',
                validator: (rule, value) => {
                  if (
                    isEdit ||
                    (value &&
                      value.length === rule.min &&
                      value.length <= (rule.max as number) &&
                      value.match(/^[A-Z]{3}-[0-9]{4}$/))
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject(rule.message);
                },
              },
            ]}
            className="w-1/2 md:w-8/12 mb-0"
          >
            <Input
              value={values.plate}
              disabled={isEdit}
              name="plate-input"
              type="text"
              className="w-full border-gray-300 p-2 rounded-md shadow-md focus:outline-sky-500 focus:shadow-lg hover:shadow-lg hover:outline-sky-500 "
            />
          </Form.Item>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div
            className="font-semibold bg-gradient-to-r from-sky-500 to-teal-300 text-transparent bg-clip-text select-none text-md md:text-lg"
          >
            Tipo de vehículo:
          </div>
          <Form.Item
            name="type"
            className="w-1/2 md:w-8/12 mb-0"
            rules={[
              {
                required: true,
                message: 'Por favor seleccione un tipo de vehículo',
              },
            ]}
          >
            <Select
              value={selectedVehicleType}
              onChange={onVehicleTypeChange}
              className="rounded-lg shadow-lg"
            >
              {vehicleTypes?.vehicleTypes.map((type: any) => (
                <Select.Option key={type._id} value={type._id}>
                  {type.type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div className="flex justify-around">
          <Button key="submit" styleButton="primary" disabled={loading}>
            Submit
          </Button>
        </div>
      </Form>
      {error && <p className="text-red-500">{error}</p>}
    </Modal>
  );
};
