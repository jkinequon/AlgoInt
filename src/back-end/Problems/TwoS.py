# Most common number in a list

def mostCommon(list):
    counter = 0
    num = list[0]

    for i in list:
        curr_frequency = list.count(i)
        if (curr_frequency > counter):
            counter = curr_frequency
            num = i

    return num