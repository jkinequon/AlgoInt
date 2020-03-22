from AlgoInt.Problems import SixS
import multiprocessing
import time

class Testing:
    def __init__(self):
        self.total = 0

    def test_case_1(self):
        nums = [1,2,0]
        if SixS.firstMissingPositive(nums) != 3:
            return 1
        else:
            return 0

    def test_case_2(self):
        nums = [3,4,-1,1]
        if SixS.firstMissingPositive(nums) != 2:
            return 1
        else:
            return 0

    def test_case_3(self):
        nums = [7,8,9,11,12]
        if SixS.firstMissingPositive(nums) != 1:
            return 1
        else:
            return 0

    def test_case_4(self):
        nums = [x for x in range(1001) if x != 867]
        if SixS.firstMissingPositive(nums) != 867:
            return 1
        else:
            return 0

    def test_case_5(self):
        nums = [x for x in range(100) if x != 23]
        if SixS.firstMissingPositive(nums) != 23:
            return 1
        else:
            return 0

    def test_case_6(self):
        nums = [x for x in range(-100,1)]
        if SixS.firstMissingPositive(nums) != 1:
            return 1
        else:
            return 0

    def runAllTests(self, proc):
        tests = [self.test_case_1, self.test_case_2, self.test_case_3, self.test_case_4, self.test_case_5, self.test_case_6]
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
print(val[0])
print(val[1])
print(val[2])
