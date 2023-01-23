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
    default: 'modules/ouija-board-for-sequencer/assets/sounds/distant-orchestra.ogg',
    type: String,
    filePicker: 'audio'
  });
  
  // call this with: game.settings.get("ouija-board-for-sequencer", "move_sound_volume")
  game.settings.register(moduleName, 'move_sound_volume', {
    name: 'Move Sound Volume', // "Warning Sound Volume"
    hint: 'You can set the volume for the move sound. Use 0.1 for 10% of the volume. 0.6 for 60% of the volume, and so on.', // "You can set the volume for the warning sound. Use 0.1 for 10% of the volume. 0.6 for 60% of the volume."
    scope: 'world',
    config: true,
    default: 0.8,
    range: {
        min: 0,
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
    default: 'modules/sequencer/samples/OujiaBoard/assets/sounds/intensive-stare.ogg',
    type: String,
    filePicker: 'audio'
  });

  // call this with: game.settings.get("ouija-board-for-sequencer", "end_move_sound_volume")
  game.settings.register(moduleName, 'end_move_sound_volume', {
    name: 'End Move Sound Volume', // "Warning Sound Volume"
    hint: 'You can set the volume for the move sound. Use 0.1 for 10% of the volume. 0.6 for 60% of the volume, and so on.', // "You can set the volume for the warning sound. Use 0.1 for 10% of the volume. 0.6 for 60% of the volume."
    scope: 'world',
    config: true,
    default: 0.9,
    range: {
        min: 0,
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
    type: String,
    filePicker: 'imagevideo'
  });  

  // call this with: game.settings.get("ouija-board-for-sequencer", "extra_time_min_default")
  game.settings.register(moduleName, 'extra_time_min_default', {
    name: 'Extra time minimum default', // 
    hint: 'This will define the minimum amount of extra time for next move start to execute.',
    scope: 'world',
    config: true,
    default: 1, 
    type: Number
  });
  
  // call this with: game.settings.get("ouija-board-for-sequencer", "extra_time_max_default")
  game.settings.register(moduleName, 'extra_time_max_default', {
    name: 'Extra time maximum default', // 
    hint: 'This will define the maximum amount of extra time for next move start to execute.', 
    scope: 'world',
    config: true,
    default: 1, 
    type: Number
  });
  
  // call this with: game.settings.get("ouija-board-for-sequencer", "move_speed_default")
  game.settings.register(moduleName, 'move_speed_default', {
    name: 'Move Speed', // 
    hint: "This will define the time to make the movement. This will result in control the speed. It's milliseconds (higher number, slow movement.)", 
    scope: 'world',
    config: true,
    default: 1000, 
    type: Number
  });  

  // call this with: game.settings.get("ouija-board-for-sequencer", "custom_position_label_1");
  game.settings.register(moduleName, 'custom_position_label_1', {
    name: 'Custom Position Label - 1',
    hint: 'This will change the label for the Custom Position 1.',
    scope: 'world',
    config: true,
    default: 'Good Bye',
    type: String
  });
  // call this with: game.settings.get("ouija-board-for-sequencer", "custom_position_label_2");
  game.settings.register(moduleName, 'custom_position_label_2', {
    name: 'Custom Position Label - 2',
    hint: 'This will change the label for the Custom Position 2.',
    scope: 'world',
    config: true,
    default: 'Left Skull',
    type: String
  });
  // call this with: game.settings.get("ouija-board-for-sequencer", "custom_position_label_3");
  game.settings.register(moduleName, 'custom_position_label_3', {
    name: 'Custom Position Label - 3',
    hint: 'This will change the label for the Custom Position 3.',
    scope: 'world',
    config: true,
    default: 'Sun',
    type: String
  });
  // call this with: game.settings.get("ouija-board-for-sequencer", "custom_position_label_4");
  game.settings.register(moduleName, 'custom_position_label_4', {
    name: 'Custom Position Label - 4',
    hint: 'This will change the label for the Custom Position 4.',
    scope: 'world',
    config: true,
    default: 'Right Skull',
    type: String
  });
  // call this with: game.settings.get("ouija-board-for-sequencer", "custom_position_label_1");
  game.settings.register(moduleName, 'custom_position_label_5', {
    name: 'Custom Position Label - 5',
    hint: 'This will change the label for the Custom Position 5.',
    scope: 'world',
    config: true,
    default: 'Moon',
    type: String
  });
  // call this with: game.settings.get("ouija-board-for-sequencer", "custom_position_label_6");
  game.settings.register(moduleName, 'custom_position_label_6', {
    name: 'Custom Position Label - 6',
    hint: 'This will change the label for the Custom Position 6.',
    scope: 'world',
    config: true,
    default: 'First Candle',
    type: String
  });  
  // call this with: game.settings.get("ouija-board-for-sequencer", "custom_position_label_7");
  game.settings.register(moduleName, 'custom_position_label_7', {
    name: 'Custom Position Label - 7',
    hint: 'This will change the label for the Custom Position 7.',
    scope: 'world',
    config: true,
    default: 'Second Candle',
    type: String
  }); 
  // call this with: game.settings.get("ouija-board-for-sequencer", "custom_position_label_8");
  game.settings.register(moduleName, 'custom_position_label_8', {
    name: 'Custom Position Label - 8',
    hint: 'This will change the label for the Custom Position 8.',
    scope: 'world',
    config: true,
    default: 'Key',
    type: String
  }); 
  // call this with: game.settings.get("ouija-board-for-sequencer", "custom_position_label_9");
  game.settings.register(moduleName, 'custom_position_label_9', {
    name: 'Custom Position Label - 9',
    hint: 'This will change the label for the Custom Position 9.',
    scope: 'world',
    config: true,
    default: 'Crystal',
    type: String
  });   
});

