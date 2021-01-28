## Flutterwave
Flutterwave NodeJS Assessment 

## Getting Started: 
  Clone the repository and cd into the created folder using the commands below:\
    git clone https://github.com/razaqfatiu/flutterwave.git \
    cd flutterwave

## Install Dependencies
    npm install
  
## Running Locally
    npm start

## Working with the API
   host: http://localhost:2500
    
  - base route: GET /
  - validation route: 
     - POST /validate-rule 
     - request body:
   
   Parameter | Type | Description
   --- | --- | ---
   `rule` | object | This should contain 3 fields: field `string`, condition, string`[eq, neq, gt, gte, contains]`, condition_value: `number`
   `data` | JSON object or array or string | This should contain the field parameter on the rule
        
   Sample request body: 
   ```javascript {
     {
      "rule": {
        "field": "missions"
        "condition": "gte",
        "condition_value": 30
      },
      "data": {
        "name": "James Holden",
        "crew": "Rocinante",
        "age": 34,
        "position": "Captain",
        "missions": 45
      }
     }
     
