import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Container } from '../ui/Container';
import { Brain, Shield, LineChart, Check } from 'lucide-react';
import { useState } from 'react';

const plans = [
	{
		name: 'Free',
		description: 'Commencez gratuitement avec nos fonctionnalités de base',
		price: '0',
		features: [
			'Application de comptabilité',
			'Accès limité à Adha',
			'Conformité SYSCOHADA',
			'1 utilisateur par Application',
			'Support communautaire'
		],
		highlighted: false,
		demo: true
	},
	{
		name: 'PME',
		description: 'Suite complète de gestion assistée par IA',
		price: '19,9',
		features: [
			'Application de comptabilité avancée avec passation des écritures en languange naturel',
			'Intégration à vos outils actuels ou migration facile',
			"Jusqu'à 10 utilisateurs par application",
			'Gestion de portefeuille PME',
			'Acces au Leasing Store',
			'Assistant IA Adha intégré',
			'1 Million de Tokens (mots) offerts',
			'Conformité SYSCOHADA et IFRS',
			'Audit automatique',
			'Support 24/7'
		],
		tokenPrice: '5',
		tokenAmount: '1 Million'
	},
	{
		name: 'Institution Financière',
		description: 'Gestion optimale des risques et portefeuilles',
		price: '99,9',
		features: [
			'Accès à toutes les PME du réseau',
			"Jusqu'à 100 utilisateurs par application (Admin, Analystes, etc.)",
			'Espace de prospection et de mise en relation',
			'Production des rapports assistée par IA',
			'Centrale de risque et de notation',
			'Gestion de portefeuille avancée',
			'Intégration API avec vos outils',
			'Analyse de risque avancée',
			'Prévision des crises',
			'Conformité Bâle III',
			'Assistant IA Adha Premium',
			'10 Million de Tokens (mots) offerts',
			'Support dédié 24/7'
		],
		tokenPrice: '5',
		tokenAmount: '1 Million',
		highlighted: true
	}
];

export function Pricing() {
	const navigate = useNavigate();
	const [isAnnual, setIsAnnual] = useState(false);

	const handlePlanSelect = (plan: typeof plans[0]) => {
		if (plan.demo) {
			navigate('/auth/select?type=demo');
		} else if (plan.name === 'PME') {
			navigate('/auth/select?type=sme');
		} else {
			navigate('/auth/select?type=financial');
		}
	};

	const getPrice = (price: string) => {
		const monthlyPrice = parseFloat(price);
		return isAnnual ? (monthlyPrice * 12 * 0.8).toFixed(1) : price; // 20% discount for annual
	};

	const getOriginalAnnualPrice = (price: string) => {
		const monthlyPrice = parseFloat(price);
		return (monthlyPrice * 12).toFixed(1);
	};

	return (
		<section className="relative w-full py-16" style={{ background: 'linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%)' }}>
			<svg className="absolute top-0 left-0 w-full h-16 z-0" viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
				<path d="M0,32 C480,64 960,0 1440,32 L1440,0 L0,0 Z" fill="#e5e7eb" />
			</svg>
			<div className="relative z-10">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="text-base font-semibold leading-7 text-primary">
							Tarification
						</h2>
						<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							Choisissez votre forfait
						</p>
						<p className="mt-2 text-sm text-gray-500">
							Les services payants sont adressés aux entreprises établies, si vous êtes une startup ou nouvelle entreprise, nous vous recommandons de commencer par le plan free.
						</p>
						<div className="mt-4 flex justify-center">
							<button
								onClick={() => setIsAnnual(false)}
								className={`px-4 py-2 text-sm font-semibold ${
									!isAnnual ? 'text-primary underline' : 'text-gray-500'
								}`}
							>
								Mensuel
							</button>
							<button
								onClick={() => setIsAnnual(true)}
								className={`ml-4 px-4 py-2 text-sm font-semibold ${
									isAnnual ? 'text-primary underline' : 'text-gray-500'
								}`}
							>
								Annuel (-20%)
							</button>
						</div>
					</div>

					<div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
						{plans.map((plan) => (
							<motion.div
								key={plan.name}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								className={`relative flex flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ${
									plan.highlighted ? 'ring-primary' : plan.demo ? 'ring-success' : 'ring-gray-200'
								}`}
							>
								{plan.highlighted && (
									<div className="absolute -top-4 -right-4 w-24 h-24 bg-primary rounded-full opacity-10 blur-2xl" />
								)}
								
								<div className="mb-6">
									<h3 className="text-lg font-semibold text-gray-900">
										{plan.name}
									</h3>
									<p className="mt-2 text-sm text-gray-500">
										{plan.description}
									</p>
									<p className="mt-6">
										{isAnnual && (
											<span className="text-sm font-semibold text-red-500 line-through mr-2">
												${getOriginalAnnualPrice(plan.price)}
											</span>
										)}
										<span className="text-4xl font-bold tracking-tight text-gray-900">
											${getPrice(plan.price)}
										</span>
										<span className="text-sm font-semibold text-gray-600">
											{isAnnual ? '/an' : '/mois'}
										</span>
									</p>
								</div>

								<ul className="flex-1 space-y-4">
									{plan.features.map((feature) => (
										<li key={feature} className="flex items-start">
											<div className="flex-shrink-0">
												<Check className="h-5 w-5 text-primary" />
											</div>
											<span className="ml-3 text-sm text-gray-600">{feature}</span>
										</li>
									))}
								</ul>

								{!plan.demo && (
									<div className="mt-8 border-t border-gray-200 pt-6">
										<div className="flex items-center justify-between text-sm">
											<span className="font-medium text-gray-900">Tokens supplémentaires</span>
											<span className="text-gray-500">
												${plan.tokenPrice} / {plan.tokenAmount}
											</span>
										</div>
									</div>
								)}

								<button 
									onClick={() => handlePlanSelect(plan)}
									className={`mt-8 w-full rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-sm ${
										plan.demo ? 'bg-success hover:bg-success-600' : 'bg-primary hover:bg-primary-hover'
									}`}
								>
									{plan.demo ? 'Essayer gratuitement' : 'Commencer maintenant'}
								</button>
							</motion.div>
						))}
					</div>

					{/* 
					<div className="mt-16 max-w-3xl mx-auto text-center">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">
							Pourquoi choisir Kiota Suit ?
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
							<div className="flex flex-col items-center">
								<Brain className="h-8 w-8 text-primary mb-4" />
								<h4 className="text-sm font-semibold">Adha, votre assistant IA</h4>
								<p className="mt-2 text-sm text-gray-500">Gestion assistée et analyse prédictive</p>
							</div>
							<div className="flex flex-col items-center">
								<Shield className="h-8 w-8 text-success mb-4" />
								<h4 className="text-sm font-semibold">Conformité totale</h4>
								<p className="mt-2 text-sm text-gray-500">SYSCOHADA, IFRS, Bâle III</p>
							</div>
							<div className="flex flex-col items-center">
								<LineChart className="h-8 w-8 text-warning mb-4" />
								<h4 className="text-sm font-semibold">Inclusion financière</h4>
								<p className="mt-2 text-sm text-gray-500">Accès facilité au financement</p>
							</div>
						</div>
					</div>
					*/}
					
				</Container>
			</div>
			<svg className="absolute bottom-0 left-0 w-full h-16 z-0" viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
				<path d="M0,32 C480,0 960,64 1440,32 L1440,64 L0,64 Z" fill="#f3f4f6" />
			</svg>
		</section>
	);
}