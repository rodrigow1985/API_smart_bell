'use strict'

class Mobile {
    constructor(id, owner, exponent_push_token, sound_configured){
        this.id = id;
        this.owner = owner;
        this.exponent_push_token = exponent_push_token;
        this.exponent_push_token_formatted = 'ExponentPushToken[' + exponent_push_token + ']';
        this.sound_configured = sound_configured;
    }
}