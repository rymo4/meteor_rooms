Players = new Meteor.Collection('players');

Meteor.autosubscribe(function(){
  var room_id = Session.get('room_id');
  if (room_id) { Meteor.subscribe('players', room_id); }
});

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

Meteor.startup(function () {
  Backbone.history.start({pushState: true});
  // Use this for localStorage reactivity
  Session.set('player_id', localStorage.getItem('player_id'));
});
