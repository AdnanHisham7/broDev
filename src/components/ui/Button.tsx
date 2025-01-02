import React from 'react';

interface ButtonProps {
  label?: string; // Optional for icon-only buttons
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'outlined' | 'success' | 'danger' | 'outlined-success' | 'outlined-danger' | 'secondary';
  iconLeft?: JSX.Element; // Optional icon on the left
  iconRight?: JSX.Element; // Optional icon on the right
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = 'button',
  variant = 'primary',
  iconLeft,
  iconRight,
  disabled = false,
  className = '',
}) => {
  // Base button styles
  const baseStyle =
  'inline-flex items-center justify-center font-medium transition-all rounded-md focus:outline-none focus-visible:outline-none px-10 py-2';



  // Variant styles
  const variantStyles: Record<string, string> = {
    primary: 'bg-white text-black hover:bg-gray-100',
    seconday:'bg-white text-red hover:bg-red-100',
    outlined: 'bg-transparent border border-gray-200 text-gray-200 hover:bg-gray-800',
    success: 'bg-customGreen text-white hover:bg-green-700',
    danger: 'bg-customRed text-white hover:bg-red-800',
    'outlined-success': 'border border-customGreen text-customGreen hover:bg-customGreen hover:text-white',
    'outlined-danger': 'border border-customRed text-customRed hover:bg-customRed hover:text-white',
  };
  
  

 

  // Combine styles
  const combinedStyles = `${baseStyle} ${variantStyles[variant]} ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  } ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedStyles}
    >
      {iconLeft && <span className="mr-1">{iconLeft}</span>}
      {label}
      {iconRight && <span className="ml-2">{iconRight}</span>}
    </button>
  );
};



export default Button;
