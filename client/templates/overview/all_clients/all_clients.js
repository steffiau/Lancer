Template.allClients.helpers({
	currentClients: function(){
		return Clients.find();// This need to be changed in the future	
	}, settings: function(){
		return{
	rowsPerPage: 20,
	showFilter: true,
	fields: [
	{key:'name',label:'Name'},
	{key:'company',label:'Company'},
	{key:'phone',label:'Phone'},
	{key:'email',label:'Email'},
	{key:'skype',label:'Skype'},
	{key:'notes',label:'Notes'},
	{key:'_id',label:'Create Project', fn: function(value,object){ 
	//Session.set['ClientId',this._id]																								 
	return new Spacebars.SafeString("<a href='/project/new/?client_id=" + value + "'> New Project </a>");}}]
		}
	}
});

Template.allClients.events({
 'click .reactive-table tbody tr': function(event){
	// if (event.target.className == '_id'){
	//			return '' ;
	// }
	// event.preventDefault();
	//alert('Go to detail client Page');
	 }
});
