let ouija_map;
let ouija_token;
let extraTimeMin=1;
let extraTimeMax=1;
let moveSpeed=1000;

/** Single source of truth for the default board coordinate map. */
export const DEFAULT_MAP = {
  letter_a: { x: 287, y: 503 },
  letter_b: { x: 351, y: 462 },
  letter_c: { x: 412, y: 437 },
  letter_d: { x: 469, y: 417 },
  letter_e: { x: 528, y: 402 },
  letter_f: { x: 588, y: 391 },
  letter_g: { x: 648, y: 387 },
  letter_h: { x: 716, y: 389 },
  letter_i: { x: 773, y: 391 },
  letter_j: { x: 822, y: 398 },
  letter_k: { x: 886, y: 412 },
  letter_l: { x: 947, y: 433 },
  letter_m: { x: 1016, y: 462 },
  letter_n: { x: 1092, y: 503 },
  letter_o: { x: 317, y: 580 },
  letter_p: { x: 372, y: 550 },
  letter_q: { x: 434, y: 526 },
  letter_r: { x: 499, y: 504 },
  letter_s: { x: 563, y: 486 },
  letter_t: { x: 623, y: 474 },
  letter_u: { x: 687, y: 473 },
  letter_v: { x: 760, y: 475 },
  letter_w: { x: 845, y: 493 },
  letter_x: { x: 923, y: 520 },
  letter_y: { x: 991, y: 544 },
  letter_z: { x: 1047, y: 581 },
  number_1: { x: 399, y: 654 },
  number_2: { x: 451, y: 655 },
  number_3: { x: 514, y: 655 },
  number_4: { x: 578, y: 655 },
  number_5: { x: 642, y: 651 },
  number_6: { x: 706, y: 653 },
  number_7: { x: 765, y: 650 },
  number_8: { x: 824, y: 654 },
  number_9: { x: 883, y: 655 },
  number_0: { x: 955, y: 655 },
  symbol_yes: { x: 383, y: 287 },
  symbol_no: { x: 993, y: 283 },
  symbol_space: { x: 679, y: 284 },
  symbol_01: { x: 681, y: 753 },
  symbol_02: { x: 249, y: 260 },
  symbol_03: { x: 215, y: 326 },
  symbol_04: { x: 1128, y: 254 },
  symbol_05: { x: 1162, y: 326 },
  symbol_06: { x: 1216, y: 54 },
  symbol_07: { x: 1494, y: 54 },
  symbol_08: { x: 1434, y: 579 },
  symbol_09: { x: 71, y: 928 },
  bottomLocation: { x: 607.1601354620223, y: 785.2926947266571 }
};

// const ouija = game.modules.get('ouija-board-for-sequencer')?.api.ouija;
export class ouija {

  /* ---------------------------------------------
  // getTokenXY: return the position of a token
    const ouija = game.modules.get('ouija-board-for-sequencer')?.api.ouija;
    ouija.getTokenXY();
  */
  static async getTokenXY() {
    if (canvas.tokens.controlled[0] === undefined) {
      ui.notifications.error("You must select a token!");
      return;
    } else {
      ouija_token = canvas.tokens.controlled[0];

      let message = '';
      let finalCode = `{ x: ${ouija_token.position.x}, y: ${ouija_token.position.y} }`;

      message += `<ul><li>X: <b style="color:red">${ouija_token.position.x}</b></li>`;
      message += `<li>Y: <b style="color:red">${ouija_token.position.y}</b></li></ul>`;

      message += `<b style="color:red" id="#tokenposition">{ ${ouija_token.position.x}, ${ouija_token.position.y} }</p>`;
      message += `<p>Copied to clipboard.</p>`;

      let template = message;

      /* view */
      let form = `
        <label>Copy this</label>
        <textarea id="moduleTextArea" rows="3" cols="33">${finalCode}</textarea>
      `;

      await foundry.applications.api.DialogV2.wait({
        window: { title: "Token Data" },
        content: form,
        buttons: [
          {
            label: "Copy to Clipboard",
            action: "copy",
            callback: () => {
              let copyText = document.getElementById("moduleTextArea"); /* Get the text field */
              copyText.select(); /* Select the text field */
              document.execCommand("copy"); /* Copy the text inside the text field */
              ui.notifications.notify(`Saved on Clipboard`); /* Alert the copied text */
            }
          }
        ]
      });
    }

  }

