# nums1 = [1, 3]
# nums2 = [2]
#
# The median is 2.0
#
# nums1 = [1, 2]
# nums2 = [3, 4]
#
# The median is (2 + 3)/2 = 2.5

from AlgoInt import FiveS


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

    def runAllTests(self):
        tests = [self.test_case_1, self.test_case_2, self.test_case_3, self.test_case_4, self.test_case_5]
        for test in tests:
            self.total = test()
        return self.total

def runTests():
    testing = Testing()
    value = testing.runAllTests()
    return value


print(runTests())