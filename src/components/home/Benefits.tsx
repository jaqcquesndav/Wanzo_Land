import { Shield, Zap, Clock, Coins } from 'lucide-react';

const benefits = [
	{
		name: 'Sécurité maximale',
		description:
			"Protection des données de niveau bancaire avec chiffrement de bout en bout et conformité RGPD.",
		icon: Shield,
	},
	{
		name: 'Performance optimale',
		description:
			"Interface réactive et temps de réponse rapide pour une productivité maximale.",
		icon: Zap,
	},
	{
		name: 'Gain de temps',
		description:
			"Automatisation des tâches répétitives et workflows optimisés pour plus d'efficacité.",
		icon: Clock,
	},
	{
		name: 'Réduction des coûts',
		description:
			"Optimisation des ressources et réduction des coûts opérationnels jusqu'à 40%.",
		icon: Coins,
	},
];

export function Benefits() {
	return (
		<section
			className="relative w-full py-16"
			style={{
				background:
					'linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%)',
			}}
		>
			<svg
				className="absolute top-0 left-0 w-full h-16 z-0"
				viewBox="0 0 1440 64"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="none"
			>
				<path
					d="M0,32 C480,64 960,0 1440,32 L1440,0 L0,0 Z"
					fill="#e5e7eb"
				/>
			</svg>
			<div className="relative z-10">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-2xl lg:text-center">
						<h2 className="text-base font-semibold leading-7 text-primary">
							Avantages
						</h2>
						<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							Pourquoi choisir Kiota Suit ?
						</p>
					</div>
					<div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
						<dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
							{benefits.map((benefit) => (
								<div key={benefit.name} className="flex flex-col">
									<dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
										<benefit.icon
											className="h-5 w-5 flex-none text-primary"
											aria-hidden="true"
										/>
										{benefit.name}
									</dt>
									<dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
										<p className="flex-auto">
											{benefit.description}
										</p>
									</dd>
								</div>
							))}
						</dl>
					</div>
				</div>
			</div>
			<svg
				className="absolute bottom-0 left-0 w-full h-16 z-0"
				viewBox="0 0 1440 64"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="none"
			>
				<path
					d="M0,32 C480,0 960,64 1440,32 L1440,64 L0,64 Z"
					fill="#f3f4f6"
				/>
			</svg>
		</section>
	);
}