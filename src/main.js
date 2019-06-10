import $ from 'jquery';
import {Doctor} from './doctor'

$(document).ready(function(){
    const doctor = new Doctor();

    //clear data each time user searches
    function reset(){
        $("#doctorList").html("");
        $('#error').html("");
    }
    //search doctors by issue
    $("#seachIssue").submit(function(event){
        event.preventDefault();
        reset();
        //get value for user input on search by issue
        let promise = doctor.getByIssue($("#issue").val());
        promise.then(function(response){
            displayData(response);
        }, function(error){
            $("#error").text(`${error.message}`)
        });
    });
    //search doctors by name
    $("#searchName").submit(function(event){
        event.preventDefault();
        reset();
        //get value for user input on search by name
        let promise = doctor.getByName($("#name").val());
        promise.then(function(reponse){
            displayData(reponse);
        }, function(error){
            $("#error").text(`${error.message}`)
        });
    });

function displayData(response){
    let body = JSON.parse(response);
    //if search doesnt match data output an error message
    if(body.data.length < 1){
        $("#error").text("Sorry, but we are unable to find doctors that match your criteria")
    }else{
    //if search does match ouput doctors name, location, and phone number
    body.data.forEach(function(data){
    let newList = `<li>${data.profile.first_name} ${data.profile.last_name}, ${data.practices[0].visit_address.street}, ${data.practices[0].phones[0].number}, `;
    //check to see if doctor is accepting new patients and add message to end of list
    if(data.practices[0].accepts_new_patients){
        newList += ` currently accepting new patients</li>`;
    }else{
        newList += `currently not accepting new patients</li>`
    }
    //if doctors data has a website append it to the list
    if(data.practices[0].website){
        newList += `${data.practices[0].website}`
    }
    //append data to html document
    $("#doctorList").append(newList);
            });
        }
    }
});