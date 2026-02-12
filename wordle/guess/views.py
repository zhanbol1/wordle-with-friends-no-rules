from django.shortcuts import render
from django.http import HttpResponse

num_str = "0123456789"
decoder = "абвгдежзийклмнопрстуфхцчшщъыьэюяөүң"

def decode(word):
    word = word[6:]
   
    secret_word = ""
    code = ""
    for char in word:
        if char not in num_str:
            if code:
                secret_word += decoder[int(code)]
                code = ""
        else:
            code+=char

    return secret_word 

def home(request):
    return render(request, "guess/home.html")

def game(request, word):
    return render(request, "guess/game.html", {
        "sixRows" : range(6),
        "word" : decode(word)
    })
