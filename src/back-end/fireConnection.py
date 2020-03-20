import requests
import time
from firebase import firebase

class Database:
    def __init__(self):
        self.firebase = firebase.FirebaseApplication("https://onlineide-89276.firebaseio.com/", None)

    def sendQuestions(self, questionObj):
        self.firebase.post('/questions', questionObj)

    def getRankings(self):
        return

    def updateRankings(self):
        return

    def addRankings(self, rankingObj, QuestionID):
        self.firebase.post("/rankings/"+QuestionID, rankingObj)

    def getChallenge(self):
        return

    def createRankingObject(self, name, testTime, priority):
        rankObj = {
            username: name,
            time: testTime,
            priority: priority
        }
        return rankObj

    def createChallengeObject(self):
        return

    def newUser(self, userObj):
        self.firebase.post("/user", userObj)
