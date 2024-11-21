This repository has the backend code for Yelp Pakistan. 

To run this application, you need to install express and dotenv. In the VSCode terminal, type the following commands:
1. npm install express
2. npm install dotenv

Then, change the .envfile to your oracle user credentials.

You will also need to create an oracle database for the application. 
For this application, creating a table with the name 'restaurant' is needed. The  required attributes are: 
1. restaurantid (data type: number, contstraints: not null, primary key)
2. city (data type: varchar2(30))
3. address (data type: varchar2(60))
4. contactno (data type: number)
5. description (data type: varchar2(150))
6. deleviry_available (data type: boolean)
7. dinein_available (data type: boolean)
8. takeout_available (data type: boolean)
9. image_url (data type: varchar2(150))
10. rating (data type; number)

After creating the restaurant table, you need create two stored procedures that will be used to fetch data from the restaurant table:

1. get_all_restaurants:
   In oracle, type the following to create the procedure:
   CREATE OR REPLACE PROCEDURE get_all_restaurants (restaurants OUT SYS_REFCURSOR) AS
BEGIN
    OPEN restaurants FOR
        SELECT * FROM restaurant;
END get_all_restaurants;
/

   This will be used to fetch data of all restaurants on the homepage.

2. get_restaurant_by_id:
   In oracle, type the following:
   CREATE OR REPLACE PROCEDURE get_restaurant_by_id (
    p_restaurantID IN NUMBER,
    p_result OUT SYS_REFCURSOR
)
AS
BEGIN
    OPEN p_result FOR
    SELECT * FROM restaurant WHERE restaurantID = p_restaurantID;
END get_restaurant_by_id;
/
   This will be used to fetch data of a specific restaurant and display it on a seperate page.


After the above steps have been completed, you will be ready to run the application.
You wil also need the frontend repository to run this application and see restaurant data. 
To run the application, you should open the terminal and enter the directory where this repository is stored. Then, 
type 'npm start'. In a seperate terminal, enter the directory with the frontend repository, and type 'npm run dev'. Follow the link given 
after typing this command, and the application should open in your browser. 



