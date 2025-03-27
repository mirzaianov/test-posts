import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SelectPostsPerPageProps = {
  options: number[];
  postsPerPage: number;
  setPostsPerPage: (value: number) => void;
};

export default function PagesSelect({
  options,
  postsPerPage,
  setPostsPerPage,
}: SelectPostsPerPageProps) {
  return (
    <Select
      value={String(postsPerPage)}
      onValueChange={(value: string) => setPostsPerPage(Number(value))}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select posts per page">
          {String(postsPerPage)}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option}
            value={String(option)}
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