  /* ---------------------------------------------
  // main: 
    const ouija = game.modules.get('ouija-board-for-sequencer')?.api.ouija;
    ouija.main();
  */
  /**
   * Main entry point for the Ouija board dialog.
   * @param {Object|null} map - Optional board coordinate map. If omitted, reads from settings.
   */
  static async main(map = null) {
    // If no map passed, read from settings
    if (!map) {
      map = this._parseMap();
      if (!map) return;
    }

    if (canvas.tokens.controlled.length > 0) {
      // Priority 1: use the token the user has selected
      ouija_token = canvas.tokens.controlled[0];
    } else {
      // Priority 2: fall back to the first token in the scene that has an actor
      const fallback = canvas.tokens.placeables[0];
      if (!fallback) {
        ui.notifications.error("You must have a token in the scene!");
        return;
      }
      ouija_token = fallback;
    }

    ouija_map = map;
    canvas.tokens.releaseAll(); // unselect the token
    
    const extraTimeMinDefault=game.settings.get("ouija-board-for-sequencer", "extra_time_min_default");
    const extraTimeMaxDefault=game.settings.get("ouija-board-for-sequencer", "extra_time_max_default");
    const moveSpeedDefault=game.settings.get("ouija-board-for-sequencer", "move_speed_default");    
    const customPositionLabel1=game.settings.get("ouija-board-for-sequencer", "custom_position_label_1");
    const customPositionLabel2=game.settings.get("ouija-board-for-sequencer", "custom_position_label_2");
    const customPositionLabel3=game.settings.get("ouija-board-for-sequencer", "custom_position_label_3");
    const customPositionLabel4=game.settings.get("ouija-board-for-sequencer", "custom_position_label_4");
    const customPositionLabel5=game.settings.get("ouija-board-for-sequencer", "custom_position_label_5");
    const customPositionLabel6=game.settings.get("ouija-board-for-sequencer", "custom_position_label_6");
    const customPositionLabel7=game.settings.get("ouija-board-for-sequencer", "custom_position_label_7");
    const customPositionLabel8=game.settings.get("ouija-board-for-sequencer", "custom_position_label_8");    
    const customPositionLabel9=game.settings.get("ouija-board-for-sequencer", "custom_position_label_9");    
    const templateData = {
      extraTimeMinDefault: extraTimeMinDefault, extraTimeMaxDefault: extraTimeMaxDefault, moveSpeedDefault: moveSpeedDefault,
      customPositionLabel1: customPositionLabel1,
      customPositionLabel2: customPositionLabel2,
      customPositionLabel3: customPositionLabel3,
      customPositionLabel4: customPositionLabel4,
      customPositionLabel5: customPositionLabel5,
      customPositionLabel6: customPositionLabel6,
      customPositionLabel7: customPositionLabel7,
      customPositionLabel8: customPositionLabel8,
      customPositionLabel9: customPositionLabel9
    };

    const template = await foundry.applications.handlebars.renderTemplate(`modules/ouija-board-for-sequencer/templates/main_dialog.hbs`, templateData);

    const persistent = game.settings.get("ouija-board-for-sequencer", "persistent_dialog");

    if (persistent) {
      const dialog = new foundry.applications.api.DialogV2({
        window: { title: "Ouija" },
        content: template,
        buttons: [
          {
            label: "Move",
            action: "ok",
            callback: async (event, button, dialog) => {
              await this.moveThing(dialog.element);
              return false;
            }
          },
          {
            label: "Cancel",
            action: "cancel"
          }
        ],
        rejectClose: false
      });
      await dialog.render(true);
    } else {
      await foundry.applications.api.DialogV2.wait({
        window: { title: "Ouija" },
        content: template,
        buttons: [
          {
            label: "Move",
            action: "ok",
            callback: async (event, button, dialog) => {
              await this.moveThing(dialog.element);
            }
          },
          {
            label: "Cancel",
            action: "cancel"
          }
        ]
      });
    }
  }

