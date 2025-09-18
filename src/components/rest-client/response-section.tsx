import Typography from '../typography';
interface ResponseSectionProps {
  status: number | null;
  data: unknown;
}
function ResponseSection({ status, data }: ResponseSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      <Typography variant="caption" className="text-[var(--primary)]">
        Response status: {status ?? '—'}
      </Typography>
      <Typography variant="caption">
        <pre className="overflow-x-auto rounded-md bg-[var(--gray-100)] p-3">
          {data ? JSON.stringify(data, null, 2) : 'No response yet'}
        </pre>
      </Typography>
    </div>
  );
}

export default ResponseSection;
