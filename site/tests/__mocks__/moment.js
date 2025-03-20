// __mocks__/moment.js
const moment = jest.fn(() => {
  return {
    format: (formatStr) => {
      // If the format is "YYYY/MM/DD", return the real formatted date.
      if (formatStr === 'YYYY/MM/DD') {
        return "2021/08/05";
      }
      // Otherwise, return a default mock string.
      return "Mon, Jan 1st 2024";
    },
  };
});

export default moment;
export { moment };

