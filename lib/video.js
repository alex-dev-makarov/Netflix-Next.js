import videoData from "../data/videos.json";

const fetchData = async (url) => {
	const YOUTUBE_API = process.env.YOUTUBE_API_KEY;
	const BASE_URL = "youtube.googleapis.com/youtube/v3";

	const res = await fetch(
		`https://${BASE_URL}/${url}&maxResults=10&key=${YOUTUBE_API}`
	);
	return await res.json();
};
export const getCommonVideos = async (url) => {
	try {
		// const isDev = process.env.DEV;
		// isDev ? videoData :
		const data = await fetchData(url);

		// if API has problem or  i have exceeded my limit request
		if (data?.error) {
			console.error("Youtube has problem with API", data.error);
		}
		return data?.items.map((item) => {
			const id = item.id?.videoId || item.id;
			return {
				title: item.snippet.title,
				imgUrl: item.snippet.thumbnails.high.url,
				id,
				description: item.snippet.description,
				publishedTime: item.snippet.publishedAt,
				channelTitle: item.snippet.channelTitle,
				statistics: item.statistics
					? item.statistics
					: { viewCount: 0 },
			};
		});
	} catch {
		console.error("Sorry, something went wrong with video");
		return [];
	}
};

export const getVideos = (searchQuery) => {
	const URL = `search?part=snippet&q=${searchQuery}`;
	return getCommonVideos(URL);
};

export const getPopularVideos = () => {
	const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=UA`;
	return getCommonVideos(URL);
};
export const getYoutubeVideoById = (videoId) => {
	const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
	return getCommonVideos(URL);
};
