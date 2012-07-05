describe('Textarea character count using Jquery', function() {

	beforeEach(function() {
		$('body').append('<textarea id="myTextarea"></textarea><span id="remaningCharacters"></span>');
	});

    afterEach(function() {
		$('#myTextarea').remove();
        $('#remaningCharacters').remove();
	});

    it('should have default maximum number of character to 1000 ', function() {
        $('#myTextarea').textareaWordCount({
           remainingContainerId: "#remaningCharacters"
        });
        expect(parseInt($('#remaningCharacters').html())).toEqual(1000);
    });

    it('should take character limit from the configuration when set', function() {
      	$('#myTextarea').textareaWordCount({
	        characterLimit: 20,
	        remainingContainerId: "#remaningCharacters"
	    });
        expect(parseInt($('#remaningCharacters').html())).toEqual(20);
    });

    it('should count remaining characters on key up', function() {
        $('#myTextarea').val('123');
        $('#myTextarea').textareaWordCount({
	        characterLimit: 20,
	        remainingContainerId: "#remaningCharacters"
	    });
        $('#myTextarea').keyup();
        expect(parseInt($('#remaningCharacters').html())).toEqual(17);
        expect($('#myTextarea').val()).toEqual('123')
    });

    it('should set the total number of character to the value in the configuration when more than limitation characters are entered', function() {
        $('#myTextarea').val('This is a very long text which has more than 20 characters compared to the configuration');
        $('#myTextarea').textareaWordCount({
	        characterLimit: 20,
	        remainingContainerId: "#remaningCharacters"
	    });
        $('#myTextarea').keyup();
        expect(parseInt($('#remaningCharacters').html())).toEqual(0);
        expect($('#myTextarea').val()).toEqual('This is a very long ')
    })

})