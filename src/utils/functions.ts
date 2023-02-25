import { CartItem } from 'app/store/features/cart/cartSlice';

export const isEmpty = (value: unknown) => {
  if (value === undefined || value === null) {
    return true;
  }
  if (typeof value === 'string') {
    return value.trim().length === 0;
  }
  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }
  return false;
};

export const intersection = (arr1: [], arr2: []) =>
  arr1.filter((item) => arr2.includes(item));

export function deepClone<T>(obj: T) {
  return structuredClone(obj) as T;
}

export const calculateSum = (list: CartItem[]) => {
  let sum = 0;
  list.forEach((item) => {
    sum += item.price * item.quantityInCart;
  });
  return sum;
};

export const formatPrice = (price: number | undefined) => {
  if (price || price === 0) {
    return price.toLocaleString('vi', {
      style: 'currency',
      currency: 'VND',
    });
  }
  return price;
};

// export const toCamelCase = (input: string): string =>
//   // Loại bỏ dấu cách và chuyển các ký tự đầu tiên thành chữ thường
//   input
//     .trim()
//     .toLowerCase()
//     // Chuyển đổi chữ thường thành chữ hoa
//     .replace(/[-_]+/g, ' ')
//     .replace(/ (.)/g, ($1) => $1.toUpperCase())
//     // Xóa dấu cách và ký tự gạch ngang
//     .replace(/ /g, '');

function capitalizeFirstThree(str: string): string {
  if (!str) return '';
  if (str.length <= 3) return str.toUpperCase();
  return str.slice(0, 3).toUpperCase() + str.slice(3);
}

export const toTitleCase = (camelCase: string): string => {
  const result = camelCase.replace(/([A-Z])/g, ' $1');
  if (result.includes('cpu')) {
    return capitalizeFirstThree(result);
  }
  return result.charAt(0).toUpperCase() + result.slice(1);
};
