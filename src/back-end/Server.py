from flask import Flask, jsonify, make_response, request
from flask_cors import CORS, cross_origin
import DockerHandler
import json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/')
@cross_origin()
def index():
    return "Hello, World!"


@app.errorhandler(404)
@cross_origin()
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


@app.route('/Submit', methods=['POST', "OPTIONS"])
@cross_origin()
def submitCode():
    print("Inside Submit")
    print(request.json)
    name = request.json['name']
    UUID = request.json['UUID']
    question = request.json['Question']
    solution = request.json['Solution']
    docker = DockerHandler.handleDocker(name)
    docker.DockerSubmit(UUID, question, solution)
    docker.handleInformation(question)
    response = {
        'response': docker.response,
        'outputData': docker.outputData,
        'errorData': docker.errorData,
    }
    response = json.dumps(response)
    docker.DockerClean()
    return jsonify({'response': response}), 201


@app.route('/Run', methods=['POST', "OPTIONS"])
@cross_origin()
def runCode():
    if not request.json:
        # send back they fucked up
        return
    else:
        name = request.json['name']
        UUID = request.json['UUID']
        question = request.json['Question']
        solution = request.json['Solution']
        docker = DockerHandler.handleDocker(name)
        docker.DockerRun(UUID, question, solution)
        response = {
            'response': docker.response,
            'outputData': docker.outputData,
            'errorData': docker.errorData,
        }
        response = json.dumps(response)
        docker.DockerClean()
        return jsonify({'response': response}), 201


if __name__ == '__main__':
    app.run(debug=True)
