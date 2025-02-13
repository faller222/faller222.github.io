FROM quay.io/quarkus/ubi-quarkus-native-image:22.0.0-java17-arm64 AS build
WORKDIR /project
COPY . .
RUN ./mvnw package -Pnative -Dquarkus.native.builder-image=quay.io/quarkus/ubi-quarkus-native-image:22.0.0-java17-arm64

FROM registry.access.redhat.com/ubi8/ubi-minimal:8.10-1179
WORKDIR /work/
COPY --from=build /project/target/*-runner /work/application
RUN chmod +x /work/application
CMD ["/work/application"]