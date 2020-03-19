import os

class DockerTest:
    def __init__(self, UUID, QuestionID, SolutionString):
        self.UUID = UUID
        self.QuestionID = QuestionID
        self.ErrorData = ""
        self.TestsFailed = ""
        self.TestsTotal = ""
        self.TestTime = ""
        self.SolutionString = SolutionString
        self.OutputData = ""

    def DockerTest(self):
        cmd = "cd user; mkdir "+self.UUID+"; cd "+self.UUID+"; mkdir AlgoInt; cd ../.."
        os.system(cmd)
        cmd = "cp -r ./Problems ./user/"+self.UUID+"/AlgoInt/Problems"
        os.system(cmd)
        cmd = "cp -r Dockerfile ./user/"+self.UUID+"/"
        os.system(cmd)
        f = open("./user/"+self.UUID+"/AlgoInt/Problems/"+self.QuestionID+"S.py", "w")
        f.write(self.SolutionString)
        f.close()
        cmd = "docker run -v /Users/jeremystorring/PycharmProjects/CMPT350/AlgoInt/src/back-end/user/"+self.UUID+\
              "/tmp:/tmp --rm -e user="+self.UUID+" -e path_file="+self.QuestionID+".py python-test"
        os.system(cmd)

    def DockerClean(self):
        cmd = "rm -r ./user/" + self.UUID
        os.system(cmd)

    def readErrors(self):
        str = ""
        file = open("./user/"+self.UUID+"/tmp/err.txt")
        for line in file:
            line = line.rstrip()
            str += line
        self.ErrorData = str

    def readFiles(self):
        file = open("./user/"+self.UUID+"/tmp/file.txt")
        data = []
        for line in file:
            data.append(line.rstrip())
        self.OutputData = data[:-2]
        self.TestsFailed = data[-2]
        self.TestsTotal = data[-1]
        return

    def getTestsFailed(self):
        return self.TestsFailed

    def getErrorData(self):
        return self.ErrorData

    def getTestsTotal(self):
        return self.TestsTotal

    def getOutputData(self):
        return self.OutputData

    def getTestTime(self):
        return self.TestTime


d = DockerTest("UUID", "One", "def getNthFib(num):\n    return num")
d.DockerClean()
d.DockerTest()
