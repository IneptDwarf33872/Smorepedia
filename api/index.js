const express = require("express");
//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
const bodyParser = require("body-parser");
const { Region } = require("oracle-nosqldb");
const { ServiceType } = require("oracle-nosqldb/lib/constants");
const NoSQLClient = require("oracle-nosqldb").NoSQLClient;

const app = express();
app.use(bodyParser.json());

const client = new NoSQLClient({
  region: Region.US_ASHBURN_1,
  serviceType: ServiceType.CLOUD,
  compartment:
"ocid1.compartment.oc1..aaaaaaaahaycpzfjgklhl4e7jic6xoufxxwwtxcylcl3fpsiooyycamd5igq",
  auth: {
    iam: {
      tenantId:      "ocid1.tenancy.oc1..aaaaaaaabgpwfc7gq645lm7h6wjehohak2fd4xbedpvrmpplh3egjvjvnhgq",
      userId:
"ocid1.user.oc1..aaaaaaaanamjf2u5sdw57hsuuvi4adbeotpigzolekzehywix3ilz6osb3yq",
      fingerprint: "9e:23:38:8a:5b:b6:c7:b5:16:b6:72:1a:a5:92:9f:75",
      passphrase: "",
      privateKeyFile: "./.oci/privateKey.pem",
    },
  },
});





app.post('/add', async (req, res) => {
    let { id, title, content, infobox } = req.body;
    console.log(id);
    try {
        const result = await client.put('pages', {
            id,
            title,
            content,
            infobox,
        });
        console.log(result);
        res.json({ result: result.success});
      if (!result.consumedCapacity) {
          res.status(500).json({ error: 'Failed to add item' });
      }
    } catch (err) {
        console.error('failed to insert data', err);
        res.status(500).json({ error: err });
    }
});



app.get("/maxid", async (req, res) => {
  try {
    let result = await client.query('SELECT id FROM pages');
    result = result.rows;
    let highest = 0;
    for(let i = 0; i < result.length; i++){
      if(result[i].id > highest){
        highest = result[i].id;
      }
    }
    const jayson = { high: highest };
    console.log(jayson.high);
    res.json(jayson);
  } catch (err) {
    console.error("failed to get data", err);
    res.status(500).json({ error: err });
  }
});

app.get("/byid", async (req, res) => {
  try {
    let { id } = req.body;
    console.log("ID: " + id);
    const result = await client.get('pages', { id })
    res.json(result.row);
  } catch (err) {
    console.error("failed to get data", err);
    res.status(500).json({ error: err });
  }
});
app.delete('/byid', async (req, res) => {
    const { id } = req.body;
    
    try {
        const result = await client.delete('pages', { id });
        res.json({ result: result.success});
    } catch (err) {
        console.error('failed to delete data', err);
        res.status(500).json({ error: err });
    }
});
app.get("/", async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM pages');
    res.json(result.rows);
  } catch (err) {
    console.error("failed to get data", err);
    res.status(500).json({ error: err });
  }
});
app.get("/byprop", async (req, res) => {
    try {
        let { prop } = req.body;
      const result = await client.query(`SELECT ${prop} FROM pages`);
      res.json(result.rows);
    } catch (err) {
      console.error("failed to get data", err);
      res.status(500).json({ error: err });
    }
  });
  const port = process.env.PORT || 3000; // Default port or environment variable
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

module.exports = app;
