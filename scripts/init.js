const moduleName = 'ouija-board-for-sequencer';
import { ouija } from './ouija.js';
import { DEFAULT_MAP } from './map-default.js';

Hooks.once('init', () => {
  // --------------------------------------------------
  // Load API
  // Request with: const ouija = game.modules.get('ouija-board-for-sequencer')?.api.ouija;
  game.modules.get(moduleName).api = { ouija }; 

  // --------------------------------------------------
  // Module Options

  // call this with: game.settings.get("ouija-board-for-sequencer", "persistent_dialog")
  game.settings.register(moduleName, 'persistent_dialog', {
    name: 'Persistent Dialog',
    hint: 'When enabled, the control dialog stays open after clicking Move. When disabled, it closes after each move.',
    scope: 'world',
    config: true,
    default: true,
    type: Boolean
  });

  // call this with: game.settings.get("ouija-board-for-sequencer", "move_sound");
  game.settings.register(moduleName, 'move_sound', {
    name: 'Move Sound',
    hint: 'This sound is played each movement.',
    scope: 'world',
    config: false,
    default: 'modules/ouija-board-for-sequencer/assets/sounds/distant-orchestra.ogg',
    type: String,
    filePicker: 'audio'
  });

  // call this with: game.settings.get("ouija-board-for-sequencer", "move_sound_volume")
  game.settings.register(moduleName, 'move_sound_volume', {
    name: 'Move Sound Volume', // "Warning Sound Volume"
    hint: 'You can set the volume for the move sound. Use 0.1 for 10% of the volume. 0.6 for 60% of the volume, and so on.', // "You can set the volume for the warning sound. Use 0.1 for 10% of the volume. 0.6 for 60% of the volume."
    scope: 'world',
    config: false,
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
    config: false,
    default: 'modules/ouija-board-for-sequencer/assets/sounds/intensive-stare.ogg',
    type: String,
    filePicker: 'audio'
  });

  // call this with: game.settings.get("ouija-board-for-sequencer", "end_move_sound_volume")
  game.settings.register(moduleName, 'end_move_sound_volume', {
    name: 'End Move Sound Volume', // "Warning Sound Volume"
    hint: 'You can set the volume for the move sound. Use 0.1 for 10% of the volume. 0.6 for 60% of the volume, and so on.', // "You can set the volume for the warning sound. Use 0.1 for 10% of the volume. 0.6 for 60% of the volume."
    scope: 'world',
    config: false,
    default: 0.9,
    range: {
        min: 0,
        max: 1,
        step: 0.1
    },
    type: Number
  });

  // call this with: game.settings.get("ouija-board-for-sequencer", "use_end_sound")
  game.settings.register(moduleName, 'use_end_sound', {
    name: 'Use End Sound',
    hint: 'When enabled, the end sound replaces the normal move sound.',
    scope: 'world',
    config: false,
    default: true,
    type: Boolean
  });

  // call this with: game.settings.get("ouija-board-for-sequencer", "extra_time_min_default")
  game.settings.register(moduleName, 'extra_time_min_default', {
    name: 'Extra time minimum default',
    hint: 'This will define the minimum amount of extra time for next move start to execute.',
    scope: 'world',
    config: false,
    default: 1,
    type: Number
  });

  // call this with: game.settings.get("ouija-board-for-sequencer", "extra_time_max_default")
  game.settings.register(moduleName, 'extra_time_max_default', {
    name: 'Extra time maximum default',
    hint: 'This will define the maximum amount of extra time for next move start to execute.',
    scope: 'world',
    config: false,
    default: 1,
    type: Number
  });

  // call this with: game.settings.get("ouija-board-for-sequencer", "move_speed_default")
  game.settings.register(moduleName, 'move_speed_default', {
    name: 'Move Speed',
    hint: "This will define the time to make the movement. This will result in control the speed. It's milliseconds (higher number, slow movement.)",
    scope: 'world',
    config: false,
    default: 1000, 
    type: Number
  });  

  // call this with: game.settings.get("ouija-board-for-sequencer", "custom_position_label_1");
  game.settings.register(moduleName, 'custom_position_label_1', {
    name: 'Custom Position Label - 1',
    hint: 'This will change the label for the Custom Position 1.',
    scope: 'world',
    config: false,
    default: 'Good Bye',
    type: String
  });
  // call this with: game.settings.get("ouija-board-for-sequencer", "custom_position_label_2");
  game.settings.register(moduleName, 'custom_position_label_2', {
    name: 'Custom Position Label - 2',
    hint: 'This will change the label for the Custom Position 2.',
    scope: 'world',
    config: false,
    default: 'Left Skull',
    type: String
  });
  // call this with: game.settings.get("ouija-board-for-sequencer", "custom_position_label_3");
  game.settings.register(moduleName, 'custom_position_label_3', {
    name: 'Custom Position Label - 3',
    hint: 'This will change the label for the Custom Position 3.',
    scope: 'world',
    config: false,
    default: 'Sun',
    type: String
  });
  // call this with: game.settings.get("ouija-board-for-sequencer", "custom_position_label_4");
  game.settings.register(moduleName, 'custom_position_label_4', {
    name: 'Custom Position Label - 4',
    hint: 'This will change the label for the Custom Position 4.',
    scope: 'world',
    config: false,
    default: 'Right Skull',
    type: String
  });
  // call this with: game.settings.get("ouija-board-for-sequencer", "custom_position_label_1");
  game.settings.register(moduleName, 'custom_position_label_5', {
    name: 'Custom Position Label - 5',
    hint: 'This will change the label for the Custom Position 5.',
    scope: 'world',
    config: false,
    default: 'Moon',
    type: String
  });
  // call this with: game.settings.get("ouija-board-for-sequencer", "custom_position_label_6");
  game.settings.register(moduleName, 'custom_position_label_6', {
    name: 'Custom Position Label - 6',
    hint: 'This will change the label for the Custom Position 6.',
    scope: 'world',
    config: false,
    default: 'First Candle',
    type: String
  });
  // call this with: game.settings.get("ouija-board-for-sequencer", "custom_position_label_7");
  game.settings.register(moduleName, 'custom_position_label_7', {
    name: 'Custom Position Label - 7',
    hint: 'This will change the label for the Custom Position 7.',
    scope: 'world',
    config: false,
    default: 'Second Candle',
    type: String
  });
  // call this with: game.settings.get("ouija-board-for-sequencer", "custom_position_label_8");
  game.settings.register(moduleName, 'custom_position_label_8', {
    name: 'Custom Position Label - 8',
    hint: 'This will change the label for the Custom Position 8.',
    scope: 'world',
    config: false,
    default: 'Key',
    type: String
  });
  // call this with: game.settings.get("ouija-board-for-sequencer", "custom_position_label_9");
  game.settings.register(moduleName, 'custom_position_label_9', {
    name: 'Custom Position Label - 9',
    hint: 'This will change the label for the Custom Position 9.',
    scope: 'world',
    config: false,
    default: 'Crystal',
    type: String
  });

  // Stored as JSON string. config: false hides it from the raw settings UI.
  // Accessed via the Map Editor button instead.
  game.settings.register(moduleName, 'map_data', {
    name: 'Map Data',
    hint: 'JSON map of board positions. Edit via the Map Editor button in module settings.',
    scope: 'world',
    config: false,
    default: JSON.stringify(DEFAULT_MAP, null, 2),
    type: String
  });

  // Expose simplified global for macros: Ouija.Control(), Ouija.capturePosition()
  globalThis.Ouija = {
    Control:         () => ouija.Control(),
    capturePosition: () => ouija.openCapturePositionEditor()
  };
});

