import { Button, Divider, Flex } from "../../common";

const ConfirmationModalButtons = ({ onSubmit, onClose }) => {
  return (
    <Flex className="w-full border-t border-solid border-gray-90">
      <Button
        className="py-3 w-full bg-white text-xs font-normal !text-black-20 leading-[14px]"
        size="large"
        variant="link"
        onClick={onClose}
      >
        Cancel
      </Button>
      <Divider size="medium" orientation="vertical" />
      <Button
        className="py-3 w-full bg-white text-xs font-semibold !text-black-20 leading-[14px]"
        size="large"
        variant="link"
        onClick={onSubmit}
      >
        Continue
      </Button>
    </Flex>
  );
};

export default ConfirmationModalButtons;
