/**
 * @author Dean Vang
 */

$(function(){
	$('.var-entry input').change(function(){
		js_validate($(this));
	});
});

function js_validate_range(input){
	var max_val = 999999999; //maximum supported value
	var var_val = input.val(); //value from input
	var var_num = var_val.split('.');
	var is_neg = (var_val < 0 ? true : false); //check if value from input is negative
	var is_dec = (var_num.length > 1 ? true : false);
	
	if(Math.abs(var_num[0]) > max_val){
		var_num[0] = (is_neg ? -max_val : max_val); //if is_neg is true, update to negative value of max value
	}
	
	if(is_dec && var_num[1].length > 9){
		var round_digit = var_num[1].charAt(9); //10th digit
		var_num[1] = var_num[1].substring(0, 9); //include all digits up to 9th digit
		if(round_digit >= 5){
			var_num[1] = +var_num[1] + 1;
		}
		if(var_num[1] > max_val){
			var_num[1] = max_val; //update right side to max
		}
	}
	
	input.val(is_dec ? var_num[0] + '.' + var_num[1] : var_num[0]);
}

function js_is_valid(input, valid){
	if(valid){
		input.css('background-color', 'white'); 
	}else{
		input.css('background-color', 'pink');
	}
}

function js_validate(input){
	var var_valid = true;
	try{
		input.val(eval(input.val()));
		js_validate_range(input);
	}catch(e){
		var_valid = false;
	}
	
	js_is_valid(input, var_valid);
}