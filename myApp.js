const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let makar = new Person({ name: "Makar", age: 22, favoriteFoods: ["kebab"] });

  makar.save((error, data) => {
    if (error) {
      console.log(error);
    } else {
      done(null, data);
    }
  });
};

let arrayOfPeople = [
  { name: "Makarov", age: 35, favoriteFoods: ["kebab", "kebabb", "kebabbb"] },
  { name: "Makarovv", age: 36, favoriteFoods: ["pomme", "pommee", "pommeee"] },
  { name: "Makarovvv", age: 37, favoriteFoods: ["test", "testt", "testtt"] },
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (error, createdPeople) => {
    if (error) {
      console.log(error);
    } else {
      done(null, createdPeople);
    }
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (error, arrayOfResults) => {
    if (error) {
      console.log(error);
    } else {
      done(null, arrayOfResults);
    }
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: { $all: [food] } }, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      done(null, result);
    }
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      done(null, result);
    }
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      result.favoriteFoods.push(foodToAdd);
      result.save((error, updateResult) => {
        if (error) {
          console.log(error);
        } else {
          done(null, updateResult);
        }
      });
    }
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (error, updatedRecord) => {
      if (error) {
        console.log(error);
      } else {
        done(null, updatedRecord);
      }
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (error, deletedRecord) => {
    if (error) {
      console.log(error);
    } else {
      done(null, deletedRecord);
    }
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, (error, JSONStatus) => {
    if (error) {
      console.log(error);
    } else {
      done(null, JSONStatus);
    }
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: { $all: [foodToSearch] } })
    .sort({ name: "asc" })
    .limit(2)
    .select("-age")
    .exec((error, filteredResults) => {
      if (error) {
        console.log(error);
      } else {
        done(null, filteredResults);
      }
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
