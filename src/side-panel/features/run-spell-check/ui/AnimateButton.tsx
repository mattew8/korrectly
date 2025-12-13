import { ReactNode } from 'react';

export function AnimateButton({
  children,
  onClick,
  isLoading,
}: {
  children: ReactNode;
  onClick: () => void;
  isLoading: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex-1 px-6 py-3 text-white font-medium rounded-md shadow-sm
        transition-all duration-200
        flex items-center justify-center gap-2
        ${
          isLoading
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 hover:shadow-md active:scale-[0.98]'
        }
      `}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <svg
            className="w-5 h-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="animate-pulse">{children}</span>
        </>
      ) : (
        <>
          <span>{children}</span>
        </>
      )}
    </button>
  );
}
