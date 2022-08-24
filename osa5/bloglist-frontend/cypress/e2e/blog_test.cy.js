describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'asdf', password: 'qwer', name: 'asdf'
    })
    cy.visit('http://localhost:3000')
  })
  
  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('asdf')
      cy.get('#password').type('qwer')
      cy.get('#login-button').click()
  
      cy.contains('asdf logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('asdf')
      cy.get('#password').type('asdf')
      cy.get('#login-button').click()
    
      cy.get('.error')
        .should('contain', 'wrong credentials')
    
      cy.get('html').should('not.contain', 'asdf logged in')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({username: 'asdf', password: 'qwer'})
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#blog-title').type('google')
      cy.get('#blog-author').type('asdf')
      cy.get('#blog-url').type('www.google.com')
      cy.get('#submit-button').click()

      cy.contains('a new blog google by asdf added')
      cy.contains('google asdf view')
    })

    it('A blog can be created and deleted', function() {
      cy.contains('new blog').click()
      cy.get('#blog-title').type('google')
      cy.get('#blog-author').type('asdf')
      cy.get('#blog-url').type('www.google.com')
      cy.get('#submit-button').click()

      cy.contains('view').click()
      cy.contains('delete').click()

      cy.contains('blog google by asdf deleted')
      cy.get('html').should('not.contain', 'google asdf')
    })

    describe('When blog exists', function() {
      beforeEach(function() {
        cy.createBlog({title: 'asdf', author: 'zxcv', url: 'tyui'})
      })
      it('it can be liked', function() {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes 1')
      })
    })

    describe('When multiple blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({title: 'asdf1', author: 'zxcv1', url: 'tyui1', likes: 1})
        cy.createBlog({title: 'asdf2', author: 'zxcv2', url: 'tyui2', likes: 2})
        cy.createBlog({title: 'asdf3', author: 'zxcv3', url: 'tyui3', likes: 3})
      })
      it('those are arranged according to number of likes', function() {
        cy.get('.blog').eq(0).should('contain', 'zxcv3')
        cy.get('.blog').eq(1).should('contain', 'zxcv2')
        cy.get('.blog').eq(2).should('contain', 'zxcv1')
      })
    })
  })
})