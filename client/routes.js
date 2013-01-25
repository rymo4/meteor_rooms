var RoomRouter = Backbone.Router.extend({
  routes: {
    ':room_id'        : 'setRoom',
    ':room_id/logout' : 'logout',
    ''                : 'home'
  },
  startGame: function(room_id){
    this.navigate(room_id + '/play');
    Rooms.update(
      {_id: room_id}, 
      {$set: {open: false}}
    );
  },
  logout: function(room_id){
    Players.remove({_id: localStorage.getItem('player_id') });
    Session.set('player_id', null);
    localStorage.setItem('player_id', null);
    this.navigate('/', true);
  },
  home: function(){ 
    Session.set('room_id', null); 
    localStorage.setItem('room_id', null); 
  },
  setRoom: function(room_id){
    console.log(room_id);
    Session.set('room_id', room_id);
    localStorage.setItem('room_id', room_id);
    this.navigate(room_id);
  }
});

Router = new RoomRouter;
