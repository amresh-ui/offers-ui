export const maskAccountNumber = (accountNumber) => {

  const accountStr = accountNumber.toString();
  const lastFourDigits = accountStr.slice(-4);
  return `x${lastFourDigits}`;
};
