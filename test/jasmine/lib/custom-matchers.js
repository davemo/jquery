// A simple set of custom matchers to aid in the readability of specs.
beforeEach(function() {
	this.addMatchers({
		toHaveLength: function(length) {
			this.message = function(){ return 'Expected "'+this.actual.parent().html()+'"'+not()+' to have length '+length+' but had length '+this.actual.length; };
			return this.actual.length === length;
		}
	});
});
