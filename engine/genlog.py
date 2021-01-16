import os
from os.path import isfile, join 
import string
import random

class Genlog:
    def __init__(self, world_data, config_data):
        thisdir = os.getcwd()
        logdir = thisdir + "/logs"
                
        existing_files = [f for f in os.listdir(logdir) if isfile(join(logdir, f))]
        
        existing_nums = [x[3:-4] for x in existing_files]
        existing_nums = [int(x) for x in existing_nums if x.isdigit()]
        
        file_num = 1
        while(file_num in existing_nums):
            file_num += 1
                    
        new_file_name = str(file_num)
        self._new_file_name = 'log' + new_file_name +'.txt'
        
        return

    def lprint(self, s : str):
        self.log_file.write(s)
        self.log_file.write("\n")
        return

    def log_header(self):
        return
    
    def log_files(self, config, worlds):
        self.log_file = open("logs/" + self._new_file_name, "w")
        self.lprint(f"!world_dim:{config['world_dim']}")
        
        print('[ GENLOG ] Writing to file.')
        
        for world in worlds:
            for row in world:
                self.log_file.write("#")
                for entry in row:
                    self.log_file.write(str(entry))
                    self.log_file.write(' ')
                self.log_file.write('\n')
            self.log_file.write('\n')
                
        
        print('[ GENLOG ] Done.')        
        
        self.log_file.close()

        return