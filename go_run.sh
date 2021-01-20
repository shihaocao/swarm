#!/bin/bash

echo "Starting"

. venv/bin/activate
python gym/go_ddpg.py
