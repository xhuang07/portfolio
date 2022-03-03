var atmospheric;
var underground;
var mortality
var milestone;
let osc;
let playing = false;

let notes = [ 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70,71];

// let index = 0;
// let song = [
//   { note: 4, duration: 400, display: "D" },
//   { note: 0, duration: 200, display: "G" },
//   { note: 1, duration: 200, display: "A" },
//   { note: 2, duration: 200, display: "B" },
//   { note: 3, duration: 200, display: "C" },
//   { note: 4, duration: 400, display: "D" },
//   { note: 0, duration: 400, display: "G" },
//   { note: 0, duration: 400, display: "G" }
// ];
// let trigger = 0;
// let autoplay = false;



function preload() {
    mortality = loadTable('data/mortality.csv', 'csv', 'header')
    atmospheric = loadTable('data/atmospheric.csv', 'csv', 'header')
    underground = loadTable('data/underground.csv', 'csv', 'header')
    milestone = loadTable('data/milestone.csv', 'csv', 'header')
    a4 = loadSound("sound/a4.mp3");
    b4 = loadSound("sound/b4.mp3");
    c4 = loadSound("sound/c4.mp3");
    d4 = loadSound("sound/d4.mp3");
    e4 = loadSound("sound/e4.mp3");
    f4 = loadSound("sound/f4.mp3");
    g4 = loadSound("sound/g4.mp3");

}


let num = 5;
// let value = 0;

