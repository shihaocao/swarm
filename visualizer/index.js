// Sizing data
const size = 40;
let [board_size, block_size] = [undefined, undefined];

// Game data
let boards = [];
let dlogs = [];
let bchain = [];
let info = [];
let general = [];
let piece_counts = {"t": 0,
                    "g": 0,
                    "h": 0,
                    "b": 0,
                    "s": 0,
                    "e": 0,
                    "r": 0,
                    "u": 0,
                    "T": 0,
                    "G": 0,
                    "H": 0,
                    "B": 0,
                    "S": 0,
                    "E": 0,
                    "R": 0,
                    "U": 0
                    };
const filenameDict = {"t": "tank_b.svg",
                      "g": "gunner_b.svg",
                      "h": "hq_b.svg",
                      "T": "tank_r.svg",
                      "G": "gunner_r.svg",
                      "H": "hq_r.svg",
                      "n": "grass.svg",
                      "B": "builder_r.svg",
                      "b": "builder_b.svg",
                      "S": "barracks_r.svg",
                      "s": "barracks_b.svg",
                      "E": "grenade_launcher_r.svg",
                      "e": "grenade_launcher_b.svg",
                      "R": "oil_refinery_r.svg",
                      "r": "oil_refinery_b.svg",
                      "U": "turret_r.svg",
                      "u": "turret_b.svg",
                      "w": "wall.svg",
                      "W": "wall.svg"};
let gameData = {};

let selectedID = "";
let board_num = 0;
let playing = false;
let playInterval;
let speed = 1;

function createEmptyBoard(){
    for(let r = 0; r < size; r++){
        let row = $("<div></div>", {id: "row-" + r, style: "display: block; font-size: 0"})
        $("#gameBoard").append(row);
        for(let c = 0; c < size; c++){
            let id = "row-" + r + "_col-" + c;
            let img = $("<img />", {id: id, src: "images/grass.png", width: block_size});
            img.click(handleClick);
            $("#row-" + r).append(img);
        }
    }
}

function get_piece_ID(html_id){
    console.log(html_id);
    console.log(info[board_num]);
    if(!info[board_num][html_id]){
        return -1;
    }
    let temp = info[board_num][html_id].split(" ");
    return temp[1].slice(1, temp[1].length - 1);
}

function handleClick(e){
    console.log("Clicked");
    selectedID = get_piece_ID(e.target.id);
    updateInfo();
}

function updateInfo(){
    if(!info[board_num][selectedID]){
        $("robotinfo").text("");
        return;
    }
    let temp = info[board_num][selectedID].split(" ");
    let info_arr = ["Robot ID: " + temp[1].slice(1, temp[1].length - 1),
                    "X Location: " + temp[3],
                    "Y Location: " + temp[2],
                    "Health: " + temp[4]];
    console.log("Appending");
    $("#robotinfo").empty();
    for(let info_thing of info_arr){
        $("#robotinfo").append($("<p>").text(info_thing));
    }
}

function drawBoard(){
    piece_counts = {"t": 0,
                        "g": 0,
                        "h": 0,
                        "b": 0,
                        "s": 0,
                        "e": 0,
                        "r": 0,
                        "u": 0,
                        "T": 0,
                        "G": 0,
                        "H": 0,
                        "B": 0,
                        "S": 0,
                        "E": 0,
                        "R": 0,
                        "U": 0
                        };

    let idx = 0;
    let board_string = boards[board_num];
    for(let r = 0; r < size; r++){
        for(let c = 0; c < size; c++){
            let char = board_string[idx];
            piece_counts[char] += 1;
            let filename = "images/" + filenameDict[char];
            let block = $("#row-" + r + "_col-" + c);
            if(block.attr("src") != filename){
                block.attr("src", filename);
            }
            idx += 1;
        }
    }
}

function openTab(evt, cityName) {
    $(".tabcontent").css("display", "none");
    $(".tablinks").removeClass("active");
    $("#" + cityName).css("display", "block");
    evt.currentTarget.className += " active";
}

function updateScrolls(){
    $("#Debug").attr("scrollTop", $("#Debug").attr("scrollHeight"));
    $("#Blockchain").attr("scrollTop", $("#Blockchain").attr("scrollHeight"));
}

function updateBoardNum(new_num){
    board_num = Math.max(Math.min(new_num, boards.length - 1), 0);
    $("#roundRange").val(board_num);
    $("#roundNum").text((board_num + 1) + " / " + boards.length);
    drawBoard();
    updateDlog(board_num);
    updateBChain(board_num);
    updateScrolls();
    updateInfo();
    updatePieceNum();
    updateGeneral(board_num);
    updateWinner(board_num);
}

function updateWinner(board_num){
    if (board_num != boards.length-1) {
        $("#gameBoard").css("border", "0px");
        return;
    }
    let color = gameData["Winner color"] == "red" ? "red" : gameData["Winner color"] == "blue" ? "blue" : "black";
    $("#gameBoard").css("border", "5px solid " + color);
}

function updateGeneral(board_num){
    let general_info = general[board_num];
    $("#blueOil").text(general_info[0]);
    $("#redOil").text(general_info[1]);
}

