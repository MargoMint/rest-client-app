import { Input } from '../ui/input';
interface UrlInputProps {
  value: string;
  onChange: (url: string) => void;
}
function UrlInput({ value, onChange }: UrlInputProps) {
  return (
    <Input
      type="text"
      placeholder="Enter request URL"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default UrlInput;
