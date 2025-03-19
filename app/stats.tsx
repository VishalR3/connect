export default function Stats({
  value,
  label,
}: {
  value: string | number;
  label: string;
}) {
  return (
    <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
      <div className="text-xl mb-1">{value}</div>
      <div>{label}</div>
    </div>
  );
}
