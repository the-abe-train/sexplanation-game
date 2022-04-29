beforeEach(() => {
  cy.visit("http://localhost:3000/");
});

describe("Make sure the pages load", () => {
  it("Home page loads", () => {
    cy.visit("http://localhost:3000/");
    expect(true).to.equal(true);
  });

  it("Stats page loads", () => {
    cy.get("[data-testid=stats-icon]").then(($icon) => {
      const iconUrl = $icon.attr("href");
      console.log($icon.attr("href"));
      cy.get("[data-testid=stats-icon]").click();
      cy.url().should("include", iconUrl);
    });
  });

  it("Return to home page loads", () => {
    cy.get("[data-testid=home-icon]").then(($icon) => {
      const iconUrl = $icon.attr("href");
      console.log($icon.attr("href"));
      cy.get("[data-testid=home-icon]").click();
      cy.url().should("include", iconUrl);
    });
  });
});

describe("Check that the guessing function works", () => {
  /* ==== Test Created with Cypress Studio ==== */
  it("Guessing test", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit("localhost:3000");
    cy.get(".button_centred__-4R3C").click();
    cy.get(".button_centred__-4R3C").click();
    cy.get("#react-select-3-input").clear();
    cy.get("#react-select-3-input").type("penis");
    cy.get("#react-select-3-option-22").click();
    cy.get(".button_centred__-4R3C").click();
    cy.get(".css-6j8wv5-Input").click();
    cy.get("#react-select-3-input").clear();
    cy.get("#react-select-3-input").type("clitoris");
    cy.get("#react-select-3-option-7").click();
    cy.get(".button_centred__-4R3C").click();
    cy.get('.grid > [style="color: black;"]').click();
    cy.get('.sm\\:flex-row > .space-x-3 > [style="cursor: pointer;"]').click();
    cy.get(".w-full > :nth-child(2) > :nth-child(3)").click();
    /* ==== End Cypress Studio ==== */
  });
});

describe("Fixture testing", () => {
  it("Fixture 1", () => {
    Cypress.env();
    console.log(Cypress.env());
    cy.visit("http://localhost:3000/");
    cy.fixture("example").then((jsonData) => {
      expect(jsonData.name).to.eq("Using fixtures to represent data");
    });
  });
});

export default null;
