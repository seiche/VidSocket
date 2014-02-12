##Vid-Socket

Most of the scripts in here were taken as a proof of concept from jsmpeg.
https://github.com/phoboslab/jsmpeg

This repo is ofr streaming content from a windows host to a web page and
get input from the page to the host, so I can play windows games on a 
chromebook and other shenanigans like that.

Probably some stuff I'm missing like dependencies and all of that (see jsmpeg
documentation), but the server can be run with ```node stream-server.js args```, 
web client can be loaded and viewed with ```stream-example.html```.

For the streaming host, ffmpeg needs to be set up and running. This video: 
http://www.youtube.com/embed/kW1YFwTLpSw offers a really good tutorial for that.

ffmpeg can be streamed from the windows host with
```
ffmpeg -f dshow -i video="screen-capture-recorder" -r 24 -maxrate 500k -bufsize 3M -f mpeg1video http://your_server_ip.com:8082/args/1280/720
```
