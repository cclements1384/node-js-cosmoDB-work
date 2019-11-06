// ADD THIS PART TO YOUR CODE
const CosmosClient = require('@azure/cosmos').CosmosClient;

const config = require('./config');

// ADD THIS PART TO YOUR CODE
const endpoint = config.endpoint;
const key = config.key;

const client = new CosmosClient({ endpoint, key });

// ADD THIS PART TO YOUR CODE
const HttpStatusCodes = { NOTFOUND: 404 };

const databaseId = config.database.id;
const containerId = config.container.id;
const partitionKey = { kind: "Hash", paths: ["/Category"] };

// READ THE DATABASE DEFINITION - THIS IS NOT NEEDED TO PERFORM INSERTS.
async function readDatabase() {
  const { resource: databaseDefinition } = await client.database(databaseId).read();
  console.log(`Reading database:\n${databaseDefinition.id}\n`);
}


//  QUERY THE DATABASE.
async function queryContainer() {
  console.log(`Querying container:\n${config.container.id}`);
  const querySpec = {
    query: "SELECT * FROM root r WHERE r.category = @category",
    parameters: [
      {
        name: "@category",
        value: "work"
      }
    ]
  };

  const { resources } = await client.database(databaseId).container(containerId).items.query(querySpec, { enableCrossPartitionQuery: true }).fetchAll();
  for (var queryResult of resources) {
    let resultString = JSON.stringify(queryResult);
    console.log(`\tQuery returned ${resultString}\n`);
  }
};

// CREATE A NEW RECORD IN THE DATABASE.
async function createTodoItem(itemBody) {
  const { item } = await client.database(databaseId).container(containerId).items.upsert(itemBody);
  console.log(`Created todo item with id:\n${itemBody.id}\n`);
};

// ADD THIS PART TO YOUR CODE
function exit(message) {
  console.log(message);
  console.log('Press any key to exit');
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on('data', process.exit.bind(process, 0));
};

queryContainer()
.then(() => createTodoItem(config.items.expense))
.then(() => exit("Done reading the container."))

// readDatabase()
// .then(() => queryContainer())
// .then(() => exit("We are done."))