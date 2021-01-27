import React, { ChangeEvent, InputHTMLAttributes } from 'react';

import { InputWrapper } from '@/styles/components/input';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ onChange, placeholder, ...props }: InputProps) {
  return (
    <>
      <InputWrapper onChange={onChange} placeholder={placeholder} {...props} />
    </>
  );
}
