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


var room_id = Session.get('room_id');

Rooms.find().observe({
  changed: function(new_room, atIndex, old_room){
    if (new_room._id === Session.get('room_id') &&
      new_room.open !== old_room.open){
        Router.startGame(new_room._id);
    }
  }
  });

Template.new_room.events({
  'click #new_room' : function(){
    var room_name = $('#room_name').val();
    var id = Rooms.insert({name: room_name, open: true});
    Router.setRoom(id);
  }
});

Template.in_room.events({
  'click #start_game' : function(){
    var start = confirm("Are you sure you want to start the game? "
      + "Nobody will be able to join after the game starts.");
    if (start){
      Router.startGame(Session.get('room_id'));
      console.log('GAME STARTED');
    }
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

Meteor.startup(function () {
  // Use this for localStorage reactivity
  Session.set('room_id', localStorage.getItem('room_id'));
});
