let arr = ["a", "b", "c", "d"];
const randomize = (arr) => {
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

console.log(arr);
console.log(randomize(arr));
