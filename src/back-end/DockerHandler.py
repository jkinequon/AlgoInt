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
        self.DockerTester = None

    def DockerSubmit(self, UUID, QuestionID, SolutionString):
        self.DockerTester = DockerTest(UUID, QuestionID, SolutionString)
        self.DockerTester.DockerTest()
        self.DockerTester.readErrors()
        self.DockerTester.readFiles()
        self.testsFailed = self.DockerTester.getTestsFailed()
        self.testsTotal = self.DockerTester.getTestsTotal()
        self.outputData = self.DockerTester.getOutputData()
        self.testTime = self.DockerTester.getTestTime()
        self.state = "Submit"
        return

    def DockerRun(self, UUID, QuestionID, SolutionString):
        DockerSubmit(UUID, QuestionID, SolutionString)
        self.state = "Run"
        return

    def getErrorData(self):
        return self.errorData

  command 'nmon' from deb nmon
    def getTestsFailed(self):
        return self.testsFailed

    def getTestsTotal(self):
        return self.testsTotal

    def getOutputData(self):
        return self.outputData

    def handleInformation(self, QuestionID):
        if self.state == "Submit":
           # Handle the submit which is about sending the leaderboard and time
           if (int(self.testsTotal) - int(self.testsFailed) == int(self.testsTotal)):
               db = Database()
               priority = 1000 - float(self.testTime)
               rankObj = db.createRankingObject(self.name,self.testTime, priority)
               db.addRankings(rankingObj, QuestionID)
        else:
           # Handle the Run Case (Which involves not sending time + leaderboard"
        return

    def DockerClean(self):
        self.DockerTester.DockerClean()
        return