function setup() {
    createCanvas(4200, 1800)
    // background(100,145,141,57)
    background(227, 227, 227);
    // background(255);
    ellipseMode(CENTER);
    // osc = new p5.Oscillator();
    // osc.setType('sine');
    // osc.freq(300);
    // osc.amp(0);
    // osc.start();
    
    osc = new p5.Oscillator();
    osc.start();
    osc.amp(0);



    var table = atmospheric;
    var table2 = underground;
    var table3 = mortality;
    var table4 = milestone;
    print(table);
    print(table2);
    print(table3);
    print(table4);

    // Color Palette
    var pal = Brewer.sequential('Greys', 6, 0, 60);
    let x = random(width);
    let y = random(height);

    // stave
    stroke(0);//stroke color
    x1 = 100;
    y1 = 150;
    x2 = 3850;
    y2 = 150;
    d = 25;//distance between each line
    d2 = 200;//distance between first line and next first line of the stave
    d3 = 100;//distance between each stave
    for (let i = 0; i < num; i++) {
        line(x1, y1 + d * i, x2, y2 + d * i);
        line(x1, y1 + d * i + d2, x2, y2 + d * i + d2);
        line(x1, y1 + d * i + d2 * 2, x2, y2 + d * i + d2 * 2);
        line(x1, y1 + d * i + d2 * 3, x2, y2 + d * i + d2 * 3);
        line(x1, y1 + d * i + d2 * 4, x2, y2 + d * i + d2 * 4);
        line(x1, y1 + d * i + d2 * 5, x2, y2 + d * i + d2 * 5);
        line(x1, y1 + d * i + d2 * 6, x2, y2 + d * i + d2 * 6);
        line(x1, y1 + d * i + d2 * 7, x2, y2 + d * i + d2 * 7);
    }

    // stave vertical lines
    stroke(0);
    push();
    fill(0);
    rect(x1, y1, 5, d * 32 + d3 * 7)//very left bar
    line(x1 + 15, y1, x1 + 15, y1 + d * 32 + d3 * 7) //left vertical line
    line(x2, y1, x2, y1 + d * 32 + d3 * 7)// right vertical line
    pop();


    // Title & Legend Explainations
    textFont("Helvetica")
    textSize(30);
    noStroke();
    textStyle(BOLD);
    text('< Symphony >', x1 - 20, y1 - 90);
    // textStyle(ITALIC);
    // textSize(16);
    // text('from The Nuclear Tests', x1+200, y1-80);
    fill(0);
    ellipse( x1, y1-50, 13, 8);
    ellipse( x1+150, y1-65, 13, 8);
    push();
    stroke(0);
    strokeWeight(2);
    line( x1+6,y1-70, x1+6, y1-50)
    line( x1+156,y1-65, x1+156, y1-45)
    pop();
    push();
    stroke(50, 34, 255);
    strokeWeight(2);
    line(200 + 50 * 4, 0 + y1-60, 5 + 200 + 50 * 4, 10 + y1-60);
    line(200 - 5 + 50 * 4, 10 + y1-60, 200 + 50 * 4, 0 + y1-60);
    pop();


    // y-axis labels
    textFont("Helvetica")
    textSize(16);
    noStroke();
    textStyle(BOLD);

    textFont("Helvetica")
    textSize(12);
    fill(0);
    noStroke();
    ts = 5;//text size bleed
    text('Number of Nuclear Tests', x1 - 20, y1 - 15);
    text('Atmospheric', x1+15, y1-50);
    text('Underground', x1+165, y1-50);
    text('Milestone Explosions', x1+310, y1-50);
    // pop();
    for (let i = 0; i < 8; i++) {
        text('60', x1 - 20, y1 + ts + d2 * i);
        text('45', x1 - 20, y1 + ts + d + d2 * i);
        text('30', x1 - 20, y1 + ts + d * 2 + d2 * i);
        text('15', x1 - 20, y1 + ts + d * 3 + d2 * i);
        text('0', x1 - 15, y1 + ts + d * 4 + d2 * i);
    }


    //x-axis labels & Vertical Reference Line
    textSize(12);
    fill(0);
    noStroke();
    x = 150;
    y = 100;
    xs = 38;
    var rowHeight = 55;
    var colWidth = 50;
    textStyle(NORMAL);
    textAlign(BOLD);

    for (var r = 0; r < table.getRowCount(); r++) {
        var year = table.getString(r, 0);
        text(year, x + xs, y1 + d * 5+30);//+30 to put in middle
        // text(year, x+xs, y1+d*5+(d*4+d3)*1);
        text(year, x + xs, y1 + d * 5 + (d * 4 + d3) * 2+30);
        // text(year, x+xs, y1+d*5+(d*4+d3)*3);
        text(year, x + xs, y1 + d * 5 + (d * 4 + d3) * 4+30);
        // text(year, x+xs, y1+d*5+(d*4+d3)*5);
        text(year, x + xs, y1 + d * 5 + (d * 4 + d3) * 6+30);
        // text(year, x+xs, y1+d*5+(d*4+d3)*7);

        // line (x+50, y1, x+50,d*36+d3*7); //one line approach
        for (let i = 0; i < 8; i++) {
            push();
            stroke(172, 172, 172);
            drawingContext.setLineDash([1, 3]);
            line(x + 50, y1 + d2 * i, x + 50, y1 + d * 4 + d2 * i);
            pop();
        }
        x += colWidth
    }


    //legend
    fill(0);
    textFont("Helvetica")
    textSize(14);
    noStroke();
    textStyle(BOLD);
    textAlign(BOLD);
    text('USA', x1 + 17, y1 + 15);
    text('Russia', x1 + 17, y1 - 8 + d2);
    text('United Kingdom', x1 + 17, y1 - 8 + d2 * 2);
    text('France', x1 + 17, y1 - 8 + d2 * 3);
    text('China', x1 + 17, y1 - 8 + d2 * 4);
    text('India', x1 + 17, y1 - 8 + d2 * 5);
    text('Pakistan', x1 + 17, y1 - 8 + d2 * 6);
    text('North Korea', x1 + 17, y1 - 8 + d2 * 7);
    
    textSize(12);
    let s1 = '[1] 1945-07-16 Trinity: First fission device test, first plutonium implosion detonation';
    let s2 = '[2] 1945-08-06 Little Boy: First detonation of a uranium gun-type device, first use of a nuclear device in combat.';
    let s3 = '[3] 1945-08-09 Fat Man: Second and last use of a nuclear device in combat.';
    let s4 = '[4] 1949-08-29 RDS-1: First fission weapon test by the USSR';
    let s5 = '[5] 1952-10-03 Hurricane: First fission weapon test by the UK';
    let s6 = '[6] 1952-11-01 Ivy Mike: First cryogenic fusion fuel "staged" thermonuclear weapon, primarily a test device and not weaponized';
    let s7 = '[7] 1952-11-16 Ivy King: Largest pure-fission weapon ever tested';
    let s8 = '[8] 1953-08-12 Joe 4: First fusion weapon test by the USSR (not "staged")';
    let s9 = '[9] 1954-03-01 Castle Bravo: First dry fusion fuel "staged" thermonuclear weapon';
    let s10 = '[10] 1955-11-22 RDS-37: First "staged" thermonuclear weapon test by the USSR (deployable)';
    let s11 = '[11] 1957-05-31 Orange Herald: Largest boosted fission weapon ever tested';
    let s12 = '[12] 1957-11-08 Grapple X: First (successful) "staged" thermonuclear weapon test by the UK';
    
    text(s1, x2+50, y2, 200, 800); 
    text(s2, x2+50, y2+55, 200, 800);
    text(s3, x2+50, y2+55*2+10, 200, 800); 
    text(s4, x2+50, y2+55*3+10, 200, 800); 
    text(s5, x2+50, y2+55*4+10, 200, 800);
    text(s6, x2+50, y2+55*5+10, 200, 800); 
    text(s7, x2+50, y2+55*6+20, 200, 800); 
    text(s8, x2+50, y2+55*7+10, 200, 800);
    text(s9, x2+50, y2+55*8+10, 200, 800); 
    text(s10, x2+50, y2+55*9+10, 200, 800); 
    text(s11, x2+50, y2+55*10+10, 200, 800); 
    text(s12, x2+50, y2+55*11+10, 200, 800); 


    //Treaties Data
    push();
    stroke(50, 34, 255);
    // stroke(250, 107, 30)
    // stroke(0);

    strokeWeight(2);
    //1. 1961 ATS
    line(200 + 50 * 14, y1, 200 + 50 * 14, y1+d*4);
    line(200 + 50 * 14, y1+d2*2, 200 + 50 * 14, y1+d2*2+d*4);
    line(200 + 50 * 14, y1+d2*3, 200 + 50 * 14, y1+d2*3+d*4);
    //2. 1962 PTBT
    line(200 + 50 * 17, y1, 200 + 50 * 17, y1+d*4);
    line(200 + 50 * 17, y1+d2, 200 + 50 * 17, y1+d2+d*4);
    line(200 + 50 * 17, y1+d2*2, 200 + 50 * 17, y1+d2*2+d*4);
    line(200 + 50 * 17, y1+d2*5, 200 + 50 * 17, y1+d2*5+d*4);
    //3. 1967 Outer Space
    line(200 + 50 * 22, y1, 200 + 50 * 22, y1+d*4);
    line(200 + 50 * 22, y1+d2, 200 + 50 * 22, y1+d2+d*4);
    line(200 + 50 * 22, y1+d2*2, 200 + 50 * 22, y1+d2*2+d*4);
    line(200 + 50 * 22, y1+d2*3, 200 + 50 * 22, y1+d2*3+d*4);
    line(200 + 50 * 22, y1+d2*5, 200 + 50 * 22, y1+d2*5+d*4);
    line(200 + 50 * 22, y1+d2*6, 200 + 50 * 22, y1+d2*6+d*4);
    //4. 1970 Non-proliferation
    line(200 + 50 * 25, y1, 200 + 50 * 25, y1+d*4);
    line(200 + 50 * 25, y1+d2, 200 + 50 * 25, y1+d2+d*4);
    line(200 + 50 * 25, y1+d2*2, 200 + 50 * 25, y1+d2*2+d*4);
    line(200 + 50 * 25, y1+d2*3, 200 + 50 * 25, y1+d2*3+d*4);
    line(200 + 50 * 25, y1+d2*4, 200 + 50 * 25, y1+d2*4+d*4);
    //5. 1971 Seabed
    line(200 + 50 * 26, y1, 200 + 50 * 26, y1+d*4);
    line(200 + 50 * 26, y1+d2, 200 + 50 * 26, y1+d2+d*4);
    line(200 + 50 * 26, y1+d2*2, 200 + 50 * 26, y1+d2*2+d*4);
    line(200 + 50 * 26, y1+d2*4, 200 + 50 * 26, y1+d2*4+d*4);
    line(200 + 50 * 26, y1+d2*5, 200 + 50 * 26, y1+d2*5+d*4);
    //6. 1972 SALTI
    line(200 + 50 * 27, y1, 200 + 50 * 27, y1+d*4);
    line(200 + 50 * 27, y1+d2, 200 + 50 * 27, y1+d2+d*4);
    //7. 1972 ABM Treaty
    line(200 + 50 * 27+25, y1, 200 + 50 * 27+25, y1+d*4);
    line(200 + 50 * 27+25, y1+d2, 200 + 50 * 27+25, y1+d2+d*4);
    //8. 1973 Agreement on the Prevention of Nuclear War
    line(200 + 50 * 28, y1, 200 + 50 * 28, y1+d*4);
    line(200 + 50 * 28, y1+d2, 200 + 50 * 28, y1+d2+d*4);
    //9 1974 Threshold Test Ban Treaty
    line(200 + 50 * 29, y1, 200 + 50 * 29, y1+d*4);
    line(200 + 50 * 29, y1+d2, 200 + 50 * 29, y1+d2+d*4);
    //10. 1976 Peaceful Nuclear Explosions Treaty
    line(200 + 50 * 31, y1, 200 + 50 * 31, y1+d*4);
    line(200 + 50 * 31, y1+d2, 200 + 50 * 31, y1+d2+d*4);  
    //11. 1979 Moon Treaty
    line(200 + 50 * 34, y1+d2*3, 200 + 50 * 34, y1+d2*3+d*4);
    line(200 + 50 * 34, y1+d2*5, 200 + 50 * 34, y1+d2*5+d*4);
    line(200 + 50 * 34, y1+d2*6, 200 + 50 * 34, y1+d2*6+d*4);
    //12. 1979 SALT II
    line(200 + 50 * 34+25, y1, 200 + 50 * 34+25, y1+d*4);
    line(200 + 50 * 34+25, y1+d2, 200 + 50 * 34+25, y1+d2+d*4);
    //13. 1990 Treaty on Conventional Armed Forces in Europe
    line(200 + 50 * 45, y1, 200 + 50 * 45, y1+d*4);
    line(200 + 50 * 45, y1+d2, 200 + 50 * 45, y1+d2+d*4);
    line(200 + 50 * 45, y1+d2*2, 200 + 50 * 45, y1+d2*2+d*4);
    line(200 + 50 * 45, y1+d2*3, 200 + 50 * 45, y1+d2*3+d*4);
    //14. 1991 Strategic Arms Reduction Treaty I (START I)
    line(200 + 50 * 46, y1, 200 + 50 * 46, y1+d*4);
    line(200 + 50 * 46, y1+d2, 200 + 50 * 46, y1+d2+d*4);
    //15. 2002 Treaty on Open Skies
    line(200 + 50 * 57, y1, 200 + 50 * 57, y1+d*4);
    line(200 + 50 * 57, y1+d2, 200 + 50 * 57, y1+d2+d*4);
    line(200 + 50 * 57, y1+d2*2, 200 + 50 * 57, y1+d2*2+d*4);
    line(200 + 50 * 57, y1+d2*3, 200 + 50 * 57, y1+d2*3+d*4);
    //16. 2002 June START II
    line(200 + 50 * 57+25, y1, 200 + 50 * 57+25, y1+d*4);
    line(200 + 50 * 57+25, y1+d2, 200 + 50 * 57+25, y1+d2+d*4);
    //17. 1997 Treaty of Bangkok
    line(200 + 50 * 52, y1, 200 + 50 * 52, y1+d*4);
    line(200 + 50 * 52, y1+d2, 200 + 50 * 52, y1+d2+d*4);
    line(200 + 50 * 52, y1+d2*2, 200 + 50 * 52, y1+d2*2+d*4);
    line(200 + 50 * 52, y1+d2*3, 200 + 50 * 52, y1+d2*3+d*4);
    line(200 + 50 * 52, y1+d2*4, 200 + 50 * 52, y1+d2*4+d*4);
    //18. 2003 Treaty of Moscow
    line(200 + 50 * 58, y1, 200 + 50 * 58, y1+d*4);
    line(200 + 50 * 58, y1+d2, 200 + 50 * 58, y1+d2+d*4);
    //19. 2011 START I treaty renewal
    line(200 + 50 * 66, y1, 200 + 50 * 66, y1+d*4);
    line(200 + 50 * 66, y1+d2, 200 + 50 * 66, y1+d2+d*4);

    
    



    pop();

    push();
    textFont("Helvetica")
    textSize(10);
    fill(0);
    noStroke();
    text('[1]', 200 + 50 * 14-6, y1-8);
    text('[1]', 200 + 50 * 14-6, y1-8+d2*2);
    text('[1]', 200 + 50 * 14-6, y1-8+d2*3);
    text('[2]', 200 + 50 * 17-6, y1-8);
    text('[2]', 200 + 50 * 17-6, y1-8+d2);
    text('[2]', 200 + 50 * 17-6, y1-8+d2*2);
    text('[2]', 200 + 50 * 17-6, y1-8+d2*5);
    text('[3]', 200 + 50 * 22-6, y1-8);
    text('[3]', 200 + 50 * 22-6, y1-8+d2);
    text('[3]', 200 + 50 * 22-6, y1-8+d2*2);
    text('[3]', 200 + 50 * 22-6, y1-8+d2*3);
    text('[3]', 200 + 50 * 22-6, y1-8+d2*5);
    text('[3]', 200 + 50 * 22-6, y1-8+d2*6);
    text('[4]', 200 + 50 * 25-6, y1-8);
    text('[4]', 200 + 50 * 25-6, y1-8+d2);
    text('[4]', 200 + 50 * 25-6, y1-8+d2*2);
    text('[4]', 200 + 50 * 25-6, y1-8+d2*3);
    text('[4]', 200 + 50 * 25-6, y1-8+d2*4);
    text('[5]', 200 + 50 * 26-6, y1-8);
    text('[5]', 200 + 50 * 26-6, y1-8+d2);
    text('[5]', 200 + 50 * 26-6, y1-8+d2*2);
    text('[5]', 200 + 50 * 26-6, y1-8+d2*4);
    text('[5]', 200 + 50 * 26-6, y1-8+d2*5);
    
    text('[6]', 200 + 50 * 27-6, y1-8);
    text('[6]', 200 + 50 * 27-6, y1-8+d2);
    
    text('[7]', 200 + 50 * 27-6+25, y1-8);
    text('[7]', 200 + 50 * 27-6+25, y1-8+d2);
    
    text('[8]', 200 + 50 * 28-6, y1-8);
    text('[8]', 200 + 50 * 28-6, y1-8+d2);
    
    text('[9]', 200 + 50 * 29-6, y1-8);
    text('[9]', 200 + 50 * 29-6, y1-8+d2);
    
    text('[10]', 200 + 50 * 31-6, y1-8);
    text('[10]', 200 + 50 * 31-6, y1-8+d2);
    
    text('[11]', 200 + 50 * 34-6, y1-8+d2*3);
    text('[11]', 200 + 50 * 34-6, y1-8+d2*5);
    text('[11]', 200 + 50 * 34-6, y1-8+d2*6);
    
    text('[12]', 200 + 50 * 34-6+25, y1-8);
    text('[12]', 200 + 50 * 34-6+25, y1-8+d2);
    
    text('[13]', 200 + 50 * 45-6, y1-8);
    text('[13]', 200 + 50 * 45-6, y1-8+d2);
    text('[13]', 200 + 50 * 45-6, y1-8+d2*2);
    text('[13]', 200 + 50 * 45-6, y1-8+d2*3);
    
    text('[14]', 200 + 50 * 46-6, y1-8);
    text('[14]', 200 + 50 * 46-6, y1-8+d2);
    
    text('[15]', 200 + 50 * 57-6, y1-8);
    text('[15]', 200 + 50 * 57-6, y1-8+d2);
    text('[15]', 200 + 50 * 57-6, y1-8+d2*2);
    text('[15]', 200 + 50 * 57-6, y1-8+d2*3);
    
    text('[16]', 200 + 50 * 57-6+25, y1-8);
    text('[16]', 200 + 50 * 57-6+25, y1-8+d2);
    
    text('[17]', 200 + 50 * 52-6, y1-8);
    text('[17]', 200 + 50 * 52-6, y1-8+d2);
    text('[17]', 200 + 50 * 52-6, y1-8+d2*2);
    text('[17]', 200 + 50 * 52-6, y1-8+d2*3);
    text('[17]', 200 + 50 * 52-6, y1-8+d2*4);
    
    text('[18]', 200 + 50 * 58-6, y1-8);
    text('[18]', 200 + 50 * 58-6, y1-8+d2);
    
    text('[19]', 200 + 50 * 66-6, y1-8);
    text('[19]', 200 + 50 * 66-6, y1-8+d2);

    pop();


    //Mapping data
    lw = 2;

    //1.US Atmospheric  
    x = 200;
    x1 = 100;
    var colWidth2 = 50;
    for (var r = 0; r < table.getRowCount(); r++) {
        var value = table.getNum(r, 1);//1
        var value2 = map(value, 0, 60, y2 + d * 2, 300)
        fill(0,40+value*15);
        ellipse(x, 450 - value2, 13, 8);
        push();
        // stroke(pal.colorForValue(value));
        stroke(0,40+value*15);
        strokeWeight(lw);
        line(x + 6, 451 - value2, x + 6, 428 - value2)
        pop();
        x += colWidth2
    }

    //1.US Underground  
    x = 200;
    x1 = 100;
    var colWidth2 = 50;
    for (var r = 0; r < table2.getRowCount(); r++) {
        var value = table2.getNum(r, 1);//1
        var value2 = map(value, 0, 60, y2 + d * 2, 300)
        fill(0,40+value*15);
        ellipse(x, 450 - value2, 13, 8);
        push();
        stroke(0,40+value*15);
        strokeWeight(lw);
        line(x + 6, 451 - value2, x + 6, 472 - value2)
        pop();
        x += colWidth2
    }

    //1.US Milestone
    ls = 10;//distance between two lines
    push();
    stroke(50, 34, 255);
    strokeWeight(2);
    
    //1945
    line(200, 0 + y1, 5 + 200, 10 + y1);
    line(200 - 5, 10 + y1, 200, 0 + y1);
    line(200, 0 + y1 + ls, 5 + 200, 10 + y1 + ls);
    line(200 - 5, 10 + y1 + ls, 200, 0 + y1 + ls);
    line(200, 0 + y1 + ls * 2, 5 + 200, 10 + y1 + ls * 2);
    line(200 - 5, 10 + y1 + ls * 2, 200, 0 + y1 + ls * 2);
    //1952
    line(200 + 50 * 7, 0 + y1, 5 + 200 + 50 * 7, 10 + y1);
    line(200 - 5 + 50 * 7, 10 + y1, 200 + 50 * 7, 0 + y1);
    line(200 + 50 * 7, 0 + y1 + ls, 5 + 200 + 50 * 7, 10 + y1 + ls);
    line(200 - 5 + 50 * 7, 10 + y1 + ls, 200 + 50 * 7, 0 + y1 + ls);

    //1954
    line(200 + 50 * 9, 0 + y1, 5 + 200 + 50 * 9, 10 + y1);
    line(200 - 5 + 50 * 9, 10 + y1, 200 + 50 * 9, 0 + y1);
    pop();
    push();
    textFont("Helvetica")
    textSize(12);
    fill(50, 34, 255);
    noStroke();
    text('1', 200+10, 10 + y1);
    text('2', 200+10, 10 + y1 + ls);
    text('3', 200+10, 10 + y1 + ls*2);
    text('4', 200+10+ 50 * 7, 10 + y1);
    text('5', 200+10+ 50 * 7, 10 + y1 + ls);
    text('6', 200+10+ 50 * 9, 10 + y1);
    pop();
    
    //1. US Treaties
    //1959~2019
    // push();
    // noFill();
    // stroke(50, 34, 255);
    // strokeWeight(2);
    // line (200 + 50 * 14, y1, 200+ 50*73, y1);
    // pop();


    //2.Russia Atmospheric  
    x = 200;
    x1 = 100;
    var colWidth2 = 50;
    for (var r = 0; r < table.getRowCount(); r++) {
        var value = table.getNum(r, 2);//2
        var value2 = map(value, 0, 60, y2 + d * 2, 300)
        fill(0,40+value*15)
        ellipse(x, 450 - value2 + d2, 13, 8);//d2*1
        push();
        stroke(0,40+value*15);
        strokeWeight(lw);
        line(x + 6, 451 - value2 + d2, x + 6, 428 - value2 + d2)//d2*1
        pop();
        x += colWidth2
    }

    //2.Russia Underground  
    x = 200;
    x1 = 100;
    var colWidth2 = 50;
    for (var r = 0; r < table2.getRowCount(); r++) {
        var value = table2.getNum(r, 2);//2
        var value2 = map(value, 0, 60, y2 + d * 2, 300)
        fill(0,40+value*15);
        ellipse(x, 450 - value2 + d2, 13, 8);//d2*1
        push();
        stroke(0,40+value*15);
        strokeWeight(lw);
        line(x + 6, 451 - value2 + d2, x + 6, 472 - value2 + d2)//d2*1
        pop();
        x += colWidth2
    }

    //2.Russia Milestone
    ls = 10;//distance between two lines
    push();
    stroke(50, 34, 255);
    strokeWeight(2);
    //1949
    line(200 + 50 * 4, 0 + y1 + d2, 5 + 200 + 50 * 4, 10 + y1 + d2);
    line(200 - 5 + 50 * 4, 10 + y1 + d2, 200 + 50 * 4, 0 + y1 + d2);
    //1953
    line(200 + 50 * 8, 0 + y1 + d2, 5 + 200 + 50 * 8, 10 + y1 + d2);
    line(200 - 5 + 50 * 8, 10 + y1 + d2, 200 + 50 * 8, 0 + y1 + d2);
    //1955
    line(200 + 50 * 10, 0 + y1 + d2, 5 + 200 + 50 * 10, 10 + y1 + d2);
    line(200 - 5 + 50 * 10, 10 + y1 + d2, 200 + 50 * 10, 0 + y1 + d2);
    //1961
    line(200 + 50 * 16, 0 + y1 + d2, 5 + 200 + 50 * 16, 10 + y1 + d2);
    line(200 - 5 + 50 * 16, 10 + y1 + d2, 200 + 50 * 16, 0 + y1 + d2);
    pop();
    textFont("Helvetica")
    textSize(12);
    fill(50, 34, 255);
    noStroke();
    text('7', 200 + 50 * 4+10, 10 + y1 + d2);
    text('8', 200 + 50 * 8+10, 10 + y1 + d2);
    text('9', 200 + 50 * 10+10, 10 + y1 + d2);
    text('10', 200 + 50 * 16+10, 10 + y1 + d2);




    //3.UK Atmospheric  
    x = 200;
    x1 = 100;
    var colWidth2 = 50;
    for (var r = 0; r < table.getRowCount(); r++) {
        var value = table.getNum(r, 3);//3
        var value2 = map(value, 0, 60, y2 + d * 2, 300)
        fill(0,40+value*15)
        ellipse(x, 450 - value2 + d2 * 2, 13, 8);//d2*2
        push();
        stroke(0,40+value*15);
        strokeWeight(lw);
        line(x + 6, 451 - value2 + d2 * 2, x + 6, 428 - value2 + d2 * 2)//d2*2
        pop();
        x += colWidth2
    }

    //3.UK Underground  
    x = 200;
    x1 = 100;
    var colWidth2 = 50;
    for (var r = 0; r < table2.getRowCount(); r++) {
        var value = table2.getNum(r, 3);//3
        var value2 = map(value, 0, 60, y2 + d * 2, 300)
        fill(0,40+value*15);
        ellipse(x, 450 - value2 + d2 * 2, 13, 8);//d2*2
        push();
        stroke(0,40+value*15);
        strokeWeight(lw);
        line(x + 6, 451 - value2 + d2 * 2, x + 6, 472 - value2 + d2 * 2)//d2*2
        pop();
        x += colWidth2
    }

    //3. UK Milestone
    ls = 10;//distance between two lines
    push();
    stroke(50, 34, 255);
    strokeWeight(2);
    //1952
    line(200 + 50 * 7, 0 + y1 + d2 * 2, 5 + 200 + 50 * 7, 10 + y1 + d2 * 2);
    line(200 - 5 + 50 * 7, 10 + y1 + d2 * 2, 200 + 50 * 7, 0 + y1 + d2 * 2);

    //1957
    line(200 + 50 * 12, 0 + y1 + d2 * 2, 5 + 200 + 50 * 12, 10 + y1 + d2 * 2);
    line(200 - 5 + 50 * 12, 10 + y1 + d2 * 2, 200 + 50 * 12, 0 + y1 + d2 * 2);
    line(200 + 50 * 12, 0 + y1 + d2 * 2+ls, 5 + 200 + 50 * 12, 10 + y1 + d2 * 2+ls);
    line(200 - 5 + 50 * 12, 10 + y1 + d2 * 2+ls, 200 + 50 * 12, 0 + y1 + d2 * 2+ls);
    pop();
    
    textFont("Helvetica")
    textSize(12);
    fill(50, 34, 255);
    noStroke();
    text('11', 200 + 50 * 7+10, 10 + y1 + d2 * 2);
    text('12', 200 + 50 * 12+10, 10 + y1 + d2 * 2);
    text('13', 200 + 50 * 12+10, 10 + y1 + d2 * 2+ls);





    //4.France 
    x = 200;
    x1 = 100;
    var colWidth2 = 50;
    for (var r = 0; r < table.getRowCount(); r++) {
        var value = table.getNum(r, 4);//4
        var value2 = map(value, 0, 60, y2 + d * 2, 300)
        fill(0,40+value*15)
        ellipse(x, 450 - value2 + d2 * 3, 13, 8);//d2*3
        push();
        stroke(0,40+value*15);
        strokeWeight(lw);
        line(x + 6, 451 - value2 + d2 * 3, x + 6, 428 - value2 + d2 * 3)//d2*3
        pop();
        x += colWidth2
    }

    //4.France 
    x = 200;
    x1 = 100;
    var colWidth2 = 50;
    for (var r = 0; r < table2.getRowCount(); r++) {
        var value = table2.getNum(r, 4);//4
        var value2 = map(value, 0, 60, y2 + d * 2, 300)
        fill(0,40+value*15);
        ellipse(x, 450 - value2 + d2 * 3, 13, 8);//d2*3
        push();
        stroke(0,40+value*15);
        strokeWeight(lw);
        line(x + 6, 451 - value2 + d2 * 3, x + 6, 472 - value2 + d2 * 3)//d2*3
        pop();
        x += colWidth2
    }

    //4. France Milestone
    ls = 10;//distance between two lines
    push();
    stroke(50, 34, 255);
    strokeWeight(2);
    //1960
    line(200 + 50 * 15, 0 + y1 + d2 * 3, 5 + 200 + 50 * 15, 10 + y1 + d2 * 3);
    line(200 - 5 + 50 * 15, 10 + y1 + d2 * 3, 200 + 50 * 15, 0 + y1 + d2 * 3);
    //1968
    line(200 + 50 * 23, 0 + y1 + d2 * 3, 5 + 200 + 50 * 23, 10 + y1 + d2 * 3);
    line(200 - 5 + 50 * 23, 10 + y1 + d2 * 3, 200 + 50 * 23, 0 + y1 + d2 * 3);
    pop();
    
    textFont("Helvetica")
    textSize(12);
    fill(50, 34, 255);
    noStroke();
    text('14', 200 + 50 * 15+10, 10 + y1 + d2 * 3);
    text('15', 200 + 50 * 23+10, 10 + y1 + d2 * 3);


    //5.China
    x = 200;
    x1 = 100;
    var colWidth2 = 50;
    for (var r = 0; r < table.getRowCount(); r++) {
        var value = table.getNum(r, 5);//5
        var value2 = map(value, 0, 60, y2 + d * 2, 300)
        fill(0,40+value*15)
        ellipse(x, 450 - value2 + d2 * 4, 13, 8);//d2*4
        push();
        stroke(0,40+value*15);
        strokeWeight(lw);
        line(x + 6, 451 - value2 + d2 * 4, x + 6, 428 - value2 + d2 * 4)//d2*4
        pop();
        x += colWidth2
    }

    //5.China
    x = 200;
    x1 = 100;
    var colWidth2 = 50;
    for (var r = 0; r < table2.getRowCount(); r++) {
        var value = table2.getNum(r, 5);//5
        var value2 = map(value, 0, 60, y2 + d * 2, 300)
        fill(0,40+value*15);
        ellipse(x, 450 - value2 + d2 * 4, 13, 8);//d2*4
        push();
        stroke(0,40+value*15);
        strokeWeight(lw);
        line(x + 6, 451 - value2 + d2 * 4, x + 6, 472 - value2 + d2 * 4)//d2*4
        pop();
        x += colWidth2
    }

    //5. China Milestone
    ls = 10;//distance between two lines
    push();
    stroke(50, 34, 255);
    strokeWeight(2);
    //1964
    line(200 + 50 * 19, 0 + y1 + d2 * 4, 5 + 200 + 50 * 19, 10 + y1 + d2 * 4);
    line(200 - 5 + 50 * 19, 10 + y1 + d2 * 4, 200 + 50 * 19, 0 + y1 + d2 * 4);
    //1967
    line(200 + 50 * 22, 0 + y1 + d2 * 4, 5 + 200 + 50 * 22, 10 + y1 + d2 * 4);
    line(200 - 5 + 50 * 22, 10 + y1 + d2 * 4, 200 + 50 * 22, 0 + y1 + d2 * 4);
    pop();
    
    textFont("Helvetica")
    textSize(12);
    fill(50, 34, 255);
    noStroke();
    text('16', 200 + 50 * 19+10, 10 + y1 + d2 * 4);
    text('17', 200 + 50 * 22+10, 10 + y1 + d2 * 4);

    //6.India
    x = 200;
    x1 = 100;
    var colWidth2 = 50;
    for (var r = 0; r < table.getRowCount(); r++) {
        var value = table.getNum(r, 6);//6
        var value2 = map(value, 0, 60, y2 + d * 2, 300)
        fill(0,40+value*15)
        ellipse(x, 450 - value2 + d2 * 5, 13, 8);//d2*5
        push();
        stroke(0,40+value*15);
        strokeWeight(lw);
        line(x + 6, 451 - value2 + d2 * 5, x + 6, 428 - value2 + d2 * 5)//d2*5
        pop();
        x += colWidth2
    }

    //6.India
    x = 200;
    x1 = 100;
    var colWidth2 = 50;
    for (var r = 0; r < table2.getRowCount(); r++) {
        var value = table2.getNum(r, 6);//6
        var value2 = map(value, 0, 60, y2 + d * 2, 300)
        fill(0,40+value*15);
        ellipse(x, 450 - value2 + d2 * 5, 13, 8);//d2*5
        push();
        stroke(0,40+value*15);
        strokeWeight(lw);
        line(x + 6, 451 - value2 + d2 * 5, x + 6, 472 - value2 + d2 * 5)//d2*5
        pop();
        x += colWidth2
    }

    //6. India Milestone
    ls = 10;//distance between two lines
    push();
    stroke(50, 34, 255);
    strokeWeight(2);
    //1974
    line(200 + 50 * 29, 0 + y1 + d2 * 5, 5 + 200 + 50 * 29, 10 + y1 + d2 * 5);
    line(200 - 5 + 50 * 29, 10 + y1 + d2 * 5, 200 + 50 * 29, 0 + y1 + d2 * 5);
    //1998
    line(200 + 50 * 43, 0 + y1 + d2 * 5, 5 + 200 + 50 * 43, 10 + y1 + d2 * 5);
    line(200 - 5 + 50 * 43, 10 + y1 + d2 * 5, 200 + 50 * 43, 0 + y1 + d2 * 5);
    pop();
    
    textFont("Helvetica")
    textSize(12);
    fill(50, 34, 255);
    noStroke();
    text('18', 200 + 50 * 29+10, 10 + y1 + d2 * 5);
    text('19', 200 + 50 * 43+10, 10 + y1 + d2 * 5);


    //7.Pakistan
    x = 200;
    x1 = 100;
    var colWidth2 = 50;
    for (var r = 0; r < table.getRowCount(); r++) {
        var value = table.getNum(r, 7);//7
        var value2 = map(value, 0, 60, y2 + d * 2, 300)
        fill(0,40+value*15)
        ellipse(x, 450 - value2 + d2 * 6, 13, 8);//d2*6
        push();
        stroke(0,40+value*15);
        strokeWeight(lw);
        line(x + 6, 451 - value2 + d2 * 6, x + 6, 428 - value2 + d2 * 6)//d2*6
        pop();
        x += colWidth2
    }

    //7.Pakistan
    x = 200;
    x1 = 100;
    var colWidth2 = 50;
    for (var r = 0; r < table2.getRowCount(); r++) {
        var value = table2.getNum(r, 7);//7
        var value2 = map(value, 0, 60, y2 + d * 2, 300)
        fill(0,40+value*15);
        ellipse(x, 450 - value2 + d2 * 6, 13, 8);//d2*6
        push();
        stroke(0,40+value*15);
        strokeWeight(lw);
        line(x + 6, 451 - value2 + d2 * 6, x + 6, 472 - value2 + d2 * 6)//d2*6
        pop();
        x += colWidth2
    }

    //7.Pakistan Milestone
    ls = 10;//distance between two lines
    push();
    stroke(50, 34, 255);
    strokeWeight(2);

    //1998
    line(200 + 50 * 43, 0 + y1 + d2 * 6, 5 + 200 + 50 * 43, 10 + y1 + d2 * 6);
    line(200 - 5 + 50 * 43, 10 + y1 + d2 * 6, 200 + 50 * 43, 0 + y1 + d2 * 6);
    pop();
    
    textFont("Helvetica")
    textSize(12);
    fill(50, 34, 255);
    noStroke();
    text('20', 200 + 50 * 43+10,  10 + y1 + d2 * 6);

    

    //8.North Korea
    x = 200;
    x1 = 100;
    var colWidth2 = 50;
    for (var r = 0; r < table.getRowCount(); r++) {
        var value = table.getNum(r, 8);//8
        var value2 = map(value, 0, 60, y2 + d * 2, 300)
        fill(0,40+value*15)
        ellipse(x, 450 - value2 + d2 * 7, 13, 8);//d2*7
        push();
        stroke(0,40+value*15);
        strokeWeight(lw);
        line(x + 6, 451 - value2 + d2 * 7, x + 6, 428 - value2 + d2 * 7)//d2*7
        pop();
        x += colWidth2
    }

    //8.North Korea
    x = 200;
    x1 = 100;
    var colWidth2 = 50;
    for (var r = 0; r < table2.getRowCount(); r++) {
        var value = table2.getNum(r, 8);//8
        var value2 = map(value, 0, 60, y2 + d * 2, 300)
        fill(0,40+value*15);
        ellipse(x, 450 - value2 + d2 * 7, 13, 8);//d2*6
        push();
        stroke(0,40+value*15);
        strokeWeight(lw);
        line(x + 6, 451 - value2 + d2 * 7, x + 6, 472 - value2 + d2 * 7)//d2*7
        pop();
        x += colWidth2
    }

    //8.North Korea
    ls = 10;//distance between two lines
    push();
    stroke(50, 34, 255);
    strokeWeight(2);

    //2006
    line(200 + 50 * 51, 0 + y1 + d2 * 7, 5 + 200 + 50 * 51, 10 + y1 + d2 * 7);
    line(200 - 5 + 50 * 51, 10 + y1 + d2 * 7, 200 + 50 * 51, 0 + y1 + d2 * 7);

    //2017
    line(200 + 50 * 62, 0 + y1 + d2 * 7, 5 + 200 + 50 * 62, 10 + y1 + d2 * 7);
    line(200 - 5 + 50 * 62, 10 + y1 + d2 * 7, 200 + 50 * 62, 0 + y1 + d2 * 7);
    pop();
    
    textFont("Helvetica")
    textSize(12);
    fill(50, 34, 255);
    noStroke();
    text('21', 200 + 50 * 51+10,  10 + y1 + d2 * 7);
    text('22', 200 + 50 * 62+10,  10 + y1 + d2 * 7);


}



