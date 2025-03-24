import useFetch from "../hooks/useFetch"
import { Post, POSTS_URL } from "../types"

export default function Posts() {
  const { data, isLoading, error } = useFetch<Post[]>(POSTS_URL);

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <ul>
      {data && data.map((post) => (
        <li key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  )
}
