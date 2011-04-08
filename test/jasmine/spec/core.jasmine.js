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
		it("is defined", function() {
			expect($).toBeDefined();
		});
	});
				
});

//test("Basic requirements", function() {
//	expect(7);
//	ok( Array.prototype.push, "Array.push()" );
//	ok( Function.prototype.apply, "Function.apply()" );
//	ok( document.getElementById, "getElementById" );
//	ok( document.getElementsByTagName, "getElementsByTagName" );
//	ok( RegExp, "RegExp" );
//	ok( jQuery, "jQuery" );
//	ok( $, "$" );
//});