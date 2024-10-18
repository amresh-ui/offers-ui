import { CloseIcon } from "../icons";

const BottomCardWrapper = ({ onClose, children }) => {
  return (
    <div className="fixed flex justify-center items-center inset-0 bg-opacity-80 z-10">
      <div className="bg-white-100 absolute bottom-0 w-full p-4 rounded-t-3xl">
      <div className="flex w-full justify-end mb-8">
        <span className="flex items-center justify-center w-6 h-6" onClick={onClose}>
          <CloseIcon height={10} width={10} />
        </span>
      </div>
      <div className="px-4">{children}</div>
      </div>
    </div>
  );
};

export default BottomCardWrapper;
