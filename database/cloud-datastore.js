// Datastore Google
//The key file is required in a variable. The variable is now a JSON object with the credentials.
// var credentials = require('../config/GCP NodeJS-25a5315f91cb.json');
const { Datastore } = require('@google-cloud/datastore');
//Initialise the datastore object with the proper project id and credentials.
//const datastore = new Datastore();
const datastore = new Datastore({
  projectId: 'hale-post-251906',
  //credentials: credentials
});

const tableContext = 'Customer';

function list(limit, callAgain) {
  const q = datastore
    .createQuery([tableContext])
    .limit(limit)
    .order('name');

  datastore.runQuery(q, (err, entities) => {
    if (err) {
      callAgain(err);
      return;
    }
    
  callAgain(null, entities.map(fromDatastore));
  });
}

function read(id, cb) {
  const key = datastore.key([tableContext, parseInt(id, 10)]);
  datastore.get(key, (err, entity) => {
    if (!err && !entity) {
      err = {
        code: 404,
        message: 'Not found',
      };
    }
    if (err) {
      cb(err);
      return;
    }
    cb(null, fromDatastore(entity));
  });
}

function fromDatastore(obj) {
  obj.id = obj[Datastore.KEY].id;
  return obj;
}

// [START exports]
module.exports = {
  read,
  list
};
  // [END exports]