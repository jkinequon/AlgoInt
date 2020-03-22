FROM python:3
ENV path_file=One.py\
    user=UUID
COPY ./user/${user}/AlgoInt/Problems ./AlgoInt/Problems/
CMD ["sh", "-c","python3 < ./AlgoInt/Problems/${path_file} > /AlgoInt/Problems/file.txt 2> /AlgoInt/Problems/err.txt"]
