require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  test('Testa se é função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  
  test('Testa se é chamado', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  
  test('Testa se é chamado corretamente', async () => {
    await fetchItem('MLB1615760527')
    const endPoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(fetch).toHaveBeenCalledWith(endPoint);
  });

  test('Testa se retorna corretamente quando "MLB1615760527" é usado', async () => {
    const data = await fetchItem('MLB1615760527');
    expect(typeof data).toEqual(typeof item);
    console.log(item);
  });

  test('Testa se retorna erro se nenhum parâmetro é usado', async () => {
    expect(await fetchItem()).toEqual(new Error('You must provide an url'));
  })
});
