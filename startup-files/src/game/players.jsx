import React from "react";

import './game.css';
import {GameEvent, GameNotify} from './GameNotify'

export function Players(props) {
    const username = props.username
    const [events, set_events] = React.useState([]);

    React.useEffect(() => {
        GameNotify.addHandler(handle_game_event);
        return () => {
            GameNotify.removeHandler(handle_game_event);
        };
    }, []);

    function handle_game_event(event) {
        set_events((prev_events) => {
            let new_events = [event, ...prev_events];
            if (new_events.length > 10) {
                new_events = new_events.slice(1,10);
            }
            return new_events
        });
    }

    function create_messages() {
        const messages = [];
        for (const [i, event] of events.entries()) {
            let message = 'unknown';
            if (event.type === GameEvent.End) {
                message = `scored ${event.value.score}`;
            } else if (event.type === GameEvent.Start) {
                message = 'started a new game';
            } else if (event.type === GameEvent.System) {
                message = event.value.msg;
            }
            messages.push(
                <li><span style={{color: 'white'}}>{event.from.split('@')[0]}</span> {message}</li>
            );
        };
        return messages 
    }
    
    return (
        <div className="data guesses">Player: {username}
            <ul style={{listStyleType: 'none', padding: 0, margin: 0}}>
                {create_messages()}
            </ul>
        </div>
    );
}