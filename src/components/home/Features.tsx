import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import AccountSvg from '../../assets/images/step_account.svg';
import AppsSvg from '../../assets/images/step_apps.svg';
import EvaluationSvg from '../../assets/images/step_evaluation.svg';
import FinanceSvg from '../../assets/images/step_finance.svg';

const simpleSteps = [
	{
		icon: AccountSvg,
		label: 'Créer un compte',
		short: 'Inscription rapide',
	},
	{
		icon: AppsSvg,
		label: 'Utiliser Wanzo',
		short: 'Générez vos données',
	},
	{
		icon: EvaluationSvg,
		label: 'Suivi & Évaluation',
		short: 'Analyse automatique',
	},
	{
		icon: FinanceSvg,
		label: 'Financement',
		short: 'Accès simplifié',
	},
];

export function Features() {
	const navigate = useNavigate();
	return (
		<section className="relative w-full py-16">
			{/* SVG curve top for section connection */}
			<svg
				className="absolute top-0 left-0 w-full h-16 z-0"
				viewBox="0 0 1440 64"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="none"
			>
				<path
					d="M0,32 C480,64 960,0 1440,32 L1440,0 L0,0 Z"
					fill="#f3f4f6"
				/>
			</svg>
			<Container>
				<div className="mx-auto max-w-2xl lg:text-center">
					<h2 className="text-base font-semibold leading-7 text-primary">
						Notre Approche
					</h2>
					<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						Votre Parcours vers la croissance
					</p>
					<p className="mt-6 text-lg leading-8 text-gray-600">
						Gérez, financez et faites grandir votre PME sur une seule plateforme
						intelligente. Avec Wanzo, l’IA automatise vos tâches de gestion
						(ventes, facturation, comptabilité…) et vous ouvre l’accès au
						financement.
					</p>
				</div>
				{/* --- Modern schematic steps --- */}
				<div className="mx-auto mt-8 max-w-4xl flex flex-col items-center">
					<div className="flex flex-col sm:flex-row items-center justify-between w-full gap-8 relative">
						{simpleSteps.map((step) => (
							<div
								key={step.label}
								className="flex flex-col items-center flex-1 min-w-[120px]"
							>
								<div className="mb-2">
									<img
										src={step.icon}
										alt={step.label}
										style={{ height: 56, width: 56 }}
									/>
								</div>
								<span className="font-semibold text-gray-900 text-center">
									{step.label}
								</span>
								<span className="text-xs text-gray-500 text-center mt-1">
									{step.short}
								</span>
							</div>
						))}
					</div>
				</div>
				{/* --- End schematic steps --- */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mt-16 text-center"
				>
					<Button
						size="lg"
						className="inline-flex items-center gap-2"
						onClick={() => navigate('/auth/select')}
					>
						Commencer votre transition numérique
						<ArrowRight className="h-5 w-5" />
					</Button>
				</motion.div>
			</Container>
			{/* SVG curve bottom for section connection */}
			<svg
				className="absolute bottom-0 left-0 w-full h-16 z-0"
				viewBox="0 0 1440 64"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="none"
			>
				<path
					d="M0,32 C480,0 960,64 1440,32 L1440,64 L0,64 Z"
					fill="#e5e7eb"
				/>
			</svg>
		</section>
	);
}