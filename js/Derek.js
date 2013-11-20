$(function(){
	$(".var-entry").change(computeRawScoresHardCoded);
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
					rowLoadSupported = $(this).find("input").val();
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