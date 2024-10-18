import React from "react";
import Modal from "../modal";
import ConfirmationModalButtons from "./confirmationPopupButtons/index.js";
import HeaderBar from "./headerBar/index.js";

const HeaderTitle = () => {
  return (
    <p className="text-base pt-2.5 font-semibold text-black-30 text-center">
      You're now leaving MiBanco
    </p>
  );
};

const PopupContent = () => {
  return (
    <p className="text-center text-xs font-normal pt-2.5 pb-4 px-5">
      You are about to leave the MiBanco app and enter an external merchant site
      not operated by us. Please be aware that our privacy policy, security
      guarantees, and customer support assurances do not apply to external
      websites. Proceed with caution, and for any purchase-related queries,
      please contact the merchant directly.
    </p>
  );
};

const ConfirmationModal = ({ onSubmit, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} parentClassName="absolute top-0 rounded-[14px]">
      <div className="p-2.5">
        <HeaderTitle />
        <PopupContent />
      </div>
      <ConfirmationModalButtons onSubmit={onSubmit} onClose={onClose} />
    </Modal>
  );
};

export default ConfirmationModal;
