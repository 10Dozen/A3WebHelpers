var Helpers = [
	["Wiki Helper"					, "A3WikiHelper.html"]
	,["tSF Briefing Helper"			, "tSF_Briefing_Helper.html"]
	,["tSF Endings Helper"			, "tSF_Mission_Endings_Helper.html"]
	,["DynAI Helper"				, "DynAI-Helper.html"]
	,["Mission Idea Generator"		, "tSF_MIG.html"]
];

function openPage(page) {
	window.open(page,"_self");
};

$( document ).ready(function () {
	for (var i = 0; i < Helpers.length; i++) {
		$('#helper-list').append(
			"<li><div class='btn' onClick='openPage(\"" + Helpers[i][1] + "\")'>" + Helpers[i][0]
			+ "</div></li>"
		)
	}
});