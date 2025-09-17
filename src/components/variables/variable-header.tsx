import Typography from '../typography';

const columHeaders = [
  'Name',
  'Value',
  // 'Type',
  // 'Scope',
  'Description',
  'Actions',
];

export function VariableHeader() {
  return (
    <div className="grid grid-cols-[repeat(3,1fr)_0.5fr] gap-4 border-b px-1 pb-2">
      {columHeaders.map((label) => (
        <Typography
          variant="body"
          className="text-[var(--primary)]"
          key={label}
        >
          {label}
        </Typography>
      ))}
    </div>
  );
}
