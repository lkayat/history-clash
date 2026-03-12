export function Modal({ children, onClose, title }) {
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-stone-900 border-2 border-amber-700 rounded-xl shadow-2xl max-w-md w-full mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2 className="font-headline text-amber-400 text-xl font-bold mb-4 border-b border-stone-700 pb-3">
            {title}
          </h2>
        )}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-stone-400 hover:text-stone-200 text-2xl leading-none"
          >
            ×
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
