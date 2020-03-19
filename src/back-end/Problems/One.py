from AlgoInt.Problems import OneS.py
import multiprocessing
import time

class Testing:
    def __init__(self):
        self.total = 0

    def test_case_1(self):
        if (OneS.getNthFib(1)) != 1:
            return 1
        else:
            return 0
 
    def test_case_2(self):
        if (OneS.getNthFib(7)) != 13:
            return 1
        else:
            return 0
 
    def test_case_3(self):
        if (OneS.getNthFib(14)) != 377:
            return 1
        else:
            return 0

    def test_case_4(self):
        if (OneS.getNthFib(16)) != 987:
             return 1
        else:
            return 0
 
    def test_case_5(self):
        if (OneS.getNthFib(17)) != 1597:
            return 1
        else:
            return 0

    def runAllTests(self, proc):
        tests =  [self.test_case_1, self.test_case_2, self.test_case_3, self.test_case_4, self.test_case_5]
        start_time = time.time()
        for test in tests:
            self.total = test()
        end_time = time.time()
        total_time = end_time - start_time
        proc.put([self.total, len(tests), total_time])
        return self.total, len(tests), total_time

def runTests(): 
    testing = Testing()
    q = multiprocessing.Queue()
    p = multiprocessing.Process(target=testing.runAllTests, args=(q,))
    p.start()
    time.sleep(10)
    p.join()
    p.terminate()
    return q.get()



val = runTests()
print("Failed: ", val[0])
print("Total: ", val[1])
print("Time: ", val[2])

 
