/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */

   //test suite for RSS Feeds
  describe('RSS Feeds', function() {


     //checks all feeds are defined
    it('allFeeds are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


     //checks if url's are defined
    it('url is defined', function() {
      for (let feed of allFeeds) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
      }
    });

     //checks for feed's name properties are defined
    it('name defined', function() {
      for (let feed of allFeeds) {
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
      }
    });
  });


  //test suite to check for menu functionality
  describe('The menu', function() {

    //checks menu's default hidden state
    it('menu is hidden', function() {
      const body = document.querySelector('body');
      expect(body.classList.contains('menu-hidden')).toBe(true);

    });

    //checks menu for toggles on/off on clicks
    it('toggles on and off', function() {
      const body = document.querySelector('body');
      const menu = document.querySelector('.menu-icon-link');

      menu.click();
      expect(body.classList).not.toContain('menu-hidden');
      menu.click();
      expect(body.classList).toContain('menu-hidden');

    });
  });

  //Test suite for initial load of feed
  describe('Initial Entries', function() {

    //loadfeed and waits for work to be done
    beforeEach(function(done) {
      loadFeed(0, done);
    });

    //checks for completed work to contain content
    it('completes work', function() {
      const container = document.querySelector('.feed, .entry');
      console.log(container);
      expect(container.children.length > 0).toBe(true);
      console.log(container.children.length);
    });
  });

  //test suite for loading new content after initial feed load
  describe('New Feed Selection', function() {

    let entryLoadOne,
    entryLoadTwo;


     //loads many feeds and compares content to confirm changes
    beforeEach(function(done) {

      //load first feed
      loadFeed(0, function() {

        const InnerTextOne = document.querySelector('.feed').querySelector('.entry')['innerText'];
                  entryLoadOne = InnerTextOne;

                  //load second feed
                  loadFeed(1, function() {

                      const InnerTextTwo = document.querySelector('.feed').querySelector('.entry')['innerText'];
                      entryLoadTwo = InnerTextTwo;

                      done();
                  });
              });
          });
          //compares first feed to new feed content
          it('changes the content', function() {
              expect(entryLoadOne === entryLoadTwo).toBe(false);
          });

      });

}());
