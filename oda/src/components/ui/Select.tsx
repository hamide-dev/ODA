import { ReactNode, SelectHTMLAttributes, forwardRef } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  children: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, id, className = '', children, ...rest }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-ink/70">
          {label}
        </label>
      )}
      <select
        id={id}
        ref={ref}
        className={`rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-brand ${className}`}
        {...rest}
      >
        {children}
      </select>
    </div>
  )
);
Select.displayName = 'Select';
