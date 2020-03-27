import DockerTest


test_cases = [
    # Q1
    {'inputs' : ["UUID", "One", "def getNthFib(num):\n  return 0"],
     'outputs': [[], 5, 5],
     'reason' : "None of the test cases should not pass"},
    {'inputs': ["UUID", "One", "def getNthFib(N):\n    if (N <= 1):\n        return 1\n    if (N == 2):\n"
                               "        return 1\n    current = 0\n    prev1 = 1\n    prev2 = 1\n\n"
                               "    for i in range(3, N+1):\n        current = prev1 + prev2\n        prev2 = prev1\n"
                               "        prev1 = current\n    return current"],
     'outputs': [[], 0, 5],
     'reason': "All of the test cases with this input should pass"},
    # Q2
    {'inputs': ["UUID", "One", "def mostCommon(list):\n  return 0"],
     'outputs': [[], 4, 4],
     'reason' : "None of the test cases should not pass"},
    {'inputs': ["UUID", "One", "def mostCommon(list):\n    counter = 0\n    num = list[0]\n\n    for i in list:\n"
                               "        curr_frequency = list.count(i)\n        if (curr_frequency > counter):\n"
                               "            counter = curr_frequency\n            num = i\n\n    return num"],
     'outputs': [[], 0, 4],
     'reason': "All of the test cases with this input should pass"},
    # Q3
    {'inputs': ["UUID", "One", "def lengthOfLongestSubstring(s):\n  return 0"],
     'outputs': [[], 5, 5],
     'reason' : "None of the test cases should not pass"},
    {'inputs': ["UUID", "One", "def lengthOfLongestSubstring(s):\n    str_list = []\n    max_length = 0\n\n"
                               "    for x in s:\n        if x in str_list:\n"
                               "            str_list = str_list[str_list.index(x) + 1:]\n\n        str_list.append(x)\n"
                               "        max_length = max(max_length, len(str_list))\n\n    return max_length"],
     'outputs': [[], 0, 5],
     'reason': "All of the test cases with this input should pass"},
    # Q4
    {'inputs': ["UUID", "One", "def int_to_Roman(num):\n  return 0"],
     'outputs': [[], 5, 5],
     'reason' : "None of the test cases should not pass"},
    {'inputs': ["UUID", "One", "def int_to_Roman(num):\n    val = [\n        1000, 900, 500, 400,\n"
                               "        100, 90, 50, 40,\n        10, 9, 5, 4,\n        1\n    ]\n    syb = [\n"
                               "        'M', 'CM', 'D', 'CD',\n        'C', 'XC', 'L', 'XL',\n"
                               "        'X', 'IX', 'V', 'IV',\n        'I'\n    ]\n    roman_num = ''\n    i = 0\n"
                               "    while num > 0:\n        for _ in range(num // val[i]):\n"
                               "            roman_num += syb[i]\n            num -= val[i]\n        i += 1\n"
                               "    return roman_num"],
     'outputs': [[], 0, 5],
     'reason': "All of the test cases with this input should pass"},

    {'inputs': ["UUID", "One", "def median(A, B):\n  return 0"],
     'outputs': [[], 5, 5],
     'reason': "None of the test cases should not pass"},
    {'inputs': ["UUID", "One", "def median(A, B):\n    A.extend(B)\n    A.sort()\n    if len(A) % 2 == 0:\n"
                               "        return (A[(int(len(A)//2))-1]+A[(int(len(A)//2))])/2\n    else:\n"
                               "        return A[(int((len(A)-1)/2))]\n"],
     'outputs': [[], 0, 5],
     'reason': "All of the test cases with this input should pass"},

    {'inputs': ["UUID", "One", "def firstMissingPositive(nums):\n  return 0"],
     'outputs': [[], 6, 6],
     'reason': "None of the test cases should not pass"},
    {'inputs': ["UUID", "One", "def firstMissingPositive(A):\n    m = max(A)\n    if m < 1:\n        return 1\n"
                               "    if len(A) == 1:\n        return 2 if A[0] == 1 else 1\n    l = [0] * m\n"
                               "    for i in range(len(A)):\n        if A[i] > 0:\n            if l[A[i] - 1] != 1:\n"
                               "                l[A[i] - 1] = 1\n    for i in range(len(l)):\n        if l[i] == 0:\n"
                               "            return i + 1\n    return i + 2"],
     'outputs': [[], 0, 6],
     'reason': "All of the test cases with this input should pass"},
]

for test in test_cases:
    inputs = test['inputs']
    result = DockerTest(inputs[0], inputs[1], inputs[2])
    result.DockerClean()
    result.DockerTest()
    output = result.testResults()
    if output[0] != test['outputs'][0] and output[1] != test['outputs'][1]:
        print('Testing fault: Returned', result, 'on inputs', inputs, '(' + str(test['reason']) + ')')
