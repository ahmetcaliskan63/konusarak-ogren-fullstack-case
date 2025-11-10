export default function Button({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary',
  disabled = false,
  className = '',
  ...props 
}) {
  const baseClasses = 'font-medium px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-app-primary hover:bg-app-primary-hover text-white focus-visible:focus-ring',
    secondary: 'bg-app-surface hover:bg-app-surface-secondary text-app-text border border-app-border focus-visible:focus-ring',
    ghost: 'bg-transparent hover:bg-app-surface text-app-text-secondary hover:text-app-text focus-visible:focus-ring',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

