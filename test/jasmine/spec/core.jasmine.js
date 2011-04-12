describe('Basic Requirements', function() {
    
  describe("Array.push()", function() {
    it("is defined", function() {
      expect(Array.prototype.push).toBeDefined();
    });
  });

  describe("Function.apply()", function() {
    it("is defined", function() {
      expect(Function.prototype.apply).toBeDefined();
    });
  });

  describe("document.getElementById", function() {
    it("is defined", function() {
      expect(document.getElementById).toBeDefined();
    });
  });

  describe("document.getElementsByTagName", function() {
    it("is defined", function() {
      expect(document.getElementsByTagName).toBeDefined();
    });
  });

  describe("RegExp", function() {
    it("is defined", function() {
      expect(RegExp).toBeDefined();
    });
  });

  describe("jQuery", function() {
    it("is defined", function() {
      expect(jQuery).toBeDefined();
    });
  });

  describe("$", function() {
    // this is defined in test-init.js
    // TODO: discover intent in having the namespace defined in the test-init file.
    it("is defined", function() {
      expect($).toBeDefined();
    });
  });
        
});

describe("jQuery() constructor", function() {
  
  describe("default length", function() {
    
    it("has a default length of 0 when no arguments are passed", function() {
      expect(jQuery()).toHaveLength(0);
    });
    
    it("has a length of 0 when an undefined argument is passed", function() {
      expect(jQuery(undefined)).toHaveLength(0);
    });
    
    it("has a length of 0 when a null argument is passed", function() {
      expect(jQuery(null)).toHaveLength(0);
    });
    
    it("has a length of 0 when an empty string is passed", function() {
      expect(jQuery("")).toHaveLength(0);
    });
    
    it("has a length of 0 when an empty id is passed", function() {
      expect(jQuery("#")).toHaveLength(0);
    });
    
    it("does not re-wrap a jQuery object", function() {
      var obj = jQuery("div");
      expect(jQuery(obj).selector).toBe("div");
    });
    
    it("generates the correct number of elements for jQuery(window)", function() {
      expect(jQuery(window)).toHaveLength(1);
    });
    
  });
    
  describe("the context argument", function() {
    
    // q is a utility function defined in test-init.js
    // TODO: perhaps it might be clearer if these functions were namespaced somewhere better?
    
    it("should return the same set of results as document.getElementById", function() {
      var main = jQuery("#main");
      expect(jQuery("div p", main).get()).toEqual(q("sndp", "en", "sap"));
    });
    
  });
  
  describe("generating the <code> element", function() {
    var code;
    
    beforeEach(function() {
      code = jQuery("<code/>");
    });
    
    
    it("generates the correct number of elements", function() {
      expect(code).toHaveLength(1);
    });
    
  });
});

//	var code = jQuery("<code/>");
//	equals( code.length, 1, "Correct number of elements generated for code" );
//	equals( code.parent().length, 0, "Make sure that the generated HTML has no parent." );
//	var img = jQuery("<img/>");
//	equals( img.length, 1, "Correct number of elements generated for img" );
//	equals( img.parent().length, 0, "Make sure that the generated HTML has no parent." );
//	var div = jQuery("<div/><hr/><code/><b/>");
//	equals( div.length, 4, "Correct number of elements generated for div hr code b" );
//	equals( div.parent().length, 0, "Make sure that the generated HTML has no parent." );
//
//	equals( jQuery([1,2,3]).get(1), 2, "Test passing an array to the factory" );
//
//	equals( jQuery(document.body).get(0), jQuery('body').get(0), "Test passing an html node to the factory" );
//
//	var exec = false;
//
//	var elem = jQuery("<div/>", {
//		width: 10,
//		css: { paddingLeft:1, paddingRight:1 },
//		click: function(){ ok(exec, "Click executed."); },
//		text: "test",
//		"class": "test2",
//		id: "test3"
//	});
//
//	equals( elem[0].style.width, '10px', 'jQuery() quick setter width');
//	equals( elem[0].style.paddingLeft, '1px', 'jQuery quick setter css');
//	equals( elem[0].style.paddingRight, '1px', 'jQuery quick setter css');
//	equals( elem[0].childNodes.length, 1, 'jQuery quick setter text');
//	equals( elem[0].firstChild.nodeValue, "test", 'jQuery quick setter text');
//	equals( elem[0].className, "test2", 'jQuery() quick setter class');
//	equals( elem[0].id, "test3", 'jQuery() quick setter id');
//
//	exec = true;
//	elem.click();
//
//	// manually clean up detached elements
//	elem.remove();
//
//	for ( var i = 0; i < 3; ++i ) {
//		elem = jQuery("<input type='text' value='TEST' />");
//	}
//	equals( elem[0].defaultValue, "TEST", "Ensure cached nodes are cloned properly (Bug #6655)" );
//
//	// manually clean up detached elements
//	elem.remove();
//});