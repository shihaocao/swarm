import random

class Agent:
    def __init__(self, id_num: int, pos_x: int, pos_y: int):
        self._id_num = id_num
        self._x = pos_x
        self._y = pos_y
        self._age = 0
                
    def get_fire() -> int:
        return random.randint(0,1)
                
    def get_move() -> int: 
        return random.randint(0,3)
    
    def step(self):
        self._age += 1
