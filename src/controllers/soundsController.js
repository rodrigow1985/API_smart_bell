'use strict'

const fs = require("fs");

var SoundController = () => { }

SoundController.getAllSounds = () => {
    // MOBILES DATA
    let soundData;
    try {
        const soundJson = fs.readFileSync('/home/rodrigo/Desarrollo/js/node/api-smart-bell/src/data/sounds.json', 'utf8');
        return soundData = JSON.parse(soundJson);
    } catch (err) {
        console.log(err);
        return;
    }
}

module.exports = SoundController