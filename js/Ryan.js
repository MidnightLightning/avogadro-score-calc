$(function(){
	$(".var-entry").change(rawBoxDisabler);
	$(".raw-score").change(varBoxDisabler);
});

var rawBoxDisabler = function(){
	var disableFlag = false;
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
					if (variableValue != ""){
						//A var-entry textbox has a value in it
						disableFlag = true;
						count++;
						if (count == numVariables){
							allFull = true;	
						}
					}
				}
				//Disable raw-score textbox if disableFlag is true
				if (columnIndex == numVariables + 3){
					if(disableFlag){
						$(this).find("input").attr("disabled", true);
					}
					else{
						$(this).find("input").attr("disabled", false);	
					}
					disableFlag = false;
					count = 0;
					//Clear raw-score box if not all var-entry boxes are filled
					if (!allFull){
						$(this).find("input").val("");	
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
					} else{
						$(this).find("input").attr("disabled", false);	
					}
				}
			});
		}
	});
};