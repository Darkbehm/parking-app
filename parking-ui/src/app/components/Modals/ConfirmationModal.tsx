import { useApolloClient, useMutation } from '@apollo/client';
import Modal from 'antd/es/modal/Modal';
import { GET_VEHICLES } from '../../services/queries';
import { useState, useEffect } from 'react';
import { DELETE_VEHICLE } from '../../services/mutations';
import Button from '../Button';

export interface ConfirmationModalProps {
  visible: boolean;
  closeModal: () => void;
  title: string;
  message: string;
  record?: any;
}
export const ConfirmationModal = ({
  visible,
  closeModal,
  title,
  message,
  record,
}: ConfirmationModalProps) => {
  const [id, setId] = useState('');
  const [deleteRegister, { error: mutationError, loading: mutationLoading }] =
    useMutation(DELETE_VEHICLE, {
      variables: {
        id,
      },
    });
  const client = useApolloClient();

  const handleDelete = () => {
    deleteRegister().then(() => {
      closeModal();
      client.refetchQueries({
        include: [GET_VEHICLES],
      });
    });
  };

  useEffect(() => {
    if (record) {
      setId(record._id);
    }
  }, [record]);

  return (
    <Modal
      destroyOnClose={true}
      title={<span className="font-bold text-xl text-sky-500">{title}</span>}
      open={visible}
      onCancel={closeModal}
      closeIcon={
        <div className="from-stone-500 to-slate-300 hover:from-stone-600 hover:to-slate-400 active:from-stone-800 active:to-slate-600 min-h-12 transition ease-in-out duration-500 bg-gradient-to-r text-neutral-50 font-medium px-4 py-2 rounded-md shadow-md absolute right-0 top-0">
          x
        </div>
      }
      footer={
        <div className="flex justify-around">
          <Button
            extraClassName="w-5/12 md:w-2/5 mr-4"
            styleButton="normal"
            onClick={closeModal}
            key="cancel"
          >
            Cancelar
          </Button>
          <Button
            extraClassName="w-5/12 md:w-2/5"
            styleButton="primary"
            key="delete"
            onClick={handleDelete}
          >
            Eliminar
          </Button>
        </div>
      }
    >
      <p className="text-lg my-8">{message}</p>
      {mutationError && <p className="text-red-500">{mutationError.message}</p>}
    </Modal>
  );
};
