
// these values are now dynamically computed based on screen size
var gutter = 35;
var stringSpace = 50;
var fretSpace = 60;
var headerGap = 80;

var noteStrokeClr = "#000";
var noteFillClr = "#333";
var noteStrokeWidth = 3;
var noteLabelTextClr = "#f8f8f8";
var noteLabelFontWidth = "20px";
var noteLabelFontWeight = "bold";
var gFretMarkerStrokeColor = "#FFFFFF";//rgba(0,0,0,1.0)";
var gFretMarkerFillColor = "#CCCCCCC";//rgba(16,16,16,0.5)";

var currentIndex = -1;
var chordCount;
var chordSource;

var piano; //Tuned Instrument

var tapEventFunction = ('ontouchstart' in window) ? "touchstart" : "click";

var nativeBridge;
var paper;

var myApp = new Framework7({
    animateNavBackIcon:true
});

var maxItem = function(arr) {
    return arr.slice().sort().pop();
}

var minItem = function(arr) {
    return arr.slice().sort()[0];
}

// Export selectors engine
var $$ = Dom7;

// Add main View
var mainView = myApp.addView('.view-main', {
    // Enable dynamic Navbar
    dynamicNavbar: true,
    // Enable Dom Cache so we can use all inline pages
    domCache: true
});

document.addEventListener('DOMContentLoaded', init, false);

function init() {
    chordSource = ChordData.Chords;
    initMenu();
    initRenderBounds();
    renderChord(localStorage.lastChord || 0);
    $$('#li_' + localStorage.lastChord).addClass('selected');

    piano = new TunedInstrument();
    piano.polyphony = 6;
    piano.loadVoice("sounds/AccGuitar.wav",48);

    $$("#strumUp").on('click',function(){
        strumChord(true);
    });
    $$("#strumDown").on('click',function(){
        strumChord(false);
    });
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }).catch(function(err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });
}

function strumChord(isUp) {
    var chord = chordSource[currentIndex];
    var frets = chord.fret.split(",");
    var midiNotes = frets.map(function(elem,index){
        var fret = parseInt(elem);
        if(fret > -1) {
            return ChordData.MidiRoots[index] + fret;
        }
        else {
            return -1;
        }
    });
    if(!isUp) {
        midiNotes.reverse();
    }
    var index = 0;
    var doLater = function() {
        if(index >= frets.length) {
            clearInterval(interval);
            // todo: turn all notes off
        }
        else {
            var noteNumber = midiNotes[index];
            if(noteNumber > -1) {
                piano.noteOn(noteNumber);
            }
            index++;
        }
    };
    var interval = setInterval(doLater,200);
    doLater();
}

function addTapHandler(elem,handler) {
    elem[tapEventFunction](handler);
}

// called in the context of a fret marker
function elemToNoteData() {
     var noteNumber = ChordData.MidiRoots[this.data('stringNum')] + this.data('fretNum');
     playNote(noteNumber);
}

function playNote(noteNumber) {
    console.log("noteNumber = " + noteNumber);
    piano.noteOn(noteNumber);
}


function initRenderBounds() {
    var rect = chordDiv.getBoundingClientRect();

    var w = rect.width;
    var h = rect.height;

    /* Defaults from back in the 320 days
        var gutter = 35;
        var stringSpace = 50;
        var fretSpace = 60;
        var headerGap = 80;
    */
    // calc space between strings
    stringSpace = Math.floor(w / 7);
    // calc space between frets
    fretSpace = Math.floor(stringSpace * 1.4 );
    gutter = Math.round((w - ((stringSpace ) * 5)) / 2);
    headerGap = Math.floor(fretSpace * 1.25);
}

var firstRun = 1;
$$('.open-panel').on('click', function (e) {
    // 'left' position to open Left panel
    if(firstRun) {
        setTimeout(function(){
            var elem = document.getElementById('li_' + ( localStorage.lastChord > 10 ?
            localStorage.lastChord - 10 : localStorage.lastChord));
            elem.scrollIntoView();
        },100);
        firstRun = 0;
    }
});

function onChordJump(evt) {
    var id = evt.target.id ||
             evt.target.parentNode.id ||
             evt.target.parentNode.parentNode.id;
    var chord = id.split("_")[1];
    myApp.closeModal('.popup-notes');
    myApp.openPanel("left");
    document.getElementById("hdr_" + chord).scrollIntoView();
}

function onMenuItem(evt) {
    // could be nested child target ... up to 3 deep
    var id = evt.target.id ||
             evt.target.parentNode.id ||
             evt.target.parentNode.parentNode.id;

    var split = id.split("_");
    var prefix = split[0];
    var index = parseInt(split[1]);

    if(prefix == "hdr") {
        // chord header?
        myApp.popup('.popup-notes');
    }
    else {
        // an acutal chord
        renderChord(index);
        setSelectedChord(id);
        myApp.closePanel();
    }
}

function setSelectedChord(id) {
    $$("li.item-content.selected").removeClass("selected");
    $$("#"+id).addClass("selected");
}

