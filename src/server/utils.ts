const serverUtils = {
  sleep: ms =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, ms);
    }),

  parseTodoIdFromUrl: url => +url.replace("/todo/", ""),
};

export default serverUtils


