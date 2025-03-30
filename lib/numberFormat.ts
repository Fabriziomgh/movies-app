export const numberFormat = (value: number) => {
   return new Intl.NumberFormat('en-US', {
      currency: 'USD',
      style: 'currency',
   }).format(value);
};
