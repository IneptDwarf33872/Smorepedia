const { Region } = require("oracle-nosqldb");
const { ServiceType } = require("oracle-nosqldb/lib/constants");
const NoSQLClient = require("oracle-nosqldb").NoSQLClient;

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


module.exports = client;