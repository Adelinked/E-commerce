export const dupArr = (arr, n) => {
  if (n === 0) return arr;
  let newArr = arr;
  let length = arr.length;
  for (let j = 0; j < n; j++) {
    newArr = [
      ...newArr,
      ...arr.map((i, index) => ({
        ...i,
        id: length + index + j * length + 1,
      })),
    ];
  }
  return newArr;
};
