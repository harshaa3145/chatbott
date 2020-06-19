require('../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css');
console.log('1');
//var SDK = require('blocksdk');
var sdk = new SDK(null, null, true); // 3rd argument true bypassing https requirement: not prod worthy

var address, width, height, zoom, link, mapsKey;

function debounce (func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

function paintMap() {

	console.log('2');
	mapsKey = document.getElementById('text-input-id-0').value;
	console.log('mapsKey'+mapsKey);
	//address = document.getElementById('text-input-id-1').value;
	//width = document.getElementById('slider-id-01').value;
	//height = document.getElementById('slider-id-02').value;
	//zoom = document.getElementById('slider-id-03').value;
	link = '<table width=100% border=0 cellspacing=0 cellpadding=0><tr><td align=center><table border=0 cellspacing=0 cellpadding=0><tr><td id=abc class=innertd buttonblock bgcolor=#009DDC style= border-radius: 3px; -moz-border-radius: 3px; -webkit-border-radius: 3px; background-color: #009DDC;><a target=_blank class=buttonstyles style= font-size: 16px; font-family: Arial, Helvetica, sans-serif; color: #FFFFFF; text-align: center; text-decoration: none; display: block; background-color: #009DDC; border: 1px solid #009DDC; padding: 10px; border-radius: 3px; -moz-border-radius: 3px; -webkit-border-radius: 3px; id=abc var= set= href=https://techkasetti.com/index.html?Channel='+mapsKey+' title= alias= conversion=false data-linkto=other>Button Text</a></td></tr></table></td></tr></table>';
	if (!mapsKey) {
		return;
	}
	/*var url = 'https://maps.googleapis.com/maps/api/staticmap?center=' +
		address.split(' ').join('+') + '&size=' + width + 'x' + height + '&zoom=' + zoom +
		'&markers=' + address.split(' ').join('+') + '&key=' + mapsKey;*/
	sdk.setContent(link);
	sdk.setData({
		mapsKey: mapsKey
	});
	//localStorage.setItem('googlemapsapikeyforblock', mapsKey);

}

sdk.getData(function (data) {
	
	mapsKey = data.mapsKey;
	console.log('mapsKey'+mapsKey);
	//paintSettings();
	//paintSliderValues();
	paintMap();
});

document.getElementById('workspace').addEventListener("input", function () {
	console.log('3');
	debounce(paintMap, 500)();
	//paintSliderValues();
});
