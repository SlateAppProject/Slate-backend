package slate.users;

import com.amazonaws.services.amplify.model.App;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.google.gson.Gson;

import java.util.Map;

public class Controller {


    public ApplicationUser saveNewUser(ApplicationUser appUser, Context context ) {

        final AmazonDynamoDB ddb = AmazonDynamoDBClientBuilder.defaultClient();
        DynamoDBMapper ddbMapper = new DynamoDBMapper(ddb);
        ddbMapper.save(appUser);
        return appUser;
    }

    public APIGatewayProxyResponseEvent getUser(APIGatewayProxyRequestEvent event) {
        final AmazonDynamoDB ddb = AmazonDynamoDBClientBuilder.defaultClient();
        DynamoDBMapper ddbMapper = new DynamoDBMapper(ddb);
        StringBuilder path = new StringBuilder();

        for (Map.Entry<String,String> entry : event.getPathParameters().entrySet())
            path.append(entry.getValue());

        System.out.println("Test event: " + event);
        System.out.println("Test path Variable: " + path.toString());

        ApplicationUser appUser = ddbMapper.load(ApplicationUser.class, path.toString());
        System.out.println("test username: " + appUser.getAlias());

        Gson gson = new Gson();
        APIGatewayProxyResponseEvent responseEvent = new APIGatewayProxyResponseEvent();
        responseEvent.setBody(gson.toJson(appUser));


        return responseEvent;

    }


}
