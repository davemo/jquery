/* jasmine-fixture Makes injecting HTML snippets into the DOM easy & clean!
 *  site: https://github.com/searls/jasmine-fixture   */
jQuery.jasmine = {
	isReady: false,
	rootId: 'specContainer',
	init: function() {
		jQuery('body').append('<div id="'+this.rootId+'"></div>');
		this.isReady = true;
	},
	inject:function(html) {
		if(this.isReady !== true) this.init();
    return jQuery(html).appendTo('#'+this.rootId);
	},
	tidyUp: function() {
		jQuery('#'+this.rootId).remove();
		this.isReady = false;
	}
};
		
jQuery(function(){
  jQuery.jasmine.init();
});
jQuery
afterEach(function(){
  jQuery.jasmine.tidyUp();
});