const oracledb = require('oracledb');

async function getAllRestaurants() {
    const connection = await oracledb.getConnection();

    const result = await connection.execute(
        `BEGIN get_all_restaurants(:restaurants); END;`, 
        {
          restaurants: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } 
        },
        {
          outFormat: oracledb.OUT_FORMAT_OBJECT 
        }
      );
  
      const restaurants = await result.outBinds.restaurants.getRows();
      await connection.close();
  
      return restaurants;

  //  const result = await connection.execute(
 //   'select * from restaurant',  [],
  //  { outFormat: oracledb.OUT_FORMAT_OBJECT });
  //  await connection.close();
  //  return result.rows;
}


async function getRestaurantById(id) {
    const connection = await oracledb.getConnection();

    const result = await connection.execute(
        `BEGIN get_restaurant_by_id(:id, :result); END;`, 
        {
            id: id,                      
            result: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR }  
        }
    );

    
    const rows = await result.outBinds.result.getRows(); 
    await connection.close();
    
    return rows;  


   // const result = await connection.execute('select * from restaurant where restaurantID = :id', [id]);
   // await connection.close();
  //  return result.rows; 
}

async function createRestaurant(restaurant){
    const connection = await oracledb.getConnection();
    const result = await connection.execute('insert into restaurant values (:restaurantid, :name, :city, :address, :contactno, :description, :delivery_available, :dinein_available, :takeout_available, :image_url, :rating)',
        [restaurant.restaurantid, restaurant.name, restaurant.city, restaurant.address, restaurant.contactno, restaurant.description, restaurant.delivery_available, restaurant.dinein_available, restaurant.takeout_available, restaurant.image_url, restaurant.rating]);
        await connection.commit(); 
        await connection.close();
        return result; 
}

async function updateRestaurant(restaurant,id){
    const connection = await oracledb.getConnection();
    const result = await connection.execute('update restaurant set name = :name, city = :city, address = :address, contactno = :contactno, description = :description, delivery_available = :delivery_available, dinein_available = :dinein_available, takeout_available = :takeout_available, image_url = :image_url where restaurantid = :id',
    [restaurant.name, restaurant.city, restaurant.address, restaurant.contactno, restaurant.description, restaurant.delivery_available, restaurant.dinein_available, restaurant.takeout_available, restaurant.image_url, id]);
    await connection.commit();
    await connection.close();
    return result;
}

async function deleteRestaurant(id){
    const connection = await oracledb.getConnection();
    console.log(id);
    const result = await connection.execute(
        `delete from restaurant where restaurantid = :id`,
        [id]);
    await connection.commit();
    await connection.close();
    return result;
}

module.exports = {getAllRestaurants, getRestaurantById, createRestaurant, updateRestaurant, deleteRestaurant, }
