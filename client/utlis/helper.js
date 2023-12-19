import {formatDistanceToNow} from "date-fns"
export const getRandomColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);

export const formatName = function (name) {
  let nameArr = name.split(" ");

  if (nameArr.length === 1) {
    return nameArr[0]?.toUpperCase().slice(0, 2);
  }

  return (
    nameArr[0]?.toUpperCase().slice(0, 1) +
    nameArr[1]?.toUpperCase().slice(0, 1)
  );
};


export const eposideTime = function(timestamp) {
  const date = new Date(timestamp);
  // Formatting date components
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear().toString().slice(-2);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  // Creating the formatted string
  const formattedDate = `${day} ${month} ${year} | ${hours}:${minutes}`;
  return formattedDate;
}

export const formatProjectTime =  function(timestamp){
  return formatDistanceToNow(new Date(timestamp));
}




