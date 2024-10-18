const useAppNavigation = () => {
  const handleCloseBtnClick = () => {
    if (
      window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.eventHandler
    ) {
      window.webkit.messageHandlers.eventHandler.postMessage("home");
    }
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage("home");
    }
  };
  return {
    handleCloseBtnClick,
  };
};

export default useAppNavigation;
