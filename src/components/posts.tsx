import PostsSkeleton from './posts-skeleton';
import PostsList from './posts-list';

import { type PostWithUserName, type PostComment } from '../types';

type PostsProps = {
  isLoading: boolean;
  postsPerPage: number;
  currentPosts: PostWithUserName[] | undefined;
  commentsData: PostComment[] | undefined;
};

export default function Posts({
  isLoading,
  postsPerPage,
  currentPosts,
  commentsData,
}: PostsProps) {
  return (
    <div className="w-full">
      {isLoading ? (
        <PostsSkeleton postsPerPage={postsPerPage} />
      ) : (
        <PostsList
          currentPosts={currentPosts}
          commentsData={commentsData ?? undefined}
        />
      )}
    </div>
  );
}
