require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  expect.assertions(1);
  test('Testa se é função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  
  test('Testa se "fetch" é chamado', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  
  test('Testa se "fetch" é chamado corretamente', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    const endPoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(endPoint);
  });
  
  test('Testa se retorna corretamente quando "computador" é usado', async () => {
    const data = await fetchProducts('computador');
    expect(data).toEqual(computadorSearch);
  });
  
  test('Testa se retorna erro quando nenhum parâmetro é usado', async () => {
    expect(await fetchProducts()).toEqual(new Error('You must provide an url'));
  });
});
