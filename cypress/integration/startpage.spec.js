describe('Navigating from menu', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-testid=menu]').within(() => {
      cy.get('button:first').click()
    })
    cy.get('[data-testid=Division-1]').within(() => {
      cy.get('button:first').click()
    }).then($btn => {
      const id = $btn.attr('id')
      cy.wrap(id).as('seriesId')
    })
  })

  it.only('Navigates to team page', () => {
      cy.get('@seriesId').then($id => {
        cy.get(`[data-testid=menu-team-${$id}]`).click()
      })
  })
  it('Navigates to matches page', () => {
    cy.get('@seriesId').then($id => {
      cy.get(`[data-testid=menu-team-${$id}]`).click()
    })
  })
  it('Navigates to table page', () => {
    cy.get('@seriesId').then($id => {
      cy.get(`[data-testid=menu-team-${$seriesId}]`).click()
    })
  })
})
