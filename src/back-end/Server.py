from flask import Flask, jsonify, make_response, request
from flask_cors import CORS, cross_origin
import DockerHandler
import json

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)
cors = CORS(app,resources={r"/Submit": {"origins": "*"}})

"""
We had to ensure that there were no cors origin issues, so we added /api to all of our routes and made
sure that the cross origin was up to industry standards
"""

@app.route('/api')
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def index():
    """
    Basic api request just for testing
    """
    return "Hello, World!"


@app.errorhandler(404)
@cross_origin()
def not_found(error):
    """
    Error page; if the api is invalid the user would end up here
    :return: returns an error page
    """
    return make_response(jsonify({'error': 'Not found'}), 404)


@app.route('/api/Submit', methods=['POST', "OPTIONS"])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def submitCode():
    """
    This code receives a request from the front-end to submit the code to docker which then
    runs the docker container and sends a response to the front-end to display to the user. This
    will also submit rankings to the database to be displayed globally.
    :return: A json object; the users output from Docker
    """
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
    response = json.dumps(response)
    docker.DockerClean()
    return jsonify({'response': response}), 201


@app.route('/api/Run', methods=['POST', "OPTIONS"])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def runCode():
    """
    This code receives a request from the front-end to run the code to docker which then
    runs the docker container and sends a response to the front-end to display to the user
    :return: A json object; the users output from Docker
    """
    if not request.json:
        return
    else:
        name = request.json['name']
        UUID = request.json['UUID']
        question = request.json['Question']
        solution = request.json['Solution']
        docker = DockerHandler.handleDocker(name)
        docker.DockerRun(UUID, question, solution)
        docker.dockerStatus()
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
