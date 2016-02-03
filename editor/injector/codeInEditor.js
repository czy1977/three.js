/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global editor, THREE, scope */

window.addEventListener("loadModelJson", function (event) {
	event.preventDefault();
	event.stopPropagation();
	console.log(event.detail);
	editor.clear();
	loadScene(event.detail);
});
function loadScene(jsonObj) {
	var data = jsonObj;
	if (data === null)
	{
		alert("can not parse model json");
		return;
	}
	var loader = new THREE.ObjectLoader();
	// texture path
	var texturePath = "";
	loader.setTexturePath(texturePath);

	var result = loader.parse(data);

	if (result instanceof THREE.Scene) {

		editor.setScene(result);

	} else {

		editor.addObject(result);
		editor.select(result);

	}
}
function animate() {

				requestAnimationFrame( animate );

				render();
				stats.update();

			}