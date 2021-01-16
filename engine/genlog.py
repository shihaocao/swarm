from os import listdir
from os.path import isfile, join 
import string
import random

class Genlog:
    def __init__(self, world_data, config_data):
        logdir = "../logs/"        
        self.existing_files = [f for f in listdir(logdir) if isfile(join(logdir, f))]
        
        char_bank = string.ascii_lowercase + string.digits
        
        len_str = 10
        rand_name = ''.join(random.choice(char_bank) for i in range(len_str))
        rand_name += '.txt'
        self.log_file = open("demofile3.txt", "w")
        self.log_file.write("header")
        self.log_file.write("header")

        self.log_file.close()
        
        return

    def log_header(self):
        return
    
    def log_files(self):
        return