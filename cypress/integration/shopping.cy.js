/// <reference types="cypress" />

// eslint-disable-next-line no-undef
beforeEach(() => {
    cy.visit('/shopping'); // Adjust this path according to your routing setup
  });
  
  // eslint-disable-next-line no-undef
  it('should load the shopping page with necessary elements', () => {
    cy.get('input[placeholder="Search..."]').should('exist');
    cy.get('select[aria-label="Filter by category"]').should('exist');
    cy.get('input[aria-label="Minimum price"]').should('exist');
    cy.get('input[aria-label="Maximum price"]').should('exist');
    cy.get('input[aria-label="Minimum rating"]').should('exist');
    cy.get('select[aria-label="Sort products"]').should('exist');
    cy.contains('Visit Cart:').should('exist');
  });
  
  // eslint-disable-next-line no-undef
  it('should filter products by category', () => {
    cy.get('select[aria-label="Filter by category"]').select('Category 1');
    cy.contains('Product 1').should('exist');
    cy.contains('Product 2').should('not.exist');
  });
  
  // Add more tests for other functionalities like sorting, pagination, etc.
  