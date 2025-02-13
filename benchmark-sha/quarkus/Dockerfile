FROM quay.io/quarkus/ubi-quarkus-native-image:22.3-java17 AS build
WORKDIR /project
COPY . .
RUN ./mvnw package -Pnative -Dquarkus.native.container-build=true

FROM registry.access.redhat.com/ubi8/ubi-minimal:8.10-1179
WORKDIR /work/
COPY --from=build /project/target/*-runner /work/application
RUN chmod +x /work/application
CMD ["/work/application"]