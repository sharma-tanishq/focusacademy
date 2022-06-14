# Steps to setup Locally
Clone the Repository: `git clone "url of this repo"` 

For Backend: 

NOTE: the backend folder is independent i..e it can be moved mout to other directory for better management 
Install MongoDB (if not installed) 
Run MongoDB server 
Change the `mongooseURI` in `backend/connectDB.js` according to your local mongo server 
In the backend folder directory run npm i to install node modules. 
Run nodemon index.js to start the server 

For Frontend: 

run npm i in the root directory of the project to install node modules 
run npm run start to start the project

## Test Cases :
POST request at `http://localhost:5000/api/createuser`:  

Request 1 (if any one of the required field i..e username , name or password is empty ):  
{  
    username:"" 
    name:"random" 
    imgURL:"" 
    password:"123456" 
}  
Response:  
{  
    "success": false, 
    "message": "Request is invalid"  
}  

Request 2 (correct request):  
{   
    username:"Random" 
    name:"random" 
    imgURL:"" 
    password:"123456"  
}  
Response:  
{
    "success":true, 
    "authToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhODc3MTM1MTY4NmUwNjk5ZjllM2U4In0sImlhdCI6MTY1NTIwNzY5OX0.8YBaBQ7YFC_e88QrMNyMj9jim88NbFl-lhV_6uYo0ts" 
}  

Request 3 (username is already present):  
{   
    username:"Random" 
    name:"random2" 
    imgURL:"" 
    password:"123456"  
}  

Response:  
{  
   "success":false, 
   "message":"Username already exists"  
}  


POST request at `http://localhost:5000/api/login` 

Request 1 (incorrecr credentials): 
{ 
    username:"Joy", 
    password:"99" 
} 

Response: 
{
    "success":false,
    "message":"Please enter correct credentials or click forgot password"
}

Request 2 (correct credentials): 
{ 
    username:"Random", 
    password:"123456" 
} 

Response: 
{
    "success":true,
    "authToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhODcxZGQzZWMwM2E4YWJlMTAwNDE5In0sImlhdCI6MTY1NTIwOTI1MH0.LE9Jn6qLgjJy9pGQlrCQRkMkkMjy0F0ix4PaKyn0k40"
}


GET request at `http://localhost:5000/api/getusers`:  

Request 1(correct request):  
headers: 
{ 
    'Content-Type': 'application/json', 
    'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhODc3MTM1MTY4NmUwNjk5ZjllM2U4In0sImlhdCI6MTY1NTIwNzY5OX0.8YBaBQ7YFC_e88QrMNyMj9jim88NbFl-lhV_6uYo0ts",  
}  

Response:  
{  
    "success":true, 
    "userArray":
    [ 
        { 
            "_id":"62a871dd3ec03a8abe100419","name":"Random","username":"random","password":"$2a$10$d2Oa7Pz7Emr3bPnCH5ij8ufpzmepR16SaW9ozm48Zr4p0aCo0xLr2", "imgURL":"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png","__v":0 
        }, 
        {
            "_id":"62a8764251686e0699f9e3d9","name":"Ravi","username":"ravi","password":"$2a$10$ZwYgLhD7YmyG2yYhu38ntOIAICYssPYGH9JUHzDTKXAy4rVABheXe", "imgURL":"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png","__v":0 
        }, 
        { 
            "_id":"62a876cd51686e0699f9e3e3","name":"Random2","username":"Random2","password":"$2a$10$qKXM.f.USWIZ/xTMbjM1e. MUxYvjq0KFoXAjVCpBeeGGPPhuX8HxO","imgURL":"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png","__v":0 
        }, 
        {
            "_id":"62a8771351686e0699f9e3e8","name":"Random3","username":"Random3","password":"$2a$10$/zhnQE0IkclgHVMLGhT5Wuw.ZoNbw2mq4Hy0UhW7GYKHUYjYat6ZS","imgURL":"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png","__v":0
        },
        {
            "_id":"62a87b6051686e0699f9e3ed","name":"random","username":"Random","password":"$2a$10$OEA1/ANX4QCaPRBuCEpIM.je4SE3PL.GNJglJg7lOc4sXJR9qHu92","imgURL":"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png","__v":0
        }
    ]
}  

Request 2 (sending tampered or no auth-token): 
headers: 
{ 
    'Content-Type': 'application/json', 
    'auth-token':"12345",  
}  

Response: Access denied 


## Technologies used :

1) Node.js  
2) Express  
3) JavaScript  

