const restaurantModel = require('../models/restaurantModel');

async function getAllRestaurants(req, res){

    try {
        const restaurants = await restaurantModel.getAllRestaurants();
        res.status(200).json(
            {status: "success",
             noOfResults: restaurants.length,
             data: { restaurants},
            });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching restaurants');
    } 
}

async function getOneRestaurant(req, res){
    const id = req.params.id;
    try {
        const restaurant = await restaurantModel.getRestaurantById(id);
        res.status(200).json(
            {status: "success",
             data: {result: restaurant[0]},
            });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching restaurant');
    }
}

async function createRestaurant(req, res){
    const newRestaurant = req.body;
    try {
        await restaurantModel.createRestaurant(newRestaurant);
        res.status(200).send('Restaurant created');
    } catch (err){
        console.error(err);
        res.status(500).send('Error creating restaurant');
    }
}

async function updateRestaurant(req, res){
    const updatedRestaurant = req.body;
    const id = req.params.id;
    try {
        const result = await restaurantModel.updateRestaurant(updatedRestaurant,id);
        if (result.rowsAffected === 0) {
            return res.status(404).send('Restaurant not found');
        }
        res.send('Restaurant updated');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating restaurant');
    }
    
}

async function deleteRestaurant(req, res){
    const id = req.params.id;
    try {
        console.log("Deleting restaurant");
        const result = await restaurantModel.deleteRestaurant(id);
        if (result.rowsAffected === 0) {
            return res.status(404).send('Restaurant not found');
        }
        res.send('Restaurant deleled');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting restaurant');
    }
}

module.exports = {getAllRestaurants, getOneRestaurant, createRestaurant, updateRestaurant, deleteRestaurant,};