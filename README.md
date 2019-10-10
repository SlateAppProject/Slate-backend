## Application
  ##### Slate
  
## Components
   ###### Websocket API Gatewaty       
  * connect: opens up a web socket connection for the front-end client and store the connection in dynamo db. 
  * disconnect: closes the specified connection and releases it from the dynamo db. 
  * updateconnection: expression route to append identifier information to the existing connections.         
  * sendmessage: Broadcasts message to specified connections
  #### NOTE: The messaging models used during updateconnection and sendmessage is strictly JSON format
  
  ###### Slate-translate API Gateway         
  * translate: Receives JSON object that specifies message, source and target languages to hit the AWS translate service.
  
 ###### Slate-users API Gateway
  * API GATEWAY: https://04kiiaovkl.execute-api.us-west-2.amazonaws.com/dev/tasks
  * Method: GET           
  * Response: JSON object
  
###### Create a new task
  * API GATEWAY: https://lltrgze6rl.execute-api.us-west-2.amazonaws.com/dev/task
  * Method: POST
  * PARAMS: JSON OBJECT
  
          
          {
          
              "title" : "New title",
              
              "description" : "new description",
              
              "status" : "Available",
              
              "assignee" : "New assignee"
              
              }
              
   * Response: JSON object
   
 ###### Get tasks for a specific user        
  * API GATEWAY:https://g6tbnjg2s3.execute-api.us-west-2.amazonaws.com/dev/task/{user}
  * Method: GET /task/{user}
  * PARAMS: "assignee" value  of the object as an URL param           
  * Response: JSON object
   
###### Update a task        
  * API GATEWAY:https://phv3cxw8ud.execute-api.us-west-2.amazonaws.com/dev/tasks/{id}/state
  * Method: PUT /tasks/{id}/state
  * PARAMS: id of the object as an URL param           
  * Response: JSON object
  
###### Assign a new user to the task        
  * API GATEWAY:https://7a6kr231di.execute-api.us-west-2.amazonaws.com/dev/tasks/{id}/assign/{assignee}
  * Method: PUT /tasks/{id}/assign/{assignee}
  * PARAMS: id of the object and assignee for the task as URL params         
  * Response: JSON object
  
###### Delete a task        
  * API GATEWAY: https://lpce1u7wt1.execute-api.us-west-2.amazonaws.com/dev/deletetask/{id}
  * Method: DELETE
  * PARAMS: id of task to be deleted as the URL param          
  * Response: Status of delte as a String
   
 ### FrontEnd Link 
      
              
## Credits and contributions
  * ### Manish
  * ### Roman
  * ### Jack
  * ### Fabian
