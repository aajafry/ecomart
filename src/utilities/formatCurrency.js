
export const formatCurrency = (value) => {
    if (typeof value !== "number" || isNaN(value)) return "$0.00"; // Handle null or undefined values
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
};