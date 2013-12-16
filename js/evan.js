/**
 * Parses input expression in Raw Score Form Field and returns the score as an integer.
 * @author: Evan Glodowski
 */
$(function(){
	//Function is executed when raw score form field loses focus
	$(".raw-score input").blur(function(){
		//Only calculate score if input was entered
		if($(this).val() != "")
		{
			//Parse input expression as integer number
			try{
				var result = eval($(this).val());
				$(this).val(result);
				js_validate($(this));
			}catch(e){
				js_is_valid($(this), false);
			}

		}else{
			js_is_valid($(this), true);
		}
	});
});


function findVariables()
{
	//Current formula
	var formula = avgo.eventFormula;
	//Returns variable strings inside square brackets and puts them into an array varFound
	avgo.forumulaVariables = formula.match(/[^[\]]+(?=])/g);
}