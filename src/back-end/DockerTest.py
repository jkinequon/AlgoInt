"""
This is the main component of the backend, it creates the docker container and proper user folders to ensure
we can run the users code safely in an environment where our application will not be affected.
"""
import os

class DockerTest:
    def __init__(self, UUID, QuestionID, SolutionString):
        """
        Initializes DockerTest so a users code can be ran
        :param UUID: The users unique identifier (username)
        :param QuestionID: The question the user is attempting
        :param SolutionString: The users solution as a string
        """
        self.UUID = UUID
        self.QuestionID = QuestionID
        self.ErrorData = []
        self.TestsFailed = ""
        self.TestsTotal = ""
        self.TestTime = ""
        self.SolutionString = SolutionString
        self.OutputData = ""

    def DockerTest(self):
        """
        This command sets the necessary folders and files up to ensure we can run the users code. First we remove
        any existing folders with that users UUID, and then create a folder for that user. Next we copy our question
        test drivers to the users folder, as well as the Dockerfile (which sets up docker). We use the solution string
        and create a python file and then run the docker container with the users solution.
        """
        cmd = "rm -rf ./user/"+self.UUID
        os.system(cmd)
        cmd = "cd user; mkdir "+self.UUID+"; cd "+self.UUID+"; mkdir AlgoInt; cd ../.."
        os.system(cmd)
        cmd = "cp -r ./Problems ./user/"+self.UUID+"/AlgoInt/Problems"
        os.system(cmd)
        cmd = "cp -r Dockerfile ./user/"+self.UUID+"/"
        os.system(cmd)
        f = open("./user/"+self.UUID+"/AlgoInt/Problems/"+self.QuestionID+"S.py", "w")
        f.write(self.SolutionString)
        f.close()
        cmd = "docker run -v /home/justicesk/Documents/Master/AlgoInt/src/back-end/user/"+self.UUID+\
              "/AlgoInt:/AlgoInt --rm -e user="+self.UUID+" -e path_file="+self.QuestionID+".py python-test"
        os.system(cmd)

    def DockerClean(self):
        """
        Cleans up the users directory so we can run code again
        """
        cmd = "rm -r ./user/" + self.UUID
        os.system(cmd)

    def readErrors(self):
        """
        This reads the 'err.txt' file from Docker
        :param file: Required to be an 'err.txt' file
        Sets the error data to the ErrorData variable
        """
        data = []
        file = open("./user/"+self.UUID+"/AlgoInt/Problems/err.txt")
        for line in file:
            line = line.rstrip()
            data.append(line)
        self.ErrorData = data

    def readFiles(self):
        """
        This reads the file.txt file from Docker
        :param file: Required to be an 'file.txt' file
        The data is then stored in the variables to be handled later.
        """
        file = open("./user/"+self.UUID+"/AlgoInt/Problems/file.txt")
        data = []
        for line in file:
            data.append(line.rstrip())
        self.OutputData = data[:-3]
        self.TestsFailed = data[-3]
        self.TestsTotal = data[-2]
        self.TestTime = data[-1]

    def getTestsFailed(self):
        """
        Getter for the number of tests failed from the users code
        :return: the number of tests failed
        """
        return self.TestsFailed

    def getErrorData(self):
        """
        Getter for the error data from the users code
        :return: The error data
        """
        return self.ErrorData

    def getTestsTotal(self):
        """
        Getter for the number of test cases for the question
        :return: The total test cases
        """
        return self.TestsTotal

    def getOutputData(self):
        """
        Getter for the output from the users program (this includes print statements from their program)
        :return: Output from users solution
        """
        return self.OutputData

    def getTestTime(self):
        """
        Getter for the total time a users solution took
        :return: Total time of users solution
        """
        return self.TestTime

    def testResults(self):
        """
        A function to help with regression testing
        :return:
        """
        return [self.ErrorData, self.TestsFailed, self.TestsTotal]

d = DockerTest("UUID", "One", "def getNthFib(num):\n    return 1")
d.DockerClean()
d.DockerTest()
