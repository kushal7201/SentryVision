// Switch to sentryvision database
db = db.getSiblingDB('sentryvision');

// Create collections with validation
db.createCollection("users", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["firstname", "email", "phone", "password"],
         properties: {
            firstname: { bsonType: "string" },
            lastname: { bsonType: "string" },
            email: { bsonType: "string" },
            phone: { bsonType: "string" },
            password: { bsonType: "string" },
            avatar: { bsonType: "string" },
            role_id: { bsonType: "int" },
            videos: { bsonType: "string" }
         }
      }
   }
})

db.createCollection("endpoints", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         properties: {
            endpoint: { bsonType: "string" },
            method: { bsonType: "string" }
         }
      }
   }
})

db.createCollection("accessibility", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         properties: {
            endpoint_id: { bsonType: "objectId" },
            roles: { bsonType: "string" }
         }
      }
   }
})

db.createCollection("roles")

// Create indexes
db.accessibility.createIndex({ endpoint_id: 1 })
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ phone: 1 }, { unique: true })
db.users.createIndex({ role_id: 1 })

// Insert default role
db.roles.insertOne({
  _id: 33,
  title: "user"
})
