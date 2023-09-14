import {DynamoDB} from "aws-sdk"

const documentCLient = new DynamoDB.DocumentClient();

type Description = {
    id:string,
    des : string
}

type AppSyncEvent = {
    info:{
        fieldName : string
    }
    arguments : {
        description : Description
        TodoID : string

    }
}



exports.handler = async(event:AppSyncEvent)=>{
    if(event.info.fieldName=='welcome'){
        return "I am working"
    }
    else if(event.info.fieldName=='addTodo'){
        event.arguments.description.id = "key-"+Math.random();
        console.log(event.arguments.description.id)

        const params = {
            TableName : process.env.TODO_TABLE || "",
            Item : event.arguments.description,
        }
        const data = await documentCLient.put(params).promise();
        return event.arguments.description

    }
    else if(event.info.fieldName=='deleteTodo'){
        const params = {
            TableName : process.env.TODO_TABLE || "",
            Key : {
                id : event.arguments.TodoID
            }
        }
        const data = await documentCLient.delete(params).promise();
        return "DELETED"

    }
    else if(event.info.fieldName=='getTodo'){
        const params = {
            TableName : process.env.TODO_TABLE || "",
            Key : {
                id : event.arguments.TodoID
            }
        }
        const data = await documentCLient.get(params).promise();
        return data.Item
    }   
    else if(event.info.fieldName=='updateTodo'){
        const  myId:string = event.arguments.description.id
        
        const params = {
            TableName : process.env.TODO_TABLE || "",
            Key : {
                id : myId
            },
            UpdateExpression: 'SET des = :newDes ',
            ExpressionAttributeValues: {
                ':newDes': event.arguments.description.des,
              },
        }
        const data = await documentCLient.update(params).promise();
        return "Updated"
    }


    
     else {
        return "No Data"
    }


}  