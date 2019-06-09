export default class Doctors{
    //this will get all the doctors in seattle area
    getAllDoctors(){
        return new Promise(function(resolve, reject){
            let request = new XMLHttpRequest();
            let url = 'https://api.betterdoctor.com/2016-03-01/doctors?location=47.608013%2C%20-122.335167%2C100&user_location=47.608013%2C%20-122.335167&skip=0&limit=100&user_key=3af7b82cbec1566d6ae4b3986aebd299';
            request.onload = function(){
                if(this.status === 200){
                    resolve(request.response);
                }
            }
            request.open("GET", url, true);
            request.send();
        });
    }
    // this will find a doctor by thier name
    getDoctorsByName(name){
        return new Promise(function(resolve, reject){
            let request = new XMLHttpRequest();
            let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${name}&location=47.608013%2C%20-122.335167%2C100&user_location=47.608013%2C%20-122.335167&skip=0&limit=40&user_key=3af7b82cbec1566d6ae4b3986aebd299`;
            request.onload = function(){
                if(this.status === 200){
                    resolve(request.response);
                }else{
                    reject(Error(request.statusText));
                }
            }
            request.open("GET", url, true);
        });
    }
}