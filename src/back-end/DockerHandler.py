from DockerTest import DockerTest

class handleDocker:
    def __init__(self):
        self.errorData = []
        self.testsFailed = 0
        self.testsTotal = 0
        self.outputData = []
        self.SolutionString = ""

    def DockerSubmit(self, UUID, QuestionID, SolutionString):
        DockerTester = DockerTest(UUID, QuestionID, SolutionString)
        DockerTester.DockerTest()
        DockerTester.readErrors()
        DockerTester.readFiles()
        return

    def DockerRun(self, UUID, QuestionID, SolutionString):
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
        return
