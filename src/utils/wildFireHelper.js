export const getPartnerUrl = (merchantId, url) =>
  `https://wild.link/e?c=${merchantId}&d=123456&url=${encodeURI(url)}`;
