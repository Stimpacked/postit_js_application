/**
 * Initiate the application
 *
 * @Author	 Stefan Sjönnebring
 */


var postits = null;

var Main = {

	/**
	 *	The class constructor. 
	**/
	init : function() 
	{	
		// run new post it function in the postit collection object
		postits.NewPostIt();
	}
}


/**
 *	The event listener that activates the base class.
**/

window.onload=function() {
	// start PostItCollection 
	postits = new PostItCollection();

	//new sticker button
	var el = document.getElementById('add-new-sticker-btn');
	el.addEventListener('click', Main.init, false);
}