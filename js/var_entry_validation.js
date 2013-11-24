/**
 * @author Dean Vang
 */

$(function(){
	$('.var-entry').keyup(function(e){
		js_validate_var_entry();
	});
});

function js_validate_var_entry(){
	$('.var-entry').each(function(){ //for each class 'var-entry', do the following function
		var fields = $(this).find(':text'); //find all text inputs
		var var_val = fields.eq(0).val(); //find the value
		var var_num = var_val.split('.'); //splits number where '.' is present
		var var_valid = js_validate(var_val); //checks if number is valid decimal or a valid negative number
		var num_overflow = false; //flag indicating a number needs to be updated to the max
		var max_val = 999999999; //maximum supported value

		if(var_valid){
			fields.eq(0).css('background-color', 'white'); 
		}else{
			fields.eq(0).css('background-color', 'pink'); 
		}

		if(var_num.length > 0){ //if there is a number present
			if(var_num[0] > max_val){ //if left side > max
				num_overflow = true; //indicate update needed
				var_num[0] = max_val; //update left side to max
			}
			if(var_num[0] < -max_val){
				num_overflow = true; //indicate update needed
				var_num[0] = -max_val; //update left side to min
			}
			if(var_num.length > 1 && Math.abs(var_num[1]) > max_val){
				num_overflow = true; //indicate update needed
				var_num[1] = max_val; //update right side to max
			}
			if(num_overflow){ //if update is needed
				if(var_num.length > 1){ //if there is a decimal in the number
					var_val = var_num[0] + '.' + var_num[1]; //combine the number    
				}else{ 
					var_val = var_num[0]; //update integer value
				}
				fields.eq(0).val(var_val); //update value 
			} 
		}
	});
}

function js_validate(num){ //runs validation 
	if(js_validate_dec(num) && js_validate_neg(num)){
		return true; 
	}else{
		return false; 
	}
}

function js_validate_dec(num){ //basic check if a number is valid 
	var num_arr = num.split('.');
	if(num_arr.length > 2){ //more than 1 decimal
		return false;   
	}
	if(num_arr.length > 1){
		if(num_arr[1].match(/[^0-9]/)){ //right does not contain '0~9'        
			return false;
		}
	}
	if(num_arr.length > 0){
		if(num_arr[0].match(/[^\-0-9]/)){ //left does not contain '-' or '0~9'
			return false;     
		}
	}
	if(num.split('-').length > 1 && num.indexOf('-') !== 0){
		return false; //'-' is not the first character
	}
	return true; //valid otherwise
}

function js_validate_neg(num){
	var num_arr = num.split('-');
	return (num_arr.length > 2 ? false : true);
}
