import React, { FC, memo, useState, useEffect } from 'react';
import Swiper from 'swiper';
import { Banner } from 'models';
import styles from './index.module.scss';
import 'swiper/css/swiper.min.css';
interface SliderProps {
  bannerList: Array<Banner>;
}
//banner图片
const Slider: FC<SliderProps> = memo(({ bannerList }) => {
  const [swiper, setSwiper] = useState<Swiper>();
  useEffect(() => {
    if (bannerList.length && !swiper) {
      const slideSwiper = new Swiper('.slider-container', {
        loop: true,
        autoplay: true,
        pagination: { el: '.swiper-pagination' },
      });
      setSwiper(slideSwiper);
    }
  }, [bannerList.length, swiper]);
  return (
    <div className={styles['slider-container']}>
      <div className={styles.before}></div>
      <div className="slider-container">
        <div className="swiper-wrapper">
          {bannerList.map((slider) => {
            return (
              <div className="swiper-slide" key={slider.targetId}>
                <div className="slider-nav">
                  <img
                    src={slider.imageUrl}
                    width="100%"
                    height="100%"
                    alt="推荐"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
});
export default Slider;
