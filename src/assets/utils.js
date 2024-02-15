export const getTime = (str) => {
    if (typeof str === "string") {
      let newStr = str.split(":");
      let time = newStr[0].split("T")[0];
      return time;
    }
    return "";
  };