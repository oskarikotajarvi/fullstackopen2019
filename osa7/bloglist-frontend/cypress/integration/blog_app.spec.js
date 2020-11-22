describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'secret'
    };
    cy.createUser(user);
  });

  it('Login form is shown', function () {
    cy.contains('Log in');
    cy.get('#username');
    cy.get('#password');
    cy.get('#loginSubmit');
  });

  describe('Login', function () {
    it('succees with correct information', function () {
      cy.get('#username').type('testuser');
      cy.get('#password').type('secret');
      cy.get('#loginSubmit').click();
      cy.contains('Test User logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('wrong');
      cy.get('#password').type('wrong');
      cy.get('#loginSubmit').click();
      cy.get('.error')
        .should('contain', 'Incorrect username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testuser', password: 'secret' });
    });

    it('a blog can be created', function () {
      cy.contains('Create new blog').click();
      cy.get('#titleInput').type('Test Blog');
      cy.get('#authorInput').type('Test Author');
      cy.get('#urlInput').type('url.com');
      cy.get('#blogFormSubmit').click();

      cy.get('.notice')
        .should('contain', `A new blog Test Blog by Test Author added`)
        .and('have.css', 'color', 'rgb(0, 128, 0)');

      cy.get('.blog').should('contain', 'Test Blog - Test Author');
    });

    it('a blog can be liked', function () {
      cy.createBlog({
        title: 'Test Blog',
        author: 'Test Author',
        url: 'url.com'
      });

      cy.contains('Test Blog - Test Author')
        .parent()
        .find('.viewButton')
        .click();
      cy.contains('Test Blog - Test Author')
        .parent()
        .find('.likes')
        .as('likes');

      cy.get('@likes').should('contain', 'likes 0');
      cy.get('@likes').parent().find('.likeButton').click();
      cy.get('@likes').should('contain', 'likes 1');
    });

    it('user can remove added their own blogs', function () {
      cy.contains('Create new blog').click();
      cy.get('#titleInput').type('Test Blog');
      cy.get('#authorInput').type('Test Author');
      cy.get('#urlInput').type('url.com');
      cy.get('#blogFormSubmit').click();

      cy.contains('Test Blog - Test Author')
        .parent()
        .find('.viewButton')
        .click();

      cy.contains('Test Blog - Test Author')
        .parent()
        .find('.removeButton')
        .click();

      cy.contains('Test Blog - Test Author').should('not.exist');
    });

    it('user can not remove a blog added by another user', function () {
      cy.createBlog({
        title: 'Test Blog',
        author: 'Test Author',
        url: 'url.com'
      });

      cy.get('#logoutButton').click();

      const user2 = {
        name: 'Test User2',
        username: 'testuser2',
        password: 'secret2'
      };

      cy.createUser(user2);
      cy.login({ username: 'testuser2', password: 'secret2' });

      cy.contains('Test Blog - Test Author')
        .parent()
        .find('.viewButton')
        .click();
      cy.contains('Test Blog - Test Author')
        .parent()
        .find('.removeButton')
        .should('not.exist');
    });

    it('blogs are in order of likes. (Most liked first)', function () {
      for (let i = 0; i < 3; i++) {
        cy.createBlog({
          title: `TestBlog${i}`,
          author: 'TestAuthor',
          url: 'url.com',
          likes: i
        });
      }

      cy.get('.blog').then(blogs => {
        expect(blogs.length).to.equal(3);
        cy.get(blogs[0]).parent().find('.likes').should('contain', 'likes 2');
        cy.get(blogs[1]).parent().find('.likes').should('contain', 'likes 1');
        cy.get(blogs[2]).parent().find('.likes').should('contain', 'likes 0');
      });
    });
  });
});
