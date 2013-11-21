$(function(){
	$(".var-entry").change(computeRawScores);
});
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
						}
						
					}
				}
			});
		}
	});
};