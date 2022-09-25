export const debounce = (func: any, delay = 1000) => {
  let debounceHandler: any;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceHandler);
    debounceHandler = setTimeout(() => func.apply(context, args), delay);
  };
};

export const throttle = (func: any, limit = 1000) => {
  let inThrottle: any;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const getAllCookies = () => {
  document.cookie
    .split(";")
    .reduce(
      (ac, str) =>
        Object.assign(ac, { [str.split("=")[0].trim()]: str.split("=")[1] }),
      {}
    );
};
