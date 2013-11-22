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
  
  $('.var-entry').keyup(function(e){
    js_validate_var_entry();
  });
});

function js_validate_var_entry(){ //todo:check for precision > 9 decimal places
  $('.var-entry').each(function(){ //for each class 'var-entry', do the following function
    var fields = $(this).find(':text'); //find all text inputs
    var var_val = fields.eq(0).val();
    var var_valid = js_validate(var_val);
    
    if(var_valid){
       fields.eq(0).css('background-color', 'white'); 
    }else{
       fields.eq(0).css('background-color', 'pink'); 
    }
    
    if(var_val > 999999999.999999999){ //set to max if above max, does not check precision
       alert('value too high for ' + fields.eq(0).attr('name')); //for debugging
      if(var_val.split('.').length < 2){ //no decimal places are in the number
        fields.eq(0).val('999999999');
      }
      else{ //the number contains a decimal place
        fields.eq(0).val('999999999' + '.' + var_val.split('.')[1]); //attach decimal to max number
      }
    }else if(var_val < -999999999.999999999){ //set to min if below min, does not check precision
       alert('value too low for ' + fields.eq(0).attr('name')); //for debugging
       if(var_val.split('.').length < 2){ //no decimal places are in the number
        fields.eq(0).val('-999999999');
      }
      else{ //the number contains a decimal place
        fields.eq(0).val('-999999999' + '.' + var_val.split('.')[1]); //attach decimal to max number
      }   
    }
  });
}

function js_validate_dec(num){
  var num_arr = num.split('.');
  if(num_arr.length > 1 && num_arr[1].split('-').length > 1){
     return false; // user types '.-'
  } 
  return (num_arr.length > 2 ? false : true); //more than 1 '.' or 9 decmial places
}

function js_validate(num){
  if(js_validate_dec(num) && js_validate_neg(num)){
     return true; 
  }else{
     return false; 
  }
}

function js_validate_neg(num){
  var num_arr = num.split('-');
  return (num_arr.length > 2 ? false : true);
}
