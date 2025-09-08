'use client';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import { ReactNode } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};
function CustomModal({ isOpen, onClose, children, size, title }: Props) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={size}>
        <ModalContent>
          <ModalHeader className="border-b">{title}</ModalHeader>

          <ModalBody className="space-y-4 py-6">{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CustomModal;
