import { useRef, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { useDrag } from "@use-gesture/react";
import EnrollDiscover from "../../../pages/enrollDiscover/EnrollDiscover";
import { CloseIcon } from "../../icons";

const DiscoverBottomSheet = ({ showOverlay, setShowDiscoverOverlay }) => {
  const drawerRef = useRef(null);

  const onClose = () => {
    setShowDiscoverOverlay(false);
    document.body.classList.remove("overflow-hidden");
  };

  const [{ y }, api] = useSpring(() => ({
    y: window.innerHeight,
    config: { tension: 300, friction: 40 },
  }));

  const openSheet = () => {
    api.start({ y: 0 });
    document.body.classList.add("overflow-hidden");
  };

  const closeSheet = (velocity = 0) => {
    api.start({
      y: window.innerHeight,
      config: { velocity, tension: 300, friction: 40 },
      onRest: onClose,
    });
  };

  const bind = useDrag(
    ({
      last,
      movement: [, my],
      velocity: [, vy],
      cancel,
      direction: [, dy],
    }) => {
      const dragThreshold = window.innerHeight * 0.2;
      const isDraggingDown = dy > 0;

      if (my < -10) cancel();

      if (last) {
        if (my > dragThreshold || (vy > 0.5 && isDraggingDown)) {
          closeSheet(vy);
        } else {
          openSheet();
        }
      } else {
        api.start({ y: Math.max(0, my), immediate: true });
      }
    },
    {
      from: () => [0, y.get()],
      rubberband: false,
      filterTaps: true,
    }
  );

  useEffect(() => {
    if (showOverlay) openSheet();
    else closeSheet();
  }, [showOverlay]);

  return (
    <div className="relative z-50">
      {showOverlay && (
        <div
          className="fixed inset-0 bg-black-30 bg-opacity-50 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      <animated.div
        ref={drawerRef}
        style={{ y }}
        className="fixed bottom-0 left-0 w-full h-[95vh] bg-blue-10 rounded-t-2xl shadow-lg z-[100] touch-pan-y touch-none"
      >
        <div className="flex items-center justify-end p-4 relative min-h-14">
          <div
            {...bind()}
            className="w-full absolute top-0 left-0 h-8 flex justify-center items-center cursor-grab touch-none"
          >
            <div className="w-12 h-1.5 bg-white-40 rounded-full" />
          </div>
          <span
            onClick={onClose}
            className="w-6 h-6 flex justify-center items-center"
          >
            <CloseIcon isWhiteIcon width={12} height={12} />
          </span>
        </div>
        <EnrollDiscover onClose={onClose} />
      </animated.div>
    </div>
  );
};

export default DiscoverBottomSheet;
