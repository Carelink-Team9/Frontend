import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'danger';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  fullWidth?: boolean;
}

const variantClassMap: Record<Variant, string> = {
  primary: 'bg-[#296dff] text-white shadow-[0px_4px_10px_0px_rgba(0,82,219,0.25)]',
  secondary: 'border-[1.5px] border-[#d1d5db] bg-white text-[#111827]',
  danger: 'bg-[#f3f4f6] text-[#ef4444] hover:bg-[#fee2e2]',
};

export default function PrimaryButton({
  children,
  className = '',
  disabled = false,
  fullWidth = true,
  type = 'button',
  variant = 'primary',
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`flex h-[60px] items-center justify-center rounded-[10px] text-[18px] font-medium tracking-[-0.9px] transition-colors ${
        fullWidth ? 'w-full' : ''
      } ${disabled ? 'bg-[#f3f4f6] text-[#d1d5db] shadow-none' : variantClassMap[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
