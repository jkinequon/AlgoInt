import os

class DockerTest:
    def __init__(self, UUID, QuestionID, SolutionString):
        self.UUID = UUID
        self.QuestionID = QuestionID
        self.ErrorData = ""
        self.TestsFailed = ""
        self.TestsTotal = ""
        self.TestTime = ""
        self.SolutionString = ""
        self.OutputData = ""

    def DockerTest(self):
        cmd = "cd user; mkdir "+self.UUID+"; cd "+self.UUID+"; mkdir AlgoInt; cd ../.."
        os.system(cmd)
        cmd = "cp -r ./Problems ./user/"+self.UUID+"/Problems"
        os.system(cmd)
        cmd = "cp -r Dockerfile ./user/"+self.UUID+"/"
        os.system(cmd)
        f = open("./user/"+self.UUID+"/"+self.QuestionID+"S.py", "w")
        f.write(self.SolutionString)
        f.close()
        cmd = "docker run -v /home/justicesk/Documents/Test/AlgoInt/src/back-end/user/"+self.UUID+\
              "/tmp:/tmp -it --rm -e user="+self.UUID+" -e path_file="+self.QuestionID+".py python-test"
        os.system(cmd)


    def DockerClean(self):
        cmd = "rm -r ./" + self.UUID
        os.system(cmd)