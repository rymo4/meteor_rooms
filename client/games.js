Players = new Meteor.Collection('players');
Rooms   = new Meteor.Collection('rooms');

Meteor.subscribe('rooms', function(){
  var room_id = Session.get('room_id');
  if (room_id){
    var room = Rooms.findOne({ name: room_id });
    if (room) { 
      Router.setRoom(room._id);
    }
  }
});

Meteor.autosubscribe(function(){
  var room_id = Session.get('room_id');
  if (room_id) { Meteor.subscribe('players', room_id); }
});

var RoomRouter = Backbone.Router.extend({
  routes: {
    ':room_id'        : 'setRoom',
    ':room_id/logout': 'logout',
    ''                : 'home'
  },
  logout: function(room_id){
    Players.remove({_id: localStorage.getItem('player_id') });
    Session.set('player_id', null);
    localStorage.setItem('player_id', null);
    this.navigate('/', true);
  },
  home: function(){ Session.set('room_id', null); },
  setRoom: function(room_id){
    console.log(room_id);
    Session.set('room_id', room_id);
    this.navigate(room_id);
  }
});

Router = new RoomRouter;

Template.new_player.events({
  'click #new_player' : function(){
    var player_name = $('#player_name').val();
    var id = Players.insert({
      name: player_name,
      room_id: Session.get('room_id')
    });
    localStorage.setItem('player_id', id);
    Session.set('player_id', id);
  }
});

Template.in_room.current_player = function(){
  return Players.findOne({_id: Session.get('player_id')});
};

Template.home.current_room = function(){
  return Rooms.findOne({_id: Session.get('room_id')});
};
Template.in_room.current_room = function(){
  return Rooms.findOne({_id: Session.get('room_id')});
};

Template.in_room.players = function(){
  return Players.find({});
};

Template.new_room.events({
  'click #new_room' : function(){
    var room_name = $('#room_name').val();
    var id = Rooms.insert({name: room_name});
    Router.setRoom(id);
  }
});

Meteor.startup(function () {
  Backbone.history.start({pushState: true});
  // Use this for localStorage reactivity
  Session.set('player_id', localStorage.getItem('player_id'));
});
