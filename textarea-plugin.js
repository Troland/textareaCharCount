/*
 *  Project: Textarea Character Count (jQuery)
 *  Description: Using Jquery to count and limit number of character in textarea
 *  Author: Son Chau
 *  License: Sensis
 */

// the semi-colon before function invocation is a safety net against concatenated 
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, undefined ) {

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window is passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = 'textareaWordCount',
        document = window.document,
        defaults = {
            characterLimit: 1000,
            remainingContainerId: "#remainingCharacters"
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype.init = function () {
        // Place initialization logic here
        // You already have access to the DOM element and the options via the instance, 
        // e.g., this.element and this.options
        $(this.options.remainingContainerId).html(this.options.characterLimit);
        var context = this, charactersUsed, charactersRemaining;
        $(this.element).bind('keyup paste input', function(){
			charactersUsed = $(this).val().length;
			if(charactersUsed > context.options.characterLimit){
				charactersUsed = context.options.characterLimit;  
				$(this).val($(this).val().substr(0, context.options.characterLimit));
				$(this).scrollTop($(this)[0].scrollHeight);
			}
			charactersRemaining = context.options.characterLimit - charactersUsed;
			$(context.options.remainingContainerId).html(charactersRemaining);
		});
    };
    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    };

}(jQuery, window));
