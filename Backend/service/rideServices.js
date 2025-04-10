// const rideModel = require("../models/rideModel");
// const mapService = require("../service/mapsService");
// const { bcrypt } = require("bcrypt");
// const crypto = require("crypto");

// async function getFare(pickup, destination) {
//   if (!pickup || !destination) {
//     throw new Error("Pickup and destination are required");
//   }
//   const distanceTime = await mapService.getDistanceTime(pickup, destination);
//   const baseFare = {
//     auto: 30,
//     car: 50,
//     bike: 20,
//   };

//   const perKmRate = {
//     auto: 10,
//     car: 15,
//     bike: 8,
//   };

//   const perMinuteRate = {
//     auto: 2,
//     car: 3,
//     bike: 1.5,
//   };
//   console.log(distanceTime);

//   const fare = {
//     auto:
//       Math.round(
//         (baseFare.auto +
//           (distanceTime.distance.value / 1000) * perKmRate.auto +
//           (distanceTime.duration.value / 60) * perMinuteRate.auto) *
//           100
//       ) / 100,

//     car:
//       Math.round(
//         (baseFare.car +
//           (distanceTime.distance.value / 1000) * perKmRate.car +
//           (distanceTime.duration.value / 60) * perMinuteRate.car) *
//           100
//       ) / 100,

//     bike:
//       Math.round(
//         (baseFare.bike +
//           (distanceTime.distance.value / 1000) * perKmRate.bike +
//           (distanceTime.duration.value / 60) * perMinuteRate.bike) *
//           100
//       ) / 100,
//   };

//   return fare;
// }

// function getOtp(num) {
//   function generateOtp(num) {
//     const min = Math.pow(10, num - 1);
//     const max = Math.pow(10, num) - 1;
//     const otp = crypto.randomInt(min, max + 1);
//     return otp;
//   }

//   return generateOtp(num);
// }
// module.exports.getFare = getFare;
// module.exports.createRide = async ({
//   user,
//   pickup,
//   destination,
//   vehicleType,
// }) => {
//   if (!user || !pickup || !destination || !vehicleType) {
//     throw new Error("All fields are required");
//   }
//   const fare = await getFare(pickup, destination);
//   const ride = new rideModel({
//     user,
//     pickup,
//     destination,
//     otp: getOtp(6),
//     fare: fare[vehicleType],
//   });
//   return ride;
// };
// module.exports.confirmRide = async ({ rideId,captain }) => {
//   if (!rideId) {
//     throw new Error("Ride id is required");
//   }
//   await rideModel.findOneAndUpdate(
//     {
//       _id: rideId,
//     },
//     {
//       status: "accepted",
//       captain:captain._id
//     },
//     {
//       new: true,
//     }
//   );

//   const ride = await rideModel
//     .findOne({
//       _id: rideId,
//     }).populate("captain").select('+otp')
//     .populate("user");

//   if (!ride) {
//     throw new Error("Ride not found");
//   }

//   return ride;
// };

// module.exports.startRide = async (rideId, otp, captain) => {
//   if (!rideId || !otp) {
//     throw new Error('Ride id and OTP are required');
//   }

//   const ride = await rideModel.findOne({ _id: rideId })
//     .populate('user')
//     .populate('captain')
//     .select('+otp');

//   if (!ride) {
//     throw new Error('Ride not found');
//   }

//   if (ride.status !== 'accepted') {
//     throw new Error('Ride not accepted');
//   }

//   if (ride.otp !== otp) {
//     throw new Error('Invalid OTP');
//   }

//   await rideModel.findOneAndUpdate(
//     { _id: rideId },
//     { status: 'ongoing' }
//   );

//   sendMessageToSocketId(ride.user.socketId, {
//     event: 'ride-started',
//     data: ride,
//   });

//   return ride;
// };
const rideModel = require("../models/rideModel");
const captainModel = require("../models/captainModel"); // Assuming you have this
const mapService = require("../service/mapsService");
const crypto = require("crypto");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  const baseFare = {
    auto: 30,
    car: 50,
    bike: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    bike: 8,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    bike: 1.5,
  };

  const fare = {
    auto: Math.round(
      (baseFare.auto +
        (distanceTime.distance.value / 1000) * perKmRate.auto +
        (distanceTime.duration.value / 60) * perMinuteRate.auto) *
        100
    ) / 100,

    car: Math.round(
      (baseFare.car +
        (distanceTime.distance.value / 1000) * perKmRate.car +
        (distanceTime.duration.value / 60) * perMinuteRate.car) *
        100
    ) / 100,

    bike: Math.round(
      (baseFare.bike +
        (distanceTime.distance.value / 1000) * perKmRate.bike +
        (distanceTime.duration.value / 60) * perMinuteRate.bike) *
        100
    ) / 100,
  };

  return fare;
}

function getOtp(num) {
  const min = Math.pow(10, num - 1);
  const max = Math.pow(10, num) - 1;
  return crypto.randomInt(min, max + 1);
}

// 🚕 Find captains within 5km radius
async function getCaptainsInTheRadius(pickupLocation, radiusInKm = 5) {
  const [lng, lat] = pickupLocation; // [lng, lat]

  const captains = await captainModel.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
        $maxDistance: radiusInKm * 1000,
      },
    },
  });

  return captains;
}

async function createRide({ user, pickup, destination, vehicleType }) {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickup, destination);

  // Optional: Find nearby captains
  const nearbyCaptains = await getCaptainsInTheRadius(pickup.coordinates);
  if (!nearbyCaptains.length) {
    throw new Error("No captains available nearby");
  }

  const ride = new rideModel({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
  });

  return await ride.save(); // Save and return
}

async function confirmRide({ rideId, captain }) {
  if (!rideId) throw new Error("Ride id is required");

  await rideModel.findOneAndUpdate(
    { _id: rideId },
    { status: "accepted", captain: captain._id },
    { new: true }
  );

  const ride = await rideModel
    .findById(rideId)
    .populate("captain")
    .populate("user")
    .select("+otp");

  if (!ride) throw new Error("Ride not found");

  return ride;
}

async function startRide(rideId, otp, captain) {
  if (!rideId || !otp) throw new Error("Ride id and OTP are required");

  const ride = await rideModel
    .findById(rideId)
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) throw new Error("Ride not found");
  if (ride.status !== "accepted") throw new Error("Ride not accepted");
  if (ride.otp !== otp) throw new Error("Invalid OTP");

  await rideModel.updateOne({ _id: rideId }, { status: "ongoing" });

  // socket message logic here
  if (ride.user.socketId) {
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-started",
      data: ride,
    });
  }

  return ride;
}

module.exports = {
  getFare,
  createRide,
  confirmRide,
  startRide,
  getCaptainsInTheRadius,
};
module.exports.endRide = async ({ rideId, captain }) => {
  if (!rideId) {
      throw new Error('Ride id is required');
  }

  const ride = await rideModel.findOne({
      _id: rideId,
      captain:captain._id,
  })
  .populate('user')
  .populate('captain')
  .select('+otp');

  if (!ride) {
      throw new Error('Ride not found');
  }

  if (ride.status !== 'ongoing') {
      throw new Error('Ride not ongoing');
  }

  await rideModel.findOneAndUpdate({
      _id: rideId
  }, {
      status: 'completed'
  });
};