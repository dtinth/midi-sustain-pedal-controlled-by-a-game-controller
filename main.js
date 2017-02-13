const gamepad = require('gamepad')
const midi = require('midi')

// Set up a new output.
const output = new midi.output()

// Create a virtual output port.
output.openVirtualPort('midi-sustain-pedal-controlled-by-a-game-controller')

// Initialize the library
gamepad.init()

// List the state of all currently attached devices
for (let i = 0, l = gamepad.numDevices(); i < l; i++) {
  console.log(i, gamepad.deviceAtIndex())
}

// Create a game loop and poll for events
setInterval(gamepad.processEvents, 16)
// Scan for new gamepads as a slower rate
setInterval(gamepad.detectDevices, 500)

// Listen for move events on all gamepads
gamepad.on('move', function (id, axis, value) {
  console.log('move', { id: id, axis: axis, value: value })
})

// Listen for button up events on all gamepads
gamepad.on('up', function (id, num) {
  console.log('up', { id: id, num: num })
  if (num === 9) {
    output.sendMessage([ 0xB0, 0x40, 0 ])
  }
})

// Listen for button down events on all gamepads
gamepad.on('down', function (id, num) {
  console.log('down', { id: id, num: num })
  if (num === 9) {
    output.sendMessage([ 0xB0, 0x40, 127 ])
  }
})
