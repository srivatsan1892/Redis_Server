# Redis_Server

Redis is a in memory database used to store key-value pair 
Redis- Server by default runs on 6379 port number
Clients can be - Node Server, Python Client , Rust Client , IOT and so on 
The communication happens with TCP protocol 
Initially a TCP server is built which listens to 6379 port 


Redis Serilization protocol 
The Redis sever communicates in a particular syntax (wire protocol) (a protocol in which govern how applications comminicates with services)

=> *1
$7
COMMAND
This is obtained on converting the data to string , this is due to the Redis Serilization protocol 
$ is for bulk string and * is for array , since the data is stored in the array in key value pair and the length is 7 and the data type is string ($7)





Redis commands
1. redis-cli
2. redis-cli  -p 7000