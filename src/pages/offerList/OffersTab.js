import { useNavigate } from "react-router-dom";
import { Button, Tabs } from "../../components/common";
import { categoriesTabs } from "../../constants/categoriesTabs";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { getFlatOrPercentCashbackAmount } from "../../utils/amountHelper";
import Card from "../../components/Card";
import Logo from "../../assets/Logo.png";
import { AppContext } from "../../AppProvider";
import useFavorite from "../../hooks/useFavorite";
import Toast from "../../components/toast";

const visibleCount = 6;
const OffersTab = ({ data, categoryName, hideViewMore }) => {
  const navigate = useNavigate();
  const { setOfferDetail, setCategorySection } = useContext(AppContext);
  const { handleFavoriteClick } = useFavorite();

  const [currentTab, setCurrentTab] = useState(
    categoryName || categoriesTabs[0].name
  );
  const [toastMessage, setToastMessage] = useState("");
  const containerRef = useRef(null);
  const itemRefs = useRef([]);

  const handleShowToast = (message) => {
    setToastMessage(message);
  };

  const scrollToItem = () => {
    const currentIndex = categoriesTabs.findIndex(
      (item) => item.name === categoryName
    );
    const selectedItem = itemRefs.current[currentIndex];
    if (selectedItem) {
      selectedItem.scrollIntoView({
        inline: "start",
      });
    }
  };

  useEffect(() => {
    if (categoryName) {
      scrollToItem();
    }
  }, []);

  const displayAllData = () => {
    const currentData = data[currentTab] || [];
    const sliceData = !hideViewMore
      ? currentData.slice(0, visibleCount)
      : currentData;
    const getSmallRootCss = (index) => {
      if (hideViewMore) {
        return `!py-2.5 mt-2 ${
          index < sliceData.length - 1 ? "border-b-[0.5px]" : ""
        }`;
      } else if (index > 1 && index < visibleCount) {
        return "border-t-[0.5px]";
      }
    };
    return sliceData.map((item, index) => {
      const img = item?.Img
        ? item.Img.filter(
            (item) => item.Kind === "LOGO" || item.Kind === "LOGORECT"
          )
        : [];
      const featureImg = item?.Img
        ? item.Img.filter((item) => item.Kind === "FEATURED")
        : [];
      return (
        <div key={`${index}-${item?.Name}`}>
          <Card
            img={featureImg && featureImg.length > 0 ? featureImg[0].URL : Logo}
            logoImg={img && img.length > 0 ? img[0].URL : Logo}
            desc={getFlatOrPercentCashbackAmount(
              item?.Kind,
              item?.CashbackAmount
            )}
            title={item?.Name}
            isFavorite={item?.isFavorite}
            size={index === 0 ? "large" : "small"}
            onClick={() => {
              setOfferDetail(item);
              navigate("/productDetail");
            }}
            classes={{
              descLargeRoot: hideViewMore ? "!py-2" : "",
              img: hideViewMore ? "w-14 h-14" : "",
              smallRoot: getSmallRootCss(index),
            }}
            onFavClick={(e) => {
              e?.stopPropagation();
              handleFavoriteClick(item, handleShowToast);
            }}
          />
        </div>
      );
    });
  };

  return (
    <>
      <div ref={containerRef}>
        <Tabs.Container
          defaultValue={categoriesTabs[0].value}
          value={currentTab}
          onChange={(v) => {
            setCurrentTab(v);
            if (hideViewMore) {
              setCategorySection(v);
            }
          }}
        >
          <Tabs.List className={hideViewMore ? "mb-5" : "mb-4"}>
            {categoriesTabs.map((item, i) => (
              <div
                key={`${i}-${item.name}`}
                className="flex flex-shrink-0"
                ref={(el) => (itemRefs.current[i] = el)}
              >
                <Tabs.Item value={item.value}>{item.name}</Tabs.Item>
              </div>
            ))}
          </Tabs.List>
          {categoriesTabs.map((item, i) => (
            <Fragment key={`${item.name}-${i}`}>
              <Tabs.Panel value={item.value}>
                {data[item.value] && data[item.value].length > 0 && (
                  <div>
                    {displayAllData()}
                    {data[item.value] &&
                      data[item.value].length > 6 &&
                      !hideViewMore && (
                        <Button
                          className="w-full !bg-tertiary flex items-center justify-center mt-4"
                          onClick={() => {
                            setCategorySection(item.value);
                            navigate("/category");
                          }}
                        >
                          <span className="text-sm font-medium text-tertiary">
                            View more
                          </span>
                        </Button>
                      )}
                  </div>
                )}
              </Tabs.Panel>
            </Fragment>
          ))}
        </Tabs.Container>
      </div>
      {toastMessage.length ? (
        <div className="fixed left-5 right-5 top-[4px] z-50">
          <Toast
            message={toastMessage}
            duration={3000}
            onClose={() => setToastMessage("")}
          />
        </div>
      ) : null}
    </>
  );
};

export default OffersTab;
