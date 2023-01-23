let ouija_map;
let ouija_token;
let extraTimeMin=1;
let extraTimeMax=1;
let moveSpeed=1000;
      
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
    const messageType = html.find('input[name="extra_position"]:checked')[0].value; // message, position_yes, position_no
    const autoMessage = html.find("#message")[0].value;
    extraTimeMin = parseInt( html.find("#extraTimeMin")[0].value );
    extraTimeMax = parseInt( html.find("#extraTimeMax")[0].value );
    moveSpeed = parseInt( html.find("#moveSpeed")[0].value );
    const moveType = html.find('#movetype')[0].value; // Standard, No Sound/No Animation, Animation at End
    const customPosition = html.find('#custom_position')[0].value; // custom_position_choose, position_01, ..., position_06

    if (messageType=='message' && customPosition=='custom_position_choose' ) { // Message
      this.sendMessage(autoMessage.toLowerCase(), moveType);
    } else { // 
      if ( customPosition!='custom_position_choose' ) {
        this.sendToPosition(customPosition.toLowerCase(), moveType);
      } else {
        this.sendToPosition(messageType.toLowerCase(), moveType);
      }
    }
  }

  static async sendMessage(text, moveType) {
    let message = text.split('');
    let previousLetter=null; // jiggle

    for (let index = 0; index < message.length; index++) {
      const letter = message[index];
      if (letter === previousLetter) {
        await this.jiggle(letter);
      } else {
        const output = await this.sendToPosition(letter, moveType);
      }
      previousLetter = letter;
    } // END FOR
  }

  static async sendToPosition(letter, moveType) {    
    if (moveType == 'moveType1') { // Standard - sound / no animation
      const output = await this.movePattern1(letter); 
    } else if (moveType == 'moveType2') { // no sound / no animation
      const output = await this.movePattern2(letter); 
    } else if (moveType == 'moveType3') { // sound + Animation at the End
      const output = await this.movePatternAnimationEnd(letter);
    }    
  }
  
  // Move the planchette slightly when new letter is the same as old letter.
  // This way, it's obvious that a new letter is being selected.
  static async jiggle(letter) {
    const xyPosition = this.sceneMap(letter);
    let newX = xyPosition.x;
    newX -= 15;
    let newY = xyPosition.y;
    newY -= 25;

    let sequence = new Sequence()
      .animation()
      .on(ouija_token)
      .duration(2500)
      .moveTowards({ x: newX, y: newY}, {
        ease: "easeInOutCubic"
      })
      .waitUntilFinished().wait(50);

    await sequence.play();

    let sequence2 = new Sequence()
      .animation()
      .on(ouija_token)
      .duration(2500)
      .moveTowards(xyPosition, {
        ease: "easeInOutCubic"
      })
      .waitUntilFinished().wait(200);

    await sequence2.play();    
  }

  /* ---------------------------------------------
  // movePattern1: 
    const ouija = game.modules.get('ouija-board-for-sequencer')?.api.ouija;
    ouija.movePattern1(position, extraTime);
  */
  static async movePattern1(position) {    
    const soundToPlay = game.settings.get("ouija-board-for-sequencer", "move_sound");
    const sound_volume = game.settings.get("ouija-board-for-sequencer", "move_sound_volume")
    const xyPosition = this.sceneMap(position);
    
    let sequence = new Sequence()
      .animation()
      .on(ouija_token)
      .duration(moveSpeed)
      .moveTowards(xyPosition, {
        ease: "easeInOutCubic"
      })
      .rotateTowards(ouija_map.bottomLocation, {
        duration: 1000,
        ease: "easeInOutCubic"
      })
      .waitUntilFinished()
      .sound(soundToPlay)
        .volume(sound_volume)
      .wait(200)
      .wait(extraTimeMin, extraTimeMax);

    await sequence.play();
  }

  /* ---------------------------------------------
  // movePattern2: no sound / no animation
    const ouija = game.modules.get('ouija-board-for-sequencer')?.api.ouija;
    ouija.movePattern2(position, extraTime);
  */
  static async movePattern2(position) {
    const xyPosition = this.sceneMap(position);
    
    let sequence = new Sequence()
      .animation()
      .on(ouija_token)
      .duration(moveSpeed)
      .moveTowards(xyPosition, {
        ease: "easeInOutCubic"
      })
      .rotateTowards(ouija_map.bottomLocation, {
        duration: 1000,
        ease: "easeInOutCubic"
      })

      .waitUntilFinished()
      .wait(extraTimeMin, extraTimeMax);

    await sequence.play();
  }
   
  /* ---------------------------------------------
  // movePatternEnd: 
  const ouija = game.modules.get('ouija-board-for-sequencer')?.api.ouija;
  ouija.movePatternEnd();
  */    
  static async movePatternAnimationEnd(position) {
    const soundToPlay = game.settings.get("ouija-board-for-sequencer", "end_move_sound");
    const sound_volume = game.settings.get("ouija-board-for-sequencer", "end_move_sound_volume")
    const animationEnd = game.settings.get("ouija-board-for-sequencer", "end_animation");
    const xyPosition = this.sceneMap(position);
    
    let sequence = new Sequence()
      .animation()
        .on(ouija_token)
        .duration(moveSpeed)
        .moveTowards(xyPosition, {
          ease: "easeInOutCubic"
        })
        .rotateTowards(ouija_map.bottomLocation, {
          duration: 1000,
          ease: "easeInOutCubic"
        })
      .waitUntilFinished()
      .sound(soundToPlay)
        .volume(sound_volume)
      .effect()
        .file(animationEnd)
        .atLocation(ouija_token)
        .scale(0.55)
      .waitUntilFinished()

      .wait(extraTimeMin, extraTimeMax);

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

} // CLASS END