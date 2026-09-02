/*!
 * Ouija Board for Sequencer
 * Copyright (c) 2021 https://github.com/brunocalado
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3.
 */

import { MODULE_ID } from './constants.js';

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

// Module-level singleton so the settings button re-focuses the open window
// instead of stacking duplicate copies.
let current = null;

/**
 * Read-only, tabbed help window opened from the button injected into the module's
 * settings section (see init.js → renderSettingsConfig).
 *
 * All content is static, so a single Handlebars part holds every tab and switching
 * tabs is a class toggle in #syncActiveTab() — the ApplicationV2 TABS machinery would
 * add nothing here and only widens the v14 API surface we depend on.
 */
export class OuijaInstructions extends HandlebarsApplicationMixin(ApplicationV2) {

  static DEFAULT_OPTIONS = {
    id: `${MODULE_ID}-instructions`,
    classes: [MODULE_ID, 'ouija-instructions'],
    window: {
      title: 'Ouija Board — Instructions',
      icon: 'fas fa-book-open',
      resizable: true
    },
    position: { width: 640, height: 560 },
    actions: {
      showTab: this.prototype.onShowTab
    }
  };

  static PARTS = {
    body: { template: `modules/${MODULE_ID}/templates/instructions.hbs` }
  };

  /** Tab definitions. `id` must match a `data-tab` value in the template. */
  static TAB_LIST = [
    { id: 'getting-started', label: 'Getting Started', icon: 'fas fa-play' },
    { id: 'controls',        label: 'Controls',        icon: 'fas fa-gamepad' },
    { id: 'map',             label: 'Map / Capture',   icon: 'fas fa-map-marker-alt' },
    { id: 'labels-sound',    label: 'Labels & Sound',  icon: 'fas fa-sliders-h' }
  ];

  /** Currently visible tab id; retained while the window stays open. */
  #activeTab = OuijaInstructions.TAB_LIST[0].id;

  /**
   * Opens the window, or brings the existing instance to the front if already open.
   * @returns {Promise<OuijaInstructions>}
   */
  static show() {
    current ??= new OuijaInstructions();
    return current.render({ force: true });
  }

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.tabs = OuijaInstructions.TAB_LIST;
    context.activeTab = this.#activeTab;
    return context;
  }

  /** @override */
  _onRender(context, options) {
    super._onRender(context, options);
    this.#syncActiveTab();
  }

  /** @override */
  _onClose(options) {
    super._onClose(options);
    if (current === this) current = null;
  }

  /**
   * Tab button handler. Bound through the actions map, so `this` is the application instance.
   * @param {PointerEvent} event
   * @param {HTMLElement} target - the clicked `[data-action="showTab"]` element
   */
  onShowTab(event, target) {
    this.#activeTab = target.dataset.tab;
    this.#syncActiveTab();
  }

  /** Reflects #activeTab onto the nav buttons and panels without a full re-render. */
  #syncActiveTab() {
    const root = this.element;
    if (!root) return;
    for (const btn of root.querySelectorAll('.ouija-tab')) {
      btn.classList.toggle('active', btn.dataset.tab === this.#activeTab);
    }
    for (const panel of root.querySelectorAll('.ouija-tab-panel')) {
      panel.classList.toggle('active', panel.dataset.tab === this.#activeTab);
    }
  }
}
