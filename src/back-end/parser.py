"""
Simple functions to read from the files produced by the docker container
"""
error = open("Error.txt", "r")
output = open("Output.txt", "r")


def readOutput(file):
    """
    This reads the output.txt file from Docker
    :param file: Required to be an 'Output.txt' file
    :return: Returns a userlog (information to send back to the user) and a serverLog which is information for our end
             to send to the database, and determine if their code was successful or not
    """
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
    """
    This reads the 'error.txt' file from Docker
    :param file: Required to be an 'Error.txt' file
    :return: Returns an errorLog to return to the user.
    """
    errorLog = []
    for line in file:
        line = line.rstrip().split()
        errorLog.append(line)
    return errorLog

user, server = readOutput(output)
errors = readErrors(error)
