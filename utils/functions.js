export function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

export const randomize = (arr) => {
  const len = arr.length;

  let newArr = [];
  let index = 0;
  let newIndex;
  while (index < len) {
    newIndex = Math.floor(Math.random() * len);
    if (!newArr[newIndex]) {
      newArr[newIndex] = arr[index];
      index++;
    }
  }
  return newArr;
};
