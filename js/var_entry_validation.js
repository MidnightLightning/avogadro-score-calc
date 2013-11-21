/**
 * @author Dean Vang
 */
 
$(function(){ //function used to restrict character type in var-entry classes
	$('.var-entry').keypress(function(e){ //when a key is pressed inside a object with the class 'var-entry' perform the following function
      if(e.keyCode == 45 || e.keyCode == 46 || e.keyCode >= 48 && e.keyCode <= 57){}//'.' or '-' or '0-9'
      else if(e.keyCode >= 96 && e.keycode <= 105){}//0-9  numpad
		else{
			return false;	
		}
	});
});

function js_validate_var_entry(){ //todo:check for precision > 9 decimal places
  $('.var-entry').each(function(){ //for each class 'var-entry', do the following function
    var fields = $(this).find(':text'); //find all text inputs
    var var_val = fields.eq(0).val();
    if(var_val > 999999999.999999999){ //set to max if above max, does not check precision
       alert('value too high for ' + fields.eq(0).attr('name')); //for debugging
       fields.eq(0).val('999999999.999999999');
    }else if(var_val < -999999999.999999999){ //set to min if below min, does not check precision
       alert('value too low for ' + fields.eq(0).attr('name')); //for debugging
       fields.eq(0).val('-999999999.999999999');
    }
  });
}
