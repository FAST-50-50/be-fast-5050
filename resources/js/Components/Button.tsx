import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    children,
    ...props
}) => {
    const baseStyles =
        'px-4 py-1 text-sm font-medium rounded-lg transition-all duration-200';

    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-600 text-white hover:bg-gray-700',
        outline: 'border border-gray-500 text-gray-700 hover:bg-gray-100',
        danger: 'bg-red-600 text-white hover:bg-red-700',
    };

    return (
        <button className={`${baseStyles} ${variants[variant]}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
