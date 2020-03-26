from AlgoInt.Problems import FiveS
import multiprocessing
import multiprocessing
import time

class Testing:
    def __init__(self):
        self.total = 0

    def test_case_1(self):
        nums1 = [1,3]
        nums2 = [2]
        if FiveS.median(nums1, nums2) != 2.0:
            return 1
        else:
            return 0

    def test_case_2(self):
        nums1 = [1, 2]
        nums2 = [3, 4, 5]
        if FiveS.median(nums1, nums2) != 3:
            return 1
        else:
            return 0

    def test_case_3(self):
        nums1 = [1, 2, 3, 4]
        nums2 = [3, 4, 5, 6]
        if FiveS.median(nums1, nums2) != 7:
            return 1
        else:
            return 0

    def test_case_4(self):
        nums1 = [1, 2]
        nums2 = [3, 4]
        if FiveS.median(nums1, nums2) != 2.5:
            return 1
        else:
            return 0

    def test_case_5(self):
        nums1 = [10, 11, 12]
        nums2 = [9, 10, 11]
        if FiveS.median(nums1, nums2) != 10.5:
            return 1
        else:
            return 0

    def runAllTests(self, proc):
        tests = [self.test_case_1, self.test_case_2, self.test_case_3, self.test_case_4, self.test_case_5]
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

