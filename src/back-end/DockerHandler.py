from DockerTest import DockerTest
from fireConnection import Database

class handleDocker:
    def __init__(self, name):
        self.errorData = []
        self.testsFailed = 0
        self.testsTotal = 0
        self.outputData = []
        self.testTime = 0
        self.SolutionString = ""
        self.state = ""
        self.name = name
        self.response = None
        self.DockerTester = None

    def DockerSubmit(self, UUID, QuestionID, SolutionString):
        self.DockerTester = DockerTest(UUID, QuestionID, SolutionString)
        self.DockerTester.DockerTest()
        print("Got passed here")
        self.DockerTester.readErrors()
        self.DockerTester.readFiles()
        self.testsFailed = self.DockerTester.getTestsFailed()
        self.testsTotal = self.DockerTester.getTestsTotal()
        self.outputData = self.DockerTester.getOutputData()
        self.testTime = self.DockerTester.getTestTime()
        self.state = "Submit"
        print(self.testsFailed, self.testsTotal, self.outputData,
            self.testTime)

    def DockerRun(self, UUID, QuestionID, SolutionString):
        self.DockerSubmit(UUID, QuestionID, SolutionString)
        self.state = "Run"

    def getErrorData(self):
        return self.errorData

    def getTestsFailed(self):
        return self.testsFailed

    def getTestsTotal(self):
        return self.testsTotal

    def getOutputData(self):
        return self.outputData

    def getResponse(self):
        return self.response
    def handleInformation(self, QuestionID):
        if self.state == "Submit":
           # Handle the submit which is about sending the leaderboard and time
           if (int(self.testsTotal) - int(self.testsFailed) == int(self.testsTotal)):
               db = Database()
               priority = float(self.testTime)
               rankObj = db.createRankingObject(self.name,self.testTime, priority)
               db.addRankings(rankObj, QuestionID)

    def dockerStatus(self):
        if int(self.testsFailed) > 0:
            self.response = "Failed"
        elif len(self.errorData) != 0:
            self.response = "Compile Error"
        elif int(self.testsFailed) == 0:
            self.response = "Success"
        elif float(self.testTime) > 10:
            self.response = "Timeout Error"


    def DockerClean(self):
        self.DockerTester.DockerClean()
