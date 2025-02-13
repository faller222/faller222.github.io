# Etapa 1: Construcción
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY . /app
RUN mvn package -Pnative -Dquarkus.native.container-build=true -DskipTests

# Etapa 2: Ejecución Nativa
FROM quay.io/quarkus/ubi-quarkus-mandrel:22.3-java17
WORKDIR /app
COPY --from=build /app/target/*-runner /app/application
RUN chmod +x /app/application
CMD ["/app/application"]