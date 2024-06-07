describe("projet trello", () => {
  it("Login", () => {
    cy.visit("https://trello.com");
    cy.contains("Log in").click();

    // LOGIN
    cy.origin("https://id.atlassian.com", () => {
      cy.get("#username").type("ryantheap@gmail.com");
      cy.get("#login-submit").click();
      cy.get("#password").type("Wcstrello.33");
      cy.get("#login-submit").click();
    });

    cy.get('[href="/b/Ym8HTYlp/wcs-projet-trello"]').click();
    cy.wait(3000);
    cy.fixture("cardData").then((cardData) => {
      /* Ajouter les cartes */
      cardData.forEach((card) => {
        cy.contains("Ajouter une carte").click();
        cy.get('[data-testid="list-card-composer-textarea"]').type(card.title);
      });

      // Ajouter la description pour chaque carte
      cardData.forEach((card) => {
        cy.contains(card.title).click();
        cy.wait(3000);

        cy.get(
          '[aria-label="Zone de contenu principale, commencez à taper pour saisir du texte."]'
        )
          .click({ force: true })
          .type(card.description);
        cy.get('[data-testid="editor-save-button"]').click();
        cy.get('[aria-label="Fermer la boîte de dialogue"]').click();
      });

      // Déplacer les cartes
      cardData.forEach((card) => {
        cy.contains(card.title)
          .parents("li")
          .then(($cardElement) => {
            cy.contains(card.migrate)
              .parents("li")
              .then(($listElement) => {
                cy.wrap($cardElement).drag($listElement, { force: true });
              });
          });
      });
    });
  });
});
