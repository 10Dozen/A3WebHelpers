SideOption = [
	""
	, "WEST"
	, "EAST"
	, "Irregulars"
	, "Civilians"
];

DoctrineOptions = [
	""
	, "US 1-4-4"
	, "UK 4-4"
	, "RU 4-3-2"
	, "RU 4-3"
	, "NPC"
];

ModsOptions = [
	""
	, "ACE3"
	, "RHS"
	, "CUP"
	, "TRYK"
	, "NIArms G3"
	, "NIArms FAL"
];

NotesOptions = [
	""
	, "Randomized gear"
	, "Random kit"
	, "Night Items"
	, "No SR radios"
	, "Cargo Kit"

];

function getCodeToDisplay(code) {
	code = code.replace(/<br \/>/g, "\n&lt;br /&gt;");
	code = code.replace(/</g, "&lt;");
	code = code.replace(/>/g, "&gt;");
	code = code.replace(/(\r\n|\n|\r)/g,"<br />");

	return code
}

function showFormattedCode(code, type) {

	if (type == "SQF") {
		$( "#result-tab-header > b" ).html("SQF Code");
	} else {
		$( "#result-tab-header > b" ).html("Git Wiki Code");
	};
	$( "#result-tab" ).css( "top", "15%" );
	$( "#result-tab-data" ).html( getCodeToDisplay(code) );
}

function closeCodeDisplay() {
	$( "#result-tab" ).css( "top", "-3000px" );
};

var Helper = function () {
	this.folderName = "";
	this.side = "";
	this.doctrine = "";
	this.mods = "";
	this.notes = "";
	this.revision = "";
	this.imageName = "";
	this.imageURL = "";
	this.fileName = "";
	this.fileURL = "";

	this.getData = function () {
		this.folderName = $(".folder-name-input").val();
		this.side = $(".side-input").val();
		this.doctrine = $(".doctrine-input").val();
		this.mods = $(".mods-input").val();
		this.notes = $(".notes-input").val();
		this.revision = $(".revision-input").val();
		this.imageName = $(".image-name-input").val();
		this.imageURL = $(".image-url-input").val();
		this.fileName = $(".file-name-input").val();
		this.fileURL = $(".file-url-input").val();
	};

	this.getLink = function (type) {
		var URL = "";
		var name = "";
		if (type == "folder") {
			return (
				 "https://raw.githubusercontent.com/rempopo/Gear_Kits_Collection/master/"
                 + encodeURIComponent(this.side)
                 + "/" + encodeURIComponent(this.folderName)
			);
		};

		if (type == "file") {
			URL = this.fileURL;
			name = this.fileName;
		} else {
			URL = this.imageURL;
			name = this.imageName;
		};

		var link = "";
		if (URL.length > 0) {
			link = URL;
		} else {
			link = "https://raw.githubusercontent.com/rempopo/Gear_Kits_Collection/master/"
        		+ encodeURIComponent(this.side)
        		+ "/" + encodeURIComponent(this.folderName)
        		+ "/" + encodeURIComponent(name);
		};

		return link;
	};

	this.compileKitReadme = function () {
		this.getData();

		var text = "### " + this.folderName + " ([KitLink](" + this.getLink('file') + "))\n"
			+ this.side + " | " + this.doctrine
			+  "\n<br />"
			+ '\n<img src="' + this.getLink('image') + '" />'
			+ "\n\n##### Mods:\n"
			+ this.mods
			+ "\n##### Notes:\n"
			+ this.notes
			+ "\n##### Revision " + this.revision;

		return text;
	};

	this.compileGlobalReadmeLink = function () {
		this.getData();

		return ( "- [[KitLink](" + this.getLink("file") + ")]"
			+ " [" + this.folderName + "](" + this.getLink("folder") + ")");
	};
	this.showSummary = function () {
		var text = "Global Readme.md:\n\n" + this.compileGlobalReadmeLink()
			+ "\n\n\nLocal Readme.md:\n\n" + this.compileKitReadme();

		showFormattedCode(text, "git");
	};
	this.reset = function () {
		$(".folder-name-input").val("");
		$(".side-input").val("");
		$(".doctrine-input").val("");
		$(".mods-input").val("");
		$(".notes-input").val("");
		$(".revision-input").val("");
		$(".image-name-input").val("");
		$(".image-url-input").val("");
		$(".file-name-input").val("");
		$(".file-url-input").val("");

		this.getData();
	};

	this.setOption = function (option) {
		$('.' + option + '-input').val( $('#' + option + '-options option:selected').text() );
	};

	this.addOption = function (option) {
		$('.' + option + '-input').val(
			$('.' + option + '-input').val() + "- " + $('#' + option + '-options option:selected').text() + "\n"
		);
	};


	this.init = function () {
		var d_options = "";
		DoctrineOptions.forEach(function (item, i, arr) {d_options += "<option value=''>" + item + "</option>";})
		$("#doctrine-options").append(d_options);
		$("#doctrine-options").change(function () {
			 KitHelper.setOption("doctrine");
		});

		var s_options = "";
		SideOption.forEach(function (item, i, arr) {s_options += "<option value=''>" + item + "</option>";})
		$("#side-options").append(s_options);
		$("#side-options").change(function () {
			 KitHelper.setOption("side");
		});

		var m_options = "";
		ModsOptions.forEach(function (item, i, arr) {m_options += "<option value=''>" + item + "</option>";})
		$("#mods-options").append(m_options);
		$("#mods-options").change(function () {
			 KitHelper.addOption("mods");
		});

		var n_options = "";
		NotesOptions.forEach(function (item, i, arr) {n_options += "<option value=''>" + item + "</option>";})
		$("#notes-options").append(n_options);
		$("#notes-options").change(function () {
			 KitHelper.addOption("notes");
		});

		$(".btn-get-wiki").on("click", function () {
			KitHelper.showSummary();
		});
		$(".btn-clear").on("click", function () {
        	KitHelper.reset();
        });

	};

	this.init();
};


$( document ).ready(function() {
    KitHelper = new Helper();
});