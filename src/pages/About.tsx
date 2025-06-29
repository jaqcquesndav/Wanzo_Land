import { Container } from '../components/ui/Container';
import { Users, Globe2, Target } from 'lucide-react';

const stats = [
	{ name: 'Entreprises gérées par des femmes', value: '50%', icon: Users },
	{ name: 'PME accompagnées', value: '50+', icon: Users },
	{ name: 'Pays couverts', value: '1', icon: Globe2 },
	{ name: 'Taux de satisfaction', value: '98%', icon: Target },
];

const timeline = [
	{
		year: '2023',
		title: 'Genèse',
		desc: "Wanzo est né de l’engagement de jeunes entrepreneurs congolais pour l’inclusion financière des PME. Face à la réalité du terrain, moins de 10% des PME accèdent au financement formel, et la majorité reste informelle, sans outils adaptés.",
		img: 'https://res.cloudinary.com/daxvxdecv/image/upload/v1743090232/kiota_suit/uejl8wcke1cctgelkwgn.jpg',
	},
	{
		year: '2024',
		title: 'Immersion terrain',
		desc: "18 mois d’immersion auprès de 50 PME locales pour comprendre leurs défis : gestion, financement, équipements, obligations fiscales. Cette expérience a permis d’identifier les vrais leviers pour leur croissance.",
		img: 'https://res.cloudinary.com/daxvxdecv/image/upload/v1743085450/kiota_suit/z4dxuxwbkqq7xvfwxxni.jpg',
	},
	{
		year: '2024',
		title: 'Validation & Partenariats',
		desc: "Entretiens avec institutions financières, fonds d’investissement, Banque Centrale, fintechs et éditeurs de logiciels pour valider les besoins et co-construire des solutions adaptées.",
		img: 'https://res.cloudinary.com/daxvxdecv/image/upload/v1743073969/kiota_suit/az4pccpaeiex2isq8smw.jpg',
	},
	{
		year: '2024',
		title: 'Reconnaissance',
		desc: "Notre approche est reconnue à l’international (concours Just Imagine if… à l’University of Reading, UK) pour son impact sur la digitalisation et l’accès au financement des PME.",
		img: 'https://res.cloudinary.com/daxvxdecv/image/upload/v1742912581/kiota_suit/Aristide/acswb2x2rbxbxuc577tx.jpg',
	},
	{
		year: '2025',
		title: 'Lancement & Innovation',
		desc: "Après un pilote réussi, Wanzo lance ses apps intégrant l’IA pour la comptabilité, la gestion et le financement. Le déploiement s’étend à plusieurs villes de RDC.",
		img: 'https://res.cloudinary.com/daxvxdecv/image/upload/v1742918110/kiota_suit/x7dshq0jwbibdjzx4yqr.jpg',
	},
	{
		year: '2025',
		title: 'Déploiement & Croissance',
		desc: "Wanzo poursuit le développement de ses outils avec les PME, et multiplie les partenariats avec banques, microfinances, fonds d’impact et incubateurs pour offrir des solutions de financement compétitives.",
		img: 'https://res.cloudinary.com/daxvxdecv/image/upload/v1743086219/kiota_suit/hayxezsmo4agdq4ywnkh.jpg',
	},
];

export function About() {
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
				{/* Hero Section */}
				<div
					className="relative bg-gradient-to-b from-primary-600 py-16 sm:py-24"
					style={{
						backgroundImage: `linear-gradient(to bottom, rgba(238, 242, 255, 0.6), rgba(255, 255, 255, 0.6)), url('https://res.cloudinary.com/daxvxdecv/image/upload/v1742930300/kiota_suit/wiyivnk9wgf6zvniyo0t.jpg')`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				>
					<Container>
						<div className="max-w-3xl mx-auto text-center">
							<h1 className="text-4xl font-extrabold tracking-tight text-primary-600 sm:text-5xl lg:text-6xl mb-4">
								Wanzo, une aventure collective
							</h1>
						</div>
					</Container>
				</div>

				{/* Timeline Parcours */}
				<Container>
					<div className="py-16 sm:py-24">
						<h3 className="text-primary-600 text-2xl font-bold text-center sm:text-3xl mb-12 sm:mb-16">
							Notre parcours en quelques étapes clés
						</h3>
						<div className="space-y-16 sm:space-y-24">
							{timeline.map((step, index) => (
								<div
									key={step.year + step.title}
									className={`flex flex-col items-center gap-8 sm:gap-12 lg:gap-16 ${
										index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
									}`}
								>
									<div className="flex-1 flex flex-col justify-center">
										<div className="text-primary font-semibold text-center lg:text-left text-lg">
											{step.year}
										</div>
										<h3 className="text-xl font-bold mt-2 text-center lg:text-left sm:text-2xl">
											{step.title}
										</h3>
										<p className="mt-4 text-gray-600 leading-relaxed lg:text-left text-justify text-base">
											{step.desc}
										</p>
									</div>
									<div className="flex-1 flex justify-center items-center">
										<img
											src={step.img}
											alt={step.title}
											className="rounded-2xl shadow-2xl w-full max-w-md object-cover border border-gray-100"
										/>
									</div>
								</div>
							))}
						</div>
					</div>
					{/* Stats */}
					<div className="py-16">
						<dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
							{stats.map((stat) => (
								<div
									key={stat.name}
									className="mx-auto flex max-w-xs flex-col gap-y-4"
								>
									<dt className="text-base leading-7 text-gray-600 font-semibold">
										{stat.name}
									</dt>
									<dd className="order-first text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
										<div className="flex items-center justify-center gap-x-2">
											<stat.icon className="h-8 w-8 text-primary" />
											<span>{stat.value}</span>
										</div>
									</dd>
								</div>
							))}
						</dl>
					</div>
				</Container>
			</Container>
		</div>
	);
}