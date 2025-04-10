

const { validationResult } = require("express-validator");
const mapService = require("../service/mapsService");

module.exports.getCoordinates = async (req, res,next) => {
  const address = req.query.address;
  if (!address) {
    return res.status(400).json({ message: "Address is required" });
  }

  try {
    const location = await mapService.getAddressCoordinate(address);
    res.status(200).json(location);
  } catch (err) {
    console.error("Controller Error:", err.message);
    res.status(500).json({ message: "coordinates not found" });
  }
};

module.exports.getDistanceTime = async (req, res,next) => {

  
  try{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({message:errors.array()})
    }
    const { origin, destination } = req.query;
    const distanceTime = await mapService.getDistanceTime(origin, destination);
    res.status(200).json(distanceTime);
  }catch(err){
    console.error(err);
    res.status(500).json({ message: "Unable to fetch distance and time" });
  }


}


module.exports.getAutocompleteSuggestions = async (req, res,next) => {
  try{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()})
    }
    const { input } = req.query;
    const suggestions = await mapService.getAutocompleteSuggestions(input);
    res.status(200).json(suggestions);

  }catch(err){
    console.error(err);
    res.status(500).json({ message: "Unable to fetch suggestions" });
  }



}