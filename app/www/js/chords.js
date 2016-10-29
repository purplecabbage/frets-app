var ChordData = {
    // note names in 'sharp' namings
    SharpNoteNames: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
    // note names in 'flat' namings
    FlatNoteNames: ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"],
    // default open strings, indexed into the above note names
    Tuning: [4, 9, 2, 7, 11, 4],
    // E2 is the lowest standard tuning guitar note aka Midi# 40
    MidiRoots: [40, 45, 50, 55, 59, 64],

    ChordTypes: [{
        abbrev: "maj",
        title: "Major",
        shapes: [{
            root: 0,
            // Low E String
            frets: "0,2,2,1,0,0"
        }, {
            root: 1,
            frets: "-1,0,2,2,2,0"
        }, {
            root: 3,
            frets: "-1,-1,0,2,3,2"
        }, {
            root: 4,
            frets: "3,2,0,0,0,3"
        }, {
            root: 5,
            frets: "-11,3,2,0,1,0"
        }]
    }, {
        abbrev: "min",
        title: "Minor",
        shapes: [{
            root: 0,
            // Low E String
            frets: "0,2,2,0,0,0"
        }, {
            root: 1,
            frets: "-1,0,2,2,1,0"
        }, {
            root: 3,
            frets: "-1,-1,0,2,3,1"
        }, {
            root: 4,
            frets: "3,1,0,0,3,3"
        }, {
            root: 5,
            frets: "-1,3,2,0,2,0"
        }]
    }, {
        abbrev: "aug",
        title: "Augmented"
    }, {
        abbrev: "sus4",
        title: "Suspended 4th"
    }, {
        abbrev: "6",
        title: "6th"
    }, {
        abbrev: "min6",
        title: "Minor 6th"
    }, {
        abbrev: "7",
        title: "Dominant 7th"
    }, {
        abbrev: "7sus4",
        title: "Dom 7th Suspended 4th"
    }, {
        abbrev: "maj7",
        title: "Major 7th"
    }, {
        abbrev: "min7",
        title: "Minor 7th"
    }, {
        abbrev: "dim7",
        title: "Diminished 7th"
    }, {
        abbrev: "min7b5",
        title: "Minor 7 flat 5"
    }, {
        abbrev: "maj7b5",
        title: "Major 7 flat 5"
    }, {
        abbrev: "min/maj7",
        title: "Minor / Major 7th"
    }, {
        abbrev: "7#5",
        title: "Dominant 7 sharp 5"
    }, {
        abbrev: "7b5",
        title: "Dominant 7 flat 5"
    }, {
        abbrev: "7b9",
        title: "Dominant 7 flat 9"
    }, {
        abbrev: "7#9",
        title: "Dominant 7 sharp 9"
    }, {
        abbrev: "9",
        title: "9th"
    }, {
        abbrev: "add9",
        title: "add 9"
    }, {
        abbrev: "maj9",
        title: "Major 9"
    }, {
        abbrev: "9/6",
        title: "Major 9 / 6"
    }, {
        abbrev: "min9",
        title: "Minor 9"
    }, {
        abbrev: "min9/6",
        title: "Minor 9 / 6"
    }, {
        abbrev: "11",
        title: "11th"
    }, {
        abbrev: "aug11",
        title: "Augmented 11th"
    }, {
        abbrev: "m11",
        title: "Minor 11th"
    }, {
        abbrev: "13",
        title: "13th"
    }, {
        abbrev: "maj13",
        title: "Major 13th"
    }, {
        abbrev: "13b9",
        title: "13 flat 9"
    }

    ],

    // A, Am, A aug, A sus4, A6, Am6, A7, A7sus4, Amaj7, Am7, Adim7, Am7b5,
    Chords: [
    {
        name: "A",
        type: "Open",
        rt: 0,
        fret: "-1,0,2,2,2,0",
        fingers: "0,0,1,2,3,0"
    },
    {
        name: "Am",
        type: "Open",
        rt: 0,
        fret: "-1,0,2,2,1,0",
        fingers: "0,0,2,3,1,0"
    },
    {
        name: "A aug",
        type: "Open",
        rt: 0,
        fret: "-1,0,2,2,2,1",
        fingers: "0,0,2,3,4,1"
    },
    {
        name: "A sus4",
        type: "Open",
        rt: 0,
        fret: "-1,0,2,2,3,0",
        fingers: "0,0,2,2,4,0"
    },
    //////
    {
        name: "B7",
        type: "Open",
        rt: 0,
        fret: "-1,2,1,2,0,2",
        fingers: "0,2,1,3,0,4"
    },
    {
        name: "B7sus4",
        type: "Open",
        rt: 0,
        fret: "-1,2,2,2,0,2",
        fingers: "0,2,1,3,0,4"
    },
    {
        name: "Bm",
        type: "Open",
        rt: 0,
        fret: "-1,2,4,4,3,2",
        fingers: "0,1,3,4,2,1"
    },
    ////////
    // C, Cm, Caug, Csus4, C6, C7, C7sus4, Cmaj7, Cdim7, Cmaj7-5, Cm/maj7, C9, Cadd9, C9/6
    {
        name: "C",
        type: "Open",
        rt: 0,
        fret: "-1,3,2,0,1,0",
        fingers: "0,3,2,0,1,0"
    },
    {
        name: "Cm",
        type: "Open",
        rt: 0,
        fret: "-1,-1,1,0,1,3",
        fingers: "0,0,1,0,2,4"
    },
    {
        name: "Caug",
        type: "Open",
        rt: 0,
        fret: "-1,3,2,1,1,0",
        fingers: "0,3,2,1,1,0"
    },
    ///////
    // D, Dm, Daug, Dsus4, D6, Dm6, D7
    {
        name: "D",
        type: "Open",
        rt: 0,
        fret: "-1,-1,0,2,3,2",
        fingers: "0,0,0,1,3,2"
    },
    {
        name: "Dm",
        type: "Open",
        rt: 0,
        fret: "-1,-1,0,2,3,1",
        fingers: "0,0,0,2,3,1"
    },
    {
        name: "D7",
        type: "Open",
        rt: 0,
        fret: "-1,-1,0,2,1,2",
        fingers: "0,0,0,2,1,3"
    },
    ////
    // E, Em, Eaug, Esus4, E6, Em6, E7
    {
        name: "E",
        type: "Open",
        rt: 0,
        fret: "0,2,2,1,0,0",
        fingers: "0,3,2,1,0,0"
    },
    {
        name: "Em",
        type: "Open",
        rt: 0,
        fret: "0,2,2,0,0,0",
        fingers: "0,3,2,0,0,0"
    },
    {
        name: "Eaug",
        type: "Open",
        rt: 0,
        fret: "0,2,2,1,1,0",
        fingers:"0,2,3,1,1,0"
    },
    {
        name: "Esus4",
        type: "Open",
        rt: 0,
        fret: "0,2,2,2,0,0",
        fingers: "0,2,3,4,0,0"
    },
    {
        name: "E6",
        type: "Open",
        rt: 0,
        fret: "0,2,2,1,2,0",
        fingers: "0,2,3,1,4,0"
    },
    {
        name: "Em6",
        type: "Open",
        rt: 0,
        fret: "0,2,2,0,2,0",
        fingers: "0,2,3,0,4,0"
    },
    {
        name: "E7",
        type: "Open",
        rt: 0,
        fret: "0,2,0,1,0,0",
        fingers: "0,3,0,1,0,0"
    },
    ////
    // F, Fmaj7, Fmaj7-5, F7-5, F9, Fadd9, Fmaj9, Fm9
    {
        name: "F",
        type: "Open",
        rt: 0,
        fret: "1,3,3,2,1,1",
        fingers: "1,3,4,2,1,1"
    },
    {
        name: "Fmaj7",
        type: "Open",
        rt: 0,
        fret: "-1,-1,3,2,1,0",
        fingers: "0,0,3,2,1,0"
    },
    {
        name: "Fmaj7-5",
        type: "Open",
        rt: 0,
        fret: "-1,-1,3,2,0,0",
        fingers: "0,0,3,2,0,0"
    },
    ////
    // G. Gm, Gaug, Gsus4, G6, Gm6, G7
    {
        name: "G",
        type: "Open",
        rt: 0,
        fret: "3,2,0,0,0,3",
        fingers: "2,1,0,0,0,3"
    },
    {
        name: "Gm",
        type: "Open",
        rt: 0,
        fret: "3,-1,0,3,3,3",
        fingers: "1,0,0,2,3,4"
    },
    {
        name: "Gaug",
        type: "Open",
        rt: 0,
        fret: "3,2,1,0,0,3",
        fingers: "3,2,1,0,0,4"
    },
    {
        name: "Gsus4",
        type: "Open",
        rt: 0,
        fret: "3,-1,0,0,1,3",
        fingers: "3,0,0,0,1,4"

    }
    ],

    getNoteName: function(stringNum, fret, bSharpNotation) {
        if (fret < 0) {
            return "x";
        }
        return this.SharpNoteNames[(this.Tuning[stringNum] + fret) % 12];
    },

    getNotesForChord:function(chord) {

        var fretNums = chord.fret.split(",");
        var noteNames = [];

        for(var n = 0; n < fretNums.length; n++) {

            noteNames.push(this.getNoteName(n,chord.rt + fretNums[n]));
        }

        return noteNames;
    }

}
