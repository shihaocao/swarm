from . import agent
from . import render
class MCL:
    def __init__(self):
        self._render = render.Render()
        self._agent_bank = []

        self._config = {
            'num_teams': 2,
            'team_pos': [[(1,1),(3,3)],[(97,97),(99,99)]]
        }

        self.gen_agents()

        self._age = 0
            
    @staticmethod
    def meme():
        print("FASC")

    def gen_agents(self):
        id_counter = 0
        for team_pos_list in self._config['team_pos']:
            for x,y in team_pos_list:
                self._agent_bank.append(agent.Agent(id_counter, x, y))

    def setup(self):
        print("[ mcl ] Start")
        print('[ mcl ] Setup Finished')
        while True:
            self.loop()

    def loop(self):
        
        for agent in self._agent_bank:
            agent.step()
        
        self.mutate_under_lethal()      
        self.mutate_under_move()
        
        self._render.draw_frame()


    def mutate_under_lethal(self):
        pass 
    
    def mutate_under_move(self):
        pass 
    
def entry_point():
    mcl = MCL()
    mcl.meme()
    mcl.setup()
