module.export = {
    // Sets up request body for lambda function
    createAwsRequest: function(data, method) {

        console.log("Aws request");
        console.log(data);
        console.log(`Method: ${method}`);

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