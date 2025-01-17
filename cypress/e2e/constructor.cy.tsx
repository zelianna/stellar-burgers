/// <reference types="cypress" />
describe('add bun ingredient to constructor works correctly', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
      cy.visit('http://localhost:4000');
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
      cy.visit('http://localhost:4000');
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
  