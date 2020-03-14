FROM python:3
ENV path_file=One.py\
    user=UUID
COPY ./user/${user}/Problems ./AlgoInt/Problems/
CMD ["sh", "-c","python3 < ./AlgoInt/Problems/${path_file} > /tmp/file.txt 2> /tmp/err.txt"]
