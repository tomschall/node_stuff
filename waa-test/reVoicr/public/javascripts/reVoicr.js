var distContainer = new Nexus.Rack("synth")

distContainer.wet.value = 0
distContainer.dist.value = 10
distContainer.speed.value = 1
distContainer.play.value = 0


var phaser = new Tone.Phaser({
	"frequency" : 5, 
	"octaves" : 5, 
	"baseFrequency" : 1000
}).toMaster()

var dist = new Tone.Distortion().connect(phaser)

var player = new Tone.Player("/audio/boring.mp3").connect(dist)

dist.wet.value = distContainer.wet.value
dist.distortion = distContainer.dist.value

player.playbackRate = distContainer.speed.value
player.autostart = false
player.loop = true

distContainer.wet.on('change',function(v) {
  dist.wet.value = v
  console.log(dist.wet.value)
})

distContainer.dist.on('change',function(v) {
  dist.distortion = v
  console.log(dist.distortion)
})

distContainer.speed.on('change',function(v) {
  var speed = v
  player.playbackRate = speed
  console.log(player.playbackRate)
})

distContainer.play.on('change',function(v) {
  if(true == v) {
    player.start()    
  } else {
    player.stop()  
  }
})

