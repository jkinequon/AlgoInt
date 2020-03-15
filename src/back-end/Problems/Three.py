from AlgoInt.Problems import ThreeS.py
import multiprocessing
import time

class Testing:
    def __init__(self):
        self.total = 0

    def test_case_1(self):
        if ThreeS.lengthOfLongestSubstring('abcabcbb') != 3:
            return 1
        else:
            return 0

    def test_case_2(self):
        if ThreeS.lengthOfLongestSubstring('bbbbb') != 3:
            return 1
        else:
            return 0

    def test_case_3(self):
        if ThreeS.lengthOfLongestSubstring('pwwkew') != 3:
            return 1
        else:
            return 0

    def test_case_4(self):
        if ThreeS.lengthOfLongestSubstring('aababcabcdabcdeabcdefabcdefg') != 7:
            return 1
        else:
            return 0

    def test_case_5(self):
        if ThreeS.lengthOfLongestSubstring('CODINGISAWESOME') != 7:
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