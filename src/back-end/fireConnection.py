import requests
import time
from firebase import firebase

class Database:
    def __init__(self):
        self.firebase = firebase.FirebaseApplication("https://onlineide-89276.firebaseio.com/", None)

    def sendQuestions(self, questionObj):
        self.firebase.post('/questions', questionObj)

    def addRankings(self, rankingObj, QuestionID):
        dbString = "/"+QuestionID
        self.firebase.post(dbString, rankingObj)

    def createRankingObject(self, name, testTime, priority):
        rankObj = {
            'user': name,
            'time': testTime,
            'priority': priority
        }
        return rankObj
