import {DynamoDB} from "aws-sdk"

const documentClient = new DynamoDB.DocumentClient();

type AppSyncEvent = {
    info:{
        fieldName : string
    },
    arguments: {
        product : Product,
        productId : string
    }
}

type Product = {
    id: string,
    name : string,
    price : number
}

exports.handler = async (event : AppSyncEvent) => {
    if(event.info.fieldName == 'welcome'){

        return "hello world"
    } else if(event.info.fieldName == 'addProduct'){
        event.arguments.product.id = "Key-"+Math.random();
        const params = {
            TableName : process.env.TABLE_NAME || "",
            Item : event.arguments.product
        }
        const data = await documentClient.put(params).promise();
        console.log("after adding" , data);
        return event.arguments.product; 
        
    } else if(event.info.fieldName == 'deleteProduct'){
        const params = {
            TableName : process.env.TABLE_NAME || "",
            Key: {
                id : event.arguments.productId
            }
        }
        const data = await documentClient.delete(params).promise();
        console.log("after adding" , data);
        return "Deleted ";
        
    }
     else {
        return 'Not found'
    }
}   