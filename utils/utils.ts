export const formatIndianCurrency = (number: any) => {
  const formattedNumber = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(number);

  return formattedNumber;
};
