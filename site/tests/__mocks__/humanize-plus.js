export const compactInteger = jest.fn().mockImplementation((num) =>
  num?.toString() || "0"
);

export default { compactInteger };
