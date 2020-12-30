import random

class Agent:
    def __init__(self, team: int, id_num: int, pos_x: int, pos_y: int):
        self._id_num = id_num
        self._x = pos_x
        self._y = pos_y
        self._age = 0
        self._dir = 0
        self._team = team
                
    def get_fire(self) -> int:
        return random.randint(0,1)
                
    def get_move(self) -> int: 
        return random.randint(0,3)
    
    def step(self):
        self._age += 1

    def get_pos(self) -> (int,int):
        return self._x, self._y