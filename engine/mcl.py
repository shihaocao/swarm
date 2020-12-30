from . import agent
from . import render
import numpy as np

class MCL:
    def __init__(self):
        self._render = render.Render()
        self._agent_bank = []

        self._config = {
            'num_teams': 2,
            'team_pos': [[(1,1),(3,3)],[(97,97),(99,99)]],
            'world_dim': 100,
            'world_max_steps': 1000
        }

        self.gen_agents()

        self._age = 0
            
        self._world = self.gen_world()
        
        self._terminate = False
        self._world_max_steps = self._config['world_max_steps']
        
    def gen_world(self):
        wd = self._config['world_dim']
        world = np.zeros((wd,wd), dtype=int)
        
        for agent in self._agent_bank:
            r,c = agent.get_pos()
            world[r][c] = self.gen_agent_board_rep(agent)
        
        return world

    def gen_agent_board_rep(self, agent: agent.Agent):
        rep_num = 0
        
        rep_num += 100*(agent._team+1)
        rep_num += agent._dir
        
        return rep_num

    def gen_agents(self):
        id_counter = 0
        team_x_pos_list = self._config['team_pos']
        for team_num in range(len(team_x_pos_list)):
            for x,y in team_x_pos_list[team_num]:
                self._agent_bank.append(agent.Agent(team_num, id_counter, x, y))
                id_counter += 1
                
    def setup(self):
        print("[ mcl ] Start")
        print('[ mcl ] Setup Finished')
        while self._age < self._world_max_steps:
            self.loop()
        print("[ mcl ] World Max Steps Reached")
        print(self._world)

        self.clean_up()

    def loop(self):
        
        for agent in self._agent_bank:
            agent.step()
        
        self.mutate_under_lethal()      
        self.mutate_under_move()
        
        self._render.execute()

        self._age += 1
        
    def clean_up(self):
        pass
        
    def mutate_under_lethal(self):
        pass 
    
    def mutate_under_move(self):
        pass 
    
def entry_point():
    mcl = MCL()
    mcl.setup()
