import React from "react";
import { FieldInputProps, FormikProps } from "formik";
import { userDataInput } from "../../types/auth";

interface InputValidationProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  field: FieldInputProps<string>;
  form: FormikProps<userDataInput>;
}

const InputValidation: React.FC<InputValidationProps> = ({
  id,
  name,
  type,
  placeholder,
  field,
  form: { touched, errors },
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block mb-1">
      {name}
    </label>
    <input
      id={id}
      type={type}
      className="w-full px-3 py-2 border rounded-md"
      placeholder={placeholder}
      {...field}
    />
    {touched[field.name as keyof userDataInput] &&
    errors[field.name as keyof userDataInput] ? (
      <span className="text-red-600">
        {errors[field.name as keyof userDataInput]}
      </span>
    ) : null}
  </div>
);

export default InputValidation;