function renderChord(index) {

    if(currentIndex == index) {
        return;
    }

    localStorage.lastChord = currentIndex = index;
    if(currentIndex < 0) {
        currentIndex = chordCount - 1;
    }
    currentIndex = currentIndex % chordCount;

    paper.clear();

    var chord = chordSource[currentIndex];
    var frets = chord.fret.split(",");
    var fingers = chord.fingers ? chord.fingers.split(",") : [];

    frets = frets.map(function(elem){
        return parseInt(elem);
    });
    fingers = fingers.map(function(elem){
        return parseInt(elem);
    });

    // calculate how many frets we need to draw, min 5
    var chordSpan = maxItem(frets) - minItem(frets);
    if(chordSpan < 5) {
        chordSpan = 5;
    }

    // for each string 0-5
    for(var x = 0; x < 5; x++) {
        // for each fret
        for(var y = 0; y < chordSpan; y++) {

            elem = paper.rect( gutter + x * stringSpace,
                               headerGap + y * fretSpace,
                               stringSpace, fretSpace, 2);

            elem.attr({"stroke":"#FFF","stroke-width":5 });
            elem.attr("fill", "rgba(0,0,0,0.1)");


            // draw the fingerboard fret markers
            var fret = chord.rt + y;

            // fret markers from zero based fret values, 3,5,7,9,12,15,17
            // only if x==2 because marker is in the center 012*345
            if(x == 2 && [2,4,6,8,14,16,18].indexOf(fret) > -1){

                var circ = paper.circle( gutter + x * stringSpace + (stringSpace / 2),
                                         headerGap + y * fretSpace + (fretSpace / 2) , 12);
                    circ.attr({ "stroke" : gFretMarkerStrokeColor,
                                "fill"   : gFretMarkerFillColor,
                                "stroke-width" : noteStrokeWidth});

            }
            else if(fret == 11) { // 12th fret
                // markers look like 01*23*45
                if(x == 1 || x == 3) {
                    var circ = paper.circle( gutter + x * stringSpace + (stringSpace / 2),
                                             headerGap + y * fretSpace + (fretSpace / 2) , 12);
                        circ.attr({ "stroke" : gFretMarkerStrokeColor,
                                    "fill" : gFretMarkerFillColor,
                                    "stroke-width" : noteStrokeWidth});
                }
            }
        }
    }

    var posOffset = chord.rt;
    if(chord.rt > 0) {
        posOffset = 1;
        drawFretPostitionText(paper,chord.rt);
    }
    else {
        drawNut(paper);
    }

    $$(".navbar-inner > .center").html(chord.name);

    for(var n = 0; n < frets.length; n++) {
        var fret = frets[n];

        if(posOffset > 0 && fret == -1) {
            // don't draw it
            addNote(paper,n,posOffset, "X" ); // needs to be a better color to show up
        }
        else {
            var noteName = ChordData.getNoteName(n,chord.rt + fret,true);
            var finger = fingers[n];
            addNote(paper,n,posOffset + fret, finger ? finger : noteName );
        }
    }
}

function drawNut(paper) {

    var elem = paper.rect(gutter,headerGap - 8,
                          stringSpace * 5, 12, 2);
    elem.attr({"stroke":"#FFF",
               "fill":"#CCC",
               "stroke-width":5});

}

function drawFretPostitionText(paper,posText) {
    var x = gutter - stringSpace;
    var y = headerGap + fretSpace  - fretSpace / 2;

    var txt = paper.text(x , y, posText);
        txt.attr({"font-size":noteLabelFontWidth,
                  "font-weight":noteLabelFontWeight,
                  "fill":noteLabelTextClr});
}

function addNote(paper,stringNum,fretNum,numText) {
    var fret = fretNum > -1 ? fretNum : 0;
    var x = gutter + stringSpace * stringNum;
    var y = headerGap + fret * fretSpace  - fretSpace / 2;

    if(numText != "x") {

        var circ = paper.circle( x, y, 16);
            circ.attr({ "stroke" : noteStrokeClr,
                        "fill" : fretNum ? noteFillClr : "#FFF",
                        "stroke-width" : noteStrokeWidth });

            circ.data({ "stringNum" : stringNum,
                        "fretNum" : fretNum });

            addTapHandler(circ,elemToNoteData);

        var txt = paper.text(x , y, numText);
            txt.attr({ "font-size" : noteLabelFontWidth,
                       "font-weight" : noteLabelFontWeight,
                       "fill" : fret ? noteLabelTextClr : noteFillClr });

            txt.data({ "stringNum" : stringNum,
                        "fretNum" : fretNum });
            addTapHandler(txt,elemToNoteData);
    }
    else {
        paper.text(x , y, numText)
        .attr({"stroke":noteFillClr,
                "fill":fretNum ? noteStrokeClr : "#FFF",
                "font-size":noteLabelFontWidth,
                "font-weight":noteLabelFontWeight});
    }
}



function initMenu() {

    chordDiv.paper = paper = window.Raphael(chordDiv, window.innerWidth, window.innerHeight);

    // TODO: don't flash the DOM repeatedly
    var lastNote = "";
    var listItems = [];

    chordCount = chordSource.length;

    //  <li class="item-content" id="li_32">
    //     <div class="item-inner">
    //         <div class="item-title">C#min7</div>
    //     </div>
    //  </li>
    for(var n = 0; n < chordCount; n++) {
        var li = document.createElement("li");
            li.className = 'item-content';
            li.id = "li_" + n;
        var div = document.createElement("div");
            div.className = 'item-inner';
        var title = document.createElement("div");
            title.className = 'item-title';
            title.innerText = chordSource[n].name;
        div.appendChild(title);
        li.appendChild(div);

        var noteName = getChordName(chordSource[n].name);
        // detect when we go from A to B, and render a B
        // <li class="item-divider">Divider title here</li>

        if(noteName != lastNote) {
           var liTitle = document.createElement("li");
               liTitle.innerText = noteName;
               liTitle.className = "item-divider";
               liTitle.id = "hdr_" + noteName;
           $$('#chordList').append(liTitle);
           lastNote = noteName;
        }
        $$('#chordList').append(li);
    }
    $$('#chordList').on("click",onMenuItem);
    $$('#chordJump').on("click",onChordJump);
}

function getChordName(strName) {

    var ret = strName.substr(0,2);
    if(ret.indexOf("b") == 1 ||
       ret.indexOf("#") == 1 ) {
           return ret;
    }
    return ret.substr(0,1);
}
