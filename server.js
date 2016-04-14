const http = require('http');

const server = module.exports = http.createServer((req, res) => {
  if(req.method === 'GET' && req.url === '/time') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h5>The current date and time is: </h5>' + '<h4>' + new Date() + '</h4>' + '<h6>Brought to you by Jersey Dave</h6>');
    console.log('The current date and time, ' + new Date() +', has been displayed in the browser');
    return res.end();
  };
  if(req.method === 'GET' && req.url.indexOf('/greet/') > -1) {
    res.writeHead(200, {'content-type': 'text/html'});
    var nameFromUrl = req.url.slice(7);
    res.write('<h4>What\'s Crackalackin!!?? </h4><h5>keepin\' it heavy, </h5><h3><i>' + nameFromUrl + '</i>?</h3><h2>grooooovy, man....</h2>');
    console.log(nameFromUrl + ', has been greeted like a baller in the browser.')
    return res.end();
  };
  if(req.method === 'POST' && req.url === '/greet'){
    res.writeHead(200, {'content-type': 'application/json'});
    req.on('data', (data)=>{
      var jsonPostData = data.toString();
      res.write(jsonPostData);
      console.log('whats up?? you JSON verion of: ' + jsonPostData + ', you...');
      return res.end();
    });
    return;
  };
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.write('does not exist on this server!!! error: 404');
  return res.end();
});
server.listen(3000, () => process.stdout.write('Server running on port 3000\n'));
