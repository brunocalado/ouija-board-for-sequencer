// ---------------------------
// MAP
const letter_a = { x: 216.03773584905667, y: 450.00000000000006 }; // ok
const letter_b = { x: 283.01886792452837, y: 409.4339622641509 }; // ok
const letter_c = { x: 338.67924528301893, y: 382.0754716981132 }; // ok
const letter_d = { x: 395.28301886792457, y: 364.1509433962264 };
const letter_e = { x: 455.6603773584906, y: 351.8867924528302 };
const letter_f = { x: 510.377358490566, y: 336.79245283018867 }; // ok
const letter_g = { x: 572.6415094339623, y: 333.96226415094344 };
const letter_h = { x: 642.4528301886793, y: 333.01886792452837 };
const letter_i = { x: 697.1698113207547, y: 334.9056603773585 };
const letter_j = { x: 743.3962264150944, y: 343.3962264150944 };
const letter_k = { x: 810.377358490566, y: 358.49056603773596 };
const letter_l = { x: 871.6981132075472, y: 378.3018867924529 };
const letter_m = { x: 943.3962264150941, y: 408.49056603773596 };
const letter_n = { x: 1020.7547169811319, y: 445.2830188679247 };
const letter_o = { x: 239.62264150943395, y: 526.4150943396228 };
const letter_p = { x: 294.33962264150944, y: 498.11320754716996 }; // ok
const letter_q = { x: 359.433962264151, y: 473.58490566037756 };
const letter_r = { x: 422.6415094339623, y: 449.05660377358515 };
const letter_s = { x: 487.73584905660374, y: 433.9622641509436 }; // ok
const letter_t = { x: 546.2264150943395, y: 420.7547169811322 };
const letter_u = { x: 612.264150943396, y: 419.81132075471714 };
const letter_v = { x: 683.9622641509432, y: 419.81132075471714 };
const letter_w = { x: 767.9245283018865, y: 438.679245283019 };// ok
const letter_x = { x: 848.1132075471695, y: 463.2075471698115 };
const letter_y = { x: 914.1509433962261, y: 489.6226415094342 };
const letter_z = { x: 971.698113207547, y: 522.6415094339625 };

const number_1 = { x: 322.64150943396214, y: 600.9433962264153 };
const number_2 = { x: 378.3018867924527, y: 601.8867924528304 };
const number_3 = { x: 439.62264150943383, y: 600.9433962264153 };
const number_4 = { x: 504.7169811320754, y: 603.7735849056605 };
const number_5 = { x: 566.0377358490565, y: 600.0000000000002 };
const number_6 = { x: 627.3584905660376, y: 599.0566037735852 };
const number_7 = { x: 688.6792452830188, y: 597.169811320755 };
const number_8 = { x: 749.0566037735847, y: 599.0566037735853 };
const number_9 = { x: 808.4905660377357, y: 598.1132075471702 };
const number_0 = { x: 880.1886792452827, y: 597.169811320755 };

const symbol_yes = { x: 309.43396226415064, y: 228.30188679245316 };
const symbol_no = { x: 918.8679245283016, y: 229.24528301886835 };

const symbol_space = { x: 603.7735849056602, y: 233.96226415094372 };

const symbol_01 = { x: 639.9536577292289, y: 699.8675935120822 };
const symbol_02 = { x: 639.9536577292289, y: 699.8675935120822 };
const symbol_03 = { x: 639.9536577292289, y: 699.8675935120822 };
const symbol_04 = { x: 639.9536577292289, y: 699.8675935120822 };
const symbol_05 = { x: 639.9536577292289, y: 699.8675935120822 };
const symbol_06 = { x: 639.9536577292289, y: 699.8675935120822 };

// ---------------------------
const version =  'v1.0';
let token;
let soundToPlay = 'worlds/incompleteadventurer/oija/distant-orchestra.ogg';
let animation = 'modules/animated-spell-effects-cartoon/spell-effects/cartoon/mix/electric_ball_CIRCLE_09.webm';
let debug = true;

/* Ouija Board Control

Source: 
Icon: icons/tools/scribal/lens-grey-brown.webp
*/

if (canvas.tokens.controlled[0]===undefined){
  ui.notifications.error("You must select a token!");    
} else {
  token=canvas.tokens.controlled[0];
  main();
}


