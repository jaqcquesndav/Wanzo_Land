import { Container } from '../components/ui/Container';
import { PageContainer } from '../components/layout/PageContainer';

const posts = [
	{
		id: 1,
		title: 'Optimiser vos opérations commerciales',
		excerpt: 'Découvrez comment optimiser vos processus avec Kiota Suit.',
		date: '2024-02-28',
		author: 'Marie Dubois',
		category: 'Business',
		image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
	},
	{
		id: 2,
		title: 'Guide du financement des PME',
		excerpt: 'Les meilleures pratiques pour obtenir un financement.',
		date: '2024-02-25',
		author: 'Thomas Martin',
		category: 'Finance',
		image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
	},
	{
		id: 3,
		title: 'L\'IA au service des PME',
		excerpt: 'Comment l\'intelligence artificielle transforme la gestion d\'entreprise.',
		date: '2024-02-22',
		author: 'Sophie Laurent',
		category: 'Technologie',
		image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
	},
];

export function Blog() {
	return (
		<div className="relative overflow-hidden min-h-screen" style={{ background: 'linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%)' }}>
			{/* SVG curves for fluidity and section connection */}
			<svg className="absolute top-0 left-0 w-full h-32 z-0" viewBox="0 0 1440 160" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
				<path d="M0,80 C360,160 1080,0 1440,80 L1440,0 L0,0 Z" fill="#e5e7eb" />
			</svg>
			<svg className="absolute top-32 left-0 w-full h-24 z-0" viewBox="0 0 1440 96" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
				<path d="M0,48 C480,96 960,0 1440,48 L1440,0 L0,0 Z" fill="#f3f4f6" />
			</svg>
			<Container className="relative z-10 py-12 lg:py-20">
				<div className="bg-white py-24 sm:py-32">
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							Blog
						</h2>
						<p className="mt-2 text-lg leading-8 text-gray-600">
							Insights, actualités et bonnes pratiques pour votre entreprise
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
						{posts.map((post) => (
							<article key={post.id} className="flex flex-col items-start">
								<div className="relative w-full">
									<img
										src={post.image}
										alt={post.title}
										className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover"
									/>
								</div>
								<div className="max-w-xl">
									<div className="mt-8 flex items-center gap-x-4 text-xs">
										<time dateTime={post.date} className="text-gray-500">
											{new Date(post.date).toLocaleDateString('fr-FR')}
										</time>
										<span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
											{post.category}
										</span>
									</div>
									<div className="group relative">
										<h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
											<a href={`/blog/${post.id}`}>
												<span className="absolute inset-0" />
												{post.title}
											</a>
										</h3>
										<p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
											{post.excerpt}
										</p>
									</div>
									<div className="relative mt-8 flex items-center gap-x-4">
										<div className="text-sm leading-6">
											<p className="font-semibold text-gray-900">
												{post.author}
											</p>
										</div>
									</div>
								</div>
							</article>
						))}
					</div>
				</div>
			</Container>
		</div>
	);
}