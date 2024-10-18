import React from "react";
import BottomSheetComponentWrapper from "../bottomsheetWrapper";

function ActivityBottomSheet({ showOverlay, onDismiss }) {
  return (
    <BottomSheetComponentWrapper
      showOverlay={showOverlay}
      onDismiss={onDismiss}
      maxHeightRatio={0.3}
    >
      <h3 className="font-semibold text-base leading-[22px] text-dark-blue font-public pb-[4px]">
        All activity
      </h3>
      <p className="text-secondary text-sm font-public">
        All activity shows all the cashback you've received within the selected
        time frame
      </p>
      <p className="text-secondary text-sm font-public  mt-4">
        Pending cashback is not included.
      </p>
    </BottomSheetComponentWrapper>
  );
}

export default ActivityBottomSheet;