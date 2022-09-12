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

  // call this with: game.settings.get("ouija-board-for-sequencer", "end_move_sound");
  game.settings.register(moduleName, 'end_move_sound', {
    name: 'End Move Sound',
    hint: 'This sound is played when you trigger the move type end.',
    scope: 'world',
    config: true,
    default: 'modules/sequencer/samples/OujiaBoard/assets_sounds_intensive-stare.ogg',
    type: String
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

