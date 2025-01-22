/// <reference types="cypress" />
describe('add bun ingredient to constructor works correctly', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
      cy.visit('/');
    });
  
    it('should add bun', () => {
      // Нажатие на кнопку "Добавить" для булки
      cy.contains('Краторная булка N-200i').parents('li').find('button').click();
  
      // Проверка, что булка добавлена в конструктор
      cy.get('[class^="constructor-element"]').contains('Краторная булка N-200i').should('exist');
  
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
      cy.get('#modals').contains('Краторная булка N-200i').should('exist');
      
      // Закрытие модального окна по крестику
      cy.get('[data-cy="close-button"]').click();
      cy.get('#modals').should('not.be.visible');

    });
  
    it('should close modal window by clicking overlay', () => {
      // Открытие модального окна по клику на ингредиент
      cy.contains('Соус фирменный Space Sauce').click();
  
      // Проверяем, что модальное окно открылось
      cy.get('#modals').should('exist');
      cy.get('#modals').contains('Соус фирменный Space Sauce').should('exist');
  
      // Закрытие модального окна по клику на оверлей
      cy.get('[data-cy="overlay"]').click({ force: true });  
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
      // Добавление булки
      cy.contains('Краторная булка N-200i').parents('li').find('button').click();
  
      // Добавление ингредиента
      cy.contains('Биокотлета из марсианской Магнолии')
        .parents('li')
        .find('button')
        .click();
  
      // Проверка, что ингредиенты добавлены
      cy.get('[class^="constructor-element"]').contains('Краторная булка N-200i').should('exist');
      cy.get('[class^="constructor-element"]').contains('Биокотлета из марсианской Магнолии').should('exist');
  
      // Клик на кнопку "Оформить заказ"
      cy.get('button').contains('Оформить заказ').click();
  
      // Проверка открытия модального окна с номером заказа
      cy.get('#modals').should('exist');
      cy.get('#modals').contains('Ваш заказ начали готовить').should('exist');
      cy.get('#modals').contains('65833').should('exist'); // Проверка номера заказа
  
      // Закрытие модального окна
      cy.get('[data-cy="close-button"]').click();
      cy.get('#modals').should('not.be.visible');
  
      // Проверка, что конструктор пуст
      cy.get('[class^="constructor-element"]').should('not.exist');
    });
  });
    