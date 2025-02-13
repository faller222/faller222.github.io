use actix_web::{web, App, HttpServer, Responder, HttpResponse};
use mongodb::{Client, options::ClientOptions};
use serde::{Deserialize, Serialize};
use sha2::{Sha256, Digest};
use hex::encode;
use std::sync::Arc;

#[derive(Deserialize)]
struct InputData {
    text: String,
}

#[derive(Serialize, Deserialize)]
struct EncryptedData {
    hash: String,
}

async fn save(data: web::Json<InputData>, db: web::Data<Arc<Client>>) -> impl Responder {
    let mut hasher = Sha256::new();
    hasher.update(&data.text);
    let hash = encode(hasher.finalize());

    let collection = db.database("test").collection("hashes");
    let doc = EncryptedData { hash: hash.clone() };

    collection.insert_one(doc, None).await.unwrap();

    HttpResponse::Ok().json(hash)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let client_options = ClientOptions::parse("mongodb://mongodb:27017").await.unwrap();
    let client = Arc::new(Client::with_options(client_options).unwrap());

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(client.clone()))
            .route("/save", web::post().to(save))
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await
}
