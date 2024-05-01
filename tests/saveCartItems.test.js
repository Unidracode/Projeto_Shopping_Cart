const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  test('Testa se localStorage.item é chamado', () => {
    saveCartItems('cartItem');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  test('Testa se localStorage.item é chamado com dois parâmetros', () => {
    saveCartItems('cartItem')
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', 'cartItem');
  });
});
