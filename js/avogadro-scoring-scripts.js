/**
 * This file contains functions for the avogadro event scoring page
 * @author: Ryan Felton, Evan Glodowski, Derek Schindhelm, Dean Vang
 */

var convertStartingFormula = function(){
	avgo.forumulaVariables.forEach(function(variable){
		avgo.eventFormula = avgo.eventFormula.replace(variable, "window['" + variable + "']");
	});

}

var computeRawScores = function(){
	//Loop through every row in the table.
	$("#event_raw_table").find("tr").each(function(rowIndex){
		//Ignore first and second row, which has the header info. Index starts with first row being 0.
		if(rowIndex > 1 && $(this).find("td").length > 5){
			for(var i = 0; i < avgo.forumulaVariables.length; i++){
				window[avgo.forumulaVariables[i]] = "";
			}
			var totalColumns = $(this).find("td").length;
			//Loop through each column of the current row.
			$(this).find("td").each(function(columnIndex){
				if(columnIndex > 2){
					if(columnIndex < totalColumns - 2){
						window[avgo.forumulaVariables[columnIndex - 3]] = $(this).find("input").val();
					}else if (columnIndex == totalColumns - 2){
						var canSet = true;
						for(var i = 0; i < avgo.forumulaVariables.length; i++){
							if(window[avgo.forumulaVariables[i]] == ""){
								canSet = false;
							}
						}
						if(canSet){
							var result = eval(avgo.eventFormula);
							$(this).find("input").val(result);
							js_validate($(this).find("input"));
						}

					}
				}
			});
		}
	});
};

var computeRawScoresHardCoded = function(){
	//Loop through every row in the table.
	$("#event_raw_table").find("tr").each(function(rowIndex){
		//Ignore first and second row, which has the header info. Index starts with first row being 0.
		if(rowIndex > 1 && $(this).find("td").length > 5){
			var rowLoadSupported = "";
			var rowMass = "";
			var rowLineClearance = "";
			//Loop through each column of the current row.
			$(this).find("td").each(function(columnIndex){
				if(columnIndex == 3){
					//Finds the input child of the current colmun and sets the rowLoadSupported variable to be the value of the input.
					rowLoadSupported = $(this).find("input").val(); 
					//With jQuery, if nothing is in the "()" then it is a "getter".
					//If there is a value in the "()", then it is a "setter".
				}else if(columnIndex == 4){
					rowMass = $(this).find("input").val();
				}else if(columnIndex == 5){
					rowLineClearance = $(this).find("input").val();
				}else if(columnIndex == 6){
					//Check to make sure all fields have values, then compute score and set score box.
					if(rowLoadSupported != "" && rowMass != "" && rowLineClearance != ""){
						var result = (rowLoadSupported/rowMass) + (rowLineClearance * .1);
						$(this).find("input").val(result);
					}
				}
			});
		}
	});
};

var varBoxDisabler = function(){
	//Loop through each row of the table
	$("#event_raw_table").find("tr").each(function(rowIndex){
		//Ingore first two rows of table which contains the header info
		if(rowIndex > 1 && $(this).find("td").length > 5){
			var rawScore = "NULL";
			var numVariables = $(this).find("td").length - 5;
			//Loop through columns of table in reverse order
			$($($(this).find("td")).get().reverse()).each(function(columnIndex){
				//Get value of raw-score box if it contains something and is not disabled
				if(columnIndex == 1 && $(this).find("input").val() != "" && !$(this).find("input").is(":disabled")){
					rawScore = $(this).find("input").val();	
				}
				//Disable var-entry boxes if needed
				if(columnIndex >= 2 && columnIndex <= numVariables + 1){
					if (rawScore != "NULL"){
						$(this).find("input").attr("disabled", true);
						$(this).find("input").css('background-color', '#E8E8E8');	
					} else{
						$(this).find("input").attr("disabled", false);
						$(this).find("input").css('background-color', 'white');	
					}
				}
			});
		}
	});
};

var rawBoxDisabler = function(){
	var disableFlag = false;
	var varDisabled = false;
	var count = 0;
	var allFull = false;
	//Loop through every row in the table.
	$("#event_raw_table").find("tr").each(function(rowIndex){
		//Ignore first and second row, which has the header info.		
		if(rowIndex > 1 && $(this).find("td").length > 5){
			var numColumns = $(this).find("td").length;
			var variableValue = "";
			var numVariables = $(this).find("td").length - 5;
			//Loop through each column of the current row.
			$(this).find("td").each(function(columnIndex){
				//Check for values in var-entry textboxes
				if (columnIndex >= 3 && columnIndex < numVariables + 3){
					variableValue = $(this).find("input").val();
					varDisabled = $(this).find("input").is(":disabled");
					if (variableValue != ""){
						//A var-entry textbox has a value in it
						disableFlag = true;
						count++;
						if (count == numVariables){
							allFull = true;
							count = 0;
						}
					}
				}
				//Disable raw-score textbox if disableFlag is true
				if (columnIndex == numVariables + 3){
					if(disableFlag){
						$(this).find("input").attr("disabled", true);
						$(this).find("input").css('background-color', '#E8E8E8')
					}
					else{
						$(this).find("input").attr("disabled", false);
						$(this).find("input").css('background-color', 'white')	
					}
					//disableFlag = false;
					//count = 0;
					//Clear raw-score box if not all var-entry boxes are filled
					if (!allFull && !varDisabled){
						$(this).find("input").val("");	
					}
					allFull = false;
					varDisabled = false;
					disableFlag = false;
					count = 0;
				}
			});
		}
	});
};

$(function(){
	$(".var-entry").change(computeRawScores);
	findVariables();
	convertStartingFormula();
});

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


$(function(){
	$('.var-entry input').change(function(){
		js_validate($(this));
	});
});

$(function(){
	$(".var-entry").change(rawBoxDisabler);
	$(".raw-score").change(varBoxDisabler);
});

function findVariables()
{
	//Current formula
	var formula = avgo.eventFormula;
	//Returns variable strings inside square brackets and puts them into an array varFound
	avgo.forumulaVariables = formula.match(/[^[\]]+(?=])/g);
}

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