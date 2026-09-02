/*!
 * Ouija Board for Sequencer
 * Copyright (c) 2021 https://github.com/brunocalado
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3.
 */

/** Single source of truth for the module id and all shared constants. */

export const MODULE_ID = "ouija-board-for-sequencer";

/** All registered setting keys for this module. */
export const SETTINGS = {
  PERSISTENT_DIALOG:     "persistent_dialog",
  MOVE_SOUND:            "move_sound",
  MOVE_SOUND_VOLUME:     "move_sound_volume",
  END_MOVE_SOUND:        "end_move_sound",
  END_MOVE_SOUND_VOLUME: "end_move_sound_volume",
  USE_END_SOUND:         "use_end_sound",
  EXTRA_TIME_MIN:        "extra_time_min_default",
  EXTRA_TIME_MAX:        "extra_time_max_default",
  MOVE_SPEED:            "move_speed_default",
  MAP_DATA:              "map_data",
  CUSTOM_LABEL_1:        "custom_position_label_1",
  CUSTOM_LABEL_2:        "custom_position_label_2",
  CUSTOM_LABEL_3:        "custom_position_label_3",
  CUSTOM_LABEL_4:        "custom_position_label_4",
  CUSTOM_LABEL_5:        "custom_position_label_5",
  CUSTOM_LABEL_6:        "custom_position_label_6",
  CUSTOM_LABEL_7:        "custom_position_label_7",
  CUSTOM_LABEL_8:        "custom_position_label_8",
  CUSTOM_LABEL_9:        "custom_position_label_9",
};

/** Custom position label setting keys in order (index 0 → label 1, index 8 → label 9). */
export const CUSTOM_LABEL_KEYS = [
  SETTINGS.CUSTOM_LABEL_1,
  SETTINGS.CUSTOM_LABEL_2,
  SETTINGS.CUSTOM_LABEL_3,
  SETTINGS.CUSTOM_LABEL_4,
  SETTINGS.CUSTOM_LABEL_5,
  SETTINGS.CUSTOM_LABEL_6,
  SETTINGS.CUSTOM_LABEL_7,
  SETTINGS.CUSTOM_LABEL_8,
  SETTINGS.CUSTOM_LABEL_9,
];

/** Default board coordinate map. Used as the `map_data` setting default and by "Reset to Default". */
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
