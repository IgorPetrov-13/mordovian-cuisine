'use client';
import { createIngredient } from '@/actions/ingregient';
import { CATEGORY_OPTIONS, UNIT_OPTIONS } from '@/constants/select-options';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Button, Select, SelectItem } from '@heroui/react';
import React, { useState, useTransition } from 'react';

const initialState = {
  name: '',
  category: '',
  unit: '',
  pricePerUnit: null as number | null,
  description: '',
};
function IngredientForm() {
  const [formData, setFormData] = React.useState(initialState);

  const [error, setError] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

  const handelSubmit = async (formData: FormData) => {
    console.log(formData);

    startTransition(async () => {
      const result = await createIngredient(formData);

      if (result?.error) {
        setError(result.error);
      } else {
        setError(null);
        setFormData(initialState);
      }
    });
  };

  return (
    <div>
      <Form className="w-[400px]" action={handelSubmit}>
        <Input
          isRequired
          name="name"
          placeholder="Название ингредиента"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          classNames={{
            inputWrapper: 'bg-default-100',
            input: 'text-sm focus:outline-none',
          }}
          validate={(value) => value.length > 0 || 'Название обязательное'}
        />
        <div className="flex gap-2 w-full">
          <div className="w-1/3">
            <Select
              isRequired
              name="category"
              placeholder="Категория ингредиента"
              classNames={{
                trigger: 'bg-default-100 w-full',
                innerWrapper: 'text-sm',
                value: 'truncate',
                selectorIcon: 'text-black',
              }}
              selectedKeys={formData.category ? [formData.category] : []}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {CATEGORY_OPTIONS.map((options) => (
                <SelectItem key={options.value} className="text-black">
                  {options.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="w-1/3">
            <Select
              isRequired
              name="unit"
              selectedKeys={formData.unit ? [formData.unit] : []}
              classNames={{
                trigger: 'bg-default-100 w-full',
                innerWrapper: 'text-sm',
                value: 'truncate',
                selectorIcon: 'text-black',
              }}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            >
              {UNIT_OPTIONS.map((option) => (
                <SelectItem key={option.value} className="text-black">
                  {option.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="w-1/3">
            <Input
              isRequired
              name="pricePerUnit"
              placeholder="Цена за единицу"
              value={formData.pricePerUnit !== null ? formData.pricePerUnit.toString() : ''}
              classNames={{
                inputWrapper: 'bg-default-100',
                input: 'text-sm focus:outline-none',
              }}
              onChange={(e) => {
                const value = e.target.value ? parseFloat(e.target.value) : null;
                setFormData({ ...formData, pricePerUnit: value });
              }}
              endContent={<span className="absolute right-3 top-1/2 -translate-y-1/2 text-black">₽</span>}
              validate={(value) => value.length > 0 || 'Цена обязательна'}
            />
          </div>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="flex w-full gap-2 items-center justify-end">
          <Button color="primary" type="submit" isLoading={isPending}>
            Добавить ингредиент
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default IngredientForm;
