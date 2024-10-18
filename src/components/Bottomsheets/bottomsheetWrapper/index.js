import React from "react";
import "react-spring-bottom-sheet/dist/style.css";
import { BottomSheet } from "react-spring-bottom-sheet";
import { CloseIcon } from "../../icons";

function BottomSheetComponentWrapper({
  showOverlay,
  onDismiss,
  maxHeightRatio,
  children,
  className,
  isWhiteIcon,
  icon,
}) {
  return (
    <BottomSheet
      open={showOverlay}
      onDismiss={() => onDismiss(false)}
      snapPoints={({ maxHeight }) => [maxHeight * maxHeightRatio]}
    >
      <div className={`flex flex-col text-base font-normal px-4 ${className}`}>
        <div className="flex w-full justify-end pb-4">
          <span
            className={`flex items-center justify-center w-6 h-6 ${icon?.className}`}
            onClick={() => onDismiss(false)}
          >
            <CloseIcon
              height={icon?.height || 12}
              width={icon?.width || 12}
              isWhiteIcon={isWhiteIcon}
            />
          </span>
        </div>

        {children}
      </div>
    </BottomSheet>
  );
}

export default BottomSheetComponentWrapper;
