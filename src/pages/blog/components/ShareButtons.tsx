import { Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface ShareButtonsProps {
  post: {
    title: string;
    excerpt: string;
  };
  className?: string;
}

export function ShareButtons({ post, className }: ShareButtonsProps) {
  const shareUrl = window.location.href;
  const shareText = `${post.title} - ${post.excerpt}`;

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(post.excerpt)}`,
    },
  ];

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="flex items-center gap-2 text-sm text-gray-600">
        <Share2 className="h-4 w-4" />
        Partager
      </span>
      <div className="flex gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            title={`Partager sur ${link.name}`}
          >
            <link.icon className="h-5 w-5" />
          </a>
        ))}
      </div>
    </div>
  );
}