import Image from "next/image";
import { useState } from "react";
import cls from 'classnames'
import {motion } from 'framer-motion';

import classes from "./card.module.css";
const Card = ({
  imgUrl = "https://images.unsplash.com/photo-1635805739892-ab7b431400f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  size = "medium",
  id
}) => {
  const [imgSrc, setImgSrc] = useState(imgUrl);
  const classMap = {
    large: classes.lgItem,
    medium: classes.mdItem,
    small: classes.smItem,
  };
const scale = id === 0 ? {scaleY:1.1} : {scale: 1.1};
  const handleErrorSrc = () => {
    setImgSrc(
      "https://images.unsplash.com/photo-1635805739892-ab7b431400f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
    );
  };
  return (
    <div className={classes.container} >
      <motion.div className={`${classes.imgMotionWrapper} ${classMap[size]}`} whileHover={{...scale}}>
        <Image
          src={imgSrc}
          alt="img"
          layout="fill"
          className={classes.cardImg}
          onError={handleErrorSrc}
        />
      </motion.div>
    </div>
  );
};

export default Card;
