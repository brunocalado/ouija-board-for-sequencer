/*!
 * Ouija Board for Sequencer
 * Copyright (c) 2021 https://github.com/brunocalado
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3.
 */

import { MODULE_ID, SETTINGS, CUSTOM_LABEL_KEYS, DEFAULT_MAP } from './constants.js';
import { ouija } from './ouija.js';

Hooks.once('init', () => {
  // --------------------------------------------------
  // Load API
  // Request with: const ouija = game.modules.get(MODULE_ID)?.api.ouija;
  game.modules.get(MODULE_ID).api = { ouija };

  // --------------------------------------------------
  // Module Options

  game.settings.register(MODULE_ID, SETTINGS.PERSISTENT_DIALOG, {
    name: 'Persistent Dialog',
    hint: 'When enabled, the control dialog stays open after clicking Move. When disabled, it closes after each move.',
    scope: 'world',
    config: true,
    default: true,
    type: Boolean
  });

  game.settings.register(MODULE_ID, SETTINGS.MOVE_SOUND, {
    name: 'Move Sound',
    hint: 'This sound is played each movement.',
    scope: 'world',
    config: false,
    default: `modules/${MODULE_ID}/assets/sounds/distant-orchestra.ogg`,
    type: String,
    filePicker: 'audio'
  });

  game.settings.register(MODULE_ID, SETTINGS.MOVE_SOUND_VOLUME, {
    name: 'Move Sound Volume',
    hint: 'You can set the volume for the move sound. Use 0.1 for 10% of the volume. 0.6 for 60% of the volume, and so on.',
    scope: 'world',
    config: false,
    default: 0.8,
    range: { min: 0, max: 1, step: 0.1 },
    type: Number
  });

  game.settings.register(MODULE_ID, SETTINGS.END_MOVE_SOUND, {
    name: 'End Move Sound',
    hint: 'This sound is played when you trigger the move type end.',
    scope: 'world',
    config: false,
    default: `modules/${MODULE_ID}/assets/sounds/intensive-stare.ogg`,
    type: String,
    filePicker: 'audio'
  });

  game.settings.register(MODULE_ID, SETTINGS.END_MOVE_SOUND_VOLUME, {
    name: 'End Move Sound Volume',
    hint: 'You can set the volume for the end sound. Use 0.1 for 10% of the volume. 0.6 for 60% of the volume, and so on.',
    scope: 'world',
    config: false,
    default: 0.9,
    range: { min: 0, max: 1, step: 0.1 },
    type: Number
  });

  game.settings.register(MODULE_ID, SETTINGS.USE_END_SOUND, {
    name: 'Use End Sound',
    hint: 'When enabled, the end sound replaces the normal move sound.',
    scope: 'world',
    config: false,
    default: true,
    type: Boolean
  });

  game.settings.register(MODULE_ID, SETTINGS.EXTRA_TIME_MIN, {
    name: 'Extra time minimum default',
    hint: 'This will define the minimum amount of extra time for next move start to execute.',
    scope: 'world',
    config: false,
    default: 1,
    type: Number
  });

  game.settings.register(MODULE_ID, SETTINGS.EXTRA_TIME_MAX, {
    name: 'Extra time maximum default',
    hint: 'This will define the maximum amount of extra time for next move start to execute.',
    scope: 'world',
    config: false,
    default: 1,
    type: Number
  });

  game.settings.register(MODULE_ID, SETTINGS.MOVE_SPEED, {
    name: 'Move Speed',
    hint: "This will define the time to make the movement. This will result in control the speed. It's milliseconds (higher number, slow movement.)",
    scope: 'world',
    config: false,
    default: 1000,
    type: Number
  });

  // Default display names for the 9 custom symbol positions.
  const customLabelDefaults = ['Good Bye', 'Left Skull', 'Sun', 'Right Skull', 'Moon', 'First Candle', 'Second Candle', 'Key', 'Crystal'];
  CUSTOM_LABEL_KEYS.forEach((key, i) => {
    game.settings.register(MODULE_ID, key, {
      name: `Custom Position Label - ${i + 1}`,
      hint: `This will change the label for the Custom Position ${i + 1}.`,
      scope: 'world',
      config: false,
      default: customLabelDefaults[i],
      type: String
    });
  });

  // Stored as JSON string. config: false hides it from the raw settings UI.
  // Accessed via the Map Editor button instead.
  game.settings.register(MODULE_ID, SETTINGS.MAP_DATA, {
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
 * Injects the Instructions, Map Editor, Label Editor, and Sound Editor buttons into the
 * module's settings section. Triggered by the renderSettingsConfig hook in the AppV2
 * settings lifecycle.
 */
Hooks.on('renderSettingsConfig', (app, html) => {
  const moduleSection = html.querySelector(`[data-category="${MODULE_ID}"]`);
  if (!moduleSection) return;

  const instructionsButtonDiv = document.createElement('div');
  instructionsButtonDiv.classList.add('form-group');
  instructionsButtonDiv.innerHTML = `
    <label>Instructions</label>
    <div class="form-fields">
      <button type="button" id="ouija-open-instructions">
        <i class="fas fa-book-open"></i> Open Instructions
      </button>
    </div>
    <p class="hint">How to set up and use the Ouija board, organized by tabs.</p>
  `;

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
    // Insert Instructions first so it ends up above the other injected buttons,
    // while all of them stay just above the module's first real setting.
    moduleSection.insertBefore(instructionsButtonDiv, firstGroup);
    moduleSection.insertBefore(soundButtonDiv, firstGroup);
    moduleSection.insertBefore(labelButtonDiv, firstGroup);
    moduleSection.insertBefore(mapButtonDiv, firstGroup);
  } else {
    moduleSection.appendChild(instructionsButtonDiv);
    moduleSection.appendChild(mapButtonDiv);
    moduleSection.appendChild(labelButtonDiv);
    moduleSection.appendChild(soundButtonDiv);
  }

  instructionsButtonDiv.querySelector('#ouija-open-instructions').addEventListener('click', () => {
    ouija.openInstructions();
  });

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
