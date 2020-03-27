"""
Another main component of the backend, this is what the Server actually deals with rather than with DockerTest.py.
"""


from DockerTest import DockerTest
from fireConnection import Database

class handleDocker:
    def __init__(self, name):
        """
        Initializes the variables to be sent to the backend and to submit to DockerTest.py
        :param name: The users name
        """
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
        """
        This code is specifically if the user wishes to submit their code, which would involve a ranking being set
        in the database for them (upon completion).
        :param UUID: The users name (or unique identifier)
        :param QuestionID: The question the user is attempting
        :param SolutionString: The users solution
        """
        self.DockerTester = DockerTest(UUID, QuestionID, SolutionString)
        self.DockerTester.DockerTest()
        self.DockerTester.readErrors()
        self.DockerTester.readFiles()
        self.testsFailed = self.DockerTester.getTestsFailed()
        self.testsTotal = self.DockerTester.getTestsTotal()
        self.outputData = self.DockerTester.getOutputData()
        self.testTime = self.DockerTester.getTestTime()
        self.state = "Submit"

    def DockerRun(self, UUID, QuestionID, SolutionString):
        """
        This code is specifically if the user does not wish to submit their code, but would rather run it for testing
        purposes.
        :param UUID: The users name (or unique identifier)
        :param QuestionID: The question the user is attempting
        :param SolutionString: The users solution
        """
        self.DockerSubmit(UUID, QuestionID, SolutionString)
        self.state = "Run"

    def getErrorData(self):
        """
        Getter for the users error data
        :return: List of users error data
        """
        return self.errorData

    def getTestsFailed(self):
        """
        Getter for the number of tests failed
        :return: The number of test failed
        """
        return self.testsFailed

    def getTestsTotal(self):
        """
        Getter for the total number of tests for a question
        :return: The total number of tests
        """
        return self.testsTotal

    def getOutputData(self):
        """
        Getter for the output data from the users solution code
        :return: A list of output data
        """
        return self.outputData

    def getResponse(self):
        """
        Getter for the response to send back to the user (and for the database); these responses can be Failed, Compile
        Error, Timeout Error, and Success
        :return: Results of users code
        """
        return self.response

    def handleInformation(self, QuestionID):
        """
        If the users code was successful then the users data will be submitted to the database
        :param QuestionID: The question the user attempted
        """
        if self.state == "Submit":
           if int(self.testsTotal) - int(self.testsFailed) == int(self.testsTotal):
               db = Database()
               priority = float(self.testTime)
               rankObj = db.createRankingObject(self.name,self.testTime, priority)
               db.addRankings(rankObj, QuestionID)

    def dockerStatus(self):
        """
        Determines the state of the the users response based on the number of tests failed, passed, the length of the
        error data, and the amount of time the users solution took
        """
        if int(self.testsFailed) > 0:
            self.response = "Failed"
        elif len(self.errorData) != 0:
            self.response = "Compile Error"
        elif int(self.testsFailed) == 0:
            self.response = "Success"
        elif float(self.testTime) > 10:
            self.response = "Timeout Error"

    def DockerClean(self):
        """
        Cleans the user directory created by DockerTest so a user can run code again if desired.
        """
        self.DockerTester.DockerClean()