function updatePieceNum(){
    $("#numBlueTanks").text(piece_counts["t"]);
    $("#numRedTanks").text(piece_counts["T"]);
    $("#numBlueGunners").text(piece_counts["g"]);
    $("#numRedGunners").text(piece_counts["G"]);
    $("#numBlueGrenaders").text(piece_counts["e"]);
    $("#numRedGrenaders").text(piece_counts["E"]);
    $("#numBlueBuilders").text(piece_counts["b"]);
    $("#numRedBuilders").text(piece_counts["B"]);
    $("#numBlueBarracks").text(piece_counts["s"]);
    $("#numRedBarracks").text(piece_counts["S"]);
    $("#numBlueTurrets").text(piece_counts["u"]);
    $("#numRedTurrets").text(piece_counts["U"]);
    $("#numBlueOilRefineries").text(piece_counts["r"]);
    $("#numRedOilRefineries").text(piece_counts["R"]);
}

function updateDlog(board_num){
    $("#dlogs").empty();
    for (let i = 0; i < board_num + 1; i++){
        if (dlogs[i]!=""){
            $("#dlogs").append($("<p>").text(dlogs[i].join(', ')));
        }
        
    }
}

function updateBChain(board_num){
    $("#bchain").empty();
    for (let i = 0; i < board_num + 1; i++){
        if(bchain[i].length != 0 && !bchain[i][0].startsWith("X")) {
            $("#bchain").append($("<p>").text(bchain[i]));
        }
    }
}

function speedToSeconds(speed){
    return 1000 / speed;
}

function updateSpeed(new_speed){
    speed = new_speed;
    $("#speedNum").text(speed);
    if(playing){
        clearInterval(playInterval);
        playInterval = setInterval(function(){
            updateBoardNum(board_num + 1);
        }, speedToSeconds(speed));
    }
}

function togglePlay(){
    playing = !playing;
    if(playing){
        $("#play").text("Pause");
        updateSpeed(speed);
    } else{
        $("#play").text("Play");
        clearInterval(playInterval);
    }
}

function processReplay(data){
    let content = data.split("\n");
    boards = [];
    dlogs = [];
    info = [];
    bchain = [];
    let roundNum = -1;
    for (index = 0; index < content.length; index++) {
        let line = content[index];
        if (line.startsWith("#")){
            boards.push(line.substr(1));
            dlogs.push([]);
            bchain.push([]);
            info.push({});
            general.push([])
            roundNum += 1;
        }
        else if (line.startsWith("[DLOG]")){
            dlogs[roundNum].push(line.trimLeft().trimRight());
        }
        else if (line.startsWith("[BCHAIN]")){
            if (line.trim().length != "[BCHAIN]".length){
                bchain[roundNum].push(roundNum.toString() + " " + line);
            }
        }
        else if (line.startsWith("|")){
            let key = line.substring(1, line.indexOf(":")).trim();
            let value = line.substring(line.indexOf(":") + 1).trim();
            gameData[key] = value;
        }
        else if (line.startsWith("[INFO]")){
            let temp = line.split(" ");
            let id = temp[1].slice(1, temp[1].length - 1);
            let row = temp[2];
            let col = temp[3];
            info[roundNum]["row-" + row + "_col-" + col] = line;
            info[roundNum][id] = line;
        }
        else if (line.startsWith("[GENERAL]")){
            let temp = line.split(" ");
            general[roundNum].push(temp[1]);
            general[roundNum].push(temp[2]);
        }
        else{
            console.log("Unknown line: " + line);
        }
    }
    $("#roundRange").attr("max", boards.length - 1);
    updateBoardNum(0);
};

function uploadReplay(){
    let fileReader = new FileReader();
    fileReader.onload = () => processReplay(fileReader.result);
    fileReader.readAsText($('#myFile').prop('files')[0]);
}

function keydown(e){
    console.log(e.code);
    switch(e.code){
        case 'KeyA':
            updateBoardNum(board_num - 1);
            break;
        case 'KeyD':
            updateBoardNum(board_num + 1);
            break;
    }
}

function fullscreen(){
    if (document.getElementById("gameBoard").style.minWidth != "100%"){
        document.getElementById("gameBoard").style.minWidth = "100%";
        document.getElementById("gameBoard").style.width = "100%";
        document.getElementById("stats").style.display = "none";
        board_size = parseInt($("#gameBoard").css("width")) - 10; // 10px padding for the border
        block_size = Math.floor(board_size / size);
        $("#gameBoard").empty()
        createEmptyBoard();

    } else{
        document.getElementById("gameBoard").style.minWidth = "800px";
        document.getElementById("gameBoard").style.width = "800px";
        document.getElementById("stats").style.display = "block";
        board_size = parseInt($("#gameBoard").css("width")) - 10; // 10px padding for the border
        block_size = Math.floor(board_size / size);
        $("#gameBoard").empty()
        createEmptyBoard();
    }
}

function beastmode(){
    document.getElementById("sidebarCollapse").click();
    if (document.getElementById("TESTING").style.display=="none"){
        document.getElementById("TESTING").style.display="block";
        document.getElementById("gameBoard").style.width = "800px";
        board_size = parseInt($("#gameBoard").css("width")) - 10; // 10px padding for the border
        block_size = Math.floor(board_size / size);
        $("#gameBoard").empty()
        createEmptyBoard();

    }else{
        document.getElementById("TESTING").style.display="none";
        document.getElementById("gameBoard").style.width = "100vh";
        board_size = parseInt($("#gameBoard").css("width")) - 10; // 10px padding for the border
        block_size = Math.floor(board_size / size);
        $("#gameBoard").empty()
        createEmptyBoard();
        
    }
    
}


window.onload = function(){
    $("#roundNum").text("1 / 1");
    $("#speedNum").text("1");
    board_size = parseInt($("#gameBoard").css("width")) - 10; // 10px padding for the border
    block_size = Math.floor(board_size / size);
    createEmptyBoard();
    console.log("Created empty board");
    document.addEventListener('keydown', keydown);
};