  static async moveThing(html) {
    const messageType = html.querySelector('input[name="extra_position"]:checked').value;
    const autoMessage = html.querySelector("#message").value;
    extraTimeMin = parseInt(html.querySelector("#extraTimeMin").value);
    extraTimeMax = parseInt(html.querySelector("#extraTimeMax").value);
    moveSpeed = parseInt(html.querySelector("#moveSpeed").value);
    const customPosition = html.querySelector('#custom_position').value;

    // Persist current values so next dialog open pre-fills them
    await game.settings.set("ouija-board-for-sequencer", "extra_time_min_default", extraTimeMin);
    await game.settings.set("ouija-board-for-sequencer", "extra_time_max_default", extraTimeMax);
    await game.settings.set("ouija-board-for-sequencer", "move_speed_default", moveSpeed);

    if (messageType === 'message' && customPosition === 'custom_position_choose') {
      await this.sendMessage(autoMessage.toLowerCase());
    } else {
      const target = customPosition !== 'custom_position_choose' ? customPosition : messageType;
      await this.sendToPosition(target.toLowerCase());
    }
  }

  static async sendMessage(text) {
    let message = text.split('');
    let previousLetter = null;

    for (let index = 0; index < message.length; index++) {
      const letter = message[index];
      if (letter === previousLetter) {
        await this.jiggle(letter);
      } else {
        await this.sendToPosition(letter);
      }
      previousLetter = letter;
    }
  }

  /**
   * Sends the planchette to a single board position using the standard movement pattern.
   * @param {string} letter - The target letter/position key
   */
  static async sendToPosition(letter) {
    await this.movePattern1(letter);
  }
  
