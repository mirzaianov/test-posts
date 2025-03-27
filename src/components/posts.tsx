import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { POSTS_URL, USERS_URL } from '../constants';
import { type User, type Post, type PostWithUserName } from '../types';

import PagesSelect from './pages-select';
import PagesPagination from './pages-pagination';
import PostsList from './posts-list';

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

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<number>(5);

  if (postsIsLoading || usersIsLoading) {
    return <div>Loading...</div>;
  }

  if (postsError || usersError) {
    return <div>{postsError?.message || usersError?.message}</div>;
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
    <div className="flex flex-col gap-4">
      <PostsList currentPosts={currentPosts} />
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
