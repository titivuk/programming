docker run -d --name dev-rabbit --hostname rabbitmq-dev -p 15672:15672 -p 5672:5672 rabbitmq:management

http://localhost:15672

guest:guest

run every replier using
npx ts-node nodejs/request-reply/amqp/replier.ts

run requestor
npx ts-node nodejs/request-reply/amqp/requestor.ts
