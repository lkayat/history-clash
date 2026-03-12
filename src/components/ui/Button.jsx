export function Button({ children, onClick, variant = 'primary', size = 'md', disabled = false, className = '' }) {
  const base = 'inline-flex items-center justify-center font-headline font-bold tracking-wide transition-all duration-150 select-none border-2 cursor-pointer';

  const variants = {
    primary:   'bg-amber-700 border-amber-500 text-amber-50 hover:bg-amber-600 active:bg-amber-800 shadow-lg',
    secondary: 'bg-stone-800 border-stone-600 text-stone-200 hover:bg-stone-700 active:bg-stone-900 shadow',
    danger:    'bg-red-800 border-red-600 text-red-50 hover:bg-red-700 active:bg-red-900 shadow',
    ghost:     'bg-transparent border-stone-600 text-stone-300 hover:bg-stone-700 hover:text-stone-100',
    red:       'bg-red-900 border-red-600 text-red-100 hover:bg-red-800 active:bg-red-950 shadow-lg',
    blue:      'bg-blue-900 border-blue-600 text-blue-100 hover:bg-blue-800 active:bg-blue-950 shadow-lg',
    green:     'bg-green-900 border-green-600 text-green-100 hover:bg-green-800 active:bg-green-950 shadow-lg',
  };

  const sizes = {
    sm:  'px-3 py-1.5 text-sm rounded',
    md:  'px-5 py-2.5 text-base rounded-md',
    lg:  'px-7 py-3.5 text-lg rounded-lg',
    xl:  'px-10 py-4 text-xl rounded-xl',
  };

  const disabledStyle = 'opacity-40 cursor-not-allowed pointer-events-none';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${disabled ? disabledStyle : ''} ${className}`}
    >
      {children}
    </button>
  );
}
