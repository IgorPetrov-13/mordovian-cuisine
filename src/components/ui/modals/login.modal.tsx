'use client';
import CustomModal from '@/components/common/modal';
import LoginForm from '@/forms/login.form';


type Props = {
  isOpen: boolean;
  onClose: () => void;
};
function LoginModal({ isOpen, onClose }: Props) {
  return (
    <CustomModal title="Войти" isOpen={isOpen} onClose={onClose} size="lg">
      <LoginForm onClose={onClose} />
    </CustomModal>
  );
}

export default LoginModal;
