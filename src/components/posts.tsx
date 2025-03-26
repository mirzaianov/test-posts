import useFetch from '../hooks/useFetch';
import { COMMENTS_URL, POSTS_URL, USERS_URL, AVATAR_URL } from '../constants';
import { type User, type Post, Comment } from '../types';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

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
  } = useFetch<Comment[]>(COMMENTS_URL);

  if (postsIsLoading || usersIsLoading || commentsIsLoading) {
    return <div>Loading...</div>;
  }

  if (postsError || usersError || commentsError) {
    return <div>{postsError?.message || usersError?.message}</div>;
  }

  const postWithUserName = postsData?.map((post) => ({
    ...post,
    userName: usersData?.find((user) => user.id === post.userId)?.name,
  }));

  const filterCommentsByPost = (id: number) => {
    return commentsData?.filter((comment) => comment.postId === id);
  };

  return (
    <Accordion
      type="single"
      collapsible
    >
      {postWithUserName?.map((post) => (
        <AccordionItem
          value={String(post.id)}
          key={post.id}
        >
          <div className="flex gap-2 py-4">
            <div className="grid gap-x-4 gap-y-1">
              <Avatar className="self-center">
                <AvatarImage src={`${AVATAR_URL}${post.userId}`} />
                <AvatarFallback className="flex gap-0.5">
                  <span>{post.userName?.split(' ')[0][0] || 'A'}</span>
                  <span>{post.userName?.split(' ')[1][0] || 'B'}</span>
                </AvatarFallback>
              </Avatar>
              <p className="self-center">{post.userName}</p>
              <div className="col-start-2">
                <h3 className="font-semibold">{post.title}</h3>
                <p>{post.body}</p>
              </div>
            </div>
            <AccordionTrigger className="flex gap-2"></AccordionTrigger>
          </div>
          <AccordionContent>
            {filterCommentsByPost(post.id)?.map((comment) => (
              <div
                key={comment.id}
                className="border-t py-2"
              >
                <h4 className="font-semibold">{comment.name}</h4>
                <p>{comment.email}</p>
                <p>{comment.body}</p>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
