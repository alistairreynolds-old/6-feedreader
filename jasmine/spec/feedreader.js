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
    // Need this for testing if the feed data changes when a new feed is selected
    var originalFeedTitle = '';
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         * It's expecting the array to not be enpty - ie, expecting some feeds
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Test to see that each Feed has a URL
        it('has a url', function() {
            var hasUrl = true;
            for (i = 0; i < allFeeds.length; i++) {
                if (!allFeeds[i].url) {
                    hasUrl = false;
                }
            };
            expect(hasUrl).not.toBe(false);
        });


        // Test to see that each Feed has a URL
        it('has a name', function() {
            var hasName = true;
            for (i = 0; i < allFeeds.length; i++) {
                if (!allFeeds[i].name) {
                    hasName = false;
                }
            };
            expect(hasName).not.toBe(false);
        });
    });

    // Menu testing
    describe('The Menu', function() {
        // Check that the menu is hidden by default
        it('has the menu hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });


        // Test that clicking on the menu triggers the click event
        it('triggers the click event when clicked', function() {
            spyEvent = spyOnEvent($('.menu-icon-link'), 'click');
            $('.menu-icon-link').trigger('click');
            expect('click').toHaveBeenTriggeredOn('.menu-icon-link');
            expect(spyEvent).toHaveBeenTriggered();
        });

        // Test that clicking on the menu hides it/shows it
        it('shows and hides the menu as needed', function() {
            if ($('body').hasClass('menu-hidden')) {
                $('.menu-icon-link').trigger('click');
                expect($('body').hasClass('menu-hidden')).toBe(false);
                $('.menu-icon-link').trigger('click');
                expect($('body').hasClass('menu-hidden')).toBe(true);
            } else {
                $('.menu-icon-link').trigger('click');
                expect($('body').hasClass('menu-hidden')).toBe(true);
                $('.menu-icon-link').trigger('click');
                expect($('body').hasClass('menu-hidden')).toBe(false);
            }
            // Doing this another time so that it closes automatically
            $('.menu-icon-link').trigger('click');
        });

    });

    // Initial entries testing
    describe('Initial Entries', function() {

        // Initial async callback
        beforeEach(function(done) {
            loadFeed(0, function() {
                originalFeedTitle = $('.entry h2').html(); // prepping for next test
                done();
            });
        });

        // Check to see if initial feeds have been loaded
        it('loads initial feed entries', function(done) {
            expect($('.feed').children('.entry-link')).toBeDefined();
            expect($('.entry-link').children('.entry')).toBeDefined();
            done();
        });

    });

    // Feed selection testing
    describe('News Feed Selection', function() {

        // Initial async callback
        beforeEach(function(done) {
            $('.feed-list li').trigger('click');
            loadFeed(1, function() {
                done();
            });
        });

        // Clicking on a feed loads the data test
        it('clicking on a feed loads it and the feed data changes', function() {
            spyEvent = spyOnEvent($('.feed-list li'), 'click');
            expect($('.feed').children('.entry-link')).toBeDefined();
            expect($('.entry-link').children('.entry')).toBeDefined();
            expect($('.entry h2').html()).not.toBe(originalFeedTitle);
        });

    });

}());