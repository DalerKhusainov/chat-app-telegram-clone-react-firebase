/////////////////////////////////////////////////////////////
///// THIS FUNCTION RETURNS CURRENT DATE AND TIME
///// IT IS BEING USED IN MessageInput.jsx
export const setNewDate = () => {
  const now = new Date();
  const day = `${now.getDate()}`.padStart(2, 0);
  const month = `${now.getMonth() + 1}`.padStart(2, 0);
  const year = now.getFullYear();
  const hour = `${now.getHours()}`.padStart(2, 0);
  const min = `${now.getMinutes()}`.padStart(2, 0);

  return `${day}.${month}.${year}, ${hour}:${min}`;
};

export const getFirstLetter = (value) => {
  const firstName = value[0].slice(0, 1);
  return firstName;
};
