error = open("Error.txt", "r")
output = open("Output.txt", "r")


def readOutput(file):
    userLog = []
    serverLog = []
    currArr = userLog
    for line in file:
        line = line.strip()
        if line[0:5] == "UUID:":
            currArr = serverLog
        currArr.append(line)
    return userLog, serverLog


def readErrors(file):
    errorLog = []
    for line in file:
        line = line.rstrip().split()
        errorLog.append(line)
    return errorLog

user, server = readOutput(output)
errors = readErrors(error)
