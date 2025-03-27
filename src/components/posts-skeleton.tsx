import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

type PostsSkeletonProps = {
  postsPerPage: number;
};

export default function PostsSkeleton({ postsPerPage }: PostsSkeletonProps) {
  const postsSkeleton: number[] = Array.from(
    { length: postsPerPage - 1 },
    (_, index) => index,
  );

  return (
    <>
      <ul className="w-full">
        {postsSkeleton.map((_, index) => (
          <li key={index}>
            <div className="flex gap-4 py-4">
              <div className="grid w-full grid-cols-[auto_1fr] gap-x-4 gap-y-2">
                <Skeleton className="size-8 rounded-full" />
                <Skeleton className="" />
                <Skeleton className="col-start-2 h-16" />
              </div>
              <Skeleton className="flex size-6 self-center" />
            </div>
            <Separator className="" />
          </li>
        ))}
        <li>
          <div className="flex gap-4 py-4">
            <div className="grid w-full grid-cols-[auto_1fr] gap-x-4 gap-y-2">
              <Skeleton className="size-8 rounded-full" />
              <Skeleton className="" />
              <Skeleton className="col-start-2 h-16" />
            </div>
            <Skeleton className="flex size-6 self-center" />
          </div>
        </li>
      </ul>
      <div className="flex w-full justify-between">
        <Skeleton className="h-9 w-14 rounded-md" />
        <Skeleton className="h-9 w-72 rounded-md" />
      </div>
    </>
  );
}
