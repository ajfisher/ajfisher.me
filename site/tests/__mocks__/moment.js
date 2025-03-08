const mockFormat = jest.fn(() => "Mon, Jan 1st 2024");

const moment = jest.fn(() => ({
  format: mockFormat,
}));

export default moment;
export { moment };

