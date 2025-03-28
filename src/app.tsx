import { useState } from 'react';
import useFetch from './hooks/useFetch';
import Controls from './components/controls';
import Posts from './components/posts';
import AlertCard from './components/alert-card';
import {
  type PostWithUserName,
  type User,
  type Post,
  type PostComment,
} from './types';
import { POSTS_URL, USERS_URL, COMMENTS_URL } from './constants';

export default function App() {
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
    <main className="flex min-h-screen flex-col items-center justify-start py-10 md:py-16 xl:py-24">
      <div className="flex w-10/12 max-w-3xl flex-col items-center gap-10 md:gap-16 xl:gap-24">
        <h1 className="ultra-regular text-6xl font-bold md:text-7xl">Posts</h1>
        <Posts
          isLoading={isLoading}
          postsPerPage={postsPerPage}
          currentPosts={currentPosts}
          commentsData={commentsData || []}
        />
        <Controls
          postsPerPage={postsPerPage}
          setPostsPerPage={setPostsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          postWithUserName={postWithUserName}
        />
      </div>
    </main>
  );
}
