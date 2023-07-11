import {legacy_createStore} from 'redux';

const store = legacy_createStore(reducer);


function reducer( state,actions){
    const ACTION_1 = 'ACTION_1';
    switch ( actions.type) {
        case ACTION_1 : return {a:'123'};
    default: return state;
    }
}

export default store;