Players = new Meteor.Collection('players');
Rooms   = new Meteor.Collection('rooms');

Meteor.publish('rooms', function(){
  return Rooms.find();
});

Meteor.publish('players', function(room_id){
  return Players.find({room_id: room_id});
});
