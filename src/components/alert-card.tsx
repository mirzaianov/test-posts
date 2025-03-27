import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type AlertCardProps = {
  errorMessage: string;
};

export default function AlertCard({ errorMessage }: AlertCardProps) {
  return (
    <Alert
      variant="destructive"
      className="w-fit max-w-full"
    >
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Something went wrong. Please try again later.</AlertTitle>
      <AlertDescription>{`Error message: < ${errorMessage} >`}</AlertDescription>
    </Alert>
  );
}
