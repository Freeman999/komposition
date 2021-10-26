radio.onReceivedNumber(function (receivedNumber) {
    bpm_erhalten = receivedNumber
})
function Musik (bpm: number) {
    while (müsig) {
        music.setTempo(bpm)
        for (let index = 0; index < 2; index++) {
            music.playTone(262, music.beat(BeatFraction.Whole))
            music.playTone(262, music.beat(BeatFraction.Whole))
            if (Math.map(input.lightLevel(), 0, 255, 0, 2) == 0) {
                music.playTone(330, music.beat(BeatFraction.Whole))
            } else if (Math.map(input.lightLevel(), 0, 255, 0, 2) == 1) {
                music.playTone(392, music.beat(BeatFraction.Whole))
            } else if (Math.map(input.lightLevel(), 0, 255, 0, 2) == 2) {
                music.playTone(262, music.beat(BeatFraction.Whole))
            }
            music.playTone(262, music.beat(BeatFraction.Whole))
        }
    }
}
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(120)
    basic.pause(1000)
    radio.sendString("S")
})
input.onButtonPressed(Button.AB, function () {
    müsig = true
    bpm_erhalten = 120
    Musik(bpm_erhalten)
    basic.pause(15000)
    müsig = false
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "S") {
        müsig = true
        Musik(bpm_erhalten)
    } else if (receivedString == "E") {
        müsig = false
    }
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("E")
})
let bpm_erhalten = 0
let müsig = false
radio.setGroup(28)
radio.setTransmitPower(4)
müsig = false
basic.forever(function () {
    basic.showNumber(bpm_erhalten)
    basic.pause(1000)
    basic.showIcon(IconNames.EigthNote)
})