// function mousePressed() {
//   if (mouseX=100) {
//     // if (!playing) {
//       a4.play();
//     //   osc.amp(0.5, 0.05);
//       playing = true;
//     } else if (mouseX=200) {
//     //   osc.amp(0, 0.5);
//       b4.play();
//       playing = true;
//     } else if (mouseX=300){
//       c4.play();
//       playing = true;
//     }
//   }
  
// function mousePressed() {
//   // Check if mouse is inside the circle
  
//   var move = map(mouseY, 0, height,100,500 )
//   let d = dist(mouseX, mouseY, 200, 200);
//   if (d < 100) {
//      a4.play()
//      playing = true;
//   } else if (d>200){
//      b4.play()
//      playing = true;
//   }
// }

function playNote(note, duration) {
  osc.freq(midiToFreq(note));
  // Fade it in
  osc.fade(0.5,0.2);

  // If we sest a duration, fade it out
  if (duration) {
    setTimeout(function() {
      osc.fade(0,0.3);
    }, duration-50);
  }
}


function mousePressed(event) {
  if(event.clientX < width && event.clientY >140 && event.clientY<255) {
    // Map mouse to the key index
    let key = floor(map(mouseY, 140, 251, 0, notes.length));
    playNote(notes[key]);
  } else if(event.clientX < width && event.clientY > 300 && event.clientY<455) {
    let key = floor(map(mouseY, 300, 451, 0, notes.length));
    playNote(notes[key]);
  }else if(event.clientX < width && event.clientY > 540 && event.clientY<655) {
    let key = floor(map(mouseY, 540, 655, 0, notes.length));
    playNote(notes[key]);
  }else if(event.clientX < width && event.clientY > 740 && event.clientY<855) {
    let key = floor(map(mouseY, 740, 850, 0, notes.length));
    playNote(notes[key]);
  }else if(event.clientX < width && event.clientY > 950 && event.clientY<1050) {
    let key = floor(map(mouseY, 950, 1050, 0, notes.length));
    playNote(notes[key]);
  }else if(event.clientX < width && event.clientY > 1150 && event.clientY<1250) {
    let key = floor(map(mouseY, 1150, 1250, 0, notes.length));
    playNote(notes[key]);
  }else if(event.clientX < width && event.clientY > 1350 && event.clientY<1450) {
    let key = floor(map(mouseY, 1350, 1450, 0, notes.length));
    playNote(notes[key]);
  }else if(event.clientX < width && event.clientY > 1550 && event.clientY<1650) {
    let key = floor(map(mouseY, 1550, 1650, 0, notes.length));
    playNote(notes[key]);
  }
}

// Fade it out when we release
function mouseReleased() {
  osc.fade(0,0.5);
}




