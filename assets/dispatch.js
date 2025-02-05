// JSON file name
let json_file = "assets/staff.json";

// Staff lists
var ems_staff = [];
var pd_staff = [];

// Load initial page (everybody off duty)
function main(){

    // Load json from external file
    $.getJSON(json_file, function(jsonData){

        for(const [index, staff_member] of jsonData.staff.entries()){

            // Set status and timestamp
            staff_member.status = 42;
            staff_member.timestamp = 0;

            // If EMS
            if(staff_member.department == 'ems'){
                ems_staff.push(staff_member);
            }
            // Else if PD
            else if(staff_member.department == 'pd'){
                pd_staff.push(staff_member);
            }
            // Else print message to console
            else{
                console.log('Unknown department');
                console.log(staff_member);
            }
            
        }

        // Order staff lists by callsign
        ems_staff.sort((a,b) => a.callsign - b.callsign);
        pd_staff.sort((a,b) => a.callsign - b.callsign);

        // Load page
        updatePage();

    // If loading the JSON fails
    }).fail(function(){
        console.log("An error has occurred while loading the JSON file.");
        document.getElementById("ems_42").innerHTML = "<div class='error_message'>ERROR LOADING JSON</div>";
    });
    
}

// On update (button push)
function updateDispatch(id, status){

    // Update status for staff member
    ems_staff[id]['status'] = status;

    // Update timestamp for staff member
    if(status == 42){
        ems_staff[id]['timestamp'] = 0;
    }
    else{
        ems_staff[id]['timestamp'] = Date.now();
    }

    // Sort by timestamp, then callsign
    ems_staff.sort((a,b) => a.timestamp - b.timestamp || a.callsign - b.callsign);

    // Update page
    updatePage();

}

