import * as AWS from "aws-sdk"

function helper (){
    const eventBridge = new AWS.EventBridge({region:'us-east-1'})

    return eventBridge
    .putEvents({
        Entries:[
            {
                EventBusName : 'default',
                Source : 'demo' ,
                DetailType : 'demo' ,
                Detail : `{"name": "Ansar" }`
            }
        ]
    }).promise()
}

exports.handler = async function(event:any) {
    console.log('EVENT BODY: \n' , event)
    const e = await helper()
    
}

 