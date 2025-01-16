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
  