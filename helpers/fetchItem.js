const fetchItem = async (id) => {
  if (!id) return new Error('You must provide an url');
  const result = await fetch(`https://api.mercadolibre.com/items/${id}`)
  .then((response) => response.json());
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
