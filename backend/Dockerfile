FROM gradle:9-jdk25 AS build
WORKDIR /distributed-demo
COPY build.gradle settings.gradle gradlew ./
COPY gradle ./gradle
RUN ./gradlew dependencies --no-daemon
COPY src ./src
RUN ./gradlew bootJar --no-daemon

FROM eclipse-temurin:25-jre-alpine
COPY --from=build /distributed-demo/build/libs/*.jar distributed-demo.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/distributed-demo.jar"]