  /**
   * Converts a desired animation duration (ms) into the grid-squares/second speed
   * that CONFIG.Token.movement.defaultSpeed expects, so the token takes exactly
   * `durationMs` to reach `to` from `from`.
   * This is the only v13-safe way to control movement animation duration:
   * TokenDocument#move() ignores `duration` options, and Sequencer .moveTowards()
   * uses the deprecated `teleport` flag internally.
   * @param {{x: number, y: number}} from - Origin canvas position in pixels
   * @param {{x: number, y: number}} to - Target canvas position in pixels
   * @param {number} durationMs - Desired animation duration in milliseconds
   * @returns {number} Speed in grid squares per second
   */
  static _calcGridSpeed(from, to, durationMs) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const pixelDistance = Math.sqrt(dx * dx + dy * dy);
    if (pixelDistance === 0) return CONFIG.Token.movement.defaultSpeed;
    const gridDistance = pixelDistance / canvas.grid.size;
    return (gridDistance / durationMs) * 1000;
  }

  /**
   * Performs a single animated token move using the v13 native API with a controlled
   * duration. TokenDocument#move() ignores `duration` options, so we temporarily
   * override CONFIG.Token.movement.defaultSpeed (grid squares/sec) with a value
   * derived from the pixel distance and desired duration, then restore it once the
   * canvas animation promise resolves.
   * @param {{x: number, y: number}} target - Target canvas position in pixels
   * @param {number} durationMs - Desired animation duration in milliseconds
   * @returns {Promise<void>}
   */
  static async _animatedMove(target, durationMs) {
    const from = { x: ouija_token.x, y: ouija_token.y };
    const originalSpeed = CONFIG.Token.movement.defaultSpeed;
    CONFIG.Token.movement.defaultSpeed = this._calcGridSpeed(from, target, durationMs);

    await ouija_token.document.move([{ x: target.x, y: target.y }]);
    // movementAnimationPromise resolves when the canvas animation finishes — without
    // this wait, CONFIG.Token.movement.defaultSpeed would be restored before the
    // animation duration is calculated.
    await (ouija_token.movementAnimationPromise ?? Promise.resolve());

    CONFIG.Token.movement.defaultSpeed = originalSpeed;
  }

  /**
   * Move the planchette slightly off-center and back when the new letter
   * matches the previous one, so the player sees a distinct "press" motion.
   * Called from sendMessage when consecutive identical characters are detected.
   * @param {string} letter - The repeated letter/position key
   */
  static async jiggle(letter) {
    const xyPosition = this.sceneMap(letter);
    const jigglePos = { x: xyPosition.x - 15, y: xyPosition.y - 25 };

    // Cap jiggle duration so it stays snappy regardless of the global moveSpeed setting.
    const jiggleDuration = Math.min(moveSpeed / 2, 400);

    await this._animatedMove(jigglePos, jiggleDuration);
    await new Promise(resolve => setTimeout(resolve, 250));
    await this._animatedMove(xyPosition, jiggleDuration);
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  /**
   * Standard movement pattern: move token, rotate toward bottom, play sound.
   * When the "Use End Sound" toggle is enabled, plays the end sound and animation
   * instead of the normal move sound.
   * Uses _animatedMove() to honour moveSpeed (ms) via CONFIG.Token.movement.defaultSpeed.
   * @param {string} position - The target letter/position key
   */
  static async movePattern1(position) {
    const ns = "ouija-board-for-sequencer";
    const useEndSound = game.settings.get(ns, "use_end_sound");
    const xyPosition = this.sceneMap(position);

    const ray = new foundry.canvas.geometry.Ray(
      { x: ouija_token.x, y: ouija_token.y },
      ouija_map.bottomLocation
    );
    const rotationDeg = Math.toDegrees(ray.angle);

    await this._animatedMove(xyPosition, moveSpeed);
    await ouija_token.document.update({ rotation: rotationDeg });

    if (useEndSound) {
      const soundToPlay = game.settings.get(ns, "end_move_sound");
      const sound_volume = game.settings.get(ns, "end_move_sound_volume");

      await new Sequence()
        .sound(soundToPlay)
          .volume(sound_volume)
        .wait(200)
        .wait(extraTimeMin, extraTimeMax)
        .play();
    } else {
      const soundToPlay = game.settings.get(ns, "move_sound");
      const sound_volume = game.settings.get(ns, "move_sound_volume");

      await new Sequence()
        .sound(soundToPlay)
          .volume(sound_volume)
        .wait(200)
        .wait(extraTimeMin, extraTimeMax)
        .play();
    }
  }

  /* ---------------------------------------------
  // sceneMap: letter will match the map
    const ouija = game.modules.get('ouija-board-for-sequencer')?.api.ouija;
    ouija.sceneMap(position);
  */
  static sceneMap(position) {
    switch (position) {
      case 'a':
        return ouija_map.letter_a;
      case 'b':
        return ouija_map.letter_b;
      case 'c':
        return ouija_map.letter_c;
      case 'd':
        return ouija_map.letter_d;
      case 'e':
        return ouija_map.letter_e;
      case 'f':
        return ouija_map.letter_f;
      case 'g':
        return ouija_map.letter_g;
      case 'h':
        return ouija_map.letter_h;
      case 'i':
        return ouija_map.letter_i;
      case 'j':
        return ouija_map.letter_j;
      case 'k':
        return ouija_map.letter_k;
      case 'l':
        return ouija_map.letter_l;
      case 'm':
        return ouija_map.letter_m;
      case 'n':
        return ouija_map.letter_n;
      case 'o':
        return ouija_map.letter_o;
      case 'p':
        return ouija_map.letter_p;
      case 'q':
        return ouija_map.letter_q;
      case 'r':
        return ouija_map.letter_r;
      case 's':
        return ouija_map.letter_s;
      case 't':
        return ouija_map.letter_t;
      case 'u':
        return ouija_map.letter_u;
      case 'v':
        return ouija_map.letter_v;
      case 'x':
        return ouija_map.letter_x;
      case 'z':
        return ouija_map.letter_z;
      case 'w':
        return ouija_map.letter_w;
      case 'y':
        return ouija_map.letter_y;
      case '0':
        return ouija_map.number_0;
      case '1':
        return ouija_map.number_1;
      case '2':
        return ouija_map.number_2;
      case '3':
        return ouija_map.number_3;
      case '4':
        return ouija_map.number_4;
      case '5':
        return ouija_map.number_5;
      case '6':
        return ouija_map.number_6;
      case '7':
        return ouija_map.number_7;
      case '8':
        return ouija_map.number_8;
      case '9':
        return ouija_map.number_9;
      case ' ':
        return ouija_map.symbol_space;
      case 'position_yes':
        return ouija_map.symbol_yes;
      case 'position_no':
        return ouija_map.symbol_no;
      case 'position_01':
        return ouija_map.symbol_01;
      case 'position_02':
        return ouija_map.symbol_02;
      case 'position_03':
        return ouija_map.symbol_03;
      case 'position_04':
        return ouija_map.symbol_04;
      case 'position_05':
        return ouija_map.symbol_05;
      case 'position_06':
        return ouija_map.symbol_06;
      case 'position_07':
        return ouija_map.symbol_07;
      case 'position_08':
        return ouija_map.symbol_08;
      case 'position_09':
        return ouija_map.symbol_09;        
      default:
        ui.notifications.error("666!");
    };
  }

  // =============================================
  /* ---------------------------------------------
  // Dialog Message: 
    const ouija = game.modules.get('ouija-board-for-sequencer')?.api.ouija;
    ouija.creepyMessage();
  */
  static creepyMessage() {
    const messages = [
      "Captain Howdy is looking for you",
      "Perform the whole ritual in a consecrated circle, so that undesirable spirits cannot interfere with it.",
      "Never look behind you while speaking with the dead.",
      "Playing with spirits may bring you dire consequences."
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }

  /**
   * Parse the map JSON string from the module setting.
   * Shows a user-visible error and returns null on invalid JSON.
   * @returns {Object|null} The parsed map object or null on failure.
   */
  static _parseMap() {
    const raw = game.settings.get("ouija-board-for-sequencer", "map_data");
    try {
      return JSON.parse(raw);
    } catch (e) {
      ui.notifications.error("Ouija Board: Map JSON is invalid. Open Module Settings → Edit Map to fix it.");
      console.error("ouija-board-for-sequencer | map_data parse error:", e);
      return null;
    }
  }

  /**
   * Simplified public entry point for macros.
   * Reads the map from settings and opens the control dialog.
   * Usage: Ouija.Control()
   */
  static async Control() {
    const map = this._parseMap();
    if (!map) return;
    await this.main(map);
  }

  /**
   * Opens the Map Editor dialog for editing the board coordinate map JSON.
   * Triggered from the injected button in the module settings UI.
   */
  static async openMapEditor() {
    let currentJson;
    try {
      currentJson = JSON.stringify(JSON.parse(game.settings.get("ouija-board-for-sequencer", "map_data")), null, 2);
    } catch (e) {
      // Preserve raw value so a syntax error remains visible to the user for manual correction
      currentJson = game.settings.get("ouija-board-for-sequencer", "map_data");
    }

    const template = await foundry.applications.handlebars.renderTemplate(
      "modules/ouija-board-for-sequencer/templates/map-editor.hbs",
      { mapJson: currentJson }
    );

    await foundry.applications.api.DialogV2.wait({
      window: { title: "Ouija Board — Map Editor" },
      content: template,
      buttons: [
        {
          label: "Save",
          action: "save",
          callback: async (event, button, dialog) => {
            const textarea = dialog.element.querySelector("#ouija-map-json");
            const raw = textarea.value.trim();
            let parsed;
            try {
              parsed = JSON.parse(raw);
            } catch (e) {
              ui.notifications.error("Invalid JSON. Map was NOT saved. Fix the syntax and try again.");
              return false;
            }
            const normalizedJson = JSON.stringify(parsed, null, 2);
            await game.settings.set("ouija-board-for-sequencer", "map_data", normalizedJson);
            ui.notifications.notify("Ouija Board: Map saved successfully.");
          }
        },
        {
          label: "Reset to Default",
          action: "reset",
          callback: async (event, button, dialog) => {
            const defaultJson = JSON.stringify(DEFAULT_MAP, null, 2);
            await game.settings.set("ouija-board-for-sequencer", "map_data", defaultJson);
            ui.notifications.notify("Ouija Board: Map reset to default.");
            const textarea = dialog.element.querySelector("#ouija-map-json");
            if (textarea) textarea.value = defaultJson;
            return false;
          }
        },
        {
          label: "Cancel",
          action: "cancel"
        }
      ],
      rejectClose: false
    });
  }

  /**
   * Opens the Label Editor dialog for editing the 9 custom position labels.
   * Triggered from the injected button in the module settings UI.
   */
  static async openLabelEditor() {
    const keys = [
      'custom_position_label_1',
      'custom_position_label_2',
      'custom_position_label_3',
      'custom_position_label_4',
      'custom_position_label_5',
      'custom_position_label_6',
      'custom_position_label_7',
      'custom_position_label_8',
      'custom_position_label_9',
    ];

    const labels = keys.map((key, i) => ({
      number: i + 1,
      value: game.settings.get("ouija-board-for-sequencer", key)
    }));

    const template = await foundry.applications.handlebars.renderTemplate(
      "modules/ouija-board-for-sequencer/templates/label-editor.hbs",
      { labels }
    );

    await foundry.applications.api.DialogV2.wait({
      window: { title: "Ouija Board — Label Editor" },
      content: template,
      buttons: [
        {
          label: "Save",
          action: "save",
          callback: async (event, button, dialog) => {
            for (let i = 0; i < keys.length; i++) {
              const input = dialog.element.querySelector(`#ouija-label-${i}`);
              if (!input) continue;
              // slice enforces the 30-char limit server-side in case this is called programmatically
              const val = input.value.trim().slice(0, 30);
              await game.settings.set("ouija-board-for-sequencer", keys[i], val);
            }
            ui.notifications.notify("Ouija Board: Labels saved successfully.");
          }
        },
        {
          label: "Cancel",
          action: "cancel"
        }
      ],
      rejectClose: false
    });
  }

  /**
   * Opens the Sound & Animation Editor dialog.
   * Triggered from the injected button in the module settings UI.
   */
  static async openSoundEditor() {
    const ns = "ouija-board-for-sequencer";

    const templateData = {
      moveSoundPath:    game.settings.get(ns, "move_sound"),
      moveSoundVolume:  game.settings.get(ns, "move_sound_volume"),
      useEndSound:      game.settings.get(ns, "use_end_sound"),
      endSoundPath:     game.settings.get(ns, "end_move_sound"),
      endSoundVolume:   game.settings.get(ns, "end_move_sound_volume"),
    };

    const template = await foundry.applications.handlebars.renderTemplate(
      "modules/ouija-board-for-sequencer/templates/sound-editor.hbs",
      templateData
    );

    await foundry.applications.api.DialogV2.wait({
      window: { title: "Ouija Board — Sound" },
      content: template,
      render: (event, app) => {
        const el = app.element;

        // Wire up range slider live display updates
        for (const [rangeId, displayId] of [
          ["ouija-volume-move", "ouija-volume-move-display"],
          ["ouija-volume-end",  "ouija-volume-end-display"],
        ]) {
          const range = el.querySelector(`#${rangeId}`);
          const display = el.querySelector(`#${displayId}`);
          if (range && display) {
            range.addEventListener("input", () => { display.textContent = range.value; });
          }
        }

        // Toggle visibility of end sound fields based on checkbox state
        const toggle = el.querySelector("#ouija-use-end-sound");
        const endSection = el.querySelector("#ouija-end-sound-section");
        if (toggle && endSection) {
          endSection.style.display = toggle.checked ? "" : "none";
          toggle.addEventListener("change", () => {
            endSection.style.display = toggle.checked ? "" : "none";
          });
        }

        // Wire up FilePicker buttons
        el.querySelectorAll(".ouija-browse-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            const targetId = btn.dataset.target;
            const pickerType = btn.dataset.type;
            const targetInput = el.querySelector(`#${targetId}`);
            if (!targetInput) return;

            new FilePicker({
              type: pickerType,
              current: targetInput.value,
              callback: (path) => { targetInput.value = path; }
            }).browse();
          });
        });
      },
      buttons: [
        {
          label: "Save",
          action: "save",
          callback: async (event, button, dialog) => {
            const el = dialog.element;
            await game.settings.set(ns, "move_sound",            el.querySelector("#ouija-sound-move").value.trim());
            await game.settings.set(ns, "move_sound_volume",     Math.round(Number(el.querySelector("#ouija-volume-move").value) * 10) / 10);
            await game.settings.set(ns, "use_end_sound",         el.querySelector("#ouija-use-end-sound").checked);
            await game.settings.set(ns, "end_move_sound",        el.querySelector("#ouija-sound-end").value.trim());
            await game.settings.set(ns, "end_move_sound_volume", Math.round(Number(el.querySelector("#ouija-volume-end").value) * 10) / 10);
            ui.notifications.notify("Ouija Board: Sound settings saved.");
          }
        },
        {
          label: "Cancel",
          action: "cancel"
        }
      ],
      rejectClose: false
    });
  }

} // CLASS END