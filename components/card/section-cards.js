import Link from "next/link";
import Card from "./card";

import classes from "./section-cards.module.css";
const SectionCards = ({ title, videos, size }) => {
	const card = videos.map((video, idx) => {
		return (
			<li key={video.id}>
				<Link href={`/video/${video.id}`}>
					<a>
						<Card
							key={idx}
							id={idx}
							imgUrl={video.imgUrl}
							size={size}
						/>
					</a>
				</Link>
			</li>
		);
	});
	return (
		<section className={classes.container}>
			<h2 className={classes.title}>{title}</h2>
			<div className={classes.cardWrapper}>{card}</div>
		</section>
	);
};
export default SectionCards;
