export default function Input({ 
  label,
  error,
  className = '',
  id,
  ...props 
}) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-app-text mb-2"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className="input-field"
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-sentiment-negative">
          {error}
        </p>
      )}
    </div>
  );
}

