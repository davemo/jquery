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
    // this seems spurious given the definition in the test fixture
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
    
    it("does not re-wrap a jQuery object, jQuery(jQueryObject)", function() {
      var obj = jQuery("div");
      expect(jQuery(obj).selector).toBe("div");
    });
    
    it("generates the correct number of elements for jQuery(window)", function() {
      expect(jQuery(window)).toHaveLength(1);
    });
    
  });
    
  describe("the context argument, jQuery(selector, context)", function() {
    
    // q is a utility function defined in test-init.js
    // TODO: it would be clearer if these utility functions were namespaced somewhere better.
    
    // the elements referenced here are also based on fixtures that pre-exist in the markup, not sure if
    // it would be more valuable to inline them for readability.
    
    it("should return the same set of results as an array of elements gathered with document.getElementById", function() {
      var main = jQuery("#main");
      expect(jQuery("div p", main).get()).toEqual(q("sndp", "en", "sap")); // magic ids and function names are hard to read
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
    var elem, domNode;
    
    beforeEach(function() {
      spyOn(window, 'alert');
      elem = jQuery("<div/>", {
        width: 10,
        css: { paddingLeft:1, paddingRight:1 },
        click: function(){ alert('clicked'); }, // note the change here, hooks into spy later
        text: "test",
        "class": "test2",
        id: "test3"
      });
      domNode = elem[0];
    });
    
    it("should set the style.width", function() {
      expect(domNode.style.width).toBe('10px');
    });
    
    it("should set the style.paddingLeft", function() {
      expect(domNode.style.paddingLeft).toBe('1px');
    });
    
    it("should set the style.paddingRight", function() {
      expect(domNode.style.paddingRight).toBe('1px');
    });
    
    it("should set the text", function() {
      expect(domNode.childNodes).toHaveLength(1);
      expect(domNode.firstChild.nodeValue).toBe('test');
    });
    
    it("should set the class", function() {
      expect(domNode.className).toBe('test2');
    });
    
    it("should set the id", function() {
      expect(domNode.id).toBe('test3');
    });
    
    it("should properly bind click", function() {
      elem.click();
      expect(window.alert).toHaveBeenCalledWith('clicked'); 
      // I believe this achieves the same goal as the code in core.js, 
      // intent is to verify click binding worked from 
      // jQuery(markup, { click: function() {} });
    });
    
    it("clones cached nodes properly (Bug #6655)", function() {
      elem.remove();
      for(var i = 0; i < 3; i++) {
        elem = jQuery('<input type="text" value="TEST" />');
      }
      expect(elem[0].defaultValue).toBe('TEST');
    });
        
  });
  
});

