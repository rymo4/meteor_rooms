Rooms = new Meteor.Collection('rooms');

Meteor.subscribe('rooms', function(){
  var room_id = Session.get('room_id');
  if (room_id){
    var room = Rooms.findOne({ name: room_id });
    if (room) { 
      Router.setRoom(room._id);
    }
  }
});

Template.new_room.events({
  'click #new_room' : function(){
    var room_name = $('#room_name').val();
    var id = Rooms.insert({name: room_name});
    Router.setRoom(id);
  }
});

Template.in_room.current_player = function(){
  return Players.findOne({_id: Session.get('player_id')});
};

Template.home.current_room = function(){
  return Rooms.findOne({_id: Session.get('room_id')});
};

Template.nav.current_room = function(){
  return Rooms.findOne({_id: Session.get('room_id')});
};

Template.in_room.current_room = function(){
  return Rooms.findOne({_id: Session.get('room_id')});
};

Template.in_room.players = function(){
  return Players.find({}).fetch();
};

Template.in_room.other_players = function(){
  return Players.find({_id: {$ne: Session.get('player_id')}});
};
