export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getUserToken = (): string | null => {
  if (localStorage.getItem("accessToken")) {
    const userDataStr = localStorage.getItem("accessToken");
    return userDataStr;
  } else {
    return null;
  }
};
