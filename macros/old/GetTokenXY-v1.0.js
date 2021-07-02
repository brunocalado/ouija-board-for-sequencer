// Get Token XY

/*

icon: icons/tools/hand/ruler-steel-grey.webp
*/

/*
token.data.rotation

https://github.com/fantasycalendar/FoundryVTT-Sequencer/wiki/Animations#move-towards
*/

let token;
const version = 'v1.0';

if (canvas.tokens.controlled[0]===undefined){
  ui.notifications.error("You must select a token!");    
} else {
  token=canvas.tokens.controlled[0];
  main();
}

async function main() {
  let message='';
  let finalCode = `{ x: ${token.position.x}, y: ${token.position.y} }`;
  
  message += `<ul><li>X: <b style="color:red">${token.position.x}</b></li>`;
  message += `<li>Y: <b style="color:red">${token.position.y}</b></li></ul>`;
  
  message += `<b style="color:red" id="#tokenposition">{ ${token.position.x}, ${token.position.y} }</p>`;
  message += `<p>Copied to clipboard.</p>`;

  
	let template = message;

	/* view */
	let form = `
		<label>Copy this</label>
		<textarea id="moduleTextArea" rows="3" cols="33">${finalCode}</textarea>
	`;

	let dialog = new Dialog({
		title: `Token Data - ${version}`,
		content: form,
		buttons: {
			use: {
				label: "Copy to Clipboard",
				callback: () => {
					let copyText = document.getElementById("moduleTextArea"); /* Get the text field */
					copyText.select(); /* Select the text field */
					document.execCommand("copy"); /* Copy the text inside the text field */
					ui.notifications.notify(`Saved on Clipboard`); /* Alert the copied text */
				}
			}
		}
	}).render(true);
}