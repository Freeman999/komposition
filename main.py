def on_received_number(receivedNumber):
    global bpm_erhalten
    bpm_erhalten = receivedNumber
radio.on_received_number(on_received_number)

def on_button_pressed_a():
    radio.send_number(120)
    basic.pause(1000)
    radio.send_string("S")
    basic.show_string("S")
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    global debug_mode, müsig, bpm_erhalten
    debug_mode = True
    müsig = True
    bpm_erhalten = 100
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_received_string(receivedString):
    global müsig
    if receivedString == "S":
        müsig = True
    elif receivedString == "E":
        müsig = False
radio.on_received_string(on_received_string)

def on_button_pressed_b():
    radio.send_string("E")
    basic.show_string("E")
input.on_button_pressed(Button.B, on_button_pressed_b)

bpm_erhalten = 0
debug_mode = False
müsig = False
müsig = False
debug_mode = False
radio.set_group(28)
radio.set_transmit_power(4)

def on_forever():
    while müsig:
        music.set_tempo(bpm_erhalten)
        music.play_tone(262, music.beat(BeatFraction.WHOLE))
        music.play_tone(262, music.beat(BeatFraction.WHOLE))
        if Math.round(Math.map(input.light_level(), 0, 255, 0, 2)) == 0:
            music.play_tone(330, music.beat(BeatFraction.WHOLE))
        elif Math.round(Math.map(input.light_level(), 0, 255, 0, 2)) == 1:
            music.play_tone(392, music.beat(BeatFraction.WHOLE))
        elif Math.round(Math.map(input.light_level(), 0, 255, 0, 2)) == 2:
            music.play_tone(523, music.beat(BeatFraction.WHOLE))
        music.play_tone(262, music.beat(BeatFraction.WHOLE))
basic.forever(on_forever)
