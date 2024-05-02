const summary_renderer = (data, type) => {
  return data.map((item) => item[type]).reduce((per, acc) => per + acc, 0);
};

export default summary_renderer;
