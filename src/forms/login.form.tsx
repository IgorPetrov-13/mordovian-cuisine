'use client';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Button } from '@heroui/react';
import { useState } from 'react';

type Props = {
  onclose: () => void;
};
function LoginForm({ onclose }: Props) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) return 'Некорректный email';
  };

  const validatePassword = (password: string) => {
    if (!password) return 'Пароль обязателен';
    if (password.length < 6) return 'Не менее шести символов';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Форма отправлена с данными:', formData);
    onclose();
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

      <div className="flex gap-2">
        <Button color="primary" type="submit">
          Войти
        </Button>
        <Button variant="light" type="button" onPress={onclose}>
          Отмена
        </Button>
      </div>
    </Form>
  );
}

export default LoginForm;
