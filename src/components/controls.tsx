import PagesSelect from './pages-select';
import PagesPagination from './pages-pagination';
import { PostWithUserName } from '../types';

type ControlsProps = {
  postsPerPage: number;
  setPostsPerPage: (value: number) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  postWithUserName: PostWithUserName[] | undefined;
};

export default function Controls({
  postsPerPage,
  setPostsPerPage,
  currentPage,
  setCurrentPage,
  postWithUserName,
}: ControlsProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="hidden md:block">
        <PagesSelect
          options={[5, 10, 15, 20]}
          postsPerPage={postsPerPage}
          setPostsPerPage={setPostsPerPage}
        />
      </div>
      <PagesPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        postsPerPage={postsPerPage}
        postWithUserName={postWithUserName}
      />
    </div>
  );
}
