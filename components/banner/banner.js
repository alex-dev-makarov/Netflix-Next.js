import playButton from "../../public/static/play__button.svg";
import Image from "next/image";
import classes from "./banner.module.css";
import { useRouter } from "next/router";
const Banner = (props) => {
  const { title, subTitle, imgUrl, videoId } = props;
  const router = useRouter()
  const handleButton = () => {

    router.push(`video/${videoId}`)
  };
  return (
    <div className={classes.container}>
      <div className={classes.leftWrapper}>
        <div className={classes.left}>
          <div className={classes.nseriesWrapper}>
            <span className={classes.firstLetter}>N</span>
            <span className={classes.series}>S E R I E S</span>
          </div>
          <h3 className={classes.title}>{title}</h3>
          <h3 className={classes.subTitle}>{subTitle}</h3>

          <div className={classes.btnWrapper}>
            <button onClick={handleButton}>
              <Image
                src={playButton}
                alt="Play icon"
                width="32px"
                height="32px"
              />
              <span className={classes.playText}>Play</span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={classes.bannerImg}
        style={{
          backgroundImage: `url(${imgUrl})`,
          width: "100%",
          height: "100%",
          position: "absolute",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
        }}
      ></div>
    </div>
  );
};

export default Banner;
