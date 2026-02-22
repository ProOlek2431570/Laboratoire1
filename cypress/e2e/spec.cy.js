describe("Chargement dynamique des publications", () => {

  it("Affiche les publications provenant de l'API", () => {

    cy.visit("http://127.0.0.1:5501/index.html");

    // Vérifie que des cartes sont affichées
    cy.get(".card").should("have.length.at.least", 1);

    // Vérifie qu'un titre est affiché
    cy.get(".card-text").first().should("not.be.empty");

  });

});
describe("Page blog dynamique", () => {

  it("Affiche une publication spécifique", () => {

    cy.visit("http://127.0.0.1:5501/pageBlog.html?id=1");

    cy.get("#blog-titre").should("not.be.empty");
    cy.get("#blog-contenu").should("not.be.empty");

  });

});

describe("Ajout publication", () => {

  it("Ajoute une publication et redirige", () => {

    cy.visit("http://127.0.0.1:5501/ajouterPub.html");

    cy.get("#titre").type("Test Cypress");
    cy.get("#auteur").type("Alex");
    cy.get("#contenu").type("Contenu de test");

    cy.get("button[type='submit']").click();

    // Clique sur Confirmer dans jQuery UI
    cy.contains("Confirmer").click();

    // Vérifie redirection
    cy.url().should("include", "index.html");

  });

  describe("Consultation publication", () => {

    it("Charge la publication avec query parameter", () => {
  
      cy.visit("http://127.0.0.1:5501/pageblog.html?id=1");
  
      cy.get("#blog-titre").should("not.be.empty");
      cy.get("#blog-contenu").should("not.be.empty");
  
    });
  
  });
  it("Charge les commentaires", () => {

    cy.visit("http://127.0.0.1:5501/pageblog.html?id=1");
  
    cy.get("#commentaires .card")
      .should("have.length.at.least", 1);
  
  });

  it("Ajoute un commentaire", () => {

    cy.visit("http://127.0.0.1:5501/pageblog.html?id=1");

cy.get("#nouveauCommentaire").should("exist").and("be.visible")
  .type("Test Cypress commentaire");

cy.get("#btnCommenter").click();

cy.contains("Test Cypress commentaire").should("exist");

  
  });
  
  
  
});


