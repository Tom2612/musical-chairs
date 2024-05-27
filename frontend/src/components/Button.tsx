export default function Button({
  children,
  onClick,
  type,
}: {
  children: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset" | undefined;
}) {
  return (
    <button
      type={type || 'button'}
      onClick={onClick}
      className="bg-sky-400 py-2 w-full rounded shadow font-semibold hover:bg-gradient-to-tr hover:from-sky-500 hover:to-sky-400 text-white focus:outline-sky-500"
    >
      {children}
    </button>
  );
}
