import { Link } from 'react-router-dom';
import { posts } from '../blog-data';

interface RelatedPostsProps {
  currentPostId: number;
}

export function RelatedPosts({ currentPostId }: RelatedPostsProps) {
  const relatedPosts = posts
    .filter(post => post.id !== currentPostId)
    .slice(0, 2);

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Articles similaires
      </h2>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {relatedPosts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.id}`}
            className="group relative isolate flex flex-col gap-8 rounded-2xl bg-white p-6 ring-1 ring-gray-200 hover:shadow-lg transition-all duration-200"
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
              <img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div>
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.date} className="text-gray-500">
                  {new Date(post.date).toLocaleDateString('fr-FR')}
                </time>
                <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
                  {post.category}
                </span>
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-primary">
                {post.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}