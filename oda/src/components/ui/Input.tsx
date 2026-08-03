import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = '', ...rest }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-ink/70">
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        className={`rounded-lg border bg-white px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-brand ${
          error ? 'border-ink' : 'border-ink/15'
        } ${className}`}
        {...rest}
      />
      {error && <span className="text-xs text-ink">{error}</span>}
    </div>
  )
);
Input.displayName = 'Input';
