def getNthFib(N:int) -> int:
    if (N <= 1):
        return 1
    if (N == 2):
        return 1

    current = 0
    prev1 = 1
    prev2 = 1

    # Since range is exclusive and we want to include N, we need to put N+1.
    for i in range(3, N + 1):
        current = prev1 + prev2
        prev2 = prev1
        prev1 = current
    return current

