import Typography from '../typography';

const columHeaders = [
  'Name',
  'Value',
  'Type',
  'Scope',
  'Description',
  'Actions',
];

export function VariableHeader() {
  return (
    <div className="text-muted-foreground grid grid-cols-5 gap-4 px-1 font-medium">
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
