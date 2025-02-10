FROM killbill/killbill:0.24.13

# Configuración de entorno para PostgreSQL
ENV KILLBILL_DAO_URL=jdbc:postgresql://db:5432/killbill
ENV KILLBILL_DAO_USER=killbill
ENV KILLBILL_DAO_PASSWORD=killbill

# Configuración de Mercado Pago
ENV KB_PAYMENT_PLUGIN_MERCADOPAGO_ACCESS_TOKEN=TU_ACCESS_TOKEN
ENV KB_PAYMENT_PLUGIN_MERCADOPAGO_PUBLIC_KEY=TU_PUBLIC_KEY

# Directorio de plugins
RUN mkdir -p /var/tmp/bundles/plugins/java/



# Exponer el puerto de Kill Bill
EXPOSE 8080

ENTRYPOINT ["java", "-Dorg.killbill.server.properties=/var/tmp/killbill.properties", "-jar", "/var/tmp/killbill-server.jar"]
