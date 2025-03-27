import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import useFetch from '../hooks/useFetch';
import { COMMENTS_URL, AVATAR_URL } from '../constants';
import { Comment, PostWithUserName } from '../types';

type PostsListProps = {
  currentPosts: PostWithUserName[] | undefined;
};

export default function PostsList({ currentPosts }: PostsListProps) {
  const {
    data: commentsData,
    isLoading: commentsIsLoading,
    error: commentsError,
  } = useFetch<Comment[]>(COMMENTS_URL);

  if (commentsIsLoading) {
    return <div>Loading...</div>;
  }

  if (commentsError) {
    return <div>{commentsError.message}</div>;
  }

  const filterCommentsByPost = (id: number): Comment[] | undefined => {
    return commentsData?.filter((comment) => comment.postId === id);
  };

  return (
    <Accordion
      type="single"
      collapsible
    >
      {currentPosts?.map((post) => (
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
              <div className="col-start-2 flex flex-col gap-1">
                <h3 className="font-semibold">{post.title}</h3>
                <p>{post.body}</p>
              </div>
            </div>
            <AccordionTrigger className="flex gap-2"></AccordionTrigger>
          </div>
          <AccordionContent className="pr-6 pl-12">
            {filterCommentsByPost(post.id)?.map((comment) => (
              <div
                className="grid gap-x-2 gap-y-1 border-t py-2"
                key={comment.id}
              >
                <Avatar className="self-center">
                  <AvatarFallback className="flex gap-0.5">
                    <span>{comment.email?.[0] || 'A'}</span>
                    <span>{comment.email?.[1].toLocaleUpperCase() || 'B'}</span>
                  </AvatarFallback>
                </Avatar>
                <h4 className="self-center">{comment.email}</h4>
                <div className="col-start-2 flex flex-col gap-1">
                  <h5 className="font-bold">{comment.name}</h5>
                  <p>{comment.body}</p>
                </div>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
