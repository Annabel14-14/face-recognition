import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

#------------------------------
# APPLICATION PROGRAMMING INTERFACE

from flask import Flask, jsonify, request, make_response

# Javascript Object Notation

import argparse
import uuid
import json
import time
from tqdm import tqdm

#------------------------------

import tensorflow as tf
tf_version = int(tf.__version__.split(".")[0])

#------------------------------

if tf_version == 2:
  import logging
  tf.get_logger().setLevel(logging.ERROR)

#------------------------------

from deepface import DeepFace

import pandas as pd

#------------------------------

app = Flask(__name__)

#------------------------------

tic = time.time()

print("Loading Face Recognition Models...")
facenet_model = DeepFace.build_model("Facenet")

toc = time.time()

print("Face recognition models are built in ", toc-tic," seconds")
#------------------------------

if tf_version == 1:
  graph = tf.get_default_graph()

#------------------------------
#Service API Interface
@app.route('/verify', methods=['POST'])
def verify():
	
	global graph
	
	tic = time.time()
	req = request.get_json()
	trx_id = uuid.uuid4()
	
	resp_obj = jsonify({'success': False})
	
	if tf_version == 1:
		with graph.as_default():
			resp_obj = verifyWrapper(req)
	elif tf_version == 2:
		resp_obj = verifyWrapper(req)
		
	#--------------------------
	
	toc =  time.time()
	
	return resp_obj, 200

def verifyWrapper(req):
  resp_obj = jsonify({'success': False})

  img_path = ""
  db_path="/Users/shamsudeen/Desktop/database/"

  img_path = req["img1"]

  resp_obj = DeepFace.find(img_path, db_path, model_name="Facenet", enforce_detection=False)

  foundRecord = resp_obj.to_json(orient = "records")

  return foundRecord


app.run(host='0.0.0.0', port=5000)
