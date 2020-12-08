/**
 * 二分查找
 * @param {Array} list 待查找的有序数组
 * @param {Number} item 待查找的数据
 */
function binarySearch(list, item) {
  let low = 0,
    high = list.length - 1;
  while (low <= high) {
    let mid = parseInt((low + high) / 2);
    if (item === list[mid]) {
      return mid;
    } else if (item > list[mid]) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
}
const list = [1, 2, 11, 7, 9, 8, 3, 2, 4, 10];
/**
 * 选择排序
 * @param {Array} list 待查找的列表
 */
function selectionSort(list) {
  if (list.length < 2) return;
  let len = list.length;
  for (let i = 0; i < len; i++) {
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (list[minIndex] > list[j]) {
        minIndex = j;
      }
    }
    [list[i], list[minIndex]] = [list[minIndex], list[i]];
  }
}

/**
 * 冒泡排序
 * @param {Array} list 待查找的列表
 */
function bubbleSort(list) {
  if (list.length < 2) return;
  let len = list.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (list[j + 1] < list[j]) {
        [list[j], list[j + 1]] = [list[j + 1], list[j]];
      }
    }
  }
  return list;
}
