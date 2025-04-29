describe('Movie List Page - URL Persisted State', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should persist search query in URL and survive refresh', () => {
    const testQuery = 'The Shawshank Redemption';

    // Perform search
    cy.get('input[type="search"]')
      .type(testQuery)
      .type('{enter}');

    // Verify URL contains search param
    cy.url().then((url) => {
      const urlObj = new URL(url);
      const params = new URLSearchParams(urlObj.search);
      expect(params.get('searchQuery')).to.eq(testQuery);
    });

    // Verify results reflect search
    cy.get('.movie-tile').should('exist');

    // Refresh page
    cy.reload();

    // Verify search query persists
    cy.url().then((url) => {
      const urlObj = new URL(url);
      const params = new URLSearchParams(urlObj.search);
      expect(params.get('searchQuery')).to.eq(testQuery);
    });
    cy.get('input[type="search"]').should('have.value', testQuery);
    cy.get('.movie-tile').should('exist');
  });

  it('should persist genre filter in URL and survive refresh', () => {
    const testGenre = 'COMEDY';

    // Select genre
    cy.get('[data-testid="genre-select"]')
      .find('.option')
      .contains(testGenre)
      .click();

    // Verify URL contains genre param
    cy.url().should('include', `genre=${testGenre}`);

    // Verify active state
    cy.get('[data-testid="genre-select"]')
      .find('.option.active')
      .should('contain', testGenre);

    // Refresh page
    cy.reload();

    // Verify genre persists
    cy.url().should('include', `genre=${testGenre}`);
    // Verify active state
    cy.get('[data-testid="genre-select"]')
      .find('.option.active')
      .should('contain', testGenre);
  });

  it('should persist sort option in URL and survive refresh', () => {
    const testSort = {
      id: 2,
      name: 'TITLE',
      value: 'title',
    };

    cy.get('[data-testid="sort-control"]')
      .first()
      .within(() => {
        cy.get('button').click();

        cy.get('.options-list .option-item').contains(testSort.name).click();

        cy.get('button span').first().should('have.text', testSort.name);
      });

    // Verify URL contains sort param
    cy.url().should('include', `sortBy=${testSort.value}`);

    // Verify active state
    cy.get('[data-testid="sort-control"] button span')
      .first()
      .should('have.text', testSort.name);

    // Refresh page
    cy.reload();

    // Verify sort persists
    cy.url().should('include', `sortBy=${testSort.value}`);
    cy.get('[data-testid="sort-control"] button span')
      .first()
      .should('have.text', testSort.name);
  });

  it('should persist pagination in URL and survive refresh', () => {
    const MOVIES_PER_PAGE = 6;
    // First ensure there are multiple pages of results
    cy.get('.total b').then(($total) => {
      const totalMovies = parseInt($total.text());
      if (totalMovies > MOVIES_PER_PAGE) {
        const pageToTest = 2;

        // Go to page 2
        cy.get('.pagination button:contains("Next")').click();

        // Verify URL contains page param
        cy.url().should('include', `page=${pageToTest}`);

        // Refresh page
        cy.reload();

        // Verify page persists
        cy.url().should('include', `page=${pageToTest}`);
        cy.get('.pagination span').should('contain', `Page ${pageToTest}`);
      }
    });
  });

  it('should reset page to 1 when changing search or genre', () => {
    const testGenre = 'COMEDY';
    // First go to page 2
    cy.get('.pagination button:contains("Next")').click();
    cy.url().should('include', 'page=2');

    // Change search query
    cy.get('input[type="search"]').type('new query').type('{enter}');
    cy.url().should('include', 'page=1');

    // Go to page 2 again
    cy.get('.pagination button:contains("Next")').click();
    cy.url().should('include', 'page=2');

    // Change genre
    cy.get('[data-testid="genre-select"]')
      .find('.option')
      .contains(testGenre)
      .click();
    cy.url().should('include', 'page=1');
  });
});
