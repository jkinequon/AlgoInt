import socket
import threading

LOCALHOST = "127.0.0.1"
PORT = 8080

class ThreadedServer(object):
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        self.sock.bind((self.host, self.port))

    def listen(self):
        self.sock.listen(5)
        while True:
            client, address = self.sock.accept()
            client.settimeout(60) # client has 60 seconds
            threading.Thread(target=self.listenToClient, args=(client, address)).start()

    def listenToClient(self, client, address):
        BUFFERSIZE = 1024
        while True:
            try:
                data = client.recv(BUFFERSIZE)
                if data:
                    # TODO: we recieved a signal, and we need to run the right question
                    response = ""
                    # TODO: The response will be our file.txt and error.txt created from docker
                    client.send(response)
            except:
                client.close()
                return False

ThreadedServer(LOCALHOST,PORT).listen()