import OfferList from "../pages/offerList";
import EnrollDiscover from "../pages/enrollDiscover/EnrollDiscover";
import CategoryMain from "../pages/categoryMain";
import HelpScreen from "../pages/helpScreen";
import CategorySearchScreen from "../pages/categorySearch";
import ProductDetailScreen from "../pages/productDetail";
import SearchScreen from "../pages/searchMain";
import FollowedStores from "../pages/storesYouFollow";
import CashbackHistory from "../pages/cashbackHistory";
import MarketplaceRegistrationAccountSelection from "../pages/registration/accountSelection";
import MarketplaceRegistration from "../pages/registration/marketplaceRegistration";
import  CashbackInsights from "../pages/cashbackInsights";

export const routes = [
  {
    key: "offerWallDashboard",
    path: "/",
    component: <MarketplaceRegistration />,
  },
  {
    key: "accountSelection",
    path: "/accountSelection",
    component: <MarketplaceRegistrationAccountSelection />,
  },
  {
    key: "discover",
    path: "/discover",
    component: <EnrollDiscover />,
  },
  {
    key: "category",
    path: "/category",
    component: <CategoryMain />,
  },
  {
    key: "OfferList",
    path: "/offers",
    component: <OfferList />,
  },
  {
    key: "cashback",
    path: "/cashback",
    component: <CashbackHistory />,
  },
  {
    key: "help",
    path: "/help",
    component: <HelpScreen />,
  },
  {
    key: "followedStores",
    path: "/followedStores",
    component: <FollowedStores />,
  },
  {
    key: "categorySearch",
    path: "/categorySearch",
    component: <CategorySearchScreen />,
  },
  {
    key: "productDetail",
    path: "/productDetail",
    component: <ProductDetailScreen />,
  },
  {
    key: "productSearch",
    path: "/productSearch",
    component: <SearchScreen />,
  },
  {
    key: "CashbackInsights",
    path: "/cashbackInsights",
    component: <CashbackInsights />,
  },
];

export const cashbackTabs = [
  {
    key: "pending",
    name: "Pending",
    value: "pending",
  },
  {
    key: "earned",
    name: "Earned",
    value: "earned",
  },
  {
    key: "transferred",
    name: "Transferred",
    value: "transferred",
  },
];
export const newCashbackTabs = [
  {
    key: "pending",
    name: "Pending",
    value: "pending",
  },
  {
    key: "transferred",
    name: "Transferred",
    value: "transferred",
  },
];

export const categoryColor = {
  Others: "Other",
};
