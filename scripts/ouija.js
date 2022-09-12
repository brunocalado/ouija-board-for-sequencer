let ouija_map;
let ouija_token;
      
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

      let dialog = new Dialog({
        title: `Token Data`,
        content: form,
        buttons: {
          use: {
            label: "Copy to Clipboard",
            callback: () => {
              let copyText = document.getElementById("moduleTextArea"); /* Get the text field */
              copyText.select(); /* Select the text field */
              document.execCommand("copy"); /* Copy the text inside the text field */
              ui.notifications.notify(`Saved on Clipboard`); /* Alert the copied text */
            }
          }
        }
      }).render(true);
    }

  }

  /* ---------------------------------------------
  // main: 
    const ouija = game.modules.get('ouija-board-for-sequencer')?.api.ouija;
    ouija.main();
  */
  static async main(map) {
    if (canvas.tokens.controlled[0] === undefined) {
      ui.notifications.error("You must select a token!");
      return;
    } else {
      ouija_token = canvas.tokens.controlled[0];
      ouija_map = map;
    }

    let templateData = {};
    const template = await renderTemplate(`modules/ouija-board-for-sequencer/templates/main_dialog.html`, templateData);

    new Dialog({
      title: `Ouija`,
      content: template,
      buttons: {
        ok: {
          label: "Move",
          callback: async (html) => {
            this.moveThing(html);
          },
        },
        cancel: {
          label: "Cancel",
        }
      }
    }).render(true);
  }

  static async moveThing(html) {
    let msg = '';

    const moveType = html.find('#movetype')[0].value;
    let autoMessage = html.find("#message")[0].value;
    let extraTime = html.find("#extraTime")[0].value;
    let messageType = html.find('input[name="extra_position"]:checked')[0].value;

    if (messageType == 'message') { // Message
      this.sendMessage(autoMessage.toLowerCase(), moveType, extraTime);
    } else { // Custom Position
      this.sendToPosition(messageType.toLowerCase(), moveType, extraTime);
    }
  }

  static async sendMessage(text, moveType, extraTime = 1) {
    let message = text.split('');

    for (let index = 0; index < message.length; index++) {
      const letter = message[index];
      const output = await this.sendToPosition(letter, moveType, extraTime);
    }
  }

  static async sendToPosition(letter, moveType, extraTime = 1) {    
    if (moveType == 'moveType1') { // Standard - sound / no animation
      const output = await this.movePattern1(letter); 
    } else if (moveType == 'moveType2') { // no sound / no animation
      const output = this.movePattern2(letter); 
    } else if (moveType == 'moveType4') { // sound + Animation at the End
      const output = this.movePatternAnimationEnd(letter);
    }    
  }

  /* ---------------------------------------------
  // movePattern1: 
    const ouija = game.modules.get('ouija-board-for-sequencer')?.api.ouija;
    ouija.movePattern1(position, extraTime);
  */
  static async movePattern1(position, extraTime = 1) {    
    let soundToPlay = game.settings.get("ouija-board-for-sequencer", "move_sound");
    const xyPosition = this.sceneMap(position);
    
    let sequence = new Sequence()
      .animation()
      .on(ouija_token)
      .duration(1000)
      .moveTowards(xyPosition, {
        ease: "easeInOutCubic"
      })
      .rotateTowards(ouija_map.bottomLocation, {
        duration: 1000,
        ease: "easeInOutCubic"
      })

      .waitUntilFinished()
      .sound(soundToPlay)
      .wait(200)
      .wait(extraTime);

    await sequence.play();
  }

  /* ---------------------------------------------
  // movePattern2: no sound / no animation
    const ouija = game.modules.get('ouija-board-for-sequencer')?.api.ouija;
    ouija.movePattern2(position, extraTime);
  */
  static async movePattern2(position, extraTime = 1) {
    const xyPosition = this.sceneMap(position);
    
    let sequence = new Sequence()
      .animation()
      .on(ouija_token)
      .duration(1000)
      .moveTowards(xyPosition, {
        ease: "easeInOutCubic"
      })
      .rotateTowards(ouija_map.bottomLocation, {
        duration: 1000,
        ease: "easeInOutCubic"
      })

      .waitUntilFinished()
      .wait(extraTime);

    await sequence.play();
  }
   
  /* ---------------------------------------------
  // movePatternEnd: 
  const ouija = game.modules.get('ouija-board-for-sequencer')?.api.ouija;
  ouija.movePatternEnd();
  */    
  static async movePatternAnimationEnd(position, extraTime = 1) {
    const soundToPlay = game.settings.get("ouija-board-for-sequencer", "end_move_sound");
    const animationEnd = game.settings.get("ouija-board-for-sequencer", "end_animation");
    const xyPosition = this.sceneMap(position);
    
    let sequence = new Sequence()
      .animation()
        .on(ouija_token)
        .duration(1000)
        .moveTowards(xyPosition, {
          ease: "easeInOutCubic"
        })
        .rotateTowards(ouija_map.bottomLocation, {
          duration: 1000,
          ease: "easeInOutCubic"
        })
      .waitUntilFinished()
      .sound(soundToPlay)
      .effect()
        .file(animationEnd)
        .atLocation(ouija_token)
        .scale(0.55)
      .waitUntilFinished()

      .wait(extraTime);

    await sequence.play();
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

} // CLASS END