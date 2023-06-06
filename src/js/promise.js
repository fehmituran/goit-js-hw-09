
export function myPromise(delay, callback) {
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        if (callback) {
          resolve(callback());
        } else {
          reject();
        }
      }, delay * 1000);
    });
  };
  