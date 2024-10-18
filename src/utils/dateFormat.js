export const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const date = new Date(dateString);

  const formattedDate = date.toLocaleString("en-US", options);
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  return `${formattedDate} ${formattedTime}`;
};


export const formatDateWithoutTime = (dateString) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const date = new Date(dateString);
  const formattedDate = date.toLocaleString("en-US", options);
  return `${formattedDate}`;
};

export const formatDateWithFullMonthName = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(dateString);
  const formattedDate = date.toLocaleString("en-US", options);
  return `${formattedDate}`;
};



export const formatDateFilterBottomSheet = (date) => {
  const d = new Date(date);
  const day = String(d.getUTCDate()).padStart(2, '0');
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const year = d.getUTCFullYear();
  return `${month}/${day}/${year}`;
};

export const formatDateForFilter = (date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}/${mm}/${dd}`;
};