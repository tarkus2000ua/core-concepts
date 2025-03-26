import React from 'react';
import { Counter } from '../../src/components/counter/Counter'; // Adjust the import to your file structure

/// <reference types="cypress" />

describe('Counter Component', () => {
  beforeEach(() => {
    cy.mount(<Counter initialValue={5} />);
  });

  it('renders initial value from props', () => {
    cy.get('.count').should('contain', '5');
  });

  it('decrements the displayed value when the decrement button is clicked', () => {
    cy.get('.button').contains('-').click();

    cy.get('.count').should('contain', '4');
  });

  it('increments the displayed value when the increment button is clicked', () => {
    cy.get('.button').contains('+').click();

    cy.get('.count').should('contain', '6');
  });
});
