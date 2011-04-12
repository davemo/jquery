describe('Basic Requirements', function() {
  // Basic sanity tests
    
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
    // this seems spurious
    it("is defined", function() {
      expect($).toBeDefined();
    });
  });
        
});

describe("constructor, jQuery()", function() {
  
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
    
  describe("the context argument, jQuery(selector, context)", function() {
    
    // q is a utility function defined in test-init.js
    // TODO: perhaps it might be clearer if these utility functions were namespaced somewhere better?
    
    it("should return the same set of results as an array of elements gathered with document.getElementById", function() {
      var main = jQuery("#main");
      expect(jQuery("div p", main).get()).toEqual(q("sndp", "en", "sap"));
    });
    
  });
  
  describe("generating HTML elements, jQuery(markup)", function() {
    
    describe("generating the <code> element", function() {
      var code;

      beforeEach(function() {
        code = jQuery("<code/>");
      });

      it("generates the correct number of elements", function() {
        expect(code).toHaveLength(1);
      });

      it("does not generate a parent", function() {
        expect(code.parent()).toHaveLength(0);
      });

    });

    // some duplication here...
    describe("generating the <img> element", function() {
      var img;
      
      beforeEach(function() {
        img = jQuery("<img/>");
      });
      
      it("generates the correct number of elements", function() {
        expect(img).toHaveLength(1);
      });
      
      it("does not generate a parent", function() {
        expect(img.parent()).toHaveLength(0);
      });
    });
    
    describe("generating multiple elements", function() {
      var multiple;
      
      beforeEach(function() {
        multiple = jQuery("<div/><hr/><code/><b/>");
      });
      
      it("generates the correct number of elements", function() {
        expect(multiple).toHaveLength(4);
      });
      
      it("does not generate a parent", function() {
        expect(multiple.parent()).toHaveLength(0);
      });
    });    
  });
  
  describe("array arguments, jQuery(array)", function() {
    
    it("extracts the right value from the array", function() {
      expect(jQuery([1,2,3]).get(1)).toBe(2);
    });
    
  });
  
  describe("an html node argument, jQuery(DOMNode)", function() {
    
    it("should be the same as a query for the string representation of the node", function() {
      expect(jQuery(document.body).get(0)).toEqual(jQuery('body').get(0));
    });
    
  });
  
  describe("html generation with options, jQuery(markup, options)", function() {
    var exec, elem;
    
    beforeEach(function() {
      elem = jQuery("<div/>", { // candidate for injection here
        width: 10,
        css: { paddingLeft:1, paddingRight:1 },
        click: function(){ ok(exec, "Click executed."); }, // spy candidate
        text: "test",
        "class": "test2",
        id: "test3"
      });
    });
    
    it("should set the style.width", function() {
      expect(elem[0].style.width).toBe('10px');
    });
    
    it("should set the style.paddingLeft", function() {
      expect(elem[0].style.paddingLeft).toBe('1px');
    });
    
    it("should set the style.paddingRight", function() {
      expect(elem[0].style.paddingRight).toBe('1px');
    });
    
    it("should set the text", function() {
      expect(elem[0].childNodes).toHaveLength(1);
      expect(elem[0].firstChild.nodeValue).toBe('test');
    });
    
    it("should set the class", function() {
      expect(elem[0].className).toBe('test2');
    });
    
    it("should set the id", function() {
      expect(elem[0].id).toBe('test3');
    });
    
        
    
  });
  
  
});


//	var exec = false;
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