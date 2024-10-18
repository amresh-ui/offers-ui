export const getFlatOrPercentCashbackAmount = (kind, amount) => {
  if (kind === "FLAT") return `$${amount} Cashback`;
  return `${amount ? parseFloat(amount).toFixed(2) : 0}% Cashback`;
};

export const getFlatOrPercentAmount = (kind, amount) => {
  if (kind === "FLAT") return `$${amount}`;
  return `${amount ? parseFloat(amount).toFixed(2) : 0}%`;
};

export const getSeparateIntegerAndDecimal = (amount) => {
  let formattedNumber = parseFloat(amount).toFixed(2);
  let [integerPart, decimalPart] = formattedNumber.split('.');
  return {
    integer: integerPart,
    decimal: decimalPart
  };
}