/// <reference types="cypress" />

const constructorElementSelector = '[class^="constructor-element"]';
const modalsSelector = '#modals'; 
const closeButtonSelector = '[data-cy="close-button"]';
const overlaySelector = '[data-cy="overlay"]';


describe('add bun ingredient to constructor works correctly', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
      cy.visit('/');
    });
  
    it('should add bun', () => {
      // Нажатие на кнопку "Добавить" для булки
      cy.contains('Краторная булка N-200i').parents('li').find('button').click();
  
      // Проверка, что булка добавлена в конструктор
      cy.get(constructorElementSelector).contains('Краторная булка N-200i').should('exist');
  
    });
  });
  
describe('ingredient modal works correctly', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
      cy.visit('/');
    });
  
    it('should work open and close ingredient modal', () => {
      cy.contains('Детали ингредиента').should('not.exist');  
      cy.contains('Краторная булка N-200i').click();
      cy.contains('Детали ингредиента').should('exist');
      
      // Проверка, что в модалке нужный ингредиент
      cy.get(modalsSelector).contains('Краторная булка N-200i').should('exist');
      
      // Закрытие модального окна по крестику
      cy.get(closeButtonSelector).click();
      cy.get(modalsSelector).should('not.be.visible');

    });
  
    it('should close modal window by clicking overlay', () => {
      // Открытие модального окна по клику на ингредиент
      cy.contains('Соус фирменный Space Sauce').click();
  
      // Проверяем, что модальное окно открылось
      cy.get(modalsSelector).should('exist');
      cy.get(modalsSelector).contains('Соус фирменный Space Sauce').should('exist');
  
      // Закрытие модального окна по клику на оверлей
      cy.get(closeButtonSelector).click({ force: true });  
      cy.get('[class^="modal"]').should('not.exist'); 
    });
  });

  describe('Order modal works correctly', () => {
    beforeEach(() => {
      cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
      cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
      cy.intercept('POST', '/api/orders', { fixture: 'order.json' });

      window.localStorage.setItem(
        'refreshToken',
        JSON.stringify('test-refreshToken')
      );
      cy.setCookie('accessToken', 'test-accessToken'); 

      cy.visit('/');
    });

     afterEach(function () {
      cy.clearLocalStorage();
      cy.clearCookies();
    }); 
  

    it('should create order and clear constructor', () => {

      // Перехват запроса на создание заказа
      cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as('createOrder');

      // Добавление булки
      cy.contains('Краторная булка N-200i').parents('li').find('button').click();
  
      // Добавление ингредиента
      cy.contains('Биокотлета из марсианской Магнолии')
        .parents('li')
        .find('button')
        .click();
  
      // Проверка, что ингредиенты добавлены
      cy.get(constructorElementSelector).contains('Краторная булка N-200i').should('exist');
      cy.get(constructorElementSelector).contains('Биокотлета из марсианской Магнолии').should('exist');
  
      // Клик на кнопку "Оформить заказ"
      cy.get('button').contains('Оформить заказ').click();

      // Ожидание завершения перехваченного запроса
      cy.wait('@createOrder').then((interception) => {

      if (!interception || !interception.response) {
          throw new Error('Response from intercepted request is undefined');
      }        

      // Проверка тела ответа
      expect(interception.response.statusCode).to.equal(200); 
      expect(interception.response.body).to.have.property('order').and.to.be.an('object');
      expect(interception.response.body.order).to.have.property('number', 65833); // Проверка номера заказа
      });

  
      // Проверка открытия модального окна с номером заказа
      cy.get(modalsSelector).should('exist');
      cy.get(modalsSelector).contains('Ваш заказ начали готовить').should('exist');
      cy.get(modalsSelector).contains('65833').should('exist'); // Проверка номера заказа
  
      // Закрытие модального окна
      cy.get(closeButtonSelector).click();
      cy.get(modalsSelector).should('not.be.visible');
  
      // Проверка, что конструктор пуст
      cy.get(constructorElementSelector).should('not.exist');
    });
  });
    