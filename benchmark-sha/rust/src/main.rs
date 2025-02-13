use actix_web::{web, App, HttpServer, Responder, HttpResponse, Error};
use mongodb::{Client, options::ClientOptions};
use serde::{Deserialize, Serialize};
use sha2::{Sha256, Digest};
use hex::encode;
use std::sync::Arc;
use std::collections::HashMap;
use tokio::sync::RwLock;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum ApiError {
    #[error("Database error: {0}")]
    DatabaseError(#[from] mongodb::error::Error),
    #[error("Internal server error")]
    InternalError,
}

impl actix_web::error::ResponseError for ApiError {
    fn error_response(&self) -> HttpResponse {
        match self {
            ApiError::DatabaseError(_) => HttpResponse::ServiceUnavailable().json("Database error"),
            ApiError::InternalError => HttpResponse::InternalServerError().json("Internal server error"),
        }
    }
}

#[derive(Deserialize)]
struct InputData {
    text: String,
}

#[derive(Serialize, Deserialize, Clone)]
struct EncryptedData {
    hash: String,
}

type Cache = Arc<RwLock<HashMap<String, String>>>;

struct AppState {
    db: Arc<Client>,
    cache: Cache,
}

async fn compute_hash(text: &str) -> String {
    let mut hasher = Sha256::new();
    hasher.update(text.as_bytes());
    encode(hasher.finalize())
}

async fn save(
    data: web::Json<InputData>,
    state: web::Data<AppState>,
) -> Result<impl Responder, ApiError> {
    // Check cache first
    let cache_key = data.text.clone();
    
    // Try to get from cache
    if let Some(cached_hash) = state.cache.read().await.get(&cache_key) {
        return Ok(HttpResponse::Ok().json(cached_hash.clone()));
    }
    
    // Compute hash if not in cache
    let hash = compute_hash(&data.text).await;
    
    // Store in MongoDB
    let collection = state.db.database("test").collection("hashes");
    let doc = EncryptedData { hash: hash.clone() };
    
    collection.insert_one(doc, None).await.map_err(ApiError::DatabaseError)?;
    
    // Update cache
    state.cache.write().await.insert(cache_key, hash.clone());
    
    Ok(HttpResponse::Ok().json(hash))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let mut client_options = ClientOptions::parse("mongodb://mongodb:27017").await.unwrap();
    
    // Add connection pool options
    client_options.max_pool_size = Some(50);
    client_options.min_pool_size = Some(10);
    
    let client = Arc::new(Client::with_options(client_options).unwrap());
    let cache: Cache = Arc::new(RwLock::new(HashMap::with_capacity(10000)));
    
    let state = web::Data::new(AppState {
        db: client,
        cache: cache.clone(),
    });

    println!("Server running on port 8081");
    
    HttpServer::new(move || {
        App::new()
            .app_data(state.clone())
            .route("/save", web::post().to(save))
    })
    .bind("0.0.0.0:8080")?
    .workers(num_cpus::get() * 2) // Optimize number of workers based on CPU cores
    .run()
    .await
}
