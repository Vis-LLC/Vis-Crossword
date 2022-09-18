/*
    Copyright (C) 2022 Vis LLC. - All Rights Reserved

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

/*
    Vis Sudoku - Source code can be found on SourceForge.net
*/
(function () {
    var Game = {
        StatIncrementCalls: [],
        Boards: {
    
        },
        State: null,
        CurrentBoard: null,
        BoardObject: {
        },
        ControlsDiv: null,
        StartTime: null,
        StartDuration: null,
        SavedGamesDiv: null,
        SavedGamesTable: null,
        TimerDiv: null,
        GameDiv: null,
        FailedDiv: null,
        SuccessDiv: null,
        OptionsDiv: null,
        BoardDiv: null,
        BoardField: null,
        BoardView: null,
        Selected: null,
        SelectedLocation: {
            x: -1,
            y: -1,
        },
        WordSets: {
            /*
            Computers: ["COMPUTER", "MONITOR", "MOUSE", "HARDDRIVE", "KEYBOARD", "CABLE", "MEMORY", "RAM", "ROM"],
            */
            States: ["ALABAMA", "ALASKA", "ARIZONA", "ARKANSAS", "CALIFORNIA", "COLORADO", "CONNECTICUT", "DELAWARE", "FLORIDA", "GEORGIA", "HAWAII", "IDAHO", "ILLINOIS", "INDIANA", "IOWA", "KANSAS", "KENTUCKY", "LOUISIANA", "MAINE", "MARYLAND", "MASSACHUSETTS", "MICHIGAN", "MINNESOTA", "MISSISSIPPI", "MISSOURI", "MONTANA", "NEBRASKA", "NEVADA", "NEWHAMPSHIRE", "NEWJERSEY", "NEWMEXICO", "NEWYORK", "NORTHCAROLINA", "NORTHDAKOTA", "OHIO", "OKLAHOMA", "OREGON", "PENNSYLVANIA", "RHODEISLAND", "SOUTHCAROLINA", "SOUTHDAKOTA", "TENNESSEE", "TEXAS", "UTAH", "VERMONT", "VIRGINIA", "WASHINGTON", "WESTVIRGINIA", "WISCONSIN", "WYOMING"],
            Presidents: ["GEORGEWASHINGTON", "JOHNADAMS", "THOMASJEFFERSON", "JAMESMADISON", "JAMESMONROE", "JOHNQUINCYADAMS", "ANDREWJACKSON", "MARTINVANBUREN", "WILLIAMHENRYHARRISON", "JOHNTYLER", "JAMESKPOLK", "ZACHARYTAYLOR", "MILLARDFILLMORE", "FRANKLINPIERCE", "JAMESBUCHANAN", "ABRAHAMLINCOLN", "ANDREWJOHNSON", "ULYSSESSGRANT", "RUTHERFORDBHAYES", "JAMESGARFIELD", "CHESTERAARTHUR", "GROVERCLEVEAND", "BENJAMINHARRISON", "GROVERCLEVELAND", "WILLIAMMCKINLEY", "THEODOREROOSEVELT", "WILLIAMHOWARDTAFT", "WOODROWWILSON", "WARRENGHARDING", "CALVINCOOLIDGE", "HERBERTHOOVER", "FRANKLINDROOSEVELT", "HARRYSTRUMAN", "DWIGHTDEISENHOWER", "JOHNFKENNEDY", "LYNDONBJOHNSON", "RICHARDMNIXON", "GERALDRFORD", "JAMESCARTER", "RONALDREAGAN", "GEORGEHWBUSH", "WILLIAMJCLINTON", "GEORGEWBUSH", "BARACKOBAMA", "DONALDTRUMP", "JOSEPHRBIDENJR"],
            Capitols: ["MONTGOMERY", "JUNEAU", "PHOENIX", "LITTLEROCK", "SACRAMENTO", "DENVER", "HARTFORD", "DOVER", "TALLAHASSEE", "ATLANTA", "HONOLULU", "BOISE", "SPRINGFIELD", "INDIANAPOLIS", "DESMOINES", "TOPEKA", "FRANKFORT", "BATONROUGE", "AUGUSTA", "ANNAPOLIS", "BOSTON", "LANSING", "SAINTPAUL", "JACKSON", "JEFFERSONCITY", "HELENA", "LINCOLN", "CARSONCITY", "CONCORD", "TRENTON", "SANTAFE", "ALBANY", "RALEIGH", "BISMARCK", "COLUMBUS", "OKLAHOMACITY", "SALEM", "HARRISBURG", "PROVIDENCE", "COLUMBIA", "PIERRE", "NASHVILLE", "AUSTIN", "SALTLAKECITY", "MONTPELIER", "RICHMOND", "OLYMPIA", "CHARLESTON", "MADISON", "CHEYENNE"],
            Norse: ["AEGIR", "BALDUR", "BESTLA", "BORR", "BRAGI", "BURI", "DAGUR", "DELLING", "EIR", "EOSTRE", "ELLI", "FORSETI", "FREYJA", "FREYR", "FRIGG", "FULLA", "GEFJUN", "GERD", "HEL", "HEIMDALLUR", "HERMODUR", "HLIN", "HODR", "HAEIR", "IDUNN", "JORD", "KVASIR", "LOFN", "LOKI", "MAGNI", "MANI", "MIMIR", "NANNA", "NERPUS", "NJORDUR", "NOTT", "ODINN", "ODUR", "PORR", "RAN", "SAGA", "SIF", "SIGYN", "SJOFN", "SKADI", "SKOLL", "SNOTRA", "SOL", "THOR", "THRUER", "TYR", "ULLR", "VALI", "VANIR", "VAR", "VE", "VIDARR", "VILI", "VOR", "YGGDRASIL"],
            Egyptian: ["AKER", "AMUN", "AMUNET", "ANHUR", "ANUBIS", "ANUKET", "ATEN", "ATUM", "BASTET", "BAT", "BENNU", "GEB", "HAPI", "HATHOR", "HATMEHIT", "HEH", "HEQET", "HESAT", "HORUS", "IMENTET", "ISIS", "KEK", "KHEPRI", "KHNUM", "KHONSU", "MAAHES", "MAAT", "MENHIT", "MONTU", "MUT", "NEFERTUM", "NEITH", "NEKHBET", "NEMTY", "NEPER", "NEPHTHYS", "NEPIT", "NU", "NUT", "OSIRIS", "PAKHET", "PTAH", "RA", "RA", "RENENUTET", "SATET", "SEKHMET", "SET", "SHU", "SOBEK", "SOPDU", "TATENEN", "TEFNUT", "THOTH", "WADJET", "WADJWER", "WOSRET"],
            Roman: ["APOLLO", "AURORA", "BACCHUS", "BELLONA", "CAELUS", "CERES", "CUPID", "CYBELE", "DIANA", "FAUNUS", "FLORA", "FORTUNA", "JANUS", "JUNO", "JUPITER", "MARS", "MERCURY", "MINERVA", "NEPTUNE", "NYX", "PLUTO", "PROSERPINA", "POMONA", "SATURN", "SPES", "TERRA", "VENUS", "VERITAS", "VESTA", "VULCAN"],
            Greek: ["ACHLYS", "AETHER", "AION", "ANANKE", "ANYTOS", "APHRODITE", "APOLLO", "ARES", "ARTEMIS", "ASTERIA", "ASTRAEUS", "ATHENA", "ATLAS", "CHAOS", "CHRONOS", "COEUS", "CRIUS", "CRONUS", "DEMETER", "DIONE", "DIONYSUS", "EOS", "EPIMETHEUS", "EREBUS", "EROS", "GAIA", "HADES", "HELIOS", "HEMERA", "HEPHAESTUS", "HERA", "HERMES", "HESTIA", "HYPERION", "HYPNOS", "IAPETUS", "LELANTOS", "LETO", "MENOETIUS", "METIS", "MNEMOSYNE", "NEMESIS", "NESOI", "NYX", "OCEANUS", "OUREA", "PALLAS", "PERSES", "PHANES", "PHOEBE", "PONTUS", "POSEIDON", "PROMETHEUS", "RHEA", "SELENE", "STYX", "SYCEUS", "TARTARUS", "TETHYS", "THALASSA", "THANATOS", "THEIA", "THEMIS", "URANUS", "ZEUS"],
            "Design Patterns": ["ABSTRACTFACTORY", "ADAPTER", "BRIDGE", "BUILDER", "CHAINOFRESPONSIBILITY", "COMMAND", "COMPOSITE", "DECORATOR", "FACADE", "FACTORYMETHOD", "FLYWEIGHT", "INTERPRETER", "ITERATOR", "MEDIATOR", "MEMENTO", "OBSERVER", "PROTOTYPE", "PROXY", "SINGLETON", "STATE", "STRATEGY", "TEMPLATEMETHOD", "VISITOR"],
        },
        Puzzles: {
            /*
            Computers: {
                "_map": [
                    [null,null,null,null,null,null,null,null,null,null,null,"E",null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,"S",null,null,"M",null,null,null,"H",null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,"R","E","T","U","P","M","O","C",null,null,"A",null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,"O",null,null,"N","A",null,null,"R",null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,"R","O","M",null,null,"I","B",null,null,"D",null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,"T","L",null,null,"D",null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,"O","E",null,null,"R",null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,"R",null,null,null,"I",null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,"M","E","M","O","R","Y",null,null,null,"V",null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,"A",null,null,null,null,null,null,null,null,"E",null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,"R",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,"D","R","A","O","B","Y","E","K",null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
                ],
                "_words":{
                    "h":{
                        "COMPUTER":{"_x":15,"_y":2,"_directionX":-1,"_directionY":0},
                        "MONITOR":{"_x":14,"_y":1,"_directionX":0,"_directionY":1},
                        "MOUSE":{"_x":11,"_y":4,"_directionX":0,"_directionY":-1},
                        "HARDDRIVE":{"_x":18,"_y":1,"_directionX":0,"_directionY":1},
                        "KEYBOARD":{"_x":19,"_y":18,"_directionX":-1,"_directionY":0},
                        "CABLE":{"_x":15,"_y":2,"_directionX":0,"_directionY":1},
                        "MEMORY":{"_x":9,"_y":8,"_directionX":1,"_directionY":0},
                        "RAM":{"_x":9,"_y":10,"_directionX":0,"_directionY":-1},
                        "ROM":{"_x":9,"_y":4,"_directionX":1,"_directionY":0}
                    }
                }
            },
            */
            States: {
                "_map": [
                    [null,null,null,null,null,"G","E","O","R","G","I","A",null,null,null,null,null,"S","T","T","E","S","U","H","C","A","S","S","A","M"],
                    [null,null,null,"N","O","R","T","H","D","A","K","O","T","A",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"A"],
                    [null,null,null,null,null,null,null,null,null,null,"I","N","D","I","A","N","A",null,null,null,null,null,null,null,null,null,null,null,null,"L"],
                    [null,null,null,null,null,"S",null,null,null,null,null,"O","D","A","R","O","L","O","C",null,null,null,null,null,null,null,null,null,null,"A"],
                    [null,null,null,null,null,"A","L","A","S","K","A",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"B"],
                    [null,null,null,null,null,"S",null,"N",null,null,"U","T","A","H",null,null,null,null,null,null,"C",null,null,null,null,null,null,null,null,"A"],
                    [null,null,null,null,null,"N",null,"O",null,null,null,null,null,null,"A",null,null,null,null,null,"A",null,null,null,null,null,null,null,null,"M"],
                    [null,null,null,null,null,"A",null,"Z",null,null,null,null,null,null,"W",null,null,null,null,null,"L",null,null,null,null,"O","F",null,null,"A"],
                    [null,null,null,null,null,"K",null,"I",null,"S",null,null,null,null,"O",null,null,null,null,null,"I",null,null,null,null,"C","L",null,null,null],
                    [null,null,"P",null,null,null,null,"R",null,"I",null,null,null,null,"I",null,null,null,null,null,"F",null,null,"S",null,"I","O",null,null,null],
                    [null,null,"E",null,null,"I","D","A","H","O",null,null,null,null,null,null,null,null,null,null,"O",null,null,"O",null,"X","R",null,null,null],
                    [null,null,"N",null,null,null,null,null,null,"N",null,null,null,null,"M","A","I","N","E",null,"R",null,null,"U",null,"E","I",null,null,null],
                    [null,null,"N",null,null,"W","Y","O","M","I","N","G",null,null,null,null,"P",null,null,null,"N",null,"Y","T",null,"M","D",null,null,null],
                    [null,null,"S",null,null,null,null,null,null,"L",null,null,null,null,null,null,"P",null,null,null,"I",null,"K","H",null,"W","A",null,null,null],
                    [null,null,"Y",null,null,null,null,null,null,"L",null,null,null,null,null,null,"I",null,null,null,"A",null,"C","C",null,"E",null,null,null,null],
                    [null,null,"L",null,null,"W","A","S","H","I","N","G","T","O","N",null,"S",null,"S",null,null,null,"U","A",null,"N",null,null,null,"A"],
                    [null,null,"V",null,"M","A","R","Y","L","A","N","D",null,null,null,null,"S",null,"A","M",null,null,"T","R","O","H","I","O",null,"N"],
                    [null,null,"A",null,null,null,null,null,null,null,null,null,null,null,null,null,"I",null,"X","I",null,null,"N","O",null,null,null,null,null,"A"],
                    [null,null,"N",null,null,null,null,null,null,null,null,null,null,null,null,null,"S",null,"E","C",null,null,"E","L",null,null,null,null,"A","T"],
                    [null,null,"I",null,null,null,null,null,null,null,null,null,null,null,null,"S","S",null,"T","H",null,null,"K","I",null,null,null,null,"T","N"],
                    [null,"S","A","S","N","A","K","R","A",null,null,null,null,null,null,"O","I",null,null,"I",null,null,null,"N",null,null,null,null,"O","O"],
                    [null,null,null,null,null,null,null,null,"V","E","R","M","O","N","T","U","M",null,"N","G",null,null,null,"A",null,null,null,null,"S","M"],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"T",null,null,"E","A",null,"N","E","W","J","E","R","S","E","Y"],
                    [null,null,null,null,"M","I","S","S","O","U","R","I",null,null,null,"H",null,null,"V","N","O","G","E","R","O",null,null,null,"N",null],
                    [null,null,null,null,null,null,null,null,"E","R","A","W","A","L","E","D",null,null,"A","A","N","A","I","S","I","U","O","L","N",null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"A",null,null,"D",null,null,null,null,null,null,null,null,null,"I",null],
                    ["T","U","C","I","T","C","E","N","N","O","C",null,null,null,null,"K",null,"H","A","W","A","I","I",null,null,null,null,null,"M",null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"O",null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"T",null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"A",null,null,null,null,null,null,null,null,null,null,null,null,null,null]
                ],
                "_words": {
                    "h": {
                        "ALABAMA": {"_x": 29,"_y": 1,"_directionX": 0,"_directionY": 1},
                        "ALASKA": {"_x": 5,"_y": 4,"_directionX": 1,"_directionY": 0},
                        "ARIZONA": {"_x": 7,"_y": 10,"_directionX": 0,"_directionY": -1},
                        "ARKANSAS": {"_x": 8,"_y": 20,"_directionX": -1,"_directionY": 0},
                        "CALIFORNIA": {"_x": 20,"_y": 5,"_directionX": 0,"_directionY": 1},
                        "COLORADO": {"_x": 18,"_y": 3,"_directionX": -1,"_directionY": 0},
                        "CONNECTICUT": {"_x": 10,"_y": 26,"_directionX": -1,"_directionY": 0},
                        "DELAWARE": {"_x": 15,"_y": 24,"_directionX": -1,"_directionY": 0},
                        "FLORIDA": {"_x": 26,"_y": 7,"_directionX": 0,"_directionY": 1},
                        "GEORGIA": {"_x": 5,"_y": 0,"_directionX": 1,"_directionY": 0},
                        "HAWAII": {"_x": 17,"_y": 26,"_directionX": 1,"_directionY": 0},
                        "IDAHO": {"_x": 5,"_y": 10,"_directionX": 1,"_directionY": 0},
                        "ILLINOIS": {"_x": 9,"_y": 15,"_directionX": 0,"_directionY": -1},
                        "INDIANA": {"_x": 10,"_y": 2,"_directionX": 1,"_directionY": 0},
                        "IOWA": {"_x": 14,"_y": 9,"_directionX": 0,"_directionY": -1},
                        "KANSAS": {"_x": 5,"_y": 8,"_directionX": 0,"_directionY": -1},
                        "KENTUCKY": {"_x": 22,"_y": 19,"_directionX": 0,"_directionY": -1},
                        "LOUISIANA": {"_x": 27,"_y": 24,"_directionX": -1,"_directionY": 0},
                        "MAINE": {"_x": 14,"_y": 11,"_directionX": 1,"_directionY": 0},
                        "MARYLAND": {"_x": 4,"_y": 16,"_directionX": 1,"_directionY": 0},
                        "MASSACHUSETTS": {"_x": 29,"_y": 0,"_directionX": -1,"_directionY": 0},
                        "MICHIGAN": {"_x": 19,"_y": 16,"_directionX": 0,"_directionY": 1},
                        "MINNESOTA": {"_x": 28,"_y": 26,"_directionX": 0,"_directionY": -1},
                        "MISSISSIPPI": {"_x": 16,"_y": 21,"_directionX": 0,"_directionY": -1},
                        "MISSOURI": {"_x": 4,"_y": 23,"_directionX": 1,"_directionY": 0},
                        "MONTANA": {"_x": 29,"_y": 21,"_directionX": 0,"_directionY": -1},
                        "NEVADA": {"_x": 18,"_y": 21,"_directionX": 0,"_directionY": 1},
                        "NEWJERSEY": {"_x": 21,"_y": 22,"_directionX": 1,"_directionY": 0},
                        "NEWMEXICO": {"_x": 25,"_y": 15,"_directionX": 0,"_directionY": -1},
                        "NORTHDAKOTA": {"_x": 3,"_y": 1,"_directionX": 1,"_directionY": 0},
                        "OHIO": {"_x": 24,"_y": 16,"_directionX": 1,"_directionY": 0},
                        "OREGON": {"_x": 24,"_y": 23,"_directionX": -1,"_directionY": 0},
                        "PENNSYLVANIA": {"_x": 2,"_y": 9,"_directionX": 0,"_directionY": 1},
                        "SOUTHCAROLINA": {"_x": 23,"_y": 9,"_directionX": 0,"_directionY": 1},
                        "SOUTHDAKOTA": {"_x": 15,"_y": 19,"_directionX": 0,"_directionY": 1},
                        "TEXAS": {"_x": 18,"_y": 19,"_directionX": 0,"_directionY": -1},
                        "UTAH": {"_x": 10,"_y": 5,"_directionX": 1,"_directionY": 0},
                        "VERMONT": {"_x": 8,"_y": 21,"_directionX": 1,"_directionY": 0},
                        "WASHINGTON": {"_x": 5,"_y": 15,"_directionX": 1,"_directionY": 0},
                        "WYOMING": {"_x": 5,"_y": 12,"_directionX": 1,"_directionY": 0}
                    }
                }
            },
            Presidents: {
                "_map": [
                    [null,null,null,null,null,null,null,null,"G","E","O","R","G","E","W","A","S","H","I","N","G","T","O","N",null,"A",null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"B",null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"R",null,null,null,null],
                    [null,null,null,"R","U","H","T","R","A","A","R","E","T","S","E","H","C",null,null,null,null,null,null,null,null,"A",null,null,"N","U"],
                    [null,"J","A","M","E","S","G","A","R","F","I","E","L","D",null,null,null,null,null,null,null,null,null,null,null,"H",null,null,"E","L"],
                    [null,null,"T","H","O","M","A","S","J","E","F","F","E","R","S","O","N",null,null,null,"J",null,"G",null,null,"A","K",null,"R","Y"],
                    [null,null,null,null,null,"Z",null,"R","E","V","O","O","H","T","R","E","B","R","E","H","A",null,"E",null,null,"M","L",null,"U","S"],
                    [null,null,null,null,"T","A",null,null,null,null,null,null,null,null,null,null,null,null,null,null,"M",null,"O",null,null,"L","O",null,"B","S"],
                    [null,null,null,null,"L","C",null,null,null,null,null,null,null,null,null,null,null,null,null,null,"E",null,"R",null,null,"I","P",null,"N","E"],
                    [null,null,null,null,"E","H",null,null,null,null,null,null,null,null,null,null,null,null,null,null,"S",null,"G",null,null,"N","K",null,"A","S"],
                    [null,null,null,"A","V","A",null,null,null,null,null,null,null,null,null,null,null,null,null,null,"M",null,"E",null,null,"C","S",null,"V","S"],
                    [null,null,null,"N","E","R","B","A","R","A","C","K","O","B","A","M","A",null,null,null,"O",null,"W",null,null,"O","E",null,"N","G"],
                    [null,null,null,"D","S","Y","D","N","A","E","V","E","L","C","R","E","V","O","R","G","N",null,"B",null,null,"L","M",null,"I","R"],
                    [null,null,null,"R","O","T",null,null,null,null,null,null,null,null,null,null,null,null,null,null,"R",null,"U",null,null,"N","A",null,"T","A"],
                    [null,null,null,"E","O","A",null,null,null,null,null,null,null,null,null,null,null,null,null,null,"O",null,"S",null,null,null,"J",null,"R","N"],
                    [null,null,null,"W","R","Y",null,null,null,null,null,null,null,null,null,null,null,null,null,null,"E",null,"H",null,null,null,null,null,"A","T"],
                    [null,null,null,"J","D","L","N","O","S","L","I","W","W","O","R","D","O","O","W",null,null,null,null,null,null,null,null,null,"M",null],
                    [null,null,null,"O","N","O","W","I","L","L","I","A","M","H","E","N","R","Y","H","A","R","R","I","S","O","N",null,null,null,null],
                    [null,"N",null,"H","I","R",null,null,null,null,null,null,null,null,null,null,null,null,null,"R","E","L","Y","T","N","H","O","J",null,null],
                    [null,"O",null,"N","L",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,"S",null,"S","K",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,"I",null,"O","N",null,null,null,null,null,null,"S","M","A","D","A","Y","C","N","I","U","Q","N","H","O","J",null,null,null,null],
                    [null,"D",null,"N","A",null,null,null,null,null,null,"R","I","C","H","A","R","D","M","N","I","X","O","N",null,null,null,null,null,null],
                    [null,"A",null,null,"R",null,"L","Y","N","D","O","N","B","J","O","H","N","S","O","N",null,null,null,null,null,null,null,null,null,null],
                    [null,"M",null,null,"F",null,null,null,null,null,"N","O","S","K","C","A","J","W","E","R","D","N","A",null,null,null,null,null,null,null],
                    [null,"S",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,"E",null,null,null,null,null,null,null,null,null,"W","I","L","L","I","A","M","M","C","K","I","N","L","E","Y",null,null,null,null],
                    [null,"M",null,null,null,null,null,null,"S","M","A","D","A","N","H","O","J",null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,"A",null,null,null,null,null,"E","C","R","E","I","P","N","I","L","K","N","A","R","F",null,null,null,null,null,null,null,null,null],
                    [null,"J",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
                ],
                "_words": {
                    "h": {
                        "GEORGEWASHINGTON": {"_x": 8,"_y": 0,"_directionX": 1,"_directionY": 0},
                        "JOHNADAMS": {"_x": 16,"_y": 27,"_directionX": -1,"_directionY": 0},
                        "THOMASJEFFERSON": {"_x": 2,"_y": 5,"_directionX": 1,"_directionY": 0},
                        "JAMESMADISON": {"_x": 1,"_y": 29,"_directionX": 0,"_directionY": -1},
                        "JAMESMONROE": {"_x": 20,"_y": 5,"_directionX": 0,"_directionY": 1},
                        "JOHNQUINCYADAMS": {"_x": 25,"_y": 21,"_directionX": -1,"_directionY": 0},
                        "ANDREWJACKSON": {"_x": 22,"_y": 24,"_directionX": -1,"_directionY": 0},
                        "MARTINVANBUREN": {"_x": 28,"_y": 16,"_directionX": 0,"_directionY": -1},
                        "WILLIAMHENRYHARRISON": {"_x": 6,"_y": 17,"_directionX": 1,"_directionY": 0},
                        "JOHNTYLER": {"_x": 27,"_y": 18,"_directionX": -1,"_directionY": 0},
                        "JAMESKPOLK": {"_x": 26,"_y": 14,"_directionX": 0,"_directionY": -1},
                        "ZACHARYTAYLOR": {"_x": 5,"_y": 6,"_directionX": 0,"_directionY": 1},
                        "FRANKLINPIERCE": {"_x": 20,"_y": 28,"_directionX": -1,"_directionY": 0},
                        "ABRAHAMLINCOLN": {"_x": 25,"_y": 0,"_directionX": 0,"_directionY": 1},
                        "ANDREWJOHNSON": {"_x": 3,"_y": 10,"_directionX": 0,"_directionY": 1},
                        "ULYSSESSGRANT": {"_x": 29,"_y": 3,"_directionX": 0,"_directionY": 1},
                        "JAMESGARFIELD": {"_x": 1,"_y": 4,"_directionX": 1,"_directionY": 0},
                        "CHESTERAARTHUR": {"_x": 16,"_y": 3,"_directionX": -1,"_directionY": 0},
                        "GROVERCLEVEAND": {"_x": 19,"_y": 12,"_directionX": -1,"_directionY": 0},
                        "WILLIAMMCKINLEY": {"_x": 11,"_y": 26,"_directionX": 1,"_directionY": 0},
                        "WOODROWWILSON": {"_x": 18,"_y": 16,"_directionX": -1,"_directionY": 0},
                        "HERBERTHOOVER": {"_x": 19,"_y": 6,"_directionX": -1,"_directionY": 0},
                        "FRANKLINDROOSEVELT": {"_x": 4,"_y": 24,"_directionX": 0,"_directionY": -1},
                        "LYNDONBJOHNSON": {"_x": 6,"_y": 23,"_directionX": 1,"_directionY": 0},
                        "RICHARDMNIXON": {"_x": 11,"_y": 22,"_directionX": 1,"_directionY": 0},
                        "GEORGEWBUSH": {"_x": 22,"_y": 5,"_directionX": 0,"_directionY": 1},
                        "BARACKOBAMA": {"_x": 6,"_y": 11,"_directionX": 1,"_directionY": 0}
                    }
                }
            },
            Capitols: {
                "_map": [
                    [null,null,"T","R","O","F","K","N","A","R","F",null,null,null,null,null,null,null,null,"X","I","N","E","O","H","P",null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"R",null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,"T",null,null,null,null,null,null,"E",null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,"O",null,null,null,null,null,null,"V",null,null,null,null,"S","A","N","T","A","F","E"],
                    [null,"H",null,null,null,null,null,null,null,null,null,"P",null,null,null,null,"G",null,"O",null,null,null,null,null,null,null,null,null,null,null],
                    [null,"A","T","L","A","N","T","A","H","E","L","E","N","A","C",null,"R",null,"D",null,null,null,null,null,null,null,null,null,null,null],
                    [null,"R",null,null,null,null,null,null,null,null,null,"K",null,"S","H",null,"U","M","O","N","T","P","E","L","I","E","R",null,null,null],
                    [null,"T",null,null,null,null,null,null,null,null,null,"A",null,"I","E",null,"B",null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,"F",null,null,null,null,null,null,null,null,null,null,null,"L","Y",null,"S",null,null,null,"S","A","I","N","T","P","A","U","L",null],
                    ["N","O",null,null,null,null,null,null,null,null,null,null,null,"O","E","D","I",null,null,"A","T","S","U","G","U","A",null,null,null,null],
                    ["I","R",null,null,null,null,null,null,null,null,null,null,null,"P","N","E","R",null,null,null,null,null,null,null,null,null,null,null,null,null],
                    ["T","D",null,null,null,null,null,null,null,null,null,null,null,"A","N","S","R",null,null,null,null,null,"M",null,"B",null,null,null,null,null],
                    ["S",null,null,null,null,null,null,null,null,null,null,null,null,"N","E","M","A",null,null,null,null,null,"O",null,"O",null,null,null,null,null],
                    ["U",null,null,null,null,null,null,null,null,null,null,null,"D","A",null,"O","H",null,null,null,null,null,"N","L","I","N","C","O","L","N"],
                    ["A",null,null,null,"C","O","L","U","M","B","I","A","R","I",null,"I",null,"S","K",null,null,null,"T","E","S",null,null,null,null,null],
                    [null,null,null,null,"R","I","C","H","M","O","N","D","O","D",null,"N",null,"U","C",null,null,null,"G","E","E",null,null,"E",null,null],
                    [null,null,null,"H",null,null,null,null,null,null,null,"E","C","N",null,"E",null,"B","R",null,null,null,"O","S",null,null,null,"G",null,null],
                    [null,"S",null,"G","N","I","S","N","A","L",null,"N","N","I",null,"S",null,"M","A",null,null,null,"M","S",null,null,null,"U",null,null],
                    [null,"P",null,"I",null,null,null,"O",null,null,null,"V","O",null,null,null,"H","U","M",null,null,"C","E","A",null,null,null,"O",null,"S"],
                    [null,"R",null,"E",null,null,null,"T",null,null,null,"E","C",null,null,null,"O","L","S",null,"A","A","R","H",null,null,null,"R",null,"A"],
                    [null,"I",null,"L",null,null,null,"S",null,null,null,"R",null,null,null,null,"N","O","I",null,"L","R","Y","A",null,null,null,"N","T","C"],
                    [null,"N",null,"A",null,null,null,"O",null,null,null,null,null,null,null,null,"O","C","B",null,"B","S",null,"L",null,null,null,"O","R","R"],
                    [null,"G",null,"R",null,null,null,"B",null,null,null,null,null,null,null,null,"L",null,null,null,"A","O",null,"L",null,null,null,"T","E","A"],
                    [null,"F",null,null,null,null,null,"A","N","N","A","P","O","L","I","S","U",null,null,null,"N","N",null,"A",null,null,null,"A","N","M"],
                    [null,"I",null,null,null,null,null,null,null,null,null,null,null,null,"M","E","L","A","S",null,"Y","C",null,"T",null,null,null,"B","T","E"],
                    [null,"E",null,null,null,null,null,null,null,null,null,null,null,null,null,null,"U",null,null,null,null,"I",null,null,null,null,null,null,"O","N"],
                    [null,"L",null,"U","A","E","N","U","J",null,null,null,null,null,null,null,null,null,null,null,null,"T",null,null,null,null,null,null,"N","T"],
                    [null,"D","L","I","T","T","L","E","R","O","C","K",null,null,null,null,null,null,null,null,null,"Y",null,null,null,null,null,null,null,"O"],
                    [null,null,null,"C","H","A","R","L","E","S","T","O","N","O","S","K","C","A","J",null,null,null,null,null,null,null,null,null,null,null]
                ],
                "_words": {
                    "h": {
                        "MONTGOMERY": {"_x": 22,"_y": 12,"_directionX": 0,"_directionY": 1},
                        "JUNEAU": {"_x": 8,"_y": 27,"_directionX": -1,"_directionY": 0},
                        "PHOENIX": {"_x": 25,"_y": 0,"_directionX": -1,"_directionY": 0},
                        "LITTLEROCK": {"_x": 2,"_y": 28,"_directionX": 1,"_directionY": 0},
                        "SACRAMENTO": {"_x": 29,"_y": 19,"_directionX": 0,"_directionY": 1},
                        "DENVER": {"_x": 11,"_y": 16,"_directionX": 0,"_directionY": 1},
                        "HARTFORD": {"_x": 1,"_y": 5,"_directionX": 0,"_directionY": 1},
                        "DOVER": {"_x": 18,"_y": 6,"_directionX": 0,"_directionY": -1},
                        "TALLAHASSEE": {"_x": 23,"_y": 25,"_directionX": 0,"_directionY": -1},
                        "ATLANTA": {"_x": 1,"_y": 6,"_directionX": 1,"_directionY": 0},
                        "HONOLULU": {"_x": 16,"_y": 19,"_directionX": 0,"_directionY": 1},
                        "BOISE": {"_x": 24,"_y": 12,"_directionX": 0,"_directionY": 1},
                        "SPRINGFIELD": {"_x": 1,"_y": 18,"_directionX": 0,"_directionY": 1},
                        "INDIANAPOLIS": {"_x": 13,"_y": 18,"_directionX": 0,"_directionY": -1},
                        "DESMOINES": {"_x": 15,"_y": 10,"_directionX": 0,"_directionY": 1},
                        "TOPEKA": {"_x": 11,"_y": 3,"_directionX": 0,"_directionY": 1},
                        "FRANKFORT": {"_x": 10,"_y": 0,"_directionX": -1,"_directionY": 0},
                        "BATONROUGE": {"_x": 27,"_y": 25,"_directionX": 0,"_directionY": -1},
                        "AUGUSTA": {"_x": 25,"_y": 10,"_directionX": -1,"_directionY": 0},
                        "ANNAPOLIS": {"_x": 7,"_y": 24,"_directionX": 1,"_directionY": 0},
                        "BOSTON": {"_x": 7,"_y": 23,"_directionX": 0,"_directionY": -1},
                        "LANSING": {"_x": 9,"_y": 18,"_directionX": -1,"_directionY": 0},
                        "SAINTPAUL": {"_x": 20,"_y": 9,"_directionX": 1,"_directionY": 0},
                        "JACKSON": {"_x": 18,"_y": 29,"_directionX": -1,"_directionY": 0},
                        "HELENA": {"_x": 8,"_y": 6,"_directionX": 1,"_directionY": 0},
                        "LINCOLN": {"_x": 23,"_y": 14,"_directionX": 1,"_directionY": 0},
                        "CARSONCITY": {"_x": 21,"_y": 19,"_directionX": 0,"_directionY": 1},
                        "CONCORD": {"_x": 12,"_y": 20,"_directionX": 0,"_directionY": -1},
                        "TRENTON": {"_x": 28,"_y": 21,"_directionX": 0,"_directionY": 1},
                        "SANTAFE": {"_x": 23,"_y": 4,"_directionX": 1,"_directionY": 0},
                        "ALBANY": {"_x": 20,"_y": 20,"_directionX": 0,"_directionY": 1},
                        "RALEIGH": {"_x": 3,"_y": 23,"_directionX": 0,"_directionY": -1},
                        "BISMARCK": {"_x": 18,"_y": 22,"_directionX": 0,"_directionY": -1},
                        "COLUMBUS": {"_x": 17,"_y": 22,"_directionX": 0,"_directionY": -1},
                        "SALEM": {"_x": 18,"_y": 25,"_directionX": -1,"_directionY": 0},
                        "HARRISBURG": {"_x": 16,"_y": 14,"_directionX": 0,"_directionY": -1},
                        "COLUMBIA": {"_x": 4,"_y": 15,"_directionX": 1,"_directionY": 0},
                        "AUSTIN": {"_x": 0,"_y": 15,"_directionX": 0,"_directionY": -1},
                        "MONTPELIER": {"_x": 17,"_y": 7,"_directionX": 1,"_directionY": 0},
                        "RICHMOND": {"_x": 4,"_y": 16,"_directionX": 1,"_directionY": 0},
                        "CHARLESTON": {"_x": 3,"_y": 29,"_directionX": 1,"_directionY": 0},
                        "CHEYENNE": {"_x": 14,"_y": 6,"_directionX": 0,"_directionY": 1}
                    }
                }
            },
            Norse: {
                "_map": [
                    [null,null,null,null,null,null,"J","R","U","D","O","M","R","E","H",null,null,"I",null,null,null,"A",null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,"V","O","R",null,null,null,null,null,"R","R",null,null,"D",null,"V","A","L","I",null,null,null,null,null,null,null],
                    [null,null,null,"U","L","L","R","L","O","F","N",null,null,"Y","I",null,null,"U",null,null,null,"T",null,null,"F",null,null,null,null,null],
                    [null,null,null,null,null,null,"D",null,null,null,"A","E","R","T","S","O","E","N",null,null,null,"S",null,null,"R",null,null,null,null,null],
                    [null,null,null,null,null,null,"I","T","E","S","R","O","F","H","A",null,"G","N","I","L","L","E","D",null,"E",null,null,"N",null,null],
                    [null,"R",null,null,null,null,null,null,null,null,"T",null,null,"O","V",null,null,null,null,"N","S","B",null,null,"Y",null,null,"J",null,null],
                    [null,"U",null,null,null,null,null,null,null,null,"O",null,null,"R","K",null,null,null,null,"U","I",null,null,null,"R",null,null,"O",null,null],
                    [null,"D",null,null,null,null,null,null,null,null,"N",null,null,null,"T","T","O","N",null,"J","G",null,null,null,null,null,null,"R",null,null],
                    [null,"L","M",null,null,null,null,null,null,null,"S",null,null,null,null,null,null,null,null,"F","Y",null,null,null,null,null,null,"D",null,null],
                    [null,"A","A",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"E","N","I","R","U","B",null,null,"U",null,null],
                    [null,"B","N",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"G",null,"N","D",null,null,null,null,"R",null,null],
                    [null,"R","I","M","I","M","H",null,null,null,null,null,null,null,null,null,null,null,null,null,null,"G","O",null,null,null,"L",null,null,null],
                    [null,"H",null,null,null,null,"E",null,null,null,null,null,null,null,null,"S",null,null,null,null,null,"A","H",null,null,null,"O",null,null,"E"],
                    [null,"L",null,null,null,null,"L",null,null,null,null,null,null,null,"A","U",null,null,null,null,null,"M","I","D","A","K","S",null,null,"I"],
                    [null,"I",null,null,null,null,null,null,null,null,null,null,null,null,"E","P",null,null,null,null,null,"V",null,null,"N",null,"J",null,null,"R"],
                    [null,"N",null,null,null,null,null,null,null,null,null,null,null,null,"G","R",null,null,null,null,"B","I",null,null,"N",null,"O","I",null,null],
                    [null,null,null,null,null,null,null,"V","E",null,null,null,null,null,"I","E",null,null,"G","E","R","D",null,null,"A",null,"F","L",null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,"R","N",null,null,null,null,"A","A",null,null,"N",null,"N","L","F",null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,"A",null,null,null,null,null,"G","R",null,null,"A","J","Y","E","R","F"],
                    [null,"R",null,null,null,null,null,null,null,null,null,null,null,null,"V",null,null,null,null,null,"I","R",null,"R","A","N",null,null,"I",null],
                    [null,"E",null,null,null,null,null,"N","N","I","D","O",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"G",null],
                    [null,"U",null,null,null,null,null,null,null,"K",null,null,null,null,null,null,null,null,null,null,null,null,null,null,"V",null,null,null,"G",null],
                    [null,"R",null,null,null,null,null,null,null,"O",null,null,null,null,null,null,null,null,null,null,null,null,null,null,"I",null,null,null,null,null],
                    [null,"H",null,null,null,null,"S","K","O","L","L",null,null,null,null,null,null,null,null,null,null,null,null,null,"L",null,null,null,null,null],
                    [null,"T",null,null,null,null,null,"R","R","O","B",null,null,null,null,null,null,null,null,null,"P","O","R","R","I",null,null,null,null,null],
                    ["H","E","I","M","D","A","L","L","U","R",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,"S",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,"R","I","E","A","H",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,"F",null,"L","I","S","A","R","D","G","G","Y",null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,"R","U","G","A","D",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
                ],
                "_words": {
                    "h": {
                        "AEGIR": {"_x": 14,"_y": 13,"_directionX": 0,"_directionY": 1},
                        "BALDUR": {"_x": 1,"_y": 10,"_directionX": 0,"_directionY": -1},
                        "BESTLA": {"_x": 21,"_y": 5,"_directionX": 0,"_directionY": -1},
                        "BORR": {"_x": 10,"_y": 24,"_directionX": -1,"_directionY": 0},
                        "BRAGI": {"_x": 20,"_y": 15,"_directionX": 0,"_directionY": 1},
                        "BURI": {"_x": 24,"_y": 9,"_directionX": -1,"_directionY": 0},
                        "DAGUR": {"_x": 7,"_y": 29,"_directionX": -1,"_directionY": 0},
                        "DELLING": {"_x": 22,"_y": 4,"_directionX": -1,"_directionY": 0},
                        "EIR": {"_x": 29,"_y": 12,"_directionX": 0,"_directionY": 1},
                        "EOSTRE": {"_x": 16,"_y": 3,"_directionX": -1,"_directionY": 0},
                        "ELLI": {"_x": 27,"_y": 18,"_directionX": 0,"_directionY": -1},
                        "FORSETI": {"_x": 12,"_y": 4,"_directionX": -1,"_directionY": 0},
                        "FREYJA": {"_x": 29,"_y": 18,"_directionX": -1,"_directionY": 0},
                        "FREYR": {"_x": 24,"_y": 2,"_directionX": 0,"_directionY": 1},
                        "FRIGG": {"_x": 28,"_y": 17,"_directionX": 0,"_directionY": 1},
                        "GEFJUN": {"_x": 19,"_y": 10,"_directionX": 0,"_directionY": -1},
                        "GERD": {"_x": 18,"_y": 16,"_directionX": 1,"_directionY": 0},
                        "HEL": {"_x": 6,"_y": 11,"_directionX": 0,"_directionY": 1},
                        "HEIMDALLUR": {"_x": 0,"_y": 25,"_directionX": 1,"_directionY": 0},
                        "HERMODUR": {"_x": 14,"_y": 0,"_directionX": -1,"_directionY": 0},
                        "HLIN": {"_x": 1,"_y": 12,"_directionX": 0,"_directionY": 1},
                        "HODR": {"_x": 22,"_y": 12,"_directionX": 0,"_directionY": -1},
                        "HAEIR": {"_x": 12,"_y": 27,"_directionX": -1,"_directionY": 0},
                        "IDUNN": {"_x": 17,"_y": 0,"_directionX": 0,"_directionY": 1},
                        "JORD": {"_x": 6,"_y": 0,"_directionX": 0,"_directionY": 1},
                        "KVASIR": {"_x": 14,"_y": 6,"_directionX": 0,"_directionY": -1},
                        "LOFN": {"_x": 7,"_y": 2,"_directionX": 1,"_directionY": 0},
                        "LOKI": {"_x": 9,"_y": 23,"_directionX": 0,"_directionY": -1},
                        "MAGNI": {"_x": 21,"_y": 13,"_directionX": 0,"_directionY": -1},
                        "MANI": {"_x": 2,"_y": 8,"_directionX": 0,"_directionY": 1},
                        "MIMIR": {"_x": 5,"_y": 11,"_directionX": -1,"_directionY": 0},
                        "NANNA": {"_x": 24,"_y": 17,"_directionX": 0,"_directionY": -1},
                        "NERPUS": {"_x": 15,"_y": 17,"_directionX": 0,"_directionY": -1},
                        "NJORDUR": {"_x": 27,"_y": 4,"_directionX": 0,"_directionY": 1},
                        "NOTT": {"_x": 17,"_y": 7,"_directionX": -1,"_directionY": 0},
                        "ODINN": {"_x": 11,"_y": 20,"_directionX": -1,"_directionY": 0},
                        "ODUR": {"_x": 10,"_y": 0,"_directionX": -1,"_directionY": 0},
                        "PORR": {"_x": 20,"_y": 24,"_directionX": 1,"_directionY": 0},
                        "RAN": {"_x": 23,"_y": 19,"_directionX": 1,"_directionY": 0},
                        "SIF": {"_x": 9,"_y": 26,"_directionX": 0,"_directionY": 1},
                        "SIGYN": {"_x": 20,"_y": 5,"_directionX": 0,"_directionY": 1},
                        "SJOFN": {"_x": 26,"_y": 13,"_directionX": 0,"_directionY": 1},
                        "SKADI": {"_x": 26,"_y": 13,"_directionX": -1,"_directionY": 0},
                        "SKOLL": {"_x": 6,"_y": 23,"_directionX": 1,"_directionY": 0},
                        "SNOTRA": {"_x": 10,"_y": 8,"_directionX": 0,"_directionY": -1},
                        "SOL": {"_x": 26,"_y": 13,"_directionX": 0,"_directionY": -1},
                        "THOR": {"_x": 13,"_y": 3,"_directionX": 0,"_directionY": 1},
                        "THRUER": {"_x": 1,"_y": 24,"_directionX": 0,"_directionY": -1},
                        "TYR": {"_x": 13,"_y": 3,"_directionX": 0,"_directionY": -1},
                        "ULLR": {"_x": 3,"_y": 2,"_directionX": 1,"_directionY": 0},
                        "VALI": {"_x": 19,"_y": 1,"_directionX": 1,"_directionY": 0},
                        "VAR": {"_x": 14,"_y": 19,"_directionX": 0,"_directionY": -1},
                        "VE": {"_x": 7,"_y": 16,"_directionX": 1,"_directionY": 0},
                        "VIDARR": {"_x": 21,"_y": 14,"_directionX": 0,"_directionY": 1},
                        "VILI": {"_x": 24,"_y": 21,"_directionX": 0,"_directionY": 1},
                        "VOR": {"_x": 5,"_y": 1,"_directionX": 1,"_directionY": 0},
                        "YGGDRASIL": {"_x": 19,"_y": 28,"_directionX": -1,"_directionY": 0}
                    }
                }
            },
            Egyptian: {
                "_map": [
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,"M","U","T","R","E","F","E","N",null,null,null,null,null,null,"T",null,null],
                    ["O",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"H","A","T","H","O","R",null,null,"U",null,"U"],
                    ["S",null,null,null,null,null,null,null,null,"R",null,null,null,null,null,null,"R",null,null,"E",null,null,null,null,null,null,"A","M","U","N"],
                    ["I",null,null,null,"A",null,null,null,null,"E",null,null,null,null,null,null,"U",null,null,"S",null,null,null,null,null,null,null,null,null,"N"],
                    ["R",null,null,null,"N",null,null,null,null,"P",null,null,"S","U","R","O","H",null,"S","A",null,null,null,null,null,null,null,null,null,"E"],
                    ["I",null,null,null,"U",null,null,null,null,"E",null,null,null,null,null,null,"N",null,"A","T",null,null,"K","E","K",null,null,null,null,"B"],
                    ["S","O","B","E","K",null,null,null,null,"N","N","U",null,null,null,null,"A",null,"T",null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,"E","N","E","N","E","T","A","T",null,"H",null,null,"I","M","E","N","T","E","T",null,null,null,null,null,null,null],
                    [null,null,"S","E","T",null,null,null,null,null,null,null,null,"A",null,null,null,null,"T",null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,"M",null,null,null,"T","A","A","M","T",null,null,null,null,null,null,"T",null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,"O",null,"T","E","J","D","A","W","P",null,null,null,null,null,null,"E","M",null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,"N",null,null,null,"T","I","R","P","E","H","K",null,null,null,null,"M","A",null,null,null,null,null,null,null,null],
                    [null,"H","E","Q","E","T","A","B",null,"E",null,null,null,null,"T",null,null,null,null,null,"H","A",null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,"U",null,null,null,"B",null,null,null,null,"E",null,null,null,null,null,"K","H",null,null,"A",null,null,null,null,"G"],
                    [null,null,null,null,null,"T","H","O","T","H",null,null,null,null,"T",null,null,null,null,null,"E","E",null,null,"K",null,null,null,null,"E"],
                    [null,null,null,null,null,null,null,"K",null,"K",null,null,null,null,"U",null,null,null,null,null,"S","S",null,"T","E","H","K","A","P","B"],
                    [null,null,null,null,null,null,null,"H",null,"E",null,"A",null,null,"N",null,null,null,"N",null,null,null,null,null,"R",null,null,null,null,null],
                    [null,null,null,null,null,null,null,"N",null,"N",null,"N",null,null,"E",null,null,null,"U",null,null,null,null,null,null,null,null,null,null,"I"],
                    [null,null,null,null,null,null,null,"U",null,null,null,"U",null,null,"N",null,null,"Y","T","M","E","N",null,null,null,null,null,null,null,"S"],
                    [null,null,null,null,null,null,null,"M",null,null,null,"B",null,null,"E",null,null,null,null,null,null,null,null,null,null,null,"T",null,null,"I"],
                    [null,null,null,null,null,null,null,null,null,null,null,"I",null,null,"R",null,null,null,null,null,null,null,"M","E","N","H","I","T","U","S"],
                    ["A","T","E","N",null,null,null,null,null,null,null,"S","O","P","D","U",null,null,null,null,null,null,null,null,"A",null,"H",null,"S",null],
                    [null,null,null,null,null,"M","H",null,null,null,null,null,null,"W","O","S","R","E","T",null,null,null,null,null,"M",null,"E",null,"N",null],
                    [null,null,"B",null,null,"U","A",null,null,null,"R",null,null,null,null,null,null,null,null,null,null,null,null,null,"U",null,"M",null,"O",null],
                    [null,null,"A",null,null,"T","P",null,null,"W","A","D","J","W","E","R",null,"S","Y","H","T","H","P","E","N",null,"T",null,"H",null],
                    [null,null,"S",null,null,"A","I",null,null,null,null,null,null,null,null,null,null,"H",null,null,null,null,null,null,"E",null,"A",null,"K",null],
                    [null,null,"T",null,null,null,null,null,null,null,null,null,null,null,null,null,null,"U",null,null,"N","E","P","I","T",null,"H",null,null,null],
                    [null,"T","E","F","N","U","T","H",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,"T",null,null,null,null,"E",null,null,null,null,null,null,null,null,"N","E","I","T","H",null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,"H",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
                ],
                "_words": {
                    "h": {
                        "AKER": {"_x": 24,"_y": 13,"_directionX": 0,"_directionY": 1},
                        "AMUN": {"_x": 26,"_y": 2,"_directionX": 1,"_directionY": 0},
                        "AMUNET": {"_x": 24,"_y": 21,"_directionX": 0,"_directionY": 1},
                        "ANHUR": {"_x": 16,"_y": 6,"_directionX": 0,"_directionY": -1},
                        "ANUBIS": {"_x": 11,"_y": 16,"_directionX": 0,"_directionY": 1},
                        "ANUKET": {"_x": 4,"_y": 3,"_directionX": 0,"_directionY": 1},
                        "ATEN": {"_x": 0,"_y": 21,"_directionX": 1,"_directionY": 0},
                        "ATUM": {"_x": 5,"_y": 25,"_directionX": 0,"_directionY": -1},
                        "BASTET": {"_x": 2,"_y": 23,"_directionX": 0,"_directionY": 1},
                        "BAT": {"_x": 7,"_y": 12,"_directionX": -1,"_directionY": 0},
                        "BENNU": {"_x": 29,"_y": 5,"_directionX": 0,"_directionY": -1},
                        "GEB": {"_x": 29,"_y": 13,"_directionX": 0,"_directionY": 1},
                        "HAPI": {"_x": 6,"_y": 22,"_directionX": 0,"_directionY": 1},
                        "HATHOR": {"_x": 19,"_y": 1,"_directionX": 1,"_directionY": 0},
                        "HATMEHIT": {"_x": 26,"_y": 26,"_directionX": 0,"_directionY": -1},
                        "HEH": {"_x": 7,"_y": 29,"_directionX": 0,"_directionY": -1},
                        "HEQET": {"_x": 1,"_y": 12,"_directionX": 1,"_directionY": 0},
                        "HESAT": {"_x": 19,"_y": 1,"_directionX": 0,"_directionY": 1},
                        "HORUS": {"_x": 16,"_y": 4,"_directionX": -1,"_directionY": 0},
                        "IMENTET": {"_x": 16,"_y": 7,"_directionX": 1,"_directionY": 0},
                        "ISIS": {"_x": 29,"_y": 17,"_directionX": 0,"_directionY": 1},
                        "KEK": {"_x": 22,"_y": 5,"_directionX": 1,"_directionY": 0},
                        "KHEPRI": {"_x": 15,"_y": 11,"_directionX": -1,"_directionY": 0},
                        "KHNUM": {"_x": 7,"_y": 15,"_directionX": 0,"_directionY": 1},
                        "KHONSU": {"_x": 28,"_y": 25,"_directionX": 0,"_directionY": -1},
                        "MAAHES": {"_x": 21,"_y": 10,"_directionX": 0,"_directionY": 1},
                        "MAAT": {"_x": 12,"_y": 9,"_directionX": -1,"_directionY": 0},
                        "MENHIT": {"_x": 22,"_y": 20,"_directionX": 1,"_directionY": 0},
                        "MONTU": {"_x": 5,"_y": 9,"_directionX": 0,"_directionY": 1},
                        "MUT": {"_x": 27,"_y": 2,"_directionX": 0,"_directionY": -1},
                        "NEFERTUM": {"_x": 20,"_y": 0,"_directionX": -1,"_directionY": 0},
                        "NEITH": {"_x": 16,"_y": 28,"_directionX": 1,"_directionY": 0},
                        "NEKHBET": {"_x": 9,"_y": 17,"_directionX": 0,"_directionY": -1},
                        "NEMTY": {"_x": 21,"_y": 18,"_directionX": -1,"_directionY": 0},
                        "NEPER": {"_x": 9,"_y": 6,"_directionX": 0,"_directionY": -1},
                        "NEPHTHYS": {"_x": 24,"_y": 24,"_directionX": -1,"_directionY": 0},
                        "NEPIT": {"_x": 20,"_y": 26,"_directionX": 1,"_directionY": 0},
                        "NU": {"_x": 10,"_y": 6,"_directionX": 1,"_directionY": 0},
                        "NUT": {"_x": 18,"_y": 16,"_directionX": 0,"_directionY": 1},
                        "OSIRIS": {"_x": 0,"_y": 1,"_directionX": 0,"_directionY": 1},
                        "PAKHET": {"_x": 28,"_y": 15,"_directionX": -1,"_directionY": 0},
                        "PTAH": {"_x": 13,"_y": 10,"_directionX": 0,"_directionY": -1},
                        "RA": {"_x": 10,"_y": 23,"_directionX": 0,"_directionY": 1},
                        "RENENUTET": {"_x": 14,"_y": 20,"_directionX": 0,"_directionY": -1},
                        "SATET": {"_x": 18,"_y": 4,"_directionX": 0,"_directionY": 1},
                        "SEKHMET": {"_x": 20,"_y": 15,"_directionX": 0,"_directionY": -1},
                        "SET": {"_x": 2,"_y": 8,"_directionX": 1,"_directionY": 0},
                        "SHU": {"_x": 17,"_y": 24,"_directionX": 0,"_directionY": 1},
                        "SOBEK": {"_x": 0,"_y": 6,"_directionX": 1,"_directionY": 0},
                        "SOPDU": {"_x": 11,"_y": 21,"_directionX": 1,"_directionY": 0},
                        "TATENEN": {"_x": 11,"_y": 7,"_directionX": -1,"_directionY": 0},
                        "TEFNUT": {"_x": 1,"_y": 27,"_directionX": 1,"_directionY": 0},
                        "THOTH": {"_x": 5,"_y": 14,"_directionX": 1,"_directionY": 0},
                        "WADJET": {"_x": 12,"_y": 10,"_directionX": -1,"_directionY": 0},
                        "WADJWER": {"_x": 9,"_y": 24,"_directionX": 1,"_directionY": 0},
                        "WOSRET": {"_x": 13,"_y": 22,"_directionX": 1,"_directionY": 0}
                    }
                }
            },
            Roman: {
                "_map": [
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"A",null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"V","E","N","U","S",null,null,null,null],
                    [null,"S",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"I",null,null,null,null,null,null],
                    [null,"U",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"P",null,null,null,null,null,null]
                    [null,"N",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"C",null,null,null,null,null,"R",null,null,null,null,null,null],
                    [null,"U",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"A",null,null,null,null,null,"E",null,null,null,null,null,null],
                    [null,"A","R","O","L","F",null,null,null,null,null,null,null,null,null,null,null,"E",null,null,null,null,null,"S",null,null,null,null,null,null],
                    [null,"F",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"L",null,null,null,null,null,"O",null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"S","U","H","C","C","A","B","R",null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"N",null,"S",null,null,null,null,null,"P",null,null,null,null,null,null],
                    [null,null,null,null,"N","A","C","L","U","V","S",null,null,null,null,"R",null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,"U",null,null,null,null,"U",null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,"N",null,null,null,null,"T",null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,"C",null,null,null,null,null,null,null,"A",null,null,null,null,"A",null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,"S","E","P","S",null,null,null,null,null,"J",null,null,null,null,"S",null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    ["F","O","R","T","U","N","A",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"C",null],
                    [null,null,"E","E",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"Y",null],
                    [null,null,"S","R","A","M",null,null,null,null,null,null,null,null,null,"J",null,null,null,null,null,null,null,null,null,null,null,null,"B",null],
                    [null,null,"A","R",null,"A","N","A","I","D",null,null,null,null,null,"U",null,null,null,null,null,null,null,null,null,null,null,null,"E",null],
                    [null,null,"T","A",null,null,null,"R",null,null,null,null,null,"X","Y","N",null,null,null,null,null,null,null,null,null,null,null,null,"L",null],
                    [null,"O","I",null,null,null,null,"O",null,null,null,null,null,null,null,"O",null,null,null,null,"Y",null,null,"J","U","P","I","T","E","R"],
                    [null,"L","R",null,null,null,null,"R",null,null,null,null,null,null,null,null,null,null,null,null,"R",null,null,null,null,null,null,null,null,null],
                    [null,"L","E",null,null,null,"C","U","P","I","D",null,null,null,null,null,null,null,null,null,"U",null,null,null,null,null,null,null,null,null],
                    [null,"O","V",null,null,null,null,"A",null,null,null,null,null,null,null,null,null,null,null,null,"C",null,"N","E","P","T","U","N","E",null],
                    [null,"P",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"R",null,null,null,null,null,null,null,null,null],
                    [null,"A",null,null,null,null,null,null,null,null,null,"P","L","U","T","O",null,"M","I","N","E","R","V","A","N","O","M","O","P",null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"M",null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,"B","E","L","L","O","N","A",null,null,null,null,null,null,null,null,null,null,null,null,null,null,"V","E","S","T","A",null,null]
                ],
                "_words": {
                    "h": {
                        "APOLLO": {"_x": 1,"_y": 25,"_directionX": 0,"_directionY": -1},
                        "AURORA": {"_x": 7,"_y": 23,"_directionX": 0,"_directionY": -1},
                        "BACCHUS": {"_x": 22,"_y": 8,"_directionX": -1,"_directionY": 0},
                        "BELLONA": {"_x": 2,"_y": 29,"_directionX": 1,"_directionY": 0},
                        "CAELUS": {"_x": 17,"_y": 4,"_directionX": 0,"_directionY": 1},
                        "CERES": {"_x": 2,"_y": 13,"_directionX": 0,"_directionY": 1},
                        "CUPID": {"_x": 6,"_y": 22,"_directionX": 1,"_directionY": 0},
                        "CYBELE": {"_x": 28,"_y": 15,"_directionX": 0,"_directionY": 1},
                        "DIANA": {"_x": 9,"_y": 18,"_directionX": -1,"_directionY": 0},
                        "FAUNUS": {"_x": 1,"_y": 7,"_directionX": 0,"_directionY": -1},
                        "FLORA": {"_x": 5,"_y": 6,"_directionX": -1,"_directionY": 0},
                        "FORTUNA": {"_x": 0,"_y": 15,"_directionX": 1,"_directionY": 0},
                        "JANUS": {"_x": 10,"_y": 14,"_directionX": 0,"_directionY": -1},
                        "JUNO": {"_x": 15,"_y": 17,"_directionX": 0,"_directionY": 1},
                        "JUPITER": {"_x": 23,"_y": 20,"_directionX": 1,"_directionY": 0},
                        "MARS": {"_x": 5,"_y": 17,"_directionX": -1,"_directionY": 0},
                        "MERCURY": {"_x": 20,"_y": 26,"_directionX": 0,"_directionY": -1},
                        "MINERVA": {"_x": 17,"_y": 25,"_directionX": 1,"_directionY": 0},
                        "NEPTUNE": {"_x": 22,"_y": 23,"_directionX": 1,"_directionY": 0},
                        "NYX": {"_x": 15,"_y": 19,"_directionX": -1,"_directionY": 0},
                        "PLUTO": {"_x": 11,"_y": 25,"_directionX": 1,"_directionY": 0},
                        "PROSERPINA": {"_x": 23,"_y": 9,"_directionX": 0,"_directionY": -1},
                        "POMONA": {"_x": 28,"_y": 25,"_directionX": -1,"_directionY": 0},
                        "SATURN": {"_x": 15,"_y": 14,"_directionX": 0,"_directionY": -1},
                        "SPES": {"_x": 4,"_y": 14,"_directionX": -1,"_directionY": 0},
                        "TERRA": {"_x": 3,"_y": 15,"_directionX": 0,"_directionY": 1},
                        "VENUS": {"_x": 21,"_y": 1,"_directionX": 1,"_directionY": 0},
                        "VERITAS": {"_x": 2,"_y": 23,"_directionX": 0,"_directionY": -1},
                        "VESTA": {"_x": 23,"_y": 29,"_directionX": 1,"_directionY": 0},
                        "VULCAN": {"_x": 9,"_y": 10,"_directionX": -1,"_directionY": 0}
                    }
                }
            },
            Greek: {
                "_map": [
                    [null,"A","S","T","R","A","E","U","S","U","B","E","R","E",null,null,null,"T","A","R","T","A","R","U","S",null,null,null,"S",null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,"S","I","T","E","M","D","E","M","E","T","E","R",null,null,null,null,"E",null],
                    [null,null,"S","U","E","O","C","S","U","E","H","T","E","M","O","R","P",null,null,null,null,null,null,null,null,null,"H",null,"S",null],
                    [null,null,null,null,null,null,null,null,null,null,"M",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"Y",null,"R",null],
                    [null,null,null,null,null,null,"A",null,null,null,"N",null,"X","Y","T","S",null,"M","E","N","O","E","T","I","U","S","P",null,"E",null],
                    [null,null,null,null,null,null,"C",null,null,null,"E",null,"E","K","N","A","N","A","R","T","E","M","I","S","T",null,"N",null,"P",null],
                    [null,null,null,null,null,null,"H",null,null,null,"M",null,null,null,null,null,null,"H","E","R","M","E","S",null,"E","S","O","A","H","C"],
                    [null,null,null,null,null,null,"L",null,null,null,"O",null,null,null,"S",null,null,null,null,null,"E","R","O","S","T",null,"S",null,null,null],
                    [null,null,null,null,"A",null,"Y",null,null,null,"S",null,null,null,"U",null,null,null,"S","O","T","A","N","A","H","T",null,null,null,null],
                    [null,null,null,null,"E",null,"S",null,"P",null,"Y",null,null,null,"N",null,"S",null,null,null,null,null,null,null,"Y",null,null,null,"S",null],
                    [null,null,null,null,"T",null,null,null,"H",null,"N",null,null,null,"A",null,"E",null,null,null,null,null,null,null,"S",null,null,null,"U",null],
                    [null,null,null,null,"H",null,null,null,"A",null,"E",null,null,null,"E",null,"R",null,null,null,null,null,null,null,null,null,"S","U","E","Z"],
                    [null,null,"A",null,"E",null,null,null,"N","H","E","R","A",null,"C",null,"A",null,"H","E","S","T","I","A","R","E","M","E","H",null],
                    [null,null,"P",null,"R",null,null,null,"E",null,"S",null,null,"P","O","N","T","U","S","N","O","I","A",null,null,null,null,null,"T",null],
                    ["S",null,"O",null,null,null,null,null,"S",null,"E",null,null,null,null,null,null,null,null,null,"A","P","H","R","O","D","I","T","E",null],
                    ["Y",null,"L",null,null,null,null,null,null,null,"L",null,null,null,null,null,null,null,"S",null,null,"S","E","D","A","H",null,null,"M",null],
                    ["C",null,"L",null,null,null,null,"S",null,null,"E",null,null,null,null,null,null,"S","U","T","S","E","A","H","P","E","H",null,"I",null],
                    ["E",null,"O",null,null,null,null,"O",null,"C","N",null,null,null,null,null,null,null,"T",null,"S","O","I","L","E","H",null,null,"P",null],
                    ["U",null,null,null,null,null,null,"T",null,"H","E",null,null,null,null,null,null,null,"E",null,"E","O","S",null,null,null,null,null,"E",null],
                    ["S","C",null,null,null,null,null,"N",null,"R",null,null,null,null,null,null,null,null,"P",null,null,null,null,null,null,null,null,null,null,null],
                    [null,"R",null,null,null,null,null,"A",null,"O",null,null,null,null,null,null,null,null,"A","C","R","O","N","U","S",null,null,null,null,null],
                    [null,"I",null,null,"O",null,null,"L",null,"N","Y","X",null,null,null,null,null,null,"I",null,"A","S","T","E","R","I","A","I","A","G"],
                    [null,"U",null,null,"U",null,null,"E",null,"O",null,null,null,null,null,null,null,null,"N",null,null,null,"U","R","A","N","U","S",null,null],
                    [null,"S",null,null,"R",null,null,"L",null,"S",null,null,null,null,null,null,null,"A","E","H","R",null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,"E",null,null,null,null,null,null,null,null,null,null,null,null,null,"M",null,null,null,null,null,null,null,null,null,"L",null],
                    [null,null,null,null,"A",null,null,null,"D","I","O","N","Y","S","U","S",null,"N","E","S","O","I",null,null,"D","I","O","N","E",null],
                    ["A","T","H","E","N","A",null,null,null,null,null,null,null,null,null,null,null,null,"S",null,null,null,null,null,null,null,null,null,"T",null],
                    [null,null,null,"P","A","L","L","A","S",null,null,null,null,null,null,null,null,null,"I",null,null,null,null,null,null,null,null,null,"O",null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"S",null,null,null,null,"S","A","L","T","A",null,null],
                    [null,null,null,null,null,null,null,null,"A","N","Y","T","O","S",null,"P","H","O","E","B","E",null,null,null,null,null,null,null,null,null]
                ],
                "_words": {
                    "h": {
                        "ACHLYS": {"_x": 6,"_y": 4,"_directionX": 0,"_directionY": 1},
                        "AETHER": {"_x": 4,"_y": 8,"_directionX": 0,"_directionY": 1},
                        "AION": {"_x": 22,"_y": 13,"_directionX": -1,"_directionY": 0},
                        "ANANKE": {"_x": 17,"_y": 5,"_directionX": -1,"_directionY": 0},
                        "ANYTOS": {"_x": 8,"_y": 29,"_directionX": 1,"_directionY": 0},
                        "APHRODITE": {"_x": 20,"_y": 14,"_directionX": 1,"_directionY": 0},
                        "APOLLO": {"_x": 2,"_y": 12,"_directionX": 0,"_directionY": 1},
                        "ARES": {"_x": 16,"_y": 12,"_directionX": 0,"_directionY": -1},
                        "ARTEMIS": {"_x": 17,"_y": 5,"_directionX": 1,"_directionY": 0},
                        "ASTERIA": {"_x": 20,"_y": 21,"_directionX": 1,"_directionY": 0},
                        "ASTRAEUS": {"_x": 1,"_y": 0,"_directionX": 1,"_directionY": 0},
                        "ATHENA": {"_x": 0,"_y": 26,"_directionX": 1,"_directionY": 0},
                        "ATLAS": {"_x": 27,"_y": 28,"_directionX": -1,"_directionY": 0},
                        "CHAOS": {"_x": 29,"_y": 6,"_directionX": -1,"_directionY": 0},
                        "CHRONOS": {"_x": 9,"_y": 17,"_directionX": 0,"_directionY": 1},
                        "COEUS": {"_x": 6,"_y": 2,"_directionX": -1,"_directionY": 0},
                        "CRIUS": {"_x": 1,"_y": 19,"_directionX": 0,"_directionY": 1},
                        "CRONUS": {"_x": 19,"_y": 20,"_directionX": 1,"_directionY": 0},
                        "DEMETER": {"_x": 17,"_y": 1,"_directionX": 1,"_directionY": 0},
                        "DIONE": {"_x": 24,"_y": 25,"_directionX": 1,"_directionY": 0},
                        "DIONYSUS": {"_x": 8,"_y": 25,"_directionX": 1,"_directionY": 0},
                        "EOS": {"_x": 20,"_y": 18,"_directionX": 1,"_directionY": 0},
                        "EPIMETHEUS": {"_x": 28,"_y": 18,"_directionX": 0,"_directionY": -1},
                        "EREBUS": {"_x": 13,"_y": 0,"_directionX": -1,"_directionY": 0},
                        "EROS": {"_x": 20,"_y": 7,"_directionX": 1,"_directionY": 0},
                        "GAIA": {"_x": 29,"_y": 21,"_directionX": -1,"_directionY": 0},
                        "HADES": {"_x": 25,"_y": 15,"_directionX": -1,"_directionY": 0},
                        "HELIOS": {"_x": 25,"_y": 17,"_directionX": -1,"_directionY": 0},
                        "HEMERA": {"_x": 28,"_y": 12,"_directionX": -1,"_directionY": 0},
                        "HEPHAESTUS": {"_x": 26,"_y": 16,"_directionX": -1,"_directionY": 0},
                        "HERA": {"_x": 9,"_y": 12,"_directionX": 1,"_directionY": 0},
                        "HERMES": {"_x": 17,"_y": 6,"_directionX": 1,"_directionY": 0},
                        "HESTIA": {"_x": 18,"_y": 12,"_directionX": 1,"_directionY": 0},
                        "HYPNOS": {"_x": 26,"_y": 2,"_directionX": 0,"_directionY": 1},
                        "IAPETUS": {"_x": 18,"_y": 21,"_directionX": 0,"_directionY": -1},
                        "LELANTOS": {"_x": 7,"_y": 23,"_directionX": 0,"_directionY": -1},
                        "LETO": {"_x": 28,"_y": 24,"_directionX": 0,"_directionY": 1},
                        "MENOETIUS": {"_x": 17,"_y": 4,"_directionX": 1,"_directionY": 0},
                        "METIS": {"_x": 16,"_y": 1,"_directionX": -1,"_directionY": 0},
                        "MNEMOSYNE": {"_x": 10,"_y": 3,"_directionX": 0,"_directionY": 1},
                        "NEMESIS": {"_x": 18,"_y": 22,"_directionX": 0,"_directionY": 1},
                        "NESOI": {"_x": 17,"_y": 25,"_directionX": 1,"_directionY": 0},
                        "NYX": {"_x": 9,"_y": 21,"_directionX": 1,"_directionY": 0},
                        "OCEANUS": {"_x": 14,"_y": 13,"_directionX": 0,"_directionY": -1},
                        "OUREA": {"_x": 4,"_y": 21,"_directionX": 0,"_directionY": 1},
                        "PALLAS": {"_x": 3,"_y": 27,"_directionX": 1,"_directionY": 0},
                        "PERSES": {"_x": 28,"_y": 5,"_directionX": 0,"_directionY": -1},
                        "PHANES": {"_x": 8,"_y": 9,"_directionX": 0,"_directionY": 1},
                        "PHOEBE": {"_x": 15,"_y": 29,"_directionX": 1,"_directionY": 0},
                        "PONTUS": {"_x": 13,"_y": 13,"_directionX": 1,"_directionY": 0},
                        "PROMETHEUS": {"_x": 16,"_y": 2,"_directionX": -1,"_directionY": 0},
                        "RHEA": {"_x": 20,"_y": 23,"_directionX": -1,"_directionY": 0},
                        "SELENE": {"_x": 10,"_y": 13,"_directionX": 0,"_directionY": 1},
                        "STYX": {"_x": 15,"_y": 4,"_directionX": -1,"_directionY": 0},
                        "SYCEUS": {"_x": 0,"_y": 14,"_directionX": 0,"_directionY": 1},
                        "TARTARUS": {"_x": 17,"_y": 0,"_directionX": 1,"_directionY": 0},
                        "TETHYS": {"_x": 24,"_y": 5,"_directionX": 0,"_directionY": 1},
                        "THANATOS": {"_x": 25,"_y": 8,"_directionX": -1,"_directionY": 0},
                        "URANUS": {"_x": 22,"_y": 22,"_directionX": 1,"_directionY": 0},
                        "ZEUS": {"_x": 29,"_y": 11,"_directionX": -1,"_directionY": 0}
                    }
                }
            },
            "Design Patterns": {
                "_map": [
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,"B","R","I","D","G","E",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"F","L","Y","W","E","I","G","H","T",null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,"Y",null,null,null,null,null,null,null,null,null,null,null,null,null,"I",null,null,null,null,null],
                    [null,null,null,null,null,"M",null,null,null,null,"R",null,"E",null,null,null,null,"Y",null,null,"S",null,null,null,"T",null,null,null,null,null],
                    [null,null,null,null,null,"E",null,null,null,null,"O",null,"D",null,null,null,null,"T",null,null,"I",null,null,null,"E",null,null,null,null,"R"],
                    [null,null,null,null,null,"D",null,null,null,null,"T",null,"A",null,null,null,null,"I",null,null,"N",null,null,null,"R",null,null,null,null,"E"],
                    [null,null,null,null,null,"I",null,null,null,null,"C",null,"C",null,null,null,null,"L",null,null,"G",null,null,null,"A",null,null,null,null,"T"],
                    [null,null,null,"A","D","A","P","T","E","R","A",null,"A",null,null,null,null,"I",null,null,"L",null,null,null,"T",null,null,null,null,"E"],
                    [null,null,null,null,null,"T",null,null,null,null,"F",null,"F",null,null,null,null,"B",null,null,"E",null,null,null,"O",null,null,null,null,"R"],
                    [null,"F","A","C","T","O","R","Y","M","E","T","H","O","D",null,null,null,"I",null,null,"T",null,null,null,"R",null,null,null,null,"P"],
                    [null,null,null,null,"Y","R",null,null,null,null,"C",null,null,null,null,null,null,"S",null,null,"O",null,null,null,null,null,null,null,null,"R"],
                    [null,null,null,null,"G",null,null,null,null,null,"A",null,null,null,null,null,null,"N",null,null,"N",null,null,null,null,null,null,null,null,"E"],
                    [null,null,null,null,"E",null,null,null,null,null,"R",null,null,null,null,null,"R","O","T","A","R","O","C","E","D",null,null,null,null,"T"],
                    [null,null,null,null,"T",null,null,null,null,null,"T",null,null,null,null,null,null,"P",null,null,null,null,null,null,null,null,null,null,null,"N"],
                    [null,null,null,null,"A",null,null,null,null,null,"S",null,null,null,null,null,null,"S",null,null,null,null,null,null,null,null,null,null,null,"I"],
                    [null,null,null,null,"R",null,null,null,null,"E","B","O","B","S","E","R","V","E","R",null,null,null,null,null,null,null,null,null,null,null],
                    [null,"M",null,null,"T",null,null,null,null,"P","A",null,null,null,null,null,null,"R",null,"C","O","M","P","O","S","I","T","E",null,null],
                    [null,"E",null,null,"S",null,null,null,null,"Y",null,null,null,null,null,null,null,"F",null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,"M",null,null,null,null,null,null,null,"T",null,null,null,null,null,null,null,"O",null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,"E",null,null,null,null,null,null,null,"O",null,null,null,null,null,null,null,"N",null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,"N",null,null,"R",null,null,null,null,"T",null,null,null,null,null,null,null,"I",null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,"T",null,null,"E","T","A","T","S","O",null,null,null,null,null,null,null,"A",null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,"O",null,null,"D",null,null,null,"P","R","O","X","Y",null,null,null,null,"H",null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,"L",null,null,null,null,"P",null,null,null,null,null,null,null,"C","O","M","M","A","N","D",null,null,null,null,null,null],
                    [null,null,null,null,"I",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,"U",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,"B",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
                ],
                "_words": {
                    "h": {
                        "ABSTRACTFACTORY": {"_x": 10,"_y": 18,"_directionX": 0,"_directionY": -1},
                        "ADAPTER": {"_x": 3,"_y": 9,"_directionX": 1,"_directionY": 0},
                        "BRIDGE": {"_x": 5,"_y": 1,"_directionX": 1,"_directionY": 0},
                        "BUILDER": {"_x": 4,"_y": 28,"_directionX": 0,"_directionY": -1},
                        "CHAINOFRESPONSIBILITY": {"_x": 17,"_y": 25,"_directionX": 0,"_directionY": -1},
                        "COMMAND": {"_x": 17,"_y": 25,"_directionX": 1,"_directionY": 0},
                        "COMPOSITE": {"_x": 19,"_y": 18,"_directionX": 1,"_directionY": 0},
                        "DECORATOR": {"_x": 24,"_y": 14,"_directionX": -1,"_directionY": 0},
                        "FACADE": {"_x": 12,"_y": 10,"_directionX": 0,"_directionY": -1},
                        "FACTORYMETHOD": {"_x": 1,"_y": 11,"_directionX": 1,"_directionY": 0},
                        "FLYWEIGHT": {"_x": 17,"_y": 2,"_directionX": 1,"_directionY": 0},
                        "INTERPRETER": {"_x": 29,"_y": 16,"_directionX": 0,"_directionY": -1},
                        "ITERATOR": {"_x": 24,"_y": 4,"_directionX": 0,"_directionY": 1},
                        "MEDIATOR": {"_x": 5,"_y": 5,"_directionX": 0,"_directionY": 1},
                        "MEMENTO": {"_x": 1,"_y": 18,"_directionX": 0,"_directionY": 1},
                        "OBSERVER": {"_x": 11,"_y": 17,"_directionX": 1,"_directionY": 0},
                        "PROTOTYPE": {"_x": 9,"_y": 25,"_directionX": 0,"_directionY": -1},
                        "PROXY": {"_x": 8,"_y": 24,"_directionX": 1,"_directionY": 0},
                        "SINGLETON": {"_x": 20,"_y": 5,"_directionX": 0,"_directionY": 1},
                        "STATE": {"_x": 8,"_y": 23,"_directionX": -1,"_directionY": 0},
                        "STRATEGY": {"_x": 4,"_y": 19,"_directionX": 0,"_directionY": -1}
                    }
                }
            }
        },
        GeneratePuzzle: function (wordset) {
            if (!wordset) {
                wordset = {};
                for (s in Game.WordSets) {
                    wordset[s] = Game.GeneratePuzzle(s);
                }
                return wordset;
            } else if (Array.isArray(wordset)) {
                return com.roller.Crossword.generateBoardFor(wordset, 25, 25)
            } else {
                return Game.GeneratePuzzle(Game.WordSets[wordset]);
            }
        },
        Save: function () {
            var data = btoa(JSON.stringify(Game.Boards));
            Game.State.save("boards", data, "");
        },
        Load: function () {
            window.addEventListener('resize', Game.Resize);
            Game.State.load("boards", "Games.Crossword.LoadI");
        },
        LoadI: function (result) {
            if (!!(result.Data)) {
                try {
                    Game.Boards = JSON.parse(atob(result.Data));
                } catch (ex) {
                    ex.toString(); // TODO - Remove
                }
                Game.DisplaySavedGames();
            }
        },
        ReturnToOptions: function () {
            Game.CurrentBoard = null;
            Game.Duration = null;
            Game.StartTime = null;
            Game.GameDiv.style.opacity = 0;
            Game.SuccessDiv.style.opacity = 0;
            Game.FailedDiv.style.zIndex = -1;
            Game.FailedDiv.style.opacity = 0;
            Game.SuccessDiv.style.zIndex = -1;                    
            Game.DisplaySavedGames();
            var selector = Game.ControlsDiv.getBoundingClientRect();
            Game.ControlsDiv.style.opacity = 0;
            Game.ControlsDiv.style.transform = "translate3d(-" + selector.width + "px,-" + selector.height + "px,0px)"
            Game.OptionsDiv.style.opacity = 1;
            Game.OptionsDiv.style.transform = "translate3d(0px,0px,0px)"
        },
        DisplaySavedGames: function () {
            Game.SavedGamesTable.innerHTML = "";
            for (var i in Game.Boards) {
                var board = Game.Boards[i];
                var tr = document.createElement("tr");
                Game.SavedGamesTable.appendChild(tr);
                var td = document.createElement("td");
                tr.appendChild(td);
                var button = document.createElement("input");
                td.appendChild(button);
                button.type = "button";
                button.value = i;
                (function (i) {
                    button.onclick = function () {
                        Game.Start(null,Game.Boards[i]);
                    };
                })(i);
            }
        },
        Failed: function () {
            Game.FailedDiv.style.opacity = 1;
            Game.FailedDiv.style.zIndex = 2;
        },
        Success: function () {
            Game.StatIncrement("Success", 1);
            //Game.StatIncrement("Success - " + Game.CurrentBoard.SelectedPuzzle, 1);
            Game.StatIncrement("Success Time", Game.CurrentBoard.Duration);
            Game.StatIncrement("Success Time - " + Game.CurrentBoard.SelectedPuzzle, Game.CurrentBoard.Duration);
            Game.SuccessDiv.style.opacity = 1;
            Game.SuccessDiv.style.zIndex = 2;
            for (var key in Game.Boards) {
                var value = Game.Boards[key];
                if (value === Game.CurrentBoard) {
                    delete Game.Boards[key];
                    break;
                }
            }
        },
        Update: function (needed, wrong, duplicates, duplicateRows, duplicateColumns, emptyRows, emptyColumns, inUseRows, inUseColumns) {
    
        },                
        CheckFinished: function () {
            var board = Game.CurrentBoard;
            var map = board._map;
            var words = board._words.h;
            var needed = 0;
            var complete = { };
            var completeCount = 0;
            var inProgress = { };

            for (var word in words) {
                var info = words[word];
                for (var c = 0; c < word.length; c++) {
                    var i = (c * info._directionX + info._x);
                    var j = (c * info._directionY + info._y);
                    if (map[j][i] == word[c]) {
                        var progress = inProgress[word];
                        if (!progress) {
                            progress = 0;
                        }
                        progress++;
                        inProgress[word] = progress;
                    }
                }
                needed++;
            }

            for (var word in inProgress) {
                if (inProgress[word] >= word.length) {
                    complete[word] = true;
                }
            }

            var completeCount = 0;
            for (var j = 0; j < Game.WordsField.height(); j++) {
                for (var i = 0; i < Game.WordsField.width(); i++) {
                    var l = Game.WordsField.get(i, j);
                    if (!!(l.value())) {
                        if (!!complete[l.value()]) {
                            l.attribute("selected", completeCount);
                            completeCount++;
                        }
                    }
                    l.doneWith();
                }
            }

            Game.WordsView.update();
    
            if (completeCount >= needed && wrong <= 0) {
                Game.Success();
            } else {
                //Game.Update(needed, wrong, duplicates, duplicateRows, duplicateColumns, emptyRows, emptyColumns, inUseRows, inUseColumns);
            }
        },
        KeyPress: function (e) {
            if (Game.GameDiv.style.opacity == 1 && Game.SelectedLocation.x >= 0 && Game.SelectedLocation.y >= 0 && Game.CurrentBoard._map[Game.SelectedLocation.y][Game.SelectedLocation.x] != null) {
                var k = e.key.toUpperCase();
                switch (k) {
                    case "A":
                    case "B":
                    case "C":
                    case "D":
                    case "E":
                    case "F":
                    case "G":
                    case "H":
                    case "I":
                    case "J":
                    case "K":
                    case "L":
                    case "M":
                    case "N":
                    case "O":
                    case "P":
                    case "Q":
                    case "R":
                    case "S":
                    case "T":
                    case "U":
                    case "V":
                    case "W":
                    case "X":
                    case "Y":
                    case "Z":
                        {
                            Game.CurrentBoard._map[Game.SelectedLocation.y][Game.SelectedLocation.x] = k;
                            Game.BoardField.refresh(function () {
                                Game.BoardView.update();
                            });                
                            Game.CheckFinished();                
                        }
                }
            }
        },
        SelectBox: function (l) {
            if (!l) {
                return;
            } else {
                var i = l.getX();
                var j = l.getY();
                Game.SelectedLocation.x = i;
                Game.SelectedLocation.y = j;
                Game.BoardField.refresh(function () {
                    Game.BoardView.update();
                });                
                Game.CheckFinished();
            }
        },
        UpdateTimer: function () {
            if (Game.StartTime != null) {
                var CurrentTime = new Date();
                var duration = CurrentTime - Game.StartTime + (Game.StartDuration != null ? Game.StartDuration : 0);
                Game.CurrentBoard.Duration = duration;
                var durationShow = Math.floor(duration / 1000);
                var minutes = Math.floor(durationShow / 60);
                var seconds = durationShow % 60;
                Game.TimerDiv.innerText = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
                Game.Save();
            }
        },
        StatIncrementI: function (result) {
            var limit = 1000000000000;
            var name = Game.StatIncrementCalls.shift();
            var amount = Game.StatIncrementCalls.shift();
            value = result.Data;
            if (value >= limit) {
                value = limit;
            } else {
                value += amount;
                if (value >= limit) {
                    value = limit;
                }
            }
            Game.State.save(name, value, "");
    
            switch (name) {
                case "Select Value":
                    break;
                case "Started":
                    Game.State.incrementAchievement("Started a Puzzle", 1, "");
                    break;
                case "Success":
                    Game.State.incrementAchievement("Completed a Puzzle", 1, "");
                    Game.State.incrementAchievement("Completed 10 Puzzles", 1, "");
                    Game.State.incrementAchievement("Completed 25 Puzzles", 1, "");
                    break;
                case "Success - Easy":
                    Game.State.incrementAchievement("Completed an Easy Puzzle", 1, "");
                    break;
                case "Success - Medium":
                    Game.State.incrementAchievement("Completed a Medium Puzzle", 1, "");
                    break;
                case "Success - Hard":
                    Game.State.incrementAchievement("Completed a Hard Puzzle", 1, "");
                    break;
                case "Success - Very Hard":
                    Game.State.incrementAchievement("Completed a Very Hard Puzzle", 1, "");
                    break;                                                                                    
            }
        },
        StatIncrement: function (name, amount) {
            Game.StatIncrementCalls.push(name);
            Game.StatIncrementCalls.push(amount);
            Game.State.load(name, "Games.Crossword.StatIncrementI");
        },
        Init: function () {
            Game.State = com.field.util.StateAbstract.getState();
            Game.State.signin();
            Game.ControlsDiv = document.getElementById("Controls");
            Game.SavedGamesDiv = document.getElementById("SavedGames");
            Game.SavedGamesTable = document.getElementById("SavedGamesTable");
            Game.TimerDiv = document.getElementById("Timer");
            Game.OptionsDiv = document.getElementById("Options");
            Game.BoardDiv = document.getElementById("Board");
            Game.GameDiv = document.getElementById("Game");
            Game.FailedDiv = document.getElementById("Failed");
            Game.SuccessDiv = document.getElementById("Success");
            Game.WordsDiv = document.getElementById("Words");
            Game.BoardField = com.field.Convert.array2DToFieldNoIndexes(
                com.field.Convert.array2DToFieldNoIndexesOptions()
                .value([])
            );
            Game.WordsField = com.field.Convert.array2DToFieldNoIndexes(
                com.field.Convert.array2DToFieldNoIndexesOptions()
                .value([])
            );
            Game.BoardView = com.field.views.FieldView.create(
                com.field.views.FieldView.options()
                .field(Game.BoardField)
                .tileWidth(25)
                .tileHeight(25)
                .tileBuffer(0)
                .parent(Game.BoardDiv)
                .show(true)
            );
            Game.WordsView = com.field.views.FieldView.create(
                com.field.views.FieldView.options()
                .field(Game.WordsField)
                .tileWidth(3)
                .tileHeight(20)
                .tileBuffer(0)
                .tilesAreSquares(false)
                .parent(Game.WordsDiv)
                .show(true)
            );
            var tTable = document.getElementsByTagName("table")[1].children[0];
            var endRow = tTable.children[1];
            var puzzles = [];
            for (puzzle in Game.Puzzles) {
                puzzles.push(puzzle);
            }
            puzzles.sort();
            for (puzzle in puzzles) {
                puzzle = puzzles[puzzle];
                var b = document.createElement("input");
                b.type = "button";
                b.value = puzzle;
                b.onclick = function () { Game.Start(this.value); };
                var td = document.createElement("td");
                td.appendChild(b);
                var tr = document.createElement("tr");
                tr.appendChild(td);
                tTable.insertBefore(tr, endRow);
            }
            com.field.Events.locationSelect().addEventListener(function (e) {
                var field = e.field();
                if (field.equals(Game.BoardField)) {
                    Game.SelectBox(e.location());
                }
            });
    
            for (const name in Game.Plugins) {
                try {
                    var plugin = Game.Plugins[name];
                    plugin.Init();
                } catch (ex) {
                    ex.toString();
                }
            }
    
            setInterval(Game.UpdateTimer, 100);
            document.onkeypress = Game.KeyPress;
            Game.Load();
            Game.State.load("theme", "Games.Crossword.InitI");
        },
        InitI: function (result) {
            var theme;
            try {
                theme = result.Data;
            }
            catch (ex) {}
            
            if (!theme) {
                theme = Game.Themes[0];
            }
            try {
                document.body.classList.add(theme);
            } catch (ex) {
                document.body.classList.add(Game.Themes[0]);
            }
            
            Game.StatIncrement("Init", 1);
        },
        Start: function (sPuzzle, CurrentBoard) {
            Game.StatIncrement("Started", 1);
            if (sPuzzle)
            {
                var oPuzzle = Game.Puzzles[sPuzzle];
                Game.StatIncrement("New Game", 1);
                CurrentBoard = { };
                CurrentBoard._answer = oPuzzle._map;
                CurrentBoard._map = new Array();
                CurrentBoard._words = oPuzzle._words;
                for (var row in oPuzzle._map) {
                    row = oPuzzle._map[row];
                    var target = new Array(row.length);
                    CurrentBoard._map.push(target);
                    for (var i in row) {
                        if (row[i] != null) {
                            target[i] = " ";
                        }
                    }
                }
                CurrentBoard.SelectedPuzzle = sPuzzle;
                CurrentBoard.WordsToSelect = 0;
                for (var word in oPuzzle._words._h) {
                    CurrentBoard.WordsToSelect++;
                }
                Game.CurrentBoard = CurrentBoard;
                
                Game.StartTime = new Date();
                CurrentBoard.StartTime = Game.StartTime;
                function pad(s) {
                    s = "" + s;
                    switch (s.length) {
                        case 0:
                            return "00";
                        case 1:
                            return "0" + s;
                        default:
                            return s;
                    }
                }                        
                Game.Boards[
                    CurrentBoard.SelectedPuzzle + "-" + 
                    CurrentBoard.StartTime.getFullYear() + "-" + 
                    pad(CurrentBoard.StartTime.getMonth() + 1) + "-"  +
                    pad(CurrentBoard.StartTime.getDate()) + "-" +
                    pad(CurrentBoard.StartTime.getHours()) + "-" +
                    pad(CurrentBoard.StartTime.getMinutes()) + "-" + 
                    pad(CurrentBoard.StartTime.getSeconds())
                ] = CurrentBoard;
            } else if (!!CurrentBoard) {
                Game.StatIncrement("Load Game", 1);
                Game.StartTime = new Date();
                Game.CurrentBoard = CurrentBoard;
                Game.StartDuration = CurrentBoard.Duration;
            }
    
            Game.BoardField = com.field.Convert.array2DToFieldNoIndexes(
                com.field.Convert.array2DToFieldNoIndexesOptions()
                .value(CurrentBoard._map)
            );
            {
                var field = Game.BoardField;
                var j = 0;
                while (j < field.height()) {
                    var i = 0;
                    while (i < field.width()) {
                        var l = field.get(i, j);
                        if (l.value() != null) {
                            l.attribute("selected", "X");
                        }
                        l.doneWith();
                        i++;
                    }
                    j++;
                } 
            }

            var wordCollection = new Array();
            for (var word in CurrentBoard._words.h) {
                if (wordCollection.length <= 0 || wordCollection[wordCollection.length - 1].length >= 3) {
                    wordCollection.push(new Array());
                }
                wordCollection[wordCollection.length - 1].push(word);
            }

            Game.WordsField = com.field.Convert.array2DToFieldNoIndexes(
                com.field.Convert.array2DToFieldNoIndexesOptions()
                .value(wordCollection)
            );
    
            Game.BoardView.field(Game.BoardField);
            Game.WordsView.field(Game.WordsField);
            Game.GameDiv.style.opacity = 1;
            var options = Game.OptionsDiv.getBoundingClientRect();
            Game.OptionsDiv.style.opacity = 0;
            Game.OptionsDiv.style.transform = "translate3d(-" + options.width + "px,-" + options.height + "px,0px)"
        },
        SwitchTheme: function (e) {
            Game.StatIncrement("Switch Theme", 1);
            var themes = Game.Themes;
            var currentTheme = -1;
            var nextTheme;
            var i = 0;
            while (i < themes.length) {
                if (e.className.indexOf(themes[i]) >= 0) {
                    currentTheme = i;
                    break;
                } else {
                    i++;
                }
            }
            if (currentTheme == -1) {
                currentTheme = 0;
            }
            nextTheme = (currentTheme + 1) % themes.length;
            e.classList.add(themes[nextTheme]);
            e.classList.remove(themes[currentTheme]);
            Game.State.save("theme", themes[nextTheme], "");
        },
        Resize: function (e) {
            Game.BoardDiv.innerHTML = "";
            Game.BoardView = com.field.views.FieldView.create(
                com.field.views.FieldView.options()
                .field(Game.BoardField)
                .tileWidth(25)
                .tileHeight(25)
                .tileBuffer(0)
                .parent(Game.BoardDiv)
                .show(true)
            );
            Game.WordsView = com.field.views.FieldView.create(
                com.field.views.FieldView.options()
                .field(Game.WordsField)
                .tileWidth(3)
                .tileHeight(5)
                .tileBuffer(0)
                .tilesAreSquares(false)
                .parent(Game.WordsDiv)
                .show(true)
            );
        },
        Themes: [ "dark_theme", "light_theme" ],
        Plugins: { },
    };
    if (!(globalThis.Games)) {
        globalThis.Games = { };
    } 
    globalThis.Games["Crossword"] = Game;
})();
