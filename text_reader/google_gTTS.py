from gtts import gTTS
from io import BytesIO
# from playsound import playsound
import pygame
import time

# import os

# mytext = 'Welcome to geeksforgeeks!'

# language = 'en'

# myobj = gTTS(text=mytext, lang=language, slow=True, tld='com.au')

# myobj.save("welcome.mp3")
  
# # Playing the converted file
# os.system("mpg321 welcome.mp3")

def speak(text, language='en'):
    mp3_fo=BytesIO()
    tts = gTTS(text, lang=language,  tld='co.za')
    tts.write_to_fp(mp3_fo)
    return mp3_fo


pygame.init()
pygame.mixer.init()
# sound.seek(0)
sound = speak("Python is cool always")
pygame.mixer.music.load(sound, 'mp3')
pygame.mixer.music.play()
time.sleep(5)