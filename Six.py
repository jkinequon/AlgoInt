# Example 1:
#
# Input: [1,2,0]
# Output: 3
# Example 2:
#
# Input: [3,4,-1,1]
# Output: 2
# Example 3:
#
# Input: [7,8,9,11,12]
# Output: 1


from AlgoInt import SixS


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

    def runAllTests(self):
        tests = [self.test_case_1, self.test_case_2, self.test_case_3, self.test_case_4, self.test_case_5, self.test_case_6]
        for test in tests:
            self.total = test()
        return self.total

def runTests():
    testing = Testing()
    value = testing.runAllTests()
    return value


print(runTests())