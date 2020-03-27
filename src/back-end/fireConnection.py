"""
A basic connection to the firebase to allow the backend to submit rankings
"""

import requests
import time
from firebase import firebase

class Database:
    def __init__(self):
        """
        Initialize the firebase connection
        """
        self.firebase = firebase.FirebaseApplication("https://onlineide-89276.firebaseio.com/", None)

    def sendQuestions(self, questionObj):
        """
        Sends a new question from the backend to Firebase, which would update the number of questions a user
        can attempt in the website
        :param questionObj: A question object must contain: Programming Language, Question Description,
                            Question difficulty, A list of question hints (max 2), Question Name, corresponding test
                            file name, Question Type (algorithm, data structure, etc), Question Boilerplate,
                            QuestionID
        """
        self.firebase.post('/questions', questionObj)

    def addRankings(self, rankingObj, QuestionID):
        """
        Adds a ranking to Firebase to be displayed to users
        :param rankingObj: Must be a ranking object (dictionary of data)
        :param QuestionID: The question a user completed
        :return:
        """
        dbString = "/"+QuestionID
        self.firebase.post(dbString, rankingObj)

    def createRankingObject(self, name, testTime, priority):
        """
        Creates a ranking object so the back-end can send to firebase
        :param name: The users name
        :param testTime: The time it took to run all the tests
        :param priority: Essentially the score of how well a user did
        :return:
        """
        rankObj = {
            'user': name,
            'time': testTime,
            'priority': priority
        }
        return rankObj

    def checkRankings(self, QuestionID, username):
        """
        In the future will be made to ensure a user can only appear on the rankings once per question.
        :param QuestionID: The question to be checked (then submitted)
        :param username: The username
        """
        self.firebase.get()
