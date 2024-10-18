import useAppNavigation from '../../hooks/useAppNavigation';
import {CloseIcon, MbIcon, PopularLargeIcon} from '../icons';

const SplashScreen = () => {
  const {handleCloseBtnClick} = useAppNavigation();
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-utility-brand-50">
      <div className="flex justify-end p-4 fixed top-0 min-h-14 w-full">
        <div className="flex gap-4 items-center">
          <span
            onClick={handleCloseBtnClick}
            className="w-6 h-6 flex justify-center items-center">
            <CloseIcon width={12} height={12} />
          </span>
        </div>
      </div>
      <div className='flex flex-col items-center gap-6'>
        <div className="flex items-center gap-2">
          <MbIcon width={26} height={26} />
          <PopularLargeIcon />
        </div>
        <h2 className='text-base leading-[22px] font-normal text-utility-brand-700'>Marketplace</h2>
      </div>
    </div>
  );
};

export default SplashScreen;
