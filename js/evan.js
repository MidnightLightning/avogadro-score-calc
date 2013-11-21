/**
 * Parses input expression in Raw Score Form Field and returns the score as an integer.
 * @author: Evan Glodowski
 */
$(function()
{
	//Function is executed when raw score form field loses focus
	$(".raw-score input").blur(function()
	{
		//Only calculate score if input was entered
		if($(this).val() != "")
		{
			//Parse input expression as integer number
			var result = eval($(this).val());
			$(this).val(result);
		}
	});
});