import { EventHandler, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { COMMENTS_URL, POSTS_URL, USERS_URL, AVATAR_URL } from '../constants';
import {
  type User,
  type Post,
  type Comment,
  type PostWithUserName,
} from '../types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '../lib/utils';

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

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<number>(5);

  if (postsIsLoading || usersIsLoading || commentsIsLoading) {
    return <div>Loading...</div>;
  }

  if (postsError || usersError || commentsError) {
    return <div>{postsError?.message || usersError?.message}</div>;
  }

  const postWithUserName: PostWithUserName[] | undefined = postsData?.map(
    (post) => ({
      ...post,
      userName: usersData?.find((user) => user.id === post.userId)?.name,
    }),
  );

  const filterCommentsByPost = (id: number): Comment[] | undefined => {
    return commentsData?.filter((comment) => comment.postId === id);
  };

  const indexOfLastPost: number = currentPage * postsPerPage;
  const indexOfFirstPost: number = indexOfLastPost - postsPerPage;
  const currentPosts: PostWithUserName[] | undefined = postWithUserName?.slice(
    indexOfFirstPost,
    indexOfLastPost,
  );

  const totalPageCount: number = Math.ceil(
    (postWithUserName?.length || 0) / postsPerPage,
  );

  const handleNextPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (currentPage < totalPageCount) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handlePageSwitch = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPageCount) {
      setCurrentPage(pageNumber);
    }
  };

  const handlePostsPerPageChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPostsPerPage(Number(e.currentTarget.value));
  };

  return (
    <div className="flex flex-col gap-4">
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
                      <span>
                        {comment.email?.[1].toLocaleUpperCase() || 'B'}
                      </span>
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
      <div className="flex items-center justify-between">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder={postsPerPage} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value="10"
              onClick={handlePostsPerPageChange}
            >
              10
            </SelectItem>
            <SelectItem
              value="25"
              onClick={handlePostsPerPageChange}
            >
              25
            </SelectItem>
            <SelectItem
              value="50"
              onClick={handlePostsPerPageChange}
            >
              50
            </SelectItem>
            <SelectItem
              value="100"
              onClick={handlePostsPerPageChange}
            >
              100
            </SelectItem>
          </SelectContent>
        </Select>
        <Pagination>
          <PaginationContent className="ml-auto">
            <PaginationItem>
              <PaginationPrevious
                className={cn(
                  {
                    'pointer-events-none opacity-50': currentPage === 1,
                  },
                  'cursor-pointer',
                )}
                disabled={currentPage === 1}
                onClick={handlePreviousPage}
              />
            </PaginationItem>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationLink
                  className="cursor-pointer"
                  onClick={() => handlePageSwitch(1)}
                >
                  1
                </PaginationLink>
              </PaginationItem>
            )}
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                className="cursor-default"
                isActive
              >
                {currentPage}
              </PaginationLink>
            </PaginationItem>
            {currentPage < totalPageCount && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {currentPage < totalPageCount && (
              <PaginationItem>
                <PaginationLink
                  className="cursor-pointer"
                  onClick={() => handlePageSwitch(totalPageCount)}
                >
                  {totalPageCount}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext
                className={cn(
                  {
                    'pointer-events-none opacity-50':
                      currentPage === totalPageCount,
                  },
                  'cursor-pointer',
                )}
                disabled={currentPage === totalPageCount}
                onClick={handleNextPage}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
