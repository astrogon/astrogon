import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarDay,
  FaQuestion,
} from "react-icons/fa";

type Props = {
  cards: string[];
};

const getTodayIndex = () => {
  const today = new Date();
  const year = today.getFullYear();
  const startOfYear = new Date(year, 0, 0);
  const diff = today.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  let leapYearAdjustment = 0;
  if (
    ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) &&
    dayOfYear > 59
  ) {
    leapYearAdjustment = 1;
  }

  return dayOfYear + leapYearAdjustment - 1;
};

const ConversationSwiper = ({ cards }: Props) => {
  const todayIndex = getTodayIndex();
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(todayIndex);

  useEffect(() => {
    if (swiper) {
      swiper.slideTo(0, 0);
      setCurrentIndex(0);
      swiper.on("slideChange", () => setCurrentIndex(swiper.realIndex));
    }
  }, [swiper]);

  return (
    <div className="conversation-swiper">
      <Swiper
        onSwiper={setSwiper}
        onSlideChange={(s) => setCurrentIndex(s.realIndex)}
        spaceBetween={10}
        slidesPerView={1}
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index}>
            <div className="glass col-10 mx-auto my-12 min-h-64 content-center rounded-lg p-4 text-center sm:col-8 md:col-6">
              <h3>{card}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <nav className="flex justify-center pb-8">
        <div className="glass m-2 w-48 flex-col justify-center rounded-md p-2">
          <div className="row items-center">
            <div
              className="col-4 cursor-pointer p-0 text-center align-middle text-txt-p dark:text-darkmode-txt-p"
              onClick={() => swiper?.slidePrev()}
              aria-label="Previous card"
            >
              <FaArrowLeft className={"m-2 inline-block"} />
            </div>
            <div className="col-4 p-0 text-center text-txt-p dark:text-darkmode-txt-p">
              <input
                type="number"
                className="w-16 border-none bg-transparent text-center"
                min="1"
                max={cards.length}
                value={currentIndex + 1}
                onChange={(e) => {
                  const newIndex = parseInt(e.target.value, 10) - 1;
                  if (
                    !isNaN(newIndex) &&
                    newIndex >= 0 &&
                    newIndex < cards.length
                  ) {
                    swiper?.slideTo(newIndex);
                    setCurrentIndex(newIndex);
                  }
                }}
                aria-label="Jump to card number"
              />
            </div>
            <div
              className="col-4 cursor-pointer p-0 text-center text-txt-p dark:text-darkmode-txt-p"
              onClick={() => swiper?.slideNext()}
              aria-label="Next card"
            >
              <FaArrowRight className="m-2 inline-block" />
            </div>
          </div>
          <div className="row content-center justify-center">
            <div
              className="col-4 cursor-pointer p-0 text-center text-txt-p dark:text-darkmode-txt-p"
              onClick={() => swiper?.slideTo(todayIndex)}
              title="Jump to today's card"
              aria-label="Jump to today's card"
            >
              <FaCalendarDay className={"m-2 inline-block"} />
            </div>
            <div
              className="col-4 cursor-pointer p-0 text-center text-txt-p dark:text-darkmode-txt-p"
              onClick={() =>
                swiper?.slideTo(Math.floor(Math.random() * cards.length))
              }
              title="Jump to random card"
              aria-label="Jump to random card"
            >
              <FaQuestion className={"m-2 inline-block"} />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default ConversationSwiper;
