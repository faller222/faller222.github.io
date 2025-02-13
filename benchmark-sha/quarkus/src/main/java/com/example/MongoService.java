package com.example;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.bson.Document;

@ApplicationScoped
public class MongoService {

    @Inject
    MongoClient mongoClient;

    private MongoDatabase getDatabase() {
        return mongoClient.getDatabase("test");
    }

    public void saveHash(String hash) {
        MongoCollection<Document> collection = getDatabase().getCollection("hashes");
        Document document = new Document("hash", hash);
        collection.insertOne(document);
    }
}
