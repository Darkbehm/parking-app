import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { AutoComplete, DatePicker, Form, Modal } from 'antd';
import { CREATE_ENTRY, CREATE_EXIT } from '../../services/mutations';
import { useState, useEffect } from 'react';
import { GET_ENTRIES, GET_VEHICLES } from '../../services/queries';
import Button from '../Button';
import dayjs from 'dayjs';
import { Vehicle } from '../../interfaces/vehicle.interface';

export interface EntryModalProps {
  visible: boolean;
  closeModal: () => void;
  isEdit?: boolean;
  initialValues?: {
    _id: string;
    plate: string;
    entryDate: string;
    entryDateEpoch: number;
    exitDate?: string;
    exitDateEpoch?: number;
  };
}

export const EntryModal = ({
  visible,
  closeModal,
  initialValues,
  isEdit,
}: EntryModalProps) => {
  const [form] = Form.useForm();
  const [values, setValues] = useState<{
    plate: string;
    entryDate?: string;
    entryDateEpoch?: number;
    exitDate?: string;
    exitDateEpoch?: number;
  }>({
    plate: '',
    entryDate: '',
    entryDateEpoch: initialValues?.entryDateEpoch,
    exitDate: '',
    exitDateEpoch: initialValues?.exitDateEpoch,
  });
  const { data, loading } = useQuery(GET_VEHICLES);
  const plates = data?.vehicles.map((vehicle: Vehicle) => ({
    value: vehicle.plate,
  }));
  const mutation = isEdit ? CREATE_EXIT : CREATE_ENTRY;
  const input =
    isEdit && initialValues
      ? {
          _id: initialValues._id,
          plate: initialValues.plate,
          exitDate: dayjs(values.exitDateEpoch).format(
            'YYYY-MM-DDTHH:mm:ss.SSS[Z]',
          ),
        }
      : {
          plate: values.plate,
          entryDate: dayjs(values.entryDateEpoch).format(
            'YYYY-MM-DDTHH:mm:ss.SSS[Z]',
          ),
        };

  const [create, { error: mutationError, loading: mutationLoading }] =
    useMutation(mutation, {
      variables: {
        input,
      },
    });

  const client = useApolloClient();
  const [error, setError] = useState<string | null>(null);

  const onFinish = () => {
    const mutationResult = isEdit ? 'updateEntry' : 'createEntry';
    create()
      .then((res) => {
        if (res.data[mutationResult].plate) {
          handleCloseModal();
        }
        client.refetchQueries({
          include: [GET_ENTRIES],
        });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleCloseModal = () => {
    setError(null);
    closeModal();
  };

  useEffect(() => {
    if (mutationError) {
      setError(mutationError.message);
    }
  }, [mutationError]);

  return (
    <Modal
      open={visible}
      title={
        <span className="font-bold text-xl text-sky-500">
          {isEdit ? 'Registrar Salida' : 'Registrar entrada'}
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
      {(loading || mutationLoading) && (
        <div className="text-center">Cargando...</div>
      )}
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
            entryDate: values.entryDate,
            entryDateEpoch: dayjs(values.entryDate).valueOf(),
            exitDate: values.exitDate,
            exitDateEpoch: dayjs(values.exitDate).valueOf(),
          });
        }}
      >
        <div className="flex flex-row justify-between items-center">
          <div className="font-semibold bg-gradient-to-r from-sky-500 to-teal-300 text-transparent bg-clip-text select-none text-md md:text-lg">
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
            <AutoComplete
              value={values.plate}
              disabled={isEdit}
              options={plates}
              className="w-full border-gray-300 rounded-md shadow-md focus:outline-sky-500 focus:shadow-lg hover:shadow-lg hover:outline-sky-500 "
            />
          </Form.Item>
        </div>
        {!isEdit && (
          <div className="flex flex-row justify-between items-center">
            <div className="font-semibold bg-gradient-to-r from-sky-500 to-teal-300 text-transparent bg-clip-text select-none text-md md:text-lg">
              Fecha de entrada:
            </div>
            <Form.Item
              name="date-entry"
              className="w-1/2 md:w-8/12 mb-0"
              rules={[
                {
                  required: true,
                  message: 'Por favor seleccione un tipo de vehículo',
                },
              ]}
            >
              <DatePicker
                className="w-full border-gray-300 rounded-md shadow-md focus:outline-sky-500 focus:shadow-lg hover:shadow-lg hover:outline-sky-500"
                showTime
                disabled={isEdit}
                name="entryDate-input"
                format="YYYY/MM/DD HH:mm:ss"
                onChange={(date, dateString) => {
                  setValues({
                    ...values,
                    entryDate: dateString,
                    entryDateEpoch: dayjs(date).valueOf(),
                  });
                }}
              ></DatePicker>
            </Form.Item>
          </div>
        )}
        {isEdit && (
          <div className="flex flex-row justify-between items-center">
            <div className="font-semibold bg-gradient-to-r from-sky-500 to-teal-300 text-transparent bg-clip-text select-none text-md md:text-lg">
              Fecha de salida:
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
              <DatePicker
                showTime
                name="exitDate-input"
                format="YYYY/MM/DD HH:mm:ss"
                onChange={(date, dateString) => {
                  setValues({
                    ...values,
                    exitDate: dateString,
                    exitDateEpoch: dayjs(date).valueOf(),
                  });
                }}
              ></DatePicker>
            </Form.Item>
          </div>
        )}
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
