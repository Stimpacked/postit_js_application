/**
 *	A draggable windows object.
 *
 *	@requires	Event.js, Drag.js, Utils.js
 */
function Window(){

	//---------------------------------------------------
	//  Private properties
	//---------------------------------------------------
	
	/**
	 *	Internal reference to the instance of this object. 
	 *	Use this property to access the object(this) from 
	 *	private methods.
	 *
	 *	@default this
	 */
	var self = this;
	
	//---------------------------------------------------
	//  Public properties
	//---------------------------------------------------
	
	/**
	 *	Reference to the object's graphical representation, 
	 *	serves as a graphical container for this object.
	 *
	 *	@default null
	 */
	this.element = null;
	
	/**
	 *	Reference to the windows object's menu bar, useful 
	 *	if you want to add buttons or similar.
	 *
	 *	@default null
	 */
	this.menubar = null;
	
	/**
	 *	Reference to the windows object's contents, add text, 
	 *	or other HTML elements.
	 *
	 *	@default null
	 */
	this.content = null;
	
	//---------------------------------------------------
	//  Private method
	//---------------------------------------------------
	
	/**
	 *	The class constructor. Creates all the graphic 
	 *	elements and applies the event listeners.
	 *
	 *	@default undefined
	 */
	function init(){
		
		self.menubar = document.createElement('div');
		self.menubar.setAttribute('class', 'menubar');
		
		self.content = document.createElement('div');
		self.content.setAttribute('class', 'content');
		
		self.element = document.createElement('div');
		self.element.setAttribute('class', 'window');
		
		self.element.appendChild(self.menubar);
		self.element.appendChild(self.content);
		
		Event.addEventListener(self.menubar,  Event.MOUSE_DOWN,	startDrag);
		Event.addEventListener(self.menubar,  Event.MOUSE_UP,	stopDrag);
	}
	
	/**
	 *	Starts the drag-and-drop functionality with a 
	 *	few CSS tweeks.
	 *
	 *	@return void
	 */
	function startDrag(event){
		self.element.style.zIndex	= Utils.getUniqueId(); // GENERATES A UNIQUE Z-INDEX BASED ON TIME IN ORDER TO GET ON TOP.
		self.element.style.opacity	= 0.7;
		self.menubar.style.cursor	= 'move';
		
		Drag.beginDrag(self.element, event);
	}
	
	/**
	 *	Stops the drag-and-drop functionality with a few 
	 *	CSS tweeks.
	 *
	 *	@return void
	 */
	function stopDrag(event){
		
		self.element.style.opacity	= 1;
		self.menubar.style.cursor	= 'default';
	}
	
	/**
	 *	Triggers the class constructor.
	 */
	init();
}