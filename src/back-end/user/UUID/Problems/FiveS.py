# There are two sorted arrays nums1 and nums2 of size m and n respectively.
#
# Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).
#
# You may assume nums1 and nums2 cannot be both empty.

def median(A, B):
    A.extend(B)
    A.sort()
    if len(A) % 2 == 0:
        return (A[(int(len(A)//2))-1]+A[(int(len(A)//2))])/2
    else:
        return A[(int((len(A)-1)/2))]
