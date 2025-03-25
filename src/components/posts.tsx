import useFetch from '../hooks/useFetch';
import { POSTS_URL, USERS_URL } from '../constants';
import { type User, type Post } from '../types';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

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

  if (postsIsLoading || usersIsLoading) {
    return <div>Loading...</div>;
  }

  if (postsError || usersError) {
    return <div>{postsError?.message || usersError?.message}</div>;
  }

  const postWithUserName = postsData?.map((post) => ({
    ...post,
    userName: usersData?.find((user) => user.id === post.userId)?.name,
  }));

  return (
    <>
      {postWithUserName?.map((post) => (
        <div
          key={post.id}
          className="grid gap-x-4 gap-y-2"
        >
          <Avatar className="self-center">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="flex gap-0.5">
              <span>{post.userName?.split(' ')[0][0] || 'A'}</span>
              <span>{post.userName?.split(' ')[1][0] || 'B'}</span>
            </AvatarFallback>
          </Avatar>
          <p className="self-center">{post.userName}</p>
          <div className="col-start-2">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        </div>
      ))}
    </>
  );
}
