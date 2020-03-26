import os

class DockerTest:
    def __init__(self, UUID, QuestionID, SolutionString):
        self.UUID = UUID
        self.QuestionID = QuestionID
        self.ErrorData = []
        self.TestsFailed = ""
        self.TestsTotal = ""
        self.TestTime = ""
        self.SolutionString = SolutionString
        self.OutputData = ""

    def DockerTest(self):
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
        cmd = "timeout --signal=SIGKILL 12 docker run -v /home/justicesk/Documents/Master/AlgoInt/src/back-end/user/"+self.UUID+\
              "/AlgoInt:/AlgoInt --rm -e user="+self.UUID+" -e path_file="+self.QuestionID+".py python-test"
        os.system(cmd)
        print("Finished")

    def DockerClean(self):
        cmd = "rm -r ./user/" + self.UUID
        os.system(cmd)

    def readErrors(self):
        data = []
        file = open("./user/"+self.UUID+"/AlgoInt/Problems/err.txt")
        for line in file:
            line = line.rstrip()
            data.append(line)
        self.ErrorData = data

    def readFiles(self):
        file = open("./user/"+self.UUID+"/AlgoInt/Problems/file.txt")
        data = []
        for line in file:
            data.append(line.rstrip())
        self.OutputData = data[:-3]
        self.TestsFailed = data[-3]
        self.TestsTotal = data[-2]
        self.TestTime = data[-1]
        print(self.OutputData, self.TestsFailed, self.TestsTotal, self.TestTime)

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

d = DockerTest("UUID", "One", "def getNthFib(num):\n    return 1")
d.DockerClean()
d.DockerTest()
