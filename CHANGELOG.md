# 0.2.8

- [Changed] Control dialog now stays open after clicking Move; only closes on Cancel or X
- [Changed] Delay Min, Delay Max, and Move Speed values are persisted on each Move and pre-filled on next open
- [Removed] Move Type selector (Standard is now the only behaviour)
- [Added] Toggle in Sound editor to enable/disable end sound (on by default, replaces normal move sound)
- [Removed] End animation feature and setting

# 0.2.6

- [Added] Board coordinate map stored in module settings with default map pre-loaded
- [Added] Map Editor button in module settings to edit/save/reset the coordinate map JSON
- [Added] Simplified macro API: `Ouija.control()` — no map argument or module lookup needed
- [Changed] `ouija.main()` now accepts an optional map parameter; reads from settings when omitted

# 0.2.5

- [Fixed] Replaced Sequencer `.animation().moveTowards()` with v13 native `TokenDocument#move()` to eliminate `DatabaseUpdateOperation#teleport` deprecation warning
- [Fixed] Replaced global `Ray` usage with `foundry.canvas.geometry.Ray` to eliminate v13 namespace deprecation warning
- [Changed] Token rotation now applied via direct `document.update()` instead of Sequencer's `.rotateTowards()`
- [Changed] Enforced minimum Sequencer version 3.3.0 in `module.json`

# 0.2.4

- [Changed] Renamed `main_dialog.html` template to `main_dialog.hbs`
- [Added] Extracted all dialog CSS into `styles/ouija.css` and registered it in `module.json`
- [Changed] Redesigned dialog UI: solid section backgrounds, uppercase headers with border separators, clean flex layout for radio buttons, side-by-side Delay Min/Max fields

# 0.2.3
- planchette replacement to make the module working again
- unselect the token before start to move
- autoselect the first token in the scene. Does not require you to select the planchette anymore

# 0.2.1
- manifest fix 

# 0.2.0
- v11 ONLY

# 0.1.9
- sound path fix
- move speed option

# 0.1.8
- small compendium fix
- nine custom positions
- You can change the custom position label
- readme updated

# 0.1.7
- filepicker in settings

# 0.1.6
- manifest fix

# 0.1.5
- small clean up

# 0.1.4
- call the same letter will jiggle: https://github.com/RebelMage
- sound settinngs change: https://github.com/RebelMage 
- mapping fix for macro
- docs
- settings for default extra time.

# 0.1.3
- dialog css
- min/max time 
- docs

# 0.1.2
- docs
- dialog fix?

# 0.1.1
- move 3 fix
- added volume control

# 0.1.0
- v10 
- settings
- docs

# 0.0.5
v9 bump

# 0.0.4
- macro update for sequencer

# 0.0.3
- token rename - 2 macros
- smooth movement
- rotate
- end movement
- new sound,animation
