import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import PostsSkeleton from './posts-skeleton';
import { POSTS_URL, USERS_URL, COMMENTS_URL } from '../constants';
import {
  type User,
  type Post,
  type PostWithUserName,
  type PostComment,
} from '../types';
import PagesSelect from './pages-select';
import PagesPagination from './pages-pagination';
import PostsList from './posts-list';
import AlertCard from './alert-card';

export default function Posts() {
  const {
    data: postsData,
    isLoading: postsIsLoading,
    error: postsError,
  } = useFetch<Post[]>(POSTS_URL);

  const {
    data: usersData,
    isLoading: usersIsLoading,
    error: usersError,
  } = useFetch<User[]>(USERS_URL);

  const {
    data: commentsData,
    isLoading: commentsIsLoading,
    error: commentsError,
  } = useFetch<PostComment[]>(COMMENTS_URL);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<number>(5);

  const isLoading: boolean =
    postsIsLoading || usersIsLoading || commentsIsLoading;
  const error: Error | null = postsError || usersError || commentsError;

  if (error) {
    console.log(error);
    return <AlertCard errorMessage={error.message} />;
  }

  const postWithUserName: PostWithUserName[] | undefined = postsData?.map(
    (post) => ({
      ...post,
      userName: usersData?.find((user) => user.id === post.userId)?.name,
    }),
  );

  const indexOfLastPost: number = currentPage * postsPerPage;
  const indexOfFirstPost: number = indexOfLastPost - postsPerPage;
  const currentPosts: PostWithUserName[] | undefined = postWithUserName?.slice(
    indexOfFirstPost,
    indexOfLastPost,
  );

  return (
    <div className="flex w-full flex-col gap-4">
      {isLoading ? (
        <PostsSkeleton postsPerPage={postsPerPage} />
      ) : (
        <PostsList
          currentPosts={currentPosts}
          commentsData={commentsData ?? undefined}
        />
      )}
      <div className="flex items-center justify-between">
        <PagesSelect
          options={[5, 10, 15, 20]}
          postsPerPage={postsPerPage}
          setPostsPerPage={setPostsPerPage}
        />
        <PagesPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          postsPerPage={postsPerPage}
          postWithUserName={postWithUserName}
        />
      </div>
    </div>
  );
}
