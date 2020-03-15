from AlgoInt.Problems import TwoS.py
import multiprocessing
import time

class Testing:
    def __init__(self):
        self.total = 0

    def test_case_1(self):
        if TwoS.mostCommon([1]) != 1:
            return 1
        else:
            return 0

    def test_case_2(self):
        if TwoS.mostCommon([2, 1, 2]) != 2:
            return 1
        else:
            return 0

    def test_case_3(self):
        if TwoS.mostCommon([0, 0, 1, 1, 1]) != 1:
            return 1
        else:
            return 0

    def test_case_4(self):
        if TwoS.mostCommon([3, 3, 3, 3, 3, 3]) != 3:
            return 1
        else:
            return 0

    def runAllTests(self, proc):
        tests = [self.test_case_1, self.test_case_2, self.test_case_3, self.test_case_4]
        for test in tests:
            self.total = test()
        proc.put(self.total)
        return self.total

def runTests():
    testing = Testing()
    q = multiprocessing.Queue()
    p = multiprocessing.Process(target=testing.runAllTests, args=(q,))
    p.start()
    time.sleep(10)
    p.join()
    p.terminate()
    return q.get()


print(runTests())