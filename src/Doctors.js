export class Doctors {

    getDoctors(search){
  
      return new Promise(function(resolve, reject){
        let request = new XMLHttpRequest();
        let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${search}&location=wa-seattle&limit=25&user_key=${process.env.exports.apiKey}`;
  
        request.onload = function() {
          if(this.status == 200) {
            resolve(JSON.parse(request.response));
          }
          else {
            reject(alert(Error(request.statusText)));
          }
        };
        request.open("GET", url, true);
        request.send();
      });
    }
  }