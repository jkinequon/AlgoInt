import requests
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

    def getChallenge(self):
        return

    def createRankingObject(self):
        return

    def createChallengeObject(self):
        return

database = Database()

questionObj1 = {
    "QuestionID": 1,
    "QuestionName": "Nth Fibonacci",
    "Question Description": "The Fibonacci sequence is a total value such that each number is the sum of the two "
                            "preceding ones, starting from 0 and 1.",
    "Question Hints": ["Hint 1: ", "Hint 2: "],
    "Question Difficulty": "Easy",
    "Question Python File": "One"
}

database.sendQuestions(questionObj1)

questionObj2 = {
    "QuestionID": 2,
    "QuestionName": "Most common number",
    "Question Description": "You are required to find the most common number that occurs in the list, there will never"
                            "be a list with 2 values with an equal count",
    "Question Hints": ["Hint 1: ", "Hint 2: "],
    "Question Difficulty": "Easy",
    "Question Python File": "Two"
}

database.sendQuestions(questionObj2)

questionObj3 = {
    "QuestionID": 3,
    "QuestionName": "Longest substring",
    "Question Description": "You are required to find the length of the longest substring with no repeating values,"
                            "i.e. if you had abcdeabcdefg, the answer would be 7, because the substring abcdefg is the"
                            "longer substring with no repeating characters",
    "Question Hints": ["Hint 1: ", "Hint 2: "],
    "Question Difficulty": "Medium",
    "Question Python File": "Three"
}

database.sendQuestions(questionObj3)


questionObj4 = {
    "QuestionID": 4,
    "QuestionName": "Roman Numerals",
    "Question Description": "You will be given a number that you will have to convert to roman numerals; for example"
                            "if you were given 1, your answer would be I, if you were given 11 the answer would be"
                            "XI",
    "Question Hints": ["Hint 1: ", "Hint 2: "],
    "Question Difficulty": "Medium",
    "Question Python File": "Four"
}

database.sendQuestions(questionObj4)
# There are two sorted arrays nums1 and nums2 of size m and n respectively.
#
# Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).
#
# You may assume nums1 and nums2 cannot be both empty.

questionObj5 = {
    "QuestionID": 5,
    "QuestionName": "Median arrays",
    "Question Description": "There are two sorted arrays, nums 1 and nums2 of size m and n. Find the median of the"
                            "two sorted arrays. The overall run time complexity should be O(log(m+n)). You may"
                            "assume nums1 and nums2 cannot be both empty.",
    "Question Hints": ["Hint 1: ", "Hint 2: "],
    "Question Difficulty": "Hard",
    "Question Python File": "Five"
}

database.sendQuestions(questionObj5)

# Given an unsorted integer array, find the smallest missing positive integer.

# Your algorithm should run in O(n) time and uses constant extra space.

questionObj6 = {
    "QuestionID": 6,
    "QuestionName": "Smallest missing number",
    "Question Description": "Given an unsorted integer array, find the smallest missing positive integer. Your "
                            "algorithm should run in O(n) time and uses constant extra space.",
    "Question Hints": ["Hint 1: ", "Hint 2: "],
    "Question Difficulty": "Hard",
    "Question Python File": "Six"
}

database.sendQuestions(questionObj6)