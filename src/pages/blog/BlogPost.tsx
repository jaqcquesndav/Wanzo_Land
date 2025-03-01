import { useParams } from 'react-router-dom';
import { PageContainer } from '../../components/layout/PageContainer';
import { Container } from '../../components/ui/Container';
import { BackButton } from '../../components/ui/BackButton';
import { BlogContent } from './components/BlogContent';
import { RelatedPosts } from './components/RelatedPosts';
import { ShareButtons } from './components/ShareButtons';
import { posts } from './blog-data';

export function BlogPost() {
  const { id } = useParams();
  const post = posts.find(p => p.id === Number(id));

  if (!post) {
    return (
      <PageContainer>
        <Container>
          <div className="py-24">
            <h1 className="text-2xl font-bold">Article non trouvé</h1>
            <BackButton to="/blog" className="mt-4" />
          </div>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <article className="bg-white">
        {/* Hero Section */}
        <div className="relative h-[400px] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <Container className="absolute inset-0 flex items-end pb-12">
            <div className="max-w-3xl text-white">
              <div className="flex items-center gap-x-4 text-sm">
                <time dateTime={post.date} className="text-gray-200">
                  {new Date(post.date).toLocaleDateString('fr-FR')}
                </time>
                <span className="relative z-10 rounded-full bg-white/10 px-3 py-1.5 font-medium">
                  {post.category}
                </span>
              </div>
              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {post.title}
              </h1>
              <div className="mt-4 flex items-center gap-x-4">
                <div className="text-sm leading-6">
                  <p className="font-semibold">
                    {post.author}
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Content */}
        <Container>
          <div className="mx-auto max-w-3xl py-12">
            <BackButton to="/blog" className="mb-8" />
            
            <BlogContent content={post.content} />

            <ShareButtons post={post} className="mt-12" />
          </div>
        </Container>
      </article>

      {/* Related Posts */}
      <div className="bg-gray-50 py-24">
        <Container>
          <RelatedPosts currentPostId={post.id} />
        </Container>
      </div>
    </PageContainer>
  );
}