exports.example1 = function example1() {
	var contextMenu = require("context-menu");

	// Create a new context menu item.
	var menuItem = contextMenu.Item({

	    label: "TW Travel Assistant",

	    // A CSS selector. Matching on this selector triggers the
	    // display of our context menu.
	    context: "a[href]",

	    // When the context menu item is clicked, perform a Google
	    // search for the link text.
	    onClick: function(contextObj, item) {
	        var anchor = contextObj.node;
	        // var twTravel = require("tw-travel");
	        //     twTravel.log(anchor.textContent);
	        var searchUrl = "http://www.google.com/search?q=" +
	        anchor.textContent;
	        contextObj.window.location.href = searchUrl;
	    }
	});

	// Add the new menu item to the application's context menu.
	contextMenu.add(menuItem);
};

exports.example2 = function example2() {
	// Import the APIs we need.
	var contextMenu = require("context-menu");
	var request = require("request");
	var selection = require("selection");

	// Create a new context menu item.
	var menuItem = contextMenu.Item({

	    label: "Translate Selection",

	    // Show this item when a selection exists.
	    context: contextMenu.SelectionContext(),

	    // When this item is clicked, post a message to the item with the
	    // selected text and current URL.
	    contentScript: 'on("click", function () {' +
	    '  var text = window.getSelection().toString();' +
	    '  postMessage({ text: text, url: document.URL });' +
	    '});',

	    // When we receive the message, call the Google Translate API with the
	    // selected text and replace it with the translation.
	    onMessage: function(selectionInfo) {
	        var req = request.Request({
	            url: "http://ajax.googleapis.com/ajax/services/language/translate",
	            content: {
	                v: "1.0",
	                q: selectionInfo.text,
	                langpair: "|en"
	            },
	            headers: {
	                Referer: selectionInfo.url
	            },
	            onComplete: function(response) {
	                selection.text = response.json.responseData.translatedText;
	            }
	        });
	        req.get();
	    }
	});

	// Add the new menu item to the application's context menu.
	contextMenu.add(menuItem);
}