describe("Selector State", function() {
  var test;
  
  describe("jQuery(selector)", function() {
      
    describe("jQuery(undefined)", function() {
      beforeEach(function() {
        test = jQuery(undefined)
      });
    
      it("has an empty selector", function() {
        expect(test.selector).toBe("");
      });
    
      it("has an undefined context", function() {
        expect(test.context).toBe(undefined);
      });
    });
  
    describe("jQuery(document)", function() {
      beforeEach(function() {
        test = jQuery(document);
      });
    
      it("has an empty selector", function() {
        expect(test.selector).toBe("");
      });
    
      it("has a context of document", function() {
        expect(test.context).toBe(document);
      });
    });
  
    describe("jQuery(document.body)", function() {
      beforeEach(function() {
        test = jQuery(document.body);
      });
    
      it("has an empty selector", function() {
        expect(test.selector).toBe("");
      });
    
      it("has a context of document.body", function() {
        expect(test.context).toBe(document.body);
      });
    });
  
    describe("jQuery(#main)", function() {
      beforeEach(function() {
        test = jQuery("#main");
      });
    
      it("has a selector of #main", function() {
        expect(test.selector).toBe("#main");
      });
    
      it("has a context of document", function() {
        expect(test.context).toBe(document);
      });
    });
  
    describe("jQuery('#notfoundnono')", function() {
      beforeEach(function() {
        test = jQuery("#notfoundnono");
      });
    
      it("has a selector of #notfoundnono", function() {
        expect(test.selector).toBe("#notfoundnono");
      });
    
      it("has a context of document", function() {
        expect(test.context).toBe(document);
      });
    });
  
  });
  
  describe("jQuery(selector, context)", function() {    
  
    describe("jQuery('#main', document)", function() {
      beforeEach(function() {
        test = jQuery("#main", document);
      });
    
      it("has a selector of #main", function() {
        expect(test.selector).toBe("#main");
      });
    
      it("has a context of document", function() {
        expect(test.context).toBe(document);
      });
    });
  
    describe("jQuery('#main', document.body)", function() {
      beforeEach(function() {
        test = jQuery("#main", document.body);
      });
      
      it("has a selector of #main", function() {
        expect(test.selector).toBe("#main");
      });
      
      it("has a context of document.body", function() {
        expect(test.context).toBe(document.body);
      });
    });

  });
  
  describe("Cloning", function() {
    
    describe("jQuery(jQuery('#main', document.body))", function() {
      beforeEach(function() {
        test = jQuery(jQuery("#main", document.body));
      });

      it("has a selector of #main", function() {
        expect(test.selector).toBe("#main");
      });
      
      it("has a context of document.body", function() {
        expect(test.context).toBe(document.body);
      });
    });
    
  });
  
  describe("jQuery(document.body).find('#main')", function() {
    beforeEach(function() {
      test = jQuery(document.body).find("#main");
    });
    
    it("has a selector of #main", function() {
      expect(test.selector).toBe("#main");
    });
    
    it("has a context of document.body", function() {
      expect(test.context).toBe(document.body);
    });
  });
  
  describe("jQuery('#main').filter('div')", function() {
    beforeEach(function() {
      test = jQuery("#main").filter("div");
    });
    
    it("has a selector of #main.filter(div)", function() {
      expect(test.selector).toBe("#main.filter(div)");
    });
    
    it("has a context of document", function() {
      expect(test.context).toBe(document);
    });
  });
  
  describe("jQuery('#main').not('div')", function() {
    beforeEach(function() {
      test = jQuery("#main").not('div');
    });
    
    it("has a selector of #main.not(div)", function() {
      expect(test.selector).toBe("#main.not(div)");
    });
    
    it("has a context of document.body", function() {
      expect(test.context).toBe(document);
    });
  });

  describe('jQuery("#main").filter("div").not("div")', function() {
    beforeEach(function() {
      test = jQuery("#main").filter("div").not("div");
    });
    
    it("has a selector of #main.filter(div).not(div)", function() {
      expect(test.selector).toBe("#main.filter(div).not(div)");
    });
    
    it("has a context of document.body", function() {
      expect(test.context).toBe(document);
    });
  });
  
  describe('jQuery("#main").filter("div").not("div").end()', function() {
    beforeEach(function() {
      test = jQuery("#main").filter("div").not("div").end();
    });
    
    it("has a selector of #main.filter(div)", function() {
      expect(test.selector).toBe("#main.filter(div)");
    });
    
    it("has a context of document", function() {
      expect(test.context).toBe(document);
    });
  });
  
  describe('jQuery("#main").parent("body")', function() {
    beforeEach(function() {
      test = jQuery("#main").parent("body");
    });
    
    it("has a selector of #main.parent(body)", function() {
      expect(test.selector).toBe("#main.parent(body)");
    });
    
    it("has a context of document", function() {
      expect(test.context).toBe(document);
    });
  });
  
  describe('jQuery("#main").eq(0)', function() {
    beforeEach(function() {
      test = jQuery("#main").eq(0);
    });
    
    it("has a selector of #main.slice(0,1)", function() {
      expect(test.selector).toBe("#main.slice(0,1)");
    });
  });
  
  describe("manipulation methods make same selector for jQuery objects", function() {
    var selectorOne, selectorTwo;
    
    beforeEach(function() {
      test = "<div />";
      selectorOne = jQuery(test).appendTo(jQuery(test)).selector;
      selectorTwo = jQuery(test).appendTo(test).selector;
    });
    
    it("makes the selectors equal", function() {
      expect(selectorOne).toBe(selectorTwo);
    });
    
  });

});