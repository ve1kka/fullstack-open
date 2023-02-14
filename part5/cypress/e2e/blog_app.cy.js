describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'asasasa',
      username: 'adadadada',
      password: 'awawaaw',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page loads', function () {
    cy.contains('Blogs')
  })

  it('login form loads', function () {
    cy.contains('Log in').click()
  })

  describe('Login', function () {
    it('user can login', function () {
      cy.contains('Log in').click()
      cy.get('#username').type('adadadada')
      cy.get('#password').type('awawaaw')
      cy.get('#login-button').click()
      cy.contains('asasasa is logged in')
      cy.get('.notification').should(
        'have.css',
        'border-color',
        'rgb(0, 128, 0)'
      )
    })

    it('login fails with wrong credentials', function () {
      cy.contains('Log in').click()
      cy.get('#username').type('ababaababa')
      cy.get('#password').type('aaaaaaaaaaaaa')
      cy.get('#login-button').click()
      cy.get('.warning')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'border-color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'asasasa is logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'adadadada', password: 'awawaaw' })
    })

    it('new blog can be created', function () {
      cy.contains('New blog').click()
      cy.get('#titleInput').type('testi')
      cy.get('#authorInput').type('testfakta')
      cy.get('#urlInput').type('testfakta.com')
      cy.get('#newBlogButton').click()
      cy.get('html').should('contain', 'testi by testfakta')
    })

    describe('when a blog is created', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'test blog',
          author: 'tester',
          url: 'test.com',
          likes: 0,
        })
      })

      it('it can be liked', function () {
        cy.contains('test blog')
        cy.contains('View').click()
        cy.get('.likeButton').click()
        cy.get('.likeContainer').contains('1 like')
        cy.get('.likeButton').click()
        cy.get('.likeContainer').contains('2 likes')
      })
    })

    describe('when another blog is created', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'test blog',
          author: 'tester',
          url: 'test.com',
          likes: 0,
        })
      })

      it('it can be deleted', function () {
        cy.contains('test blog')
        cy.contains('View').click()
        cy.contains('Remove').click()
        cy.get('html').should('not.contain', 'test blog')
      })
    })

    describe('when several blogs are created', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'blog with 1 like',
          author: 'aaa',
          url: 'test.com3',
          likes: 1,
        })
        cy.createBlog({
          title: 'blog with 15 likes',
          author: 'aaaa',
          url: 'test.com2',
          likes: 15,
        })
        cy.createBlog({
          title: 'blog with 6 likes',
          author: 'aaaaa',
          url: 'test.com1',
          likes: 6,
        })
      })

      it('they are sorted by likes', function () {
        cy.get('.blog-container>.blogTitle').should((items) => {
          expect(items[0]).to.contain('blog with 15 likes')
          expect(items[1]).to.contain('blog with 6 likes')
          expect(items[2]).to.contain('blog with 1 like')
        })
      })
    })
  })
})