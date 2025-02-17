const GameEvent = {
    System: 'system',
    End: 'gameEnd',
    Start: 'gameStart',
  };
  
  class EventMessage { //constructs the message?
    constructor(from, type, value) {
      this.from = from;
      this.type = type;
      this.value = value;
    }
  }
  
  class GameEventNotifier {
    events = [];
    handlers = [];
  
    constructor() {
      // websocket will replace
      setInterval(() => {
        const score = Math.floor(Math.random() * 27);
        const date = new Date().toLocaleDateString();
        const userName = 'Telemachus';
        this.broadcastEvent(userName, GameEvent.End, { name: userName, score: score, date: date });
      }, 5000);
    }
  
    broadcastEvent(from, type, value) {
      const event = new EventMessage(from, type, value);
      this.receiveEvent(event);
    }
  
    addHandler(handler) {
      this.handlers.push(handler);
    }
  
    removeHandler(handler) {
      this.handlers.filter((h) => h !== handler);
    }
  
    receiveEvent(event) {
      this.events.push(event);
  
      this.handlers.forEach((handler) => {
        handler(event);
      });
    }
  }
  
  const GameNotify = new GameEventNotifier();
  export { GameEvent, GameNotify };