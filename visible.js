var rating = true
var clean = true
var row_num = 15
var app_num = 5

//control the path
var names = ['book_00007_chp_0008_reader_01326_40_DKITCHEN', 'book_00008_chp_0146_reader_07907_5_DLIVING', 
'book_05506_chp_0032_reader_11205_25_NPARK', 'book_07970_chp_0002_reader_11151_4_NRIVER', 
'book_08134_chp_0010_reader_06339_2_OOFFICE', 'book_08143_chp_0029_reader_02016_32_PSTATION', 
'book_08160_chp_0022_reader_03323_40_SCAFE', 'book_08253_chp_0002_reader_01172_30_STRAFFIC', 
'p232_003', 'p232_005', 'p232_011', 'p232_019', 'p232_021', 'p232_023', 'p257_023']
];
// Approach 3 denotes the noisy tracks
var folders = ["Noisy", "Clean", "PFPL", "PHASEN", "CMGAN", "DEMUCS", "MGAN"]

// shuffle key 20 rows 4 rolumns each row:[3, 4, 2, 5] for example and is shuffled

var keys = new Array(row_num);
for (var i = 0; i < row_num; i++) {
    keys[i] = [2, 3, 4, 5, 6];
    for (let r = 3; r > 0; r--) {
        let l = Math.floor(Math.random() * (r + 1));
        [keys[i][l], keys[i][r]] = [keys[i][r], keys[i][l]];
      }
}
console.log(keys)

// show or hide the clean speech part
if (clean == true){
    for (var i = 0; i < row_num+1; i++){ 
            document.getElementById("clean_"+String(i)).style.display='inline';
    }
}
else if (clean == false){
    for (var i = 0; i < row_num+1; i++){ 
            document.getElementById("clean_"+String(i)).style.display='none';
    }
}

// show or hide the rating part
if (rating == true){
    for (var i = 1; i < row_num+1; i++){
        for(var j = 1; j < app_num; j++){
            document.getElementById(String(i)+"_"+String(j)).style.display='inline';
        }
    }
}
else if (rating == false){
    for (var i = 1; i < row_num+1; i++){
        for(var j = 1; j < app_num; j++){
            document.getElementById(String(i)+"_"+String(j)).style.display='none';
        }
    }
}

// the name of the tracks of row 1
for (var i = 1; i < row_num+1; i++){
    document.getElementById('label_' + String(i)).innerHTML = names[i-1];
}

// speech signals to each play button
for (var i = 1; i < row_num+1; i++){
    for (var j = 1; j < 3; j++){
        document.getElementById('audio_' + String(i) + '_' + String(j)).src = "tracks/" + folders[j-1] + "/" + names[i-1] + ".wav";
    }
    for (var j = 3; j < app_num+3; j++){
        document.getElementById('audio_' + String(i) + '_' + String(j)).src = "tracks/" + folders[keys[i-1][j-3]] + "/" + names[i-1] + ".wav";
    }
}


document.getElementById("line").style.visibility="hidden";

function sendEmail() {
    var e = document.getElementById("1_1").value;
    var items = new Array(row_num);
    for (var i = 0; i < row_num; i++){
        items[i] = new Array(app_num);
        for (var j = 0; j < app_num; j++){
            items[i][keys[i][j] - 2] = document.getElementById(String(i + 1) + "_" + String(j + 1)).value
        }
    } 
    console.log(items)
    alert("please wait...")
    Email.send({
    Host: "imap.gmail.com",
    Username: "ruizhe.cao96@gmail.com",
    Password: "337177324",
    To: 'ruizhe.cao96@gmail.com',
    From: "ruizhe.cao96@gmail.com",
    Subject: "speech enhancement",
    Body: items + names + folders,
    })
    .then(function (message) {
        alert("mail sent successfully")
    });
}