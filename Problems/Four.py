import AlgoInt
import multiprocessing
import time

class Testing:
    def __init__(self):
        self.total = 0

    def test_case_1(self):
        if AlgoInt.Problems.FourS.int_to_Roman(3) != "III":
            return 1
        else:
            return 0

    def test_case_2(self):
        if AlgoInt.Problems.FourS.int_to_Roman(4) != "IV":
            return 1
        else:
            return 0

    def test_case_3(self):
        if AlgoInt.Problems.FourS.int_to_Roman(9) != "IX":
            return 1
        else:
            return 0

    def test_case_4(self):
        if AlgoInt.Problems.FourS.int_to_Roman(58) != "LVIII":
            return 1
        else:
            return 0

    def test_case_5(self):
        if AlgoInt.Problems.FourS.int_to_Roman(1994) != "MCMXCIV":
            return 1
        else:
            return 0

    def runAllTests(self, proc):
        tests = [self.test_case_1, self.test_case_2, self.test_case_3, self.test_case_4, self.test_case_5]
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