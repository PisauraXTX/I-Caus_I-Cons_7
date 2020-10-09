// This is a simple demo script, feel free to edit or delete it
// Find a tutorial and the list of availalbe elements at:
// https://www.pcibex.net/documentation/

PennController.ResetPrefix(null); // Shorten command names (keep this line here)
var showProgressBar = false; //Blendet den Fortschrittsbalken auf allen Folien aus

//PennController.DebugOff()
//Debugger ist ein Hilfswerkzeug, das beim Test moegliche Fehlerquellen
//im Skript identifiziert und Verbesserungsvorschlaege macht. 
//Im fertigen Experiment sollte das natuerlich ausgeschaltet sein. 

Sequence( "Einleitung", "Angaben", "Instruktionen" , "Exercise" , "Eigentlich", randomize("Experiment") , SendResults() , "Dank" );
//Legt die Reihenfolge fuer die einzelnen Sektionen des Experiments fest. 
//'randomize("Experiment")' randomisiert die Versuchsfolien fuer jeden Durchgang neu 

Header(// Anweisungen in Header werden am Anfang jeder einzelnen Folie durchgefuehrt
    newTimer(250) 
        .start()
        .wait()
        //250ms Pause zwischen jeder Folie
)
;
newTrial( "Einleitung" , //legt eine neue Experimentfolie mit dem Titel "Einleitung" an 
    newHtml("stage1", "stage1.html").print().log()//Zeigt die Datei "stage1.html" aus dem Ordner "Resources" als HTML an und zeichnet das auf. 
    ,
    newFunction( "Htmlclick", ()=>new Promise(r=>$("input[type=submit]").bind('click', e=>{
    e.preventDefault();
    e.stopPropagation();
    r();
    return false; 
    })) ) 
    //Die Funktion "Htmlclick" sorgt dafuer, dass die aktuelle Folie so lange angezeigt wird, bis auf einen Knopf vom Typ "submit" 
    //in der aktuellen Html-Datei geklickt wird. Sobald das passiert, geht es mit dem Experiment weiter. 
    .call() //ruft die Funktion Htmlclick auf. Sobald der Submit-Knopf "Ich will teilnehmen" gedrueckt wird, geht es weiter. 
    ,
    fullscreen() //Startet den Vollbild-Modus im Browser. Kompatiblitaet testen und Hinweis in stage1.html einfuegen! 
)
;
newTrial( "Angaben" , 
    newHtml("stage2", "stage2.html").print().log()  //Die Eingabe der demographischen Daten wird ueber stage2.html geregelt
                                                    //Eingegebene Daten werden aufgezeichnet
    ,
    newFunction( "Htmlclick", ()=>new Promise(r=>$("input[type=submit]").bind('click', e=>{
    e.preventDefault();
    e.stopPropagation();
    r();
    return false; 
    })) )
    .call()
    //Die Funktion muss aktuell jedes mal neu definiert werden. Der Befehl getFunction("Htmlclick").call() funktioniert nicht (?) 
)
;
newTrial( "Instruktionen" ,
    newHtml("stage3", "stage3.html").print().log()
    ,
    newFunction( "Htmlclick", ()=>new Promise(r=>$("input[type=submit]").bind('click', e=>{
    e.preventDefault();
    e.stopPropagation();
    r();
    return false; 
    })) )
    .call()
)
;
Template( "exercise.csv" , //Legt eine Vorlage fuer Uebungsfolien an
    row => newTrial( "Exercise" , //Zeigt nacheinander fuer jede Zeile von exercise.csv eine Folie an 
        newText("<h2>&Uuml;bung</h2>").print() //Zeigt Text im Format Heading 2 an. Umlaut per Html kodiert
        ,
        newText("exprompt", row.exprompt) //Zeigt Text aus der Tabellenzeile "exprompt" an 
        .print()
        ,
        newTextInput("Excontinuation", "")  //Zeigt ein Feld zur Eingabe von Text an 
        .print()                            //Variablenname: Excontinuation. Voreingabe leer
        .log()                              //Zeichnet die Eingabe auf
        ,
        newButton("Weiter")
            .print()
            .wait() //Zeigt Knopf mit Aufschrift "Weiter" an und wartet auf Klick
    )
    .log("Excontinuation")
)
;
newTrial( "Eigentlich" ,
    newHtml("stage5", "stage5.html").print().log()
    ,
    newFunction( "Htmlclick", ()=>new Promise(r=>$("input[type=submit]").bind('click', e=>{
    e.preventDefault();
    e.stopPropagation();
    r();
    return false; 
    })) )
    .call()
)
;

Template( "itemlist_1_1.csv" , //Aufbau parallel zu "exercise.csv"
    row => newTrial( "Experiment" ,
        newText("<h2>Experiment</h2>")
        .print()
        ,
        newText("prompt", row.prompt)
        .print()
        ,
        newTextInput("Continuation", "")
        .print()
        .log()
        ,
        newButton("Weiter")
            .print()
            .wait()
    )
    .log("id", row.id)
    .log("cond", row.cond)
    .log("np1", row.np1)
    .log("np2", row.np2)
    .log("coref", row.coref)
    .log("vclass", row.vclass)
    .log("verb", row.verb)
    .log("list", row.list)
    .log("prompt", row.prompt)
    //Zeichnet Werte aus den angegebenen Tabellenspalten fuer die aktuelle Tabellenzeile auf 
)
;
newTrial( "Dank" ,
    newHtml("stage7", "stage7.html").print()
    ,
    exitFullscreen() //Verlaesst Vollbild-Modus des Browsers
    ,
    newButton("void")
        .wait()
    //Trick: Eine Schaltflaeche wird erstellt, aber nie angezeigt (via print()-Befehl)
    //sodass unendlich lange auf den Knopfdruck gewartet wird. Das stellt sicher, dass 
    //VPn auf diesem Trial-Bildschirm bleiben. 
)
;