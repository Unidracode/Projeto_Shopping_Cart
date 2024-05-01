const fetchProducts = async (item) => {
  if (!item) return new Error('You must provide an url');
  const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${item}`)
  .then((response) => response.json());
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
