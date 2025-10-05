# program that turns the led on when the button is pressed

from machine import Pin

led = Pin(2, Pin.OUT)

button = Pin(4, Pin.IN, Pin.PULL_UP)

while True:
    if button.value() == 0:  # button is pressed
        led.value(1)  # turn led on
    else:
        led.value(0)  # turn led off

# program ends here

