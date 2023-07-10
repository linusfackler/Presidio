from googlesearch import search
from googleapiclient.discovery import build
from bs4 import BeautifulSoup
import requests
import openai

openai.api_key = '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'

def getresponse(question):
    response = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=[{"role": "user", "content": question}])

    return response.choices[0].message.content

def main():
    user_input = input("What do you want to ask?\n")
    response = getresponse(user_input)
    print("Bot: ", response)\

if __name__ == "__main__":
    main()