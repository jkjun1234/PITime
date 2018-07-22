var request = require('request');
var http = require('http');
var key = '';  // 서비스 인증키
var url = 'http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastGrib';
var queryParams = '?' + encodeURIComponent('ServiceKey') + key/* Service Key*/

var today = new Date();
var week = new Array('일','월','화','수','목','금','토');
var year = today.getFullYear();
var month = today.getMonth()+1;
var day = today.getDate();
var hours = today.getHours();
var minutes = today.getMinutes();

function getToday() {
  /* example
   * 9시 -> 09시 변경 필요
   */

  if(hours < 10) {
      hours = '0'+hours;
  }
  if(month < 10) {
      month = '0' + month;
  }
  if(day < 10) {
      day = '0' + day;
  }

  today = year+""+month+""+day;

  return today;
}
function getHours() {
  /*
  * 기상청 30분마다 발표
  * 30분보다 작으면, 한시간 전 hours 값
  */
  if(minutes < 30){
    hours = hours - 1;
    if(hours < 0){
      // 자정 이전은 전날로 계산
      today.setDate(today.getDate() - 1);
      day = today.getDate();
      month = today.getMonth()+1;
      year = today.getFullYear();
      hours = 23;
    }
  }
  return hours;
}
function realTimeWeather() {

    $('.weather-date').html(month +"월 " + day + "일 " + week[today.getDay()]+"요일");

    /* 좌표 */
    var _nx = 93,
    _ny = 91,
    apikey = "",
    ForecastGribURL = "http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastGrib";
    ForecastGribURL += "?ServiceKey=" + apikey;
    ForecastGribURL += "&base_date=" + today;
    ForecastGribURL += "&base_time=" + hours +"00";
    ForecastGribURL += "&nx=" + _nx + "&ny=" + _ny;
    ForecastGribURL += "&pageNo=1&numOfRows=7";
    ForecastGribURL += "&_type=json";
}

queryParams += '&' +'ServiceKey' + '=' + encodeURIComponent(key); /* 서비스 인증 */
queryParams += '&' +'base_date' + '=' + encodeURIComponent(getToday()); /* ‘15년 12월 1일 발표 */
queryParams += '&' + 'base_time' + '=' + encodeURIComponent(getHours() + '00'); /* 06시 발표(정시단위) -매시각 40분 이후 호출 */
queryParams += '&' + 'nx' + '=' + encodeURIComponent('93'); /* 예보지점의 X 좌표값 */
queryParams += '&' + 'ny' + '=' + encodeURIComponent('91'); /* 예보지점의 Y 좌표값 */
queryParams += '&' + 'numOfRows' + '=' + encodeURIComponent('5'); /* 한 페이지 결과 수 */
queryParams += '&' + 'pageNo' + '=' + encodeURIComponent('1'); /* 페이지 번호 */
queryParams += '&' + '_type' + '=' + encodeURIComponent('json'); /* xml(기본값), json코드로 변경 */

request({
    url: url + queryParams,
    method: 'GET'
}, function (error, response, body) {
    console.log('error:', error);
    //console.log('Status', response && response.statusCode);
    console.log('Headers', JSON.stringify(response.headers));
    console.log('Reponse received', body);
    console.log(getToday());
});
