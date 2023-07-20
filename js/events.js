function isMutation(txt) {
    lowerText = txt.toLowerCase();
    if (
		lowerText.includes("genesis")
		||
		lowerText.includes("lazarus")
		||
		lowerText.includes("depths")
		||
		lowerText.includes("dynasty")
		||
		lowerText.includes("tempest")
		||
		lowerText.includes("starstone")
		||
		lowerText.includes("barnacles")
		||
		lowerText.includes("empyrean") || lowerText.includes("forge")
		||
		lowerText.includes("ennead")
	) {
        return true;
    }
    return false;
}

function isFire(txt) {
    lowerText = txt.toLowerCase();
    if (lowerText.includes("fire")) {
        return true;
    }
    return false;
}

function isNature(txt) {
    lowerText = txt.toLowerCase();
    if (lowerText.includes("nature")) {
        return true;
    }
    return false;
}

function isVoid(txt) {
    lowerText = txt.toLowerCase();
    if (lowerText.includes("void")) {
        return true;
    }
    return false;
}

function isIce(txt) {
    lowerText = txt.toLowerCase();
    if (lowerText.includes("ice")) {
        return true;
    }
    return false;
}

function gemClass(summary) {
    var classes = "";

    if (isFire(summary)) {
        classes += (classes) ? " ": "";
        classes += "ruby";
    }
	
    return classes;
}

function getColor(txt) {
    lowerText = txt.toLowerCase();
    if (isFire(lowerText)) {
        return '#E53935';
    }
	else if (isNature(lowerText)) {
        return '#7CB342';
    }
	else if (isIce(lowerText)) {
        return '#00ACC1';
    }
	else if (isVoid(lowerText)) {
        return '#5E35B1';
    }
    return '#555555';
}
