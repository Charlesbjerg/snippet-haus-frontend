export default {
    // Sets up request body for lambda function
    createAwsRequest(data, method) {
        let request = {
            "httpMethod": method,
            "body": {
                "TableName": "snippets",
                "Item": data
            }
        };
        return request;
    }
};