from flask import Flask, jsonify, make_response, request
from flask_cors import CORS, cross_origin
import DockerHandler
import json

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)
cors = CORS(app,resources={r"/Submit": {"origins": "*"}})


@app.route('/api')
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def index():
    return "Hello, World!"


@app.errorhandler(404)
@cross_origin()
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


@app.route('/api/Submit', methods=['POST', "OPTIONS"])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
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
    docker.dockerStatus()
    response = {
        'response': docker.getResponse(),
        'outputData': docker.getOutputData(),
        'errorData': docker.getErrorData(),
    }
    print(response)
    response = json.dumps(response)
    docker.DockerClean()
    print("Finished here")
    print(response)
    return jsonify({'response': response}), 201


@app.route('/api/Run', methods=['POST', "OPTIONS"])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
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
