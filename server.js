const http = require('http');

const server = module.exports = http.createServer((req, res) => {
  if(req.method === 'GET' && req.url === '/time') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h5>The current date and time is: </h5>' + '<h4>' + new Date() + '</h4>' + '<h6>Brought to you by Jersey Dave</h6>');
    console.log('The current date and time, ' + new Date() +', has been displayed in the browser\n');
    return res.end();
  };
  if(req.method === 'GET' && req.url.indexOf('/greet/') > -1) {
    res.writeHead(200, {'content-type': 'text/html'});
    var nameFromUrl = req.url.slice(7);
    res.write('<h4>What\'s Crackalackin!!?? </h4><h5>keepin\' it heavy, </h5><h3><i>' + nameFromUrl + '</i>?</h3><h2>grooooovy, man....</h2>');
    console.log(nameFromUrl + ', has been greeted like a baller in the browser.\n')
    return res.end();
  };
  if(req.method === 'POST' && req.url === '/greet'){
    res.writeHead(200, {'content-type': 'application/json'});
    req.on('data', (data)=>{
      var jsonPostData = data.toString();
      var parsedJsonData = JSON.parse(jsonPostData);
      if(!parsedJsonData.name){
        console.log('ERROR!!! No property key of name!!\n POST requests to /greet must be in JSON format\n and they must have a property key of "name"\n')
      } else {
      var stringifiedJsonName = parsedJsonData.name;
      res.write(jsonPostData);
      console.log('whats up?? you JSON verion of: "' + stringifiedJsonName + '" , you...\n');
    };
      return res.end();
    });
    return;
  };
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.write('does not exist on this server!!! error: 404\n');
  return res.end();
});
server.listen(3000, () => process.stdout.write('\nServer running on port 3000\n\n Available urls:\n 1. localhost:3000/time - GET gives current date & time\n 2. localhost:3000/greet/name(single word string) - GET greets string at name in url\n 3. localhost:3000/greet - POST greets you with JSON input\n\n WARNING!!!\n\n When making a POST request to localhost:3000/greet,\n Your name must be sent in JSON format\n IE: {"name":"jersey dave"}\n Also, property(key) of you name must be "name"\n or it will throw an error\n P.S. remember to wrap your JSON with single quotes\n when sending POST request with superagent...\n\n'));
