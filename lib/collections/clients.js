Clients = new Mongo.Collection('clients');
clientSchema = new SimpleSchema({
	name:{
		type:String,
		optional: false
	},
	phone:{
		type:String,
		optional: false
	},
	email:{
		type:String,
		optional: false
	},
	company:{
		type:String,
		optional:true
	},
	notes:{
		type:String,
		optional:true
	},
	skype:{
		type:String,
		optional:true
	},
	'other':{
		type:Array,
		optional:true,
	},
	'other.$':{
		type:Object,
	},
	'other.$.key':{
		type:String,
		optional: false
	},
	'other.$.value':{
		type:String,
		optional: false
	}
});
