import { CATEGORY_OPTIONS } from '@/constants/select-options';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { form, Select, SelectItem } from '@heroui/react';
import React from 'react';

function IngredientForm() {
  const [formData, setFormData] = React.useState({
    name: '',
    category: '',
    unit: '',
    pricePerUnit: null as number | null,
    description: '',
  });

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <Form className="w-[400px]" onSubmit={handelSubmit}>
        <Input
          isRequired
          name="name"
          label="Название"
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
              label="Категория"
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
          <div className="w-1/3"></div>
          <div className="w-1/3"></div>
        </div>

        <Input
          isRequired
          name="unit"
          label="Единица измерения"
          placeholder="Единица измерения"
          value={formData.unit}
          onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
        />
        <Input
          isRequired
          name="pricePerUnit"
          label="Цена за единицу"
          placeholder="Цена за единицу"
          value={formData.pricePerUnit}
          onChange={(e) => setFormData({ ...formData, pricePerUnit: e.target.value })}
        />
      </Form>
    </div>
  );
}

export default IngredientForm;
