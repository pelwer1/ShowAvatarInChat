//
// usage:  !char-pic
//    shows avatar of selected token - if any
//
// Trick from Aaron to fix "Syntax Error: Unexpected Identifier" - put a ";" at top of script
// The API Server concatenates all the scripts together, which can lead to code that isn't
// correct when a programmer relies on automatic semicolon insertion.
;
on('ready', function() {
    on('chat:message', function(msg) {
       if (msg.type == "api" && msg.content.indexOf("!char-pic") !== -1) {


         // Make sure there's a selected object
          if (!msg.selected ) {
             sendChat("ERROR", "No Token Selected.");
             return;
          }
    
          // Don't try to set up a drawing or card
          var token = getObj('graphic', msg.selected[0]._id);
          if (token.get('subtype') !== 'token') {
             sendChat("ERROR", "Must select a Token, not a drawing or a card.");
             return;
          }



            var tokenid = msg.selected[0]._id;
            var charid = getObj("graphic", tokenid).get("represents");
            var c = getObj( 'character', charid );



           if(c) {
               var fPart = "<div style='box-shadow: 3px 3px 2px #888888; font-family: Verdana; text-shadow: 2px 2px #000; text-align: center; vertical-align: middle; padding: 1px 1px; margin-top: 0.1em; border: 1px solid #000; border-radius: 8px 8px 8px 8px; color: #FFFFFF;";
               var tPic = fPart + "background-color:#666666;'>● " + c.get('name') + " ●</div>";
               var Pic = fPart + "background-color:#AAAAAA;'><img src='" + c.get('avatar') + "'></div>";
               // sendChat('', "/direct " + tPic + Pic); // don't send name
               sendChat('', "/direct "  + Pic);
            }
           else {
             sendChat("ERROR", "Must select a Token that is linked to a character sheet.");
             return;
            }
       }
    });
});
