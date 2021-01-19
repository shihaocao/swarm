import numpy as np
a = np.arange(16).reshape((4,4))
b = np.arange(16).reshape((4,4))
c = np.bitwise_and(a,b)
d = np.array(c, dtype=bool)
e = np.clip(c, 0, 1)
e = (e-1)*-1
print(a)
print(b)
print(c)
print(d)
print(e)

print(e.flatten().append(1))