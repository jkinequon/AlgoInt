from DockerTest import DockerTest

class handleDocker:
    def __init__(self):
        self.errorData = []
        self.testsFailed = 0
        self.testsTotal = 0
        self.outputData = []
        self.testTime = 0
        self.SolutionString = ""
        self.state = ""
        self.DockerTester = None

    def DockerSubmit(self, UUID, QuestionID, SolutionString):
        self.DockerTester = DockerTest(UUID, QuestionID, SolutionString)
        self.DockerTester.DockerTest()
        self.DockerTester.readErrors()
        self.DockerTester.readFiles()
        self.testsFailed = self.DockerTester.getTestsFailed()
        self.testsTotal = self.DockerTester.getTestsTotal()
        self.outputData = self.DockerTester.getOutputData()
        self.testTime = self.DockerTester.get.TestTime()
        self.state = "Submit"
        return

    def DockerRun(self, UUID, QuestionID, SolutionString):
        DockerSubmit(UUID, QuestionID, SolutionString)
        self.state = "Run"
        return

    def getErrorData(self):
        return self.errorData

    def getTestsFailed(self):
        return self.testsFailed

    def getTestsTotal(self):
        return self.testsTotal

    def getOutputData(self):
        return self.outputData

    def handleInformation(self):
        return

    def DockerClean(self):
        self.DockerTester.DockerClean()
        return