// Update page sections
function updatePage(){
    time_now = Date.now();

    // Define and initialize tables
    var ems_staff_table_42 = "<table>";
    ems_staff_table_42 += "<tr>";
    ems_staff_table_42 += "<th style='width:40px;'>&nbsp;</th>";
    ems_staff_table_42 += "<th style='width:30px;'>&nbsp;</th>";
    ems_staff_table_42 += "<th style='text-align:left;'>Name</th>";
    ems_staff_table_42 += "</tr>";

    var ems_staff_table_8 = "<table>";
    ems_staff_table_8 += "<tr>";
    ems_staff_table_8 += "<th style='width:65px;'>&nbsp;</th>";
    ems_staff_table_8 += "<th style='width:30px;'>&nbsp;</th>";
    ems_staff_table_8 += "<th style='text-align:left;'>Name</th>";
    ems_staff_table_8 += "<th style='width:40px;'>Time</th>";
    ems_staff_table_8 += "<th style='width:65px;'>&nbsp;</th>";
    ems_staff_table_8 += "<th style='width:65px;'>&nbsp;</th>";
    ems_staff_table_8 += "</tr>";

    var ems_staff_table_6 = "<table>";
    ems_staff_table_6 += "<tr>";
    ems_staff_table_6 += "<th style='width:65px;'>&nbsp;</th>";
    ems_staff_table_6 += "<th style='width:30px;'>&nbsp;</th>";
    ems_staff_table_6 += "<th style='text-align:left;'>Name</th>";
    ems_staff_table_6 += "<th style='width:40px;'>Time</th>";
    ems_staff_table_6 += "<th style='width:65px;'>&nbsp;</th>";
    ems_staff_table_6 += "<th style='width:65px;'>&nbsp;</th>";
    ems_staff_table_6 += "</tr>";
    
    var ems_staff_table_7 = "<table>";
    ems_staff_table_7 += "<tr>";
    ems_staff_table_7 += "<th style='width:65px;'>&nbsp;</th>";
    ems_staff_table_7 += "<th style='width:30px;'>&nbsp;</th>";
    ems_staff_table_7 += "<th style='text-align:left;'>Name</th>";
    ems_staff_table_7 += "<th style='width:40px;'>Time</th>";
    ems_staff_table_7 += "<th style='width:65px;'>&nbsp;</th>";
    ems_staff_table_7 += "<th style='width:65px;'>&nbsp;</th>";
    ems_staff_table_7 += "</tr>";
    
    var ems_staff_table_47 = "<table>";
    ems_staff_table_47 += "<tr>";
    ems_staff_table_47 += "<th style='width:65px;'>&nbsp;</th>";
    ems_staff_table_47 += "<th style='width:30px;'>&nbsp;</th>";
    ems_staff_table_47 += "<th style='text-align:left;'>Name</th>";
    ems_staff_table_47 += "<th style='width:40px;'>Time</th>";
    ems_staff_table_47 += "<th style='width:65px;'>&nbsp;</th>";
    ems_staff_table_47 += "</tr>";



    // Update tables (Not ES6 cause I'm lazy)
    for( const[index, staff_member] of ems_staff.entries()){
        // Calculate time 
        time_in_queue = Math.round((time_now - staff_member.timestamp) / 1000 / 60)

        // Process based on status
        // Status 10-42
        if(staff_member.status == 42){
            ems_staff_table_42 += "<tr>"
            ems_staff_table_42 += "<td><img src='assets/10-41.png' alt='10-42' onclick='updateDispatch(" + index + ", 8)'/></td>"
            ems_staff_table_42 += "<td><div class='table_round'>"+ staff_member.callsign +"</div></td>";
            ems_staff_table_42 += "<td style='text-align:left;'>"+ staff_member.name +"</td>"
            ems_staff_table_42 += "</tr>"
        }
        
        // status 10-8
        else if(staff_member.status == 8){
            ems_staff_table_8 += "<tr>";
            ems_staff_table_8 += "<td><img src='assets/10-47.png' alt='10-47' onclick='updateDispatch(" + index + ", 47)'/></td>";
            ems_staff_table_8 += "<td><div class='table_round'>"+ staff_member.callsign +"</div></td>";
            ems_staff_table_8 += "<td style='text-align:left;'>"+ staff_member.name +"</td>";
            ems_staff_table_8 += "<td>" + time_in_queue + "m</td>";
            ems_staff_table_8 += "<td>";
            ems_staff_table_8 += "<img src='assets/10-6.png' alt='10-6' onclick='updateDispatch(" + index + ", 6)'/>";
            ems_staff_table_8 += "<img src='assets/10-7.png' alt='10-7' onclick='updateDispatch(" + index + ", 7)'/>";
            ems_staff_table_8 += "</td>";
            ems_staff_table_8 += "<td><img src='assets/10-42.png' alt='10-42' onclick='updateDispatch(" + index + ", 42)'/></td>";
            ems_staff_table_8 += "</tr>";
        }

        // status 10-6
        else if(staff_member.status == 6){
            ems_staff_table_6 += "<tr>"
            ems_staff_table_6 += "<td><img src='assets/10-47.png' alt='10-47' onclick='updateDispatch(" + index + ", 47)'/></td>";
            ems_staff_table_6 += "<td><div class='table_round'>"+ staff_member.callsign +"</div></td>";
            ems_staff_table_6 += "<td style='text-align:left;'>"+ staff_member.name +"</td>";
            ems_staff_table_6 += "<td>" + time_in_queue + "m</td>";
            ems_staff_table_6 += "<td>";
            ems_staff_table_6 += "<img src='assets/10-8.png' alt='10-6' onclick='updateDispatch(" + index + ", 8)'/>";
            ems_staff_table_6 += "<img src='assets/10-7.png' alt='10-7' onclick='updateDispatch(" + index + ", 7)'/>";
            ems_staff_table_6 += "</td>";
            ems_staff_table_6 += "<td><img src='assets/10-42.png' alt='10-42' onclick='updateDispatch(" + index + ", 42)'/></td>";
            ems_staff_table_6 += "</tr>";
        }

        // status 10-7
        else if(staff_member.status == 7){
            ems_staff_table_7 += "<tr>";
            ems_staff_table_7 += "<td><img src='assets/10-47.png' alt='10-47' onclick='updateDispatch(" + index + ", 47)'/></td>";
            ems_staff_table_7 += "<td><div class='table_round'>"+ staff_member.callsign +"</div></td>";
            ems_staff_table_7 += "<td style='text-align:left;'>"+ staff_member.name +"</td>";
            ems_staff_table_7 += "<td>" + time_in_queue + "m</td>";
            ems_staff_table_7 += "<td>";
            ems_staff_table_7 += "<img src='assets/10-8.png' alt='10-6' onclick='updateDispatch(" + index + ", 8)'/>";
            ems_staff_table_7 += "<img src='assets/10-6.png' alt='10-7' onclick='updateDispatch(" + index + ", 6)'/>";
            ems_staff_table_7 += "</td>";
            ems_staff_table_7 += "<td><img src='assets/10-42.png' alt='10-42' onclick='updateDispatch(" + index + ", 42)'/></td>";
            ems_staff_table_7 += "</tr>";
        }

        // status 10-47 (On Call)
        else if(staff_member.status == 47){
            ems_staff_table_47 += "<tr>";
            ems_staff_table_47 += "<td>";
            ems_staff_table_47 += "<img src='assets/10-6.png' alt='10-6' onclick='updateDispatch(" + index + ", 6)'/>";
            ems_staff_table_47 += "<img src='assets/10-7.png' alt='10-7' onclick='updateDispatch(" + index + ", 7)'/>";
            ems_staff_table_47 += "<img src='assets/10-42.png' alt='10-42' onclick='updateDispatch(" + index + ", 42)'/>";
            ems_staff_table_47 += "</td>";
            ems_staff_table_47 += "<td><div class='table_round'>"+ staff_member.callsign +"</div></td>";
            ems_staff_table_47 += "<td style='text-align:left;'>"+ staff_member.name +"</td>";
            ems_staff_table_47 += "<td>" + time_in_queue + "m</td>";
            ems_staff_table_47 += "<td>";
            ems_staff_table_47 += "<img src='assets/10-8.png' alt='10-8' onclick='updateDispatch(" + index + ", 8)'/>";
            ems_staff_table_47 += "</td>";
            ems_staff_table_47 += "</tr>";
        }

    }

    // Close tables
    ems_staff_table_42 += "</table>"
    ems_staff_table_8 += "</table>"
    ems_staff_table_7 += "</table>"
    ems_staff_table_6 += "</table>"
    ems_staff_table_47 += "</table>"

    // UPDATE PAGE AREAS
    document.getElementById("ems_42").innerHTML = ems_staff_table_42;
    document.getElementById("ems_8").innerHTML = ems_staff_table_8;
    document.getElementById("ems_7").innerHTML = ems_staff_table_7;
    document.getElementById("ems_6").innerHTML = ems_staff_table_6;
    document.getElementById("ems_47").innerHTML = ems_staff_table_47;

}

// Update page sections every 30 seconds
setInterval(function(){ 
    updatePage(); 
}, 30000);
