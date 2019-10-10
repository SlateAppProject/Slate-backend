# SLATE

## Team Meh

#### Members
 * Brandon Hurrington | Manish B KC | Marisha Hoza | Peter Lee
 
### Product Description
A translation chat app geared towards groups of foreign language enthusiasts.   
# Back-End Components
   ###### Websocket API Gatewaty       
  * connect: opens up a web socket connection for the front-end client and store the connection in dynamo db. 
  * disconnect: closes the specified connection and releases it from the dynamo db. 
  * updateconnection: expression route to append identifier information to the existing connections.         
  * sendmessage: Broadcasts message to specified connections
  #### NOTE: The messaging models used during updateconnection and sendmessage is strictly JSON format
  
  ###### Slate-translate API Gateway         
  * translate: Receives JSON object that specifies message, source and target languages to hit the AWS translate service.
  
 ###### Slate-users API Gateway
  * Method1: POST
      ** createuser: Receives JSON object from the front end and saves the user into dynamo db.
      ** Response: JSON object
      
  * Method2: GET   
      ** get-user: user id is passed into the query parameters and queries database to return the JSON object representation                      of the user in dynamo db. 
      * Response: JSON object
  
# JSON SAMPLES 
  ### Websocket API Gateway  
  * sendmessage
  
        
        {

              "action" : "sendmessage",
             
                        .
                        .
                        .


              "roomId" : "unique Room ID associated with the User"
              
              
              }
              
   * Response: Message Broadcast to the specified roomId.
   
  ### Slate-translate API Gateway  
  * translateText
  
          {
              "message" : "Hello",
              
              "source" : "en",
              
              "destination" : "es"
              
     
              }
              
              
   * Response: Message Object (JSON) with message being translated. 
   

      