function main() {
  let alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
  let alphabetList = ``;
  let special = 'yes,no'.split(',');
  alphabet = alphabet.concat(special); 
  alphabet.map((t) => {
    alphabetList += `<input type="radio" id="${t}" name="target" value="${t}"><label for="${t}">${t} </label>`;
  });

  let template = `  
    <style type="text/css">
      div.purpleHorizon {
        border: 4px solid #ff0000;
        background-color: #000000;
        width: 100%;
        text-align: center;
        border-collapse: collapse;
      }
      .divTable.purpleHorizon .divTableCell, .divTable.purpleHorizon .divTableHead {
        border: 0px solid #550000;
        padding: 5px 2px;
      }
      .divTable.purpleHorizon .divTableBody .divTableCell {
        font-size: 13px;
        font-weight: bold;
        color: #FFFFFF;
      }
      
      .divTable{ display: table; }
      .divTableRow { display: table-row; }
      .divTableHeading { display: table-header-group;}
      .divTableCell, .divTableHead { display: table-cell;}
      .divTableHeading { display: table-header-group;}
      .divTableFoot { display: table-footer-group;}
      .divTableBody { display: table-row-group;}

      /* RADIO */
      [type=radio] { 
        background-color:white;      
      }

      /* IMAGE STYLES */
      [type=radio] + img {
      cursor: pointer;
      }

      /* CHECKED STYLES */
      [type=radio]:checked + img {
      outline: 4px solid #f00;
      }
      
      .container {
        position: relative;
        text-align: center;
        color: white;
      }
      /* Centered text */
      .centered {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 18px;
      }    

      #kultcss .window-content {    
        background: #000000;
      }     
      #kultcss .dialog-button {
        height: 40px;
        background: #000000;
        color: #ffffff;
        justify-content: space-evenly;
        align-items: center;
        cursor: pointer;
        border: none;    
      }  
      #kultcss header {
        background: #000000;
        border-radius: 0;    
        border: none;    
        margin-bottom: 2px;
        font-size: .75rem;
      }
    </style>    
    
    <div class="divTable purpleHorizon">
    <div class="divTableBody">
    
    <div class="divTableRow">
    <div class="divTableCell">
        <p>WARNING: PLAYING WITH SPIRITS MAY HAVE OMINOUS CONSEQUENCES!</p>
    </div>
    </div>

    <div class="divTableRow">
    <div class="divTableCell">
        <p>Message</p>
        <input id="message" type="text" style="width: 320px; box-sizing: border-box;border: none;background-color: #ff0000;color: white; text-align: center;" value="wasp">       
    </div>
    </div>

    <div class="divTableRow">
    <div class="divTableCell">
      <p>Choose instead of the message:</p>
      <input type="radio" id="position_yes" name="extra_position" value="message" checked="checked>
      <label for="support_0">Message</label>      
      <input type="radio" id="position_yes" name="extra_position" value="position_yes">
      <label for="support_0">Yes</label>
      <input type="radio" id="position_no" name="extra_position" value="position_no">
      <label for="support_1">No</label>  
      <input type="radio" id="position_01" name="extra_position" value="position_01">
      <label for="support_1">Extra 01</label>  
      <input type="radio" id="position_02" name="extra_position" value="position_02">
      <label for="support_1">Extra 02</label>        
      <input type="radio" id="position_03" name="extra_position" value="position_03">
      <label for="support_1">Extra 03</label>  
      <input type="radio" id="position_04" name="extra_position" value="position_04">
      <label for="support_1">Extra 04</label>  
      <input type="radio" id="position_05" name="extra_position" value="position_05">
      <label for="support_1">Extra 05</label>  
      <input type="radio" id="position_06" name="extra_position" value="position_06">
      <label for="support_1">Extra 06</label>        
    </div>
    </div>

    <div class="divTableRow">
    <div class="divTableCell">
      <label for="movetype">Move Type: <select id="movetype" style="width: 150px; box-sizing: border-box;border: none;background-color: #ff0000;color: white; text-align: center;">
      <option value="moveType1">Type 1</option>
      <option value="moveType2">Type 2 - No Effects</option>
      </select></label>
    </div>
    </div>

    <div class="divTableRow">
    <div class="divTableCell">
        <label for="extraTime">Delay (ms): 
        <input id="extraTime" type="number" min=1 max=5000 style="width: 80px; box-sizing: border-box;border: none;background-color: #ff0000;color: white; text-align: center;" value=1></label>   
    </div>
    </div>

    </div>
    </div>    
  `;

  new Dialog({
    title: `Ouija - ${version}`,
    content: template,
    buttons: {
      ok: {
        label: "Move",
        callback: async (html) => {
          moveThing(html);
        },
      },
      cancel: {
        label: "Cancel",
      },
    },
  }).render(true);
}

