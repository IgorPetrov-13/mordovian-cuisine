'use client';
import { registerUser } from '@/actions/register';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Button } from '@heroui/react';
import { useState } from 'react';

type Props = {
  onClose: () => void;
};
function RegistrationForm({ onClose }: Props) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) return 'Некорректный email';
  };

  const validatePassword = (password: string) => {
    if (!password) return 'Пароль обязателен';
    if (password.length < 6) return 'Не менее шести символов';
  };

  const validateConfirmPassword = (cpassword: string) => {
    if (cpassword !== formData.password) return 'Пароли должны совпадать';
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Форма отправлена с данными:', formData);

    const result = await registerUser(formData);
    if (result) {
      console.log('Регистрация успешна');
    } else {
      console.log('Ошибка регистрации');
    }
    onClose();
  };

  return (
    <Form className="w-full max-w-xs flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input
        isRequired
        errorMessage="Введите email"
        label="Email"
        value={formData.email}
        labelPlacement="outside"
        name="email"
        placeholder="Введите email"
        type="email"
        aria-label="email"
        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
        validate={validateEmail}
      />
      <Input
        isRequired
        errorMessage="Введите пароль"
        label="Пароль"
        value={formData.password}
        labelPlacement="outside"
        name="password"
        placeholder="Введите пароль"
        type="password"
        aria-label="password"
        onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
        validate={validatePassword}
      />
      <Input
        isRequired
        errorMessage="Повторите пароль"
        label="Повторите пароль"
        value={formData.confirmPassword}
        labelPlacement="outside"
        name="confirmPassword"
        placeholder="Повторите пароль"
        type="password"
        aria-label="password"
        onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
        validate={validateConfirmPassword}
      />
      <div className="flex gap-2">
        <Button color="primary" type="submit">
          Зарегистрироваться
        </Button>
        <Button variant="light" type="button" onPress={onClose}>
          Отмена
        </Button>
      </div>
    </Form>
  );
}

export default RegistrationForm;
