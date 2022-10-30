import { useRouter } from "next/router";
import Modal from "react-modal";
import { getYoutubeVideoById } from "../../lib/video";

import NavBar from "../../components/navBar/navbar";
import classes from "../../styles/Video.module.css";
Modal.setAppElement("#__next");

export async function getStaticProps(context) {
	const videoId = context.params.videoId;
	const videoArray = await getYoutubeVideoById(videoId);
	return {
		props: {
			video: videoArray.length > 0 ? videoArray[0] : {},
		},
		revalidate: 10,
	};
}
export async function getStaticPaths() {
	const listOfVideos = ["DwxzK8ipVkg", "Tn1eN62hW5", "4zH5iYM4wJo"];

	const paths = listOfVideos.map((videoId) => ({
		params: { videoId },
	}));

	return { paths, fallback: "blocking" };
}

const Video = ({ video }) => {
	const router = useRouter();

	const {
		title,
		publishTime,
		description,
		channelTitle,
		statistics: { viewCount } = { viewCount: 0 },
	} = video;
	return (
		<div className={classes.container}>
			<NavBar />
			<Modal
				isOpen={true}
				className={classes.modal}
				contentLabel="Watch the video"
				onRequestClose={() => router.back()}
				overlayClassName={classes.overlay}
			>
				<iframe
					id="ytplayer"
					className={classes.videoPlayer}
					type="text/html"
					width="100%"
					height="360"
					src={`https://www.youtube.com/embed/${router.query.videoId}?autoplay=0&origin=http://example.com&controls=0&rel=0`}
					frameBorder="0"
				></iframe>

				<div className={classes.modalBody}>
					<div className={classes.modalBodyContent}>
						<div className={classes.col1}>
							<p className={classes.publishTime}>{publishTime}</p>
							<p className={classes.title}>{title}</p>
							<p className={classes.description}>{description}</p>
						</div>
						<div className={classes.col2}>
							<p
								className={`${classes.subText} ${classes.subTextWrapper}`}
							>
								<span className={classes.info}>Cast:</span>
								<span className={classes.channelTitle}>
									{channelTitle}
								</span>
							</p>
							<p
								className={`${classes.subText} ${classes.subTextWrapper}`}
							>
								<span className={classes.info}>ViewCount:</span>
								<span className={classes.channelTitle}>
									{viewCount}
								</span>
							</p>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default Video;
