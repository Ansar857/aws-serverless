import * as AWS from "aws-sdk"
const docClient = new AWS.DynamoDB.DocumentClient();
// type AppSyncEvent = {
//     info : {
//         fieldName : string
//     }
//     arguments: {
//         msg : string,
//         id : string,
//         desciption : string
//     }
type Todo = {
    id: string;
    title: string;
    done: boolean;
}
type AppSyncEvent = {
    info: {
        fieldName: string
    },
    arguments: {
        todoId: string,
        todo: Todo
    }
}
// }
// type AppSyncEvent = {
//     info: {
//         fieldName: string
//     },
//     arguments: {
//         msg : string,
//         desciption : string,
//         id: string,
//         todo: Todo
//     }
// }


async function addTodo(todo: Todo) {
    const params = {
        TableName: process.env.TodoTableName || "",
        Item: todo
    }
    try {
        await docClient.put(params).promise();
        return todo;
    } catch (err) {
        console.log('DynamoDB error: ', err);
        return null;
    }
}


// async function addTodo(description: string): Promise<string | undefined> {

//     const todoInput : Todo ={
//         description
//     } as Todo

//     const docClient = new AWS.DynamoDB.DocumentClient();
//     const params = {
//         TableName : process.env.TodoTableName || '',
//         Item : todoInput
//     }

//     try{
//          const response = await docClient.put(params).promise();
//          return response.Attributes!['id'] || ""

//     } catch(e){
//         console.info(e)
//         return undefined
//     }
    
// }
// async function addTodo(todo: Todo) {
//     const docClient = new AWS.DynamoDB.DocumentClient();
//     const params = {
//         TableName: process.env.TodoTableName  || '',
//         Item: todo
//     }
//     try {
//         await docClient.put(params).promise();
//         return todo;
//     } catch (err) {
//         console.log('DynamoDB error: ', err);
//         return null;
//     }
// }


// async function getTodo(id: string): Promise<AWS.DynamoDB.ScanOutput | undefined> {

//     const todoInput : Todo ={
//         id
//     } as Todo

//     const docClient = new AWS.DynamoDB.DocumentClient();
//     const params = {
//         TableName : process.env.TodoTableName || '',
//         Item : todoInput
//     }

//     try{
//          const todo = await docClient.scan(params).promise();
//          return todo

//     } catch(e){
//         console.info(e)
//         return undefined
//     }
    
// }

// async function getTodo(id: string) {

//     const docClient = new AWS.DynamoDB.DocumentClient();
//         const todoInput : Todo ={
//         id
//     } as Todo

// //     const docClient = new AWS.DynamoDB.DocumentClient();
//     const params = {
//         TableName : process.env.TodoTableName || '',
//         Item : todoInput
//     }

//     try {
//         const data = await docClient.scan(params).promise()
//         return data.Items
//     } catch (err) {
//         console.log('DynamoDB error: ', err)
//         return null
//     }
// }

exports.handler = async (event :AppSyncEvent) => {

    if(event.info.fieldName === 'hello'){
        return "Hello World"
    } else if(event.info.fieldName === 'mycustommessage'){

        return  `This is my custom message`
    }
    else if(event.info.fieldName === 'getTodo'){
            //getTodo
            return await addTodo(event.arguments.todo);
        }
    else if(event.info.fieldName === 'addTodo'){
        //addTodo
        return "No data"
    }
     else{
        return "No data"
    }
    
}