FROM python:3
ENV path_file One.py
COPY /Problems ./AlgoInt/Problems/
CMD ["sh", "-c","python3 < ./Problems/${path_file} > /tmp/file.txt 2> /tmp/err.txt"]
