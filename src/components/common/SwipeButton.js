import React, { useState, useEffect, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import Arrow from "../../assets/arrow.png";

const dirTypes = ["Left", "Down", "Up"];

const findLeft = (element) => {
  var rec = element.getBoundingClientRect();
  return rec.left + window.scrollX;
};

const SwipeButton = ({
  mainText,
  overlayText,
  onSlideDone,
  reset,
  classList = "",
  overlayClassList = "",
  caretClassList = "",
  delta = 10,
  minSlideWidth = 0.6,
  minSlideVelocity = 0.6,
  caret = null,
  customCaretWidth = 44,
  disabled = false,
}) => {
  const [overlayWidth, setOverlayWidth] = useState(customCaretWidth);
  const [slideComplete, setSlideComplete] = useState(false);
  const buttonRef = useRef();

  useEffect(() => {
    if (reset) {
      setSlideComplete(false);
      setOverlayWidth(customCaretWidth);
    }
  }, [reset]);

  const handlers = useSwipeable({
    onSwipedRight: (data) => {
      if (slideComplete || disabled) return;
      const butWidth = buttonRef.current.offsetWidth;
      if (data.velocity > minSlideVelocity) {
        setOverlayWidth(butWidth);
        setSlideComplete(true);
        setTimeout(() => onSlideDone(), 100);
      } else {
        const offsetLeft = findLeft(buttonRef.current);
        const startPos = Math.abs(data.initial[0] - offsetLeft);
        if (
          startPos <= 100 + customCaretWidth &&
          (data.event.type === "touchend"
            ? data.event.changedTouches[0].clientX - offsetLeft
            : data.event.offsetX) >
            minSlideWidth * butWidth
        ) {
          setOverlayWidth(butWidth);
          setSlideComplete(true);
          setTimeout(() => onSlideDone(), 100);
        } else setOverlayWidth(customCaretWidth);
      }
    },
    onSwiping: (data) => {
      if (slideComplete || disabled || dirTypes.includes(data.dir)) return;
      const offsetLeft = findLeft(buttonRef.current);
      const startPos = Math.abs(data.initial[0] - offsetLeft);
      if (startPos <= 100 + customCaretWidth) {
        if (data.event.type && data.event.type === "touchmove")
          setOverlayWidth(data.event.touches[0].clientX - offsetLeft);
        else {
          if (data.event.offsetX > customCaretWidth) {
            setOverlayWidth(data.event.offsetX);
          }
        }
      }
    },
    delta,
    trackMouse: true,
    preventDefaultTouchmoveEvent: true,
  });

  return (
    <div
      className={`flex justify-center items-center relative overflow-hidden min-w-52 min-h-12 p-2.5 text-sm font-medium select-none w-full rounded-lg ${
        disabled
          ? "bg-gray-400 text-gray cursor-not-allowed"
          : "bg-blue-30 text-blue-20 cursor-default"
      }  ${classList}`}
      {...(!disabled && handlers)}
      ref={(t) => {
        handlers.ref(t);
        buttonRef.current = t;
      }}
    >
      <div
        className={`w-10 absolute left-0 top-0 z-10 h-full rounded-lg pointer-events-none select-none transition-width duration-200 ease-out will-change-[width] overflow-hidden justify-center ${overlayClassList}`}
        style={{ width: overlayWidth }}
      >
        <div className="relative w-full h-full pointer-events-none select-none">
          <div
            style={{
              width: customCaretWidth,
              maxWidth: customCaretWidth,
            }}
            className={`w-10 max-w-11 bg-blue-10 absolute min-w-0 right-0 top-1/2 h-full transform -translate-y-1/2 z-20 p-2 pointer-events-none select-none flex justify-center items-center ${caretClassList}`}
          >
            {caret ? (
              caret
            ) : (
              <img className="max-w-full w-4" src={Arrow} alt="caret" />
            )}
          </div>
          <div
            className="absolute flex top-0 left-0 h-full w-full items-center text-white bg-blue-10 whitespace-nowrap pointer-events-none select-none justify-center"
            style={{ width: overlayWidth }}
          >
            {overlayText}
          </div>
        </div>
      </div>
      {mainText}
    </div>
  );
};

export default SwipeButton;
