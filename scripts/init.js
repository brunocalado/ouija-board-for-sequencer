const moduleName = 'ouija-board-for-sequencer';
import {ouija} from './ouija.js'

Hooks.once('init', () => {
  // --------------------------------------------------
  // Load API
  game.modules.get(moduleName).api = { ouija }; // Request with: const ouija = game.modules.get('ouija-board-for-sequencer')?.api.ouija;

  // --------------------------------------------------
  // Module Options

  // call this with: game.settings.get("ouija-board-for-sequencer", "move_sound");
  game.settings.register(moduleName, 'move_sound', {
    name: 'Move Sound',
    hint: 'This sound is played each movement.',
    scope: 'world',
    config: true,
    default: 'modules/sequencer/samples/OujiaBoard/assets_sounds_distant-orchestra.ogg',
    type: String
  });
  
  // call this with: game.settings.get("ouija-board-for-sequencer", "move_sound_volume")
  game.settings.register(moduleName, 'move_sound_volume', {
    name: 'Move Sound Volume', // "Warning Sound Volume"
    hint: 'You can set the volume for the move sound. Use 0.1 for 10% of the volume. 0.6 for 60% of the volume, and so on.', // "You can set the volume for the warning sound. Use 0.1 for 10% of the volume. 0.6 for 60% of the volume."
    scope: 'world',
    config: true,
    default: 0.8,
    range: {
        min: 0.2,
        max: 1,
        step: 0.1
    },     
    type: Number
  });
  
  // call this with: game.settings.get("ouija-board-for-sequencer", "end_move_sound");
  game.settings.register(moduleName, 'end_move_sound', {
    name: 'End Move Sound',
    hint: 'This sound is played when you trigger the move type end.',
    scope: 'world',
    config: true,
    default: 'modules/sequencer/samples/OujiaBoard/assets_sounds_intensive-stare.ogg',
    type: String
  });

  // call this with: game.settings.get("ouija-board-for-sequencer", "end_move_sound_volume")
  game.settings.register(moduleName, 'end_move_sound_volume', {
    name: 'End Move Sound Volume', // "Warning Sound Volume"
    hint: 'You can set the volume for the move sound. Use 0.1 for 10% of the volume. 0.6 for 60% of the volume, and so on.', // "You can set the volume for the warning sound. Use 0.1 for 10% of the volume. 0.6 for 60% of the volume."
    scope: 'world',
    config: true,
    default: 0.9,
    range: {
        min: 0.2,
        max: 1,
        step: 0.1
    },     
    type: Number
  });
  
  
  // call this with: game.settings.get("ouija-board-for-sequencer", "end_animation");
  game.settings.register(moduleName, 'end_animation', {
    name: 'End Animation',
    hint: 'This animation will happen at the end of the movement.',
    scope: 'world',
    config: true,
    default: 'modules/ouija-board-for-sequencer/assets/animation/TollTheDeadSkullSmoke_01_Regular_Grey_400x400.webm',
    type: String
  });  
  
});