/**
 * Injects the Map Editor and Label Editor buttons into the module's settings section.
 * Triggered by the renderSettingsConfig hook in the AppV2 settings lifecycle.
 */
Hooks.on('renderSettingsConfig', (app, html) => {
  const moduleSection = html.querySelector(`[data-category="${moduleName}"]`);
  if (!moduleSection) return;

  const mapButtonDiv = document.createElement('div');
  mapButtonDiv.classList.add('form-group');
  mapButtonDiv.innerHTML = `
    <label>Board Map</label>
    <div class="form-fields">
      <button type="button" id="ouija-open-map-editor">
        <i class="fas fa-map-marker-alt"></i> Edit Map
      </button>
    </div>
    <p class="hint">Edit the coordinate map for your Ouija board scene.</p>
  `;

  const labelButtonDiv = document.createElement('div');
  labelButtonDiv.classList.add('form-group');
  labelButtonDiv.innerHTML = `
    <label>Custom Position Labels</label>
    <div class="form-fields">
      <button type="button" id="ouija-open-label-editor">
        <i class="fas fa-tag"></i> Edit Labels
      </button>
    </div>
    <p class="hint">Set display labels for the 9 custom positions (max 30 characters each).</p>
  `;

  const soundButtonDiv = document.createElement('div');
  soundButtonDiv.classList.add('form-group');
  soundButtonDiv.innerHTML = `
    <label>Sound</label>
    <div class="form-fields">
      <button type="button" id="ouija-open-sound-editor">
        <i class="fas fa-volume-up"></i> Edit Sound
      </button>
    </div>
    <p class="hint">Configure movement sounds.</p>
  `;

  const firstGroup = moduleSection.querySelector('.form-group');
  if (firstGroup) {
    moduleSection.insertBefore(soundButtonDiv, firstGroup);
    moduleSection.insertBefore(labelButtonDiv, firstGroup);
    moduleSection.insertBefore(mapButtonDiv, firstGroup);
  } else {
    moduleSection.appendChild(mapButtonDiv);
    moduleSection.appendChild(labelButtonDiv);
    moduleSection.appendChild(soundButtonDiv);
  }

  mapButtonDiv.querySelector('#ouija-open-map-editor').addEventListener('click', () => {
    ouija.openMapEditor();
  });

  labelButtonDiv.querySelector('#ouija-open-label-editor').addEventListener('click', () => {
    ouija.openLabelEditor();
  });

  soundButtonDiv.querySelector('#ouija-open-sound-editor').addEventListener('click', () => {
    ouija.openSoundEditor();
  });
});

