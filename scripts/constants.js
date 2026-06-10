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