async function moveThing(html) {  
  let msg = '';  
  let letter = html.find('input[name="target"]:checked').val();
  const movetype = html.find('#movetype')[0].value;
  let autoMessage =  html.find("#message")[0].value;   
  let extraTime =  html.find("#extraTime")[0].value;   
  let messageType = html.find('input[name="extra_position"]:checked').val();
  const moveFunction = await selectMoveFunction(movetype);

  if ( messageType=='message' ) { // message
    sendMessage(autoMessage.toLowerCase(), moveFunction, extraTime);
  } else { // extra_position
    sendToPosition(messageType.toLowerCase(), moveFunction, extraTime);
  }
}

async function move(position, extraTime=1) {
  let sequence = new Sequence()  
    .thenDo(async function(){
      await token.document.update(position, { animate: true })
    })
    .wait(750)
    .sound(soundToPlay)
    .effect()
      .file(animation)
      .atLocation(token)
      .scale(0.35)
      .waitUntilFinished()
    .wait(200)
    .wait(extraTime);

  await sequence.play();  
}

async function move2(position, extraTime=1) {
  let sequence = new Sequence()  
    .thenDo(async function(){
      await token.document.update(position, { animate: true })
    })
    .wait(750)
    .sound(soundToPlay)
    .wait(200)
    .wait(extraTime);

  await sequence.play();  
}


async function sendMessage(text, moveFunction, extraTime=1) {
  let message = text.split('');
  
  for (let index = 0; index < message.length; index++) {
    const myMessage = message[index];
    const output = await moveFunction(sceneMap(myMessage), extraTime);
  }
}

async function sendToPosition(text, moveFunction, extraTime=1) {
  await moveFunction(sceneMap(text), extraTime);
}

async function selectMoveFunction(moveType) {
  if (moveType=='moveType1') {
    return move;
  } else if (moveType=='moveType2') {
    return move2;
  }
}

// ================================================================
function sceneMap(message) {
// canvas.tokens.controlled[0].position.x
// canvas.tokens.controlled[0].position.y

  // 1 char
  switch (message) {
    case 'a': return letter_a; // ok
    case 'b': return letter_b; // ok
    case 'c': return letter_c; // ok
    case 'd': return letter_d;      
    case 'e': return letter_e;
    case 'f': return letter_f; // ok           
    case 'g': return letter_g;      
    case 'h': return letter_h;      
    case 'i': return letter_i;      
    case 'j': return letter_j;      
    case 'k': return letter_k;      
    case 'l': return letter_l;      
    case 'm': return letter_m;      
    case 'n': return letter_n;
    case 'o': return letter_o;
    case 'p': return letter_p; // ok
    case 'q': return letter_q;
    case 'r': return letter_r;
    case 's': return letter_s; // ok
    case 't': return letter_t;
    case 'u': return letter_u;
    case 'v': return letter_v;
    case 'x': return letter_x;
    case 'z': return letter_z;
    case 'w': return letter_w; // ok
    case 'y': return letter_y;     
    case '0': return number_0;
    case '1': return number_1;
    case '2': return number_2;
    case '3': return number_3;
    case '4': return number_4;
    case '5': return number_5;
    case '6': return number_6;
    case '7': return number_7;
    case '8': return number_8;
    case '9': return number_9;
    case ' ': return symbol_space;    
    case 'position_yes':  return symbol_yes;
    case 'position_no':   return symbol_no;
    case 'position_01':   return symbol_01;
    case 'position_02':   return symbol_02;
    case 'position_03':   return symbol_03;
    case 'position_04':   return symbol_04;
    case 'position_05':   return symbol_05;
    case 'position_06':   return symbol_06;
    default: ui.notifications.error("666!");    
  }

}