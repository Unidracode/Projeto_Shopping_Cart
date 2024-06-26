// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

const item = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');
const cartItem = document.querySelectorAll('.cart__item');
const cartEmpty = document.querySelector('.empty-cart');
const cart = document.querySelector('.cart');

const loading = () => {
  const p = document.createElement('p');
  p.className = 'loading';
  p.innerText = 'carregando...';
  cart.appendChild(p);
};

const loaded = () => {
  const loadingClass = document.querySelector('.loading');
  loadingClass.remove();
};

function saveCartItemLocal() {
  localStorage.setItem('cartItems', cartItems.innerHTML);
}

function cartItemClickListener(event) {
  const eventTarget = event.target;
  eventTarget.remove();
  saveCartItemLocal();
}

function loadCartItems() {
  cartItems.innerHTML = localStorage.getItem('cartItems');
  const loadCartItem = cartItem;
  loadCartItem.forEach((items) => {
    items.addEventListener('click', cartItemClickListener);
  });
}

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
//  const getIdFromProductItem = (product) => product.querySelector('span.item_id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const products = async () => {
  loading();
  const productsArr = await fetchProducts('computador');
  loaded();
  const section = productsArr.results.map((product) => ({
    id: product.id,
    title: product.title,
    thumbnail: product.thumbnail,
    price: product.price,
  }));
  section.forEach((product) => item.appendChild(createProductItemElement(product)));
};

const getCartProduct = async (ID) => {
  loading();
  const returnedProduct = await fetchItem(ID);
  loaded();
  const { id, title, price } = returnedProduct;
  const objReturnedProduct = {
    id,
    title,
    price,
  };
  cartItems.appendChild(createCartItemElement(objReturnedProduct));
  saveCartItemLocal();
};

const addProductToCart = (event) => {
  const eventTarget = event.target;
  const eventId = eventTarget.parentNode.firstChild.innerText;
  getCartProduct(eventId);
};

const emptyCart = () => {
  cartItems.innerHTML = '';
};

window.onload = () => {
  products();
  item.addEventListener('click', addProductToCart);
  cartItems.addEventListener('click', cartItemClickListener);
  cartEmpty.addEventListener('click', emptyCart);
  loadCartItems();
};
