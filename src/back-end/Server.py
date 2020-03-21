from flask import Flask, jsonify, make_response, request
from DockerHandler import handleDocker
import json

app = Flask(__name__)

@app.route('/')
def index():
    return "Hello, World!"


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


@app.route('/Submit', methods=['POST'])
def submitCode():
    if not request.json or not 'title' in request.json:
        # send back they fucked up
        return
    else:
        name = request.json['name']
        UUID = request.json['UUID']
        question = request.json['Question']
        solution = request.json['Solution']
        #                         docker.DockerSubmit(data['UUID'], data['Question'], data['Solution'])
        docker = D.HandleDocker(name)
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


@app.route('/Run', methods=['POST'])
def runCode():
    if not request.json or not 'title' in request.json:
        # send back they fucked up
        return
    else:
        name = request.json['name']
        UUID = request.json['UUID']
        question = request.json['Question']
        solution = request.json['Solution']
        #                         docker.DockerSubmit(data['UUID'], data['Question'], data['Solution'])
        docker = D.HandleDocker(name)
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



# LOCALHOST = "127.0.0.1"
# PORT = 8080
#
# class ThreadedServer(object):
#     def __init__(self, host, port):
#         self.host = host
#         self.port = port
#         self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
#         self.sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
#         self.sock.bind((self.host, self.port))
#
#     def listen(self):
#         self.sock.listen(5)
#         while True:
#             client, address = self.sock.accept()
#             client.settimeout(60) # client has 60 seconds
#             threading.Thread(target=self.listenToClient, args=(client, address)).start()
#
    def listenToClient(self, client, address):
        BUFFERSIZE = 1024
        while True:
            print(client.recv(BUFFERSIZE))
            try:
                data = client.recv(BUFFERSIZE)
                print(data)
                if data:
                    print("passed to docker")
                    docker = D.HandleDocker(data["name"])
                    if data["message"] == "Submit":
                        print("is submitted")
                        docker.DockerSubmit(data['UUID'], data['Question'], data['Solution'])
                        docker.handleInformation(data["Question"])
                    elif data["message"] == "Run":
                        docker.DockerRun(data['UUID'], data['Question'], data['Solution'])
                    response = {
                        'response': docker.response,
                        'outputData': docker.outputData,
                        'errorData': docker.errorData,
                    }
                    response = json.dumps(response)
                    docker.DockerClean()
                    client.send(response)
            except:
                client.close()
                return False

# print("Starting")
# ThreadedServer(LOCALHOST, PORT).listen()
