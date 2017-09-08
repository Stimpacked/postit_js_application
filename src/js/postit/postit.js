/**
 * A draggable post-it
 *
 * @Author	 Stefan Sjönnebring
 */
function PostIt(){

	var self = this;
	this.id = null;
	this.text = null;
	this.xcord = null;
	this.ycord = null;
	this.zcord = null;
	this.postItWindow = null;

	// Append post-it
	this.AddPostIt = function(id, text, x, y, z) {

		// create a new window
		self.postItWindow = new Window();

		// Menubar
		self.postItWindow.menubar.setAttribute('class', 'sticker-drag');
		
		// Exit sticker button
		self.postItWindow.exitSticker = document.createElement('div');
		self.postItWindow.exitSticker.setAttribute('class', 'sticker-close');

		// save in internal object variable (self.id)
		self.id = id;
		self.postItWindow.exitSticker.setAttribute('rel', id);

		// text 
		self.postItWindow.textArea = document.createElement('textarea');
		self.postItWindow.textArea.setAttribute('name', 'textArea');
		self.postItWindow.textArea.innerHTML = text;
		self.text = text;

		// x, y, z
		self.postItWindow.element.style.left = x;
		self.xcord = x;
		self.postItWindow.element.style.top = y;
		self.ycord = y;
		self.postItWindow.element.style.zIndex = z;
		self.zcord = z;

		self.postItWindow.content.setAttribute('class', 'content');
		self.postItWindow.content.appendChild(self.postItWindow.textArea);
		
		// The window
		self.postItWindow.element.setAttribute('class', 'sticker');
		self.postItWindow.element.appendChild(self.postItWindow.menubar);
		self.postItWindow.element.appendChild(self.postItWindow.exitSticker);
		self.postItWindow.element.appendChild(self.postItWindow.content);		
		
		// Event listeners
		Event.addEventListener(self.postItWindow.menubar, Event.CLICK, postStuff);
		Event.addEventListener(self.postItWindow.textArea, Event.KEY_UP, postStuff);		
	}
	


	/**
	 * Send POST-data
	 */
	function postStuff(event){

		// Create our XMLHttpRequest object
		var hr = new XMLHttpRequest();
		// Create some variables we need to send to our PHP file
		var url = "src/php/xhrStore.php";

		var x = self.postItWindow.element.style.left;
		var y = self.postItWindow.element.style.top;
		var z = self.postItWindow.element.style.zIndex;
		var text = self.postItWindow.textArea.value;
		
		var vars = "id="+self.id+"&textArea="+text+"&xcord="+x+"&ycord="+y+"&zcord="+z;

		hr.open("POST", url, true);
		
		hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		// Access the onreadystatechange event for the XMLHttpRequest object
		hr.onreadystatechange = function() {
	
			if(hr.readyState == 4 && hr.status == 200) {
				var return_data = hr.responseText;
			}
		}
		// Send the data to PHP now... and wait for response to update the status div
		hr.send(vars); // Actually execute the request

	}

}