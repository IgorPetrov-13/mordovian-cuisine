'use client';
import CustomModal from '@/components/common/modal';
import RegistrationForm from '@/forms/registration.form';
import React from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
function RegistrationModal({ isOpen, onClose }: Props) {
  return (
    <CustomModal title="Создать аккаунт" isOpen={isOpen} onClose={onClose} size="lg">
      <RegistrationForm onClose={onClose} />
    </CustomModal>
  );
}

export default RegistrationModal;
