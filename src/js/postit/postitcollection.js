/**
 * Store a collection of post-its
 *
 * @Author	 Stefan Sjönnebring
 */
function PostItCollection(){

	var self = this;
	var postItList = null;
	
	var newPostIt = null;

	function init(){
		
		// instanciate the array
		self.postItList = new Array();

		// run function to get the xml from php
		loadXml();		
	}



	function loadXml() {

		// Create our XMLHttpRequest object
		var hr = new XMLHttpRequest();

		// Access the onreadystatechange event for the XMLHttpRequest object
		hr.onreadystatechange = function() {
			
			// When ready
			if(hr.readyState == 4 && hr.status == 200) {

				// Convert responseText to JSON object
				var PostitListJSON = JSON.parse(hr.responseText);

				// Check if json object is a array, then loop through the array to get each xml object
				if(Object.prototype.toString.call(PostitListJSON.sticker) === '[object Array]') {
					// Loop through the JSON object
					for(var key in PostitListJSON.sticker) {
						
						// Create new temp PostIt object
						var newPostIt = new PostIt();

						// Run the AddPostIt function
						newPostIt.AddPostIt(
							PostitListJSON.sticker[key].id, 
							PostitListJSON.sticker[key].text, 
							PostitListJSON.sticker[key].position.x, 
							PostitListJSON.sticker[key].position.y, 
							PostitListJSON.sticker[key].position.z
						);

						// Add event for exit
						Event.addEventListener(newPostIt.postItWindow.exitSticker, Event.CLICK, exit);

						// Add postit to list of postits
						self.postItList.push(newPostIt);

						// Add to DOM
						document.body.appendChild(newPostIt.postItWindow.element);
					}
					// Check that if json object isnt a array, that it is a object, then set a new postit with the data
				} else if(Object.prototype.toString.call(PostitListJSON.sticker) === '[object Object]') {
					// Create new temp PostIt object
					var newPostIt = new PostIt();

					// Run the AddPostIt function
					newPostIt.AddPostIt(
						PostitListJSON.sticker.id, 
						PostitListJSON.sticker.text, 
						PostitListJSON.sticker.position.x, 
						PostitListJSON.sticker.position.y, 
						PostitListJSON.sticker.position.z
					);

					// Add event for exit
					Event.addEventListener(newPostIt.postItWindow.exitSticker, Event.CLICK, exit);

					// Add postit to list of postits
					self.postItList.push(newPostIt);

					// Add to DOM
					document.body.appendChild(newPostIt.postItWindow.element);
				}

				
			}
		}

		hr.open("GET", "src/php/xhrFetch.php", true);
		hr.send();	
	}


	// public method for Main.js to instanciate a new PostIt
	this.NewPostIt = function() {

		// start with id 1
		var id = 1;
		// get the numbers of postits in the array
		var noOfPostIts = self.postItList.length;
		
		// loop though and check every postit in the array for the highest ID and set the new ID to that + 1
		for(var i=0; i<noOfPostIts; i++) {
			if (id <= self.postItList[i].id) {
				id = parseInt(self.postItList[i].id) + 1;
			}
		}

		// Create new postit, push it to the array of postits and finaly add it to the DOM
		var newPostIt = new PostIt();
		newPostIt.AddPostIt(id, "", "50px", "75px", "500");
		// Add event for exit
		Event.addEventListener(newPostIt.postItWindow.exitSticker, Event.CLICK, exit);
		self.postItList.push(newPostIt);
		document.body.appendChild(newPostIt.postItWindow.element);
	}

	function exit(event) {
		
		// get id for this postit
		var postItId = this.getAttribute('rel');

		// get number of postits in array
		var noOfPostIts = self.postItList.length;

		// search for the correct postit 
		for(var i=0; i<noOfPostIts; i++) {
			if (postItId == self.postItList[i].id) {
				// remove it from the array
				self.postItList.splice(i, 1);
				break;
			}
		}

		// Remove it from the XML database
		// Create our XMLHttpRequest object
		var hr = new XMLHttpRequest();
		// Create some variables we need to send to our PHP file
		var url = "src/php/xhrRemove.php";

		var vars = "id="+postItId;

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

		// remove it from the DOM
		this.parentElement.parentElement.removeChild(this.parentElement);

	}


	// run init
	init();